// TestimonialsCarousel — Horizontally scrollable testimonial card strip
import { useRef } from 'react';
import { clinicConfig } from '../config/clinicConfig';
import TestimonialCard from './TestimonialCard';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function TestimonialsCarousel() {
  const trackRef = useRef(null);
  const sectionRef = useScrollAnimation();
  const { testimonials } = clinicConfig;

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 400, behavior: 'smooth' });
    }
  };

  return (
    <div ref={sectionRef} className="scroll-hidden">
      {/* Navigation Arrows */}
      <div className="flex justify-end gap-2 mb-6">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous testimonials"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next testimonials"
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-colors"
        >
          →
        </button>
      </div>

      {/* Scrollable Track */}
      <div
        ref={trackRef}
        className="testimonial-track flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} {...t} />
        ))}
      </div>
    </div>
  );
}
