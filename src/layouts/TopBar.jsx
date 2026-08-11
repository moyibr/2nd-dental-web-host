// TopBar — Contact info bar with brand, hours, phone, and location (desktop/tablet only;
// mobile relies on MobileActionBar + the Navbar's mobile brand row instead)
import { config, summarizeHours, telLink, formatAddress } from '../config.js';

export default function TopBar() {
    const { business } = config;

    return (
        <div className="bg-secondary text-white py-3 hidden md:block">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 flex-wrap">
                {/* Brand */}
                <a href="#home" className="flex flex-col leading-tight">
                    <span className="text-2xl font-bold tracking-tight text-primary">{business.name}</span>
                    <span className="text-xs text-gray-300 tracking-wider uppercase">{business.tagline}</span>
                </a>

                {/* Info Items */}
                <div className="flex items-center gap-6 lg:gap-8 text-sm min-w-0">
                    <InfoItem icon="🕐" label="Hours" value={summarizeHours()} />
                    <InfoItem icon="📞" label="Call Us" value={config.contact.phoneDisplay} href={telLink()} />
                    <InfoItem icon="📍" label="Location" value={formatAddress()} />
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon, label, value, href }) {
    const content = (
        <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <div className="flex flex-col min-w-0">
                <span className="text-gray-400 text-xs">{label}</span>
                <strong className="text-white text-sm truncate block max-w-[140px] lg:max-w-[220px] xl:max-w-[320px]" title={value}>{value}</strong>
            </div>
        </div>
    );
    return href ? <a href={href} className="hover:opacity-80 transition-opacity min-w-0">{content}</a> : content;
}
