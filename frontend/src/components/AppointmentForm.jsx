// AppointmentForm — Controlled form with client-side validation + a honeypot
// field, posting to the Express reference backend in server/. The backend
// re-validates everything independently (defense-in-depth) — see
// server/middleware/validate.js.
import { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { config, telLink, waLink } from '../config.js';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  service: '',
  message: '',
  // Honeypot — real users never see or fill this field. Any bot that fills
  // every input on the page will populate it, and the backend silently
  // drops the submission when it's non-empty.
  website: '',
};

export default function AppointmentForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const ref = useScrollAnimation();
  const { services } = config;

  // Some clinics prefer phone-only booking — respect that instead of showing a live form.
  if (!config.featureFlags.enableOnlineBooking) {
    return <CallToBookCard formRef={ref} />;
  }

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    else if (form.fullName.trim().length > 80) errs.fullName = 'Full name is too long';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[+]?[\d\s()-]{7,15}$/.test(form.phone)) errs.phone = 'Invalid phone format';
    if (!form.date) errs.date = 'Please select a date';
    else if (form.date < new Date().toISOString().slice(0, 10)) errs.date = 'Please choose a future date';
    if (!form.time) errs.time = 'Please select a time';
    if (!form.service) errs.service = 'Please select a service';
    if (form.message.length > 500) errs.message = 'Message is too long (max 500 characters)';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error('Booking is temporarily unavailable — please call or WhatsApp us instead.');
      }
      const res = await fetch(`${apiUrl}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Something went wrong sending your request. Please try again or call us.');
      }

      setSubmitted(true);
      setForm(initialState);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div ref={ref} className="scroll-hidden bg-primary text-white p-6 sm:p-8 md:p-12 rounded-2xl text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Appointment Requested!</h3>
        <p className="text-white/80 mb-6">We&apos;ll confirm your appointment shortly via phone or email.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="min-h-11 px-6 py-2.5 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="scroll-hidden bg-primary p-5 sm:p-6 md:p-10 rounded-2xl"
      noValidate
    >
      <span className="text-white/70 text-sm font-medium uppercase tracking-wider">We Are Here For You</span>
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-1 mb-6 sm:mb-8">Make An Appointment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Your Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="John Doe" autoComplete="name" />
        <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" autoComplete="email" />
        <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+91 00000 00000" autoComplete="tel" />
        <Field label="Preferred Date" name="date" type="date" value={form.date} onChange={handleChange} error={errors.date} min={new Date().toISOString().slice(0, 10)} />
        <Field label="Preferred Time" name="time" type="time" value={form.time} onChange={handleChange} error={errors.time} />
        <div className="flex flex-col">
          <label htmlFor="service" className="text-white/80 text-sm mb-1">Service</label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`w-full min-h-11 px-4 py-3 rounded-lg bg-white/10 text-white border focus:outline-none focus:ring-2 focus:ring-white/40 text-sm appearance-none ${errors.service ? 'border-red-300' : 'border-white/20'}`}
          >
            <option value="" className="text-dark">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.title} className="text-dark">{s.title}</option>
            ))}
          </select>
          {errors.service && <span className="text-red-200 text-xs mt-1">{errors.service}</span>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="text-white/80 text-sm mb-1 block">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          maxLength={500}
          placeholder="Tell us about your dental concerns..."
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm resize-none"
        />
        {errors.message && <span className="text-red-200 text-xs mt-1 block">{errors.message}</span>}
      </div>

      {/* Honeypot field — moved fully off-screen (not display:none, which some bots special-case
          and skip filling), excluded from the tab order and from assistive tech. Any submission
          with this field non-empty is silently dropped by the backend. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      {submitError && (
        <p role="alert" className="mt-4 text-red-200 text-sm bg-red-900/20 border border-red-300/30 rounded-lg px-4 py-3">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 min-h-11 w-full md:w-auto px-10 py-3.5 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm shadow-lg"
      >
        {isSubmitting ? 'Sending...' : 'Send Request'}
      </button>
    </form>
  );
}

function CallToBookCard({ formRef }) {
  const { business, contact } = config;
  const whatsappHref = waLink();

  return (
    <div ref={formRef} className="scroll-hidden bg-primary p-6 sm:p-8 md:p-12 rounded-2xl text-center text-white">
      <div className="text-5xl mb-4">📞</div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Book by Phone</h2>
      <p className="text-white/80 mb-8">
        {business.name} takes appointments by phone{whatsappHref ? ' or WhatsApp' : ''} — call us and we&apos;ll find a time that works for you.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={telLink()} className="inline-flex items-center justify-center min-h-11 px-8 py-3.5 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors text-sm">
          Call {contact.phoneDisplay}
        </a>
        {whatsappHref && (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-h-11 px-8 py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-colors text-sm">
            Chat on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder, autoComplete, min }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-white/80 text-sm mb-1">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        className={`w-full min-h-11 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border focus:outline-none focus:ring-2 focus:ring-white/40 text-sm ${error ? 'border-red-300' : 'border-white/20'
          }`}
      />
      {error && <span className="text-red-200 text-xs mt-1">{error}</span>}
    </div>
  );
}
