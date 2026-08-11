// AppointmentForm — Controlled form with validation, ready for backend wiring
import { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { clinicConfig } from '../config/clinicConfig';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  doctor: '',
  message: '',
};

export default function AppointmentForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollAnimation();
  const { doctors } = clinicConfig;

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[+]?[\d\s()-]{7,15}$/.test(form.phone)) errs.phone = 'Invalid phone format';
    if (!form.date) errs.date = 'Please select a date';
    if (!form.time) errs.time = 'Please select a time';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      // TODO: Replace with actual API call — POST to `${apiUrl}/appointments`
      console.log(`📋 Appointment submitted to ${apiUrl}/appointments:`, form);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      setForm(initialState);
    } catch (err) {
      console.error('Failed to submit appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div ref={ref} className="scroll-hidden bg-primary text-white p-8 md:p-12 rounded-2xl text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold mb-2">Appointment Requested!</h3>
        <p className="text-white/80 mb-6">We&apos;ll confirm your appointment shortly via email.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm"
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
      className="scroll-hidden bg-primary p-6 md:p-10 rounded-2xl"
      noValidate
    >
      <span className="text-white/70 text-sm font-medium uppercase tracking-wider">We Are Here For You</span>
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-1 mb-8">Make An Appointment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Your Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="John Doe" />
        <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" />
        <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+1 (555) 000-0000" />
        <Field label="Appointment Date" name="date" type="date" value={form.date} onChange={handleChange} error={errors.date} />
        <Field label="Appointment Time" name="time" type="time" value={form.time} onChange={handleChange} error={errors.time} />
        <div className="flex flex-col">
          <label className="text-white/80 text-sm mb-1">Select A Doctor</label>
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm appearance-none"
          >
            <option value="" className="text-dark">Any Available</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.name} className="text-dark">{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-white/80 text-sm mb-1 block">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your dental concerns..."
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full md:w-auto px-10 py-3.5 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm shadow-lg"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-white/80 text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border focus:outline-none focus:ring-2 focus:ring-white/40 text-sm ${error ? 'border-red-300' : 'border-white/20'
          }`}
      />
      {error && <span className="text-red-200 text-xs mt-1">{error}</span>}
    </div>
  );
}
