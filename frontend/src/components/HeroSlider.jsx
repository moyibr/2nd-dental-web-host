// HeroSlider — Auto-playing hero section with a mobile/desktop responsive image split
import { useState, useEffect, useCallback } from 'react';
import { config } from '../config.js';

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const { slides } = config.hero;
    const { rating, reviewCount, googleMapsReviewUrl } = config.trust || {};

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    if (!slides || slides.length === 0) return null;

    return (
        <section id="home" className="relative h-[85vh] min-h-[560px] sm:h-[75vh] overflow-hidden">
            {/* Slides */}
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Media — responsive picture: portrait crop on mobile, wide crop from sm+ */}
                    <picture>
                        {slide.imageDesktop && <source media="(min-width: 640px)" srcSet={slide.imageDesktop} />}
                        <img
                            src={slide.imageMobile || slide.imageDesktop}
                            alt=""
                            aria-hidden="true"
                            fetchPriority={i === 0 ? 'high' : 'low'}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </picture>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                        <div className="max-w-7xl mx-auto px-4 w-full">
                            <div className="max-w-2xl">
                                {rating && (
                                    <a
                                        href={googleMapsReviewUrl || '#'}
                                        target={googleMapsReviewUrl ? '_blank' : undefined}
                                        rel={googleMapsReviewUrl ? 'noopener noreferrer' : undefined}
                                        className={`inline-flex items-center gap-2 mb-5 px-4 py-2 min-h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm transition-all duration-700 delay-100 hover:bg-white/20 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                    >
                                        <span className="text-accent">★★★★★</span>
                                        <span className="font-semibold">{rating}</span>
                                        {reviewCount && <span className="text-white/70">({reviewCount} Google reviews)</span>}
                                    </a>
                                )}
                                <h1
                                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 transition-all duration-700 delay-200 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                >
                                    {slide.heading}
                                </h1>
                                <p
                                    className={`text-base sm:text-lg text-gray-200 mb-8 max-w-lg transition-all duration-700 delay-400 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                >
                                    {slide.subheading}
                                </p>
                                <div
                                    className={`flex flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-500 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                >
                                    {slide.cta1?.text && (
                                        <a
                                            href={slide.cta1.href}
                                            className="inline-flex items-center min-h-11 px-6 sm:px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl text-sm"
                                        >
                                            {slide.cta1.text} →
                                        </a>
                                    )}
                                    {slide.cta2?.text && (
                                        <a
                                            href={slide.cta2.href}
                                            className="inline-flex items-center min-h-11 px-6 sm:px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white hover:text-dark transition-all text-sm"
                                        >
                                            {slide.cta2.text} →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === current}
                            className="w-11 h-11 flex items-center justify-center"
                        >
                            <span
                                aria-hidden="true"
                                className={`block w-3 h-3 rounded-full transition-all ${i === current ? 'bg-primary scale-125' : 'bg-white/50'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
