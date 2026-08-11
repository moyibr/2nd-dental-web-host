// LocationMap — Embedded Google Map, address, hours, and quick contact actions
import useScrollAnimation from '../hooks/useScrollAnimation';
import { clinicConfig } from '../config/clinicConfig';

export default function LocationMap() {
    const ref = useScrollAnimation();
    const { business, social } = clinicConfig;
    const mapQuery = encodeURIComponent(business.plusCode || business.address);
    const embedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

    return (
        <section id="visit" className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-14">
                    <span className="text-primary text-sm font-medium uppercase tracking-wider">Find Us</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">Visit Advanced Dental Lounge</h2>
                </div>

                <div ref={ref} className="scroll-hidden grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    {/* Map */}
                    <div className="lg:col-span-3 h-80 lg:h-auto min-h-[320px]">
                        <iframe
                            title={`${business.name} — Map Location`}
                            src={embedSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: 'block' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-10 flex flex-col justify-center gap-6">
                        <div className="flex items-start gap-3">
                            <span className="text-primary text-xl mt-0.5">📍</span>
                            <div>
                                <h3 className="font-bold text-dark text-sm mb-1">Address</h3>
                                <p className="text-gray-text text-sm leading-relaxed">{business.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-primary text-xl mt-0.5">🕐</span>
                            <div>
                                <h3 className="font-bold text-dark text-sm mb-1">Hours</h3>
                                <p className="text-gray-text text-sm">{business.hours.days} · {business.hours.time}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-primary text-xl mt-0.5">📞</span>
                            <div>
                                <h3 className="font-bold text-dark text-sm mb-1">Call Us</h3>
                                <a href={`tel:${business.phone}`} className="text-gray-text text-sm hover:text-primary transition-colors">{business.phone}</a>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-2">
                            <a
                                href={business.googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors text-center"
                            >
                                Get Directions →
                            </a>
                            {social.whatsapp && (
                                <a
                                    href={social.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-gray-light text-dark text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors text-center"
                                >
                                    Chat on WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
