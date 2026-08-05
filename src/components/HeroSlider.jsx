// HeroSlider — Auto-playing hero section supporting image and video backgrounds
import { useState, useEffect, useCallback } from 'react';
import { clinicConfig } from '../config/clinicConfig';

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const { slides } = clinicConfig.hero;

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    if (!slides || slides.length === 0) return null;

    return (
        <section id="home" className="relative h-[75vh] min-h-[500px] overflow-hidden">
            {/* Slides */}
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Media */}
                    {slide.type === 'video' ? (
                        <video
                            src={slide.media}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.media})` }}
                        />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                        <div className="max-w-7xl mx-auto px-4 w-full">
                            <div className="max-w-2xl">
                                <h1
                                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-200 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
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
                                    className={`flex flex-wrap gap-4 transition-all duration-700 delay-500 ${i === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                >
                                    {slide.cta1Text && (
                                        <a
                                            href={slide.cta1Link}
                                            className="px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl text-sm"
                                        >
                                            {slide.cta1Text} →
                                        </a>
                                    )}
                                    {slide.cta2Text && (
                                        <a
                                            href={slide.cta2Link}
                                            className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white hover:text-dark transition-all text-sm"
                                        >
                                            {slide.cta2Text} →
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
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
