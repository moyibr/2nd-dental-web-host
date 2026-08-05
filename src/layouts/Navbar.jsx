// Navbar — Sticky navigation with mobile hamburger toggle and CTA button
import { useState, useEffect } from 'react';
import { clinicConfig } from '../config/clinicConfig';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigation, business } = clinicConfig;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-white shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Mobile Brand / Logo (only visible on mobile, desktop has TopBar) */}
        <div className="lg:hidden flex items-center gap-2">
          <img src={business.logo} alt={business.name} className="w-8 h-8" />
          <span className="font-bold text-dark">{business.name}</span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navigation.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-dark hover:text-primary transition-colors rounded-md"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
        >
          Make An Appointment
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle navigation"
        >
          <span className={`block w-6 h-0.5 bg-dark transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-dark transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-dark transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
      >
        <ul className="flex flex-col px-4 gap-1">
          {navigation.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-4 text-sm text-dark hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-2 text-center py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
            >
              Make An Appointment
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
