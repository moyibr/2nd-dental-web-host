// WhatsAppButton — Floating click-to-chat button (desktop/tablet only; mobile uses MobileActionBar instead)
import { waLink } from '../config.js';

export default function WhatsAppButton() {
    const href = waLink();
    if (!href) return null;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="hidden lg:flex fixed bottom-6 right-6 z-40 w-14 h-14 items-center justify-center rounded-full bg-[#25D366] text-white text-2xl shadow-xl hover:scale-105 transition-transform"
        >
            <span aria-hidden="true">💬</span>
        </a>
    );
}
