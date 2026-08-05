// TopBar — Contact info bar with brand, hours, phone, and location
import { clinicConfig } from '../config/clinicConfig';

export default function TopBar() {
    const { business } = clinicConfig;

    return (
        <div className="bg-secondary text-white py-3">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Brand */}
                <a href="#home" className="flex flex-col leading-tight items-center md:items-start">
                    <span className="text-2xl font-bold tracking-tight text-primary">{business.name}</span>
                    <span className="text-xs text-gray-300 tracking-wider uppercase">{business.tagline}</span>
                </a>

                {/* Info Items */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm">
                    <InfoItem icon="🕐" label={business.hours.days} value={business.hours.time} />
                    <InfoItem icon="📞" label="Call Us" value={business.phone} />
                    <InfoItem icon="📍" label="Location" value={business.address} />
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <div className="flex flex-col">
                <span className="text-gray-400 text-xs">{label}</span>
                <strong className="text-white text-sm truncate max-w-[150px] sm:max-w-none" title={value}>{value}</strong>
            </div>
        </div>
    );
}
