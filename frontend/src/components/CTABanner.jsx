// CTABanner — Full-width background banner with heading and CTA button
import { config } from '../config.js';

export default function CTABanner() {
  const { ctaBanner } = config;

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      {/* Background — bg-fixed causes jank on mobile browsers, so only apply it from sm+ */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
        style={{ backgroundImage: `url(${ctaBanner.image})` }}
      />
      <div className="absolute inset-0 bg-primary/80" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Book Your Appointment</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">
            {ctaBanner.heading}
          </h2>
        </div>
        <a
          href={ctaBanner.buttonLink}
          className="inline-flex items-center justify-center flex-shrink-0 min-h-11 px-8 sm:px-10 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl text-sm"
        >
          {ctaBanner.buttonText}
        </a>
      </div>
    </section>
  );
}
