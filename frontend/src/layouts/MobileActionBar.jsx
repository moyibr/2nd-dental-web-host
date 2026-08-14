// MobileActionBar — Sticky bottom bar with Call / WhatsApp / Book Appointment.
// Standard, high-converting pattern for clinic sites. Visible below the `lg`
// breakpoint only — desktop already has the CTA in the Navbar + WhatsAppButton.
import { config, telLink, waLink } from '../config.js';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

export default function MobileActionBar() {
    const { business, contact } = config;
    const whatsappHref = waLink();

    return (
        <nav
            aria-label="Quick contact actions"
            className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
            <div className={`grid ${whatsappHref ? 'grid-cols-3' : 'grid-cols-2'}`}>
                <a
                    href={telLink()}
                    className="flex flex-col items-center justify-center gap-0.5 min-h-14 text-dark text-xs font-semibold active:bg-gray-light transition-colors"
                >
                    <span className="text-lg" aria-hidden="true">📞</span>
                    Call Now
                </a>
                {whatsappHref && (
                    <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-0.5 min-h-14 text-[#25D366] text-xs font-semibold border-x border-gray-200 active:bg-gray-light transition-colors"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        WhatsApp
                    </a>
                )}
                <a
                    href="#contact"
                    className="flex flex-col items-center justify-center gap-0.5 min-h-14 bg-primary text-white text-xs font-semibold active:bg-primary-dark transition-colors"
                >
                    <span className="text-lg" aria-hidden="true">📅</span>
                    {config.featureFlags.enableOnlineBooking ? 'Book Now' : `Call to Book`}
                </a>
            </div>
            <span className="sr-only">{business.name} — {contact.phoneDisplay}</span>
        </nav>
    );
}
