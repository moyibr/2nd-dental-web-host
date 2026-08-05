// TestimonialCard — Quote card with avatar, name, and role
export default function TestimonialCard({ quote, name, role, avatar }) {
    return (
        <div className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3 mb-4">
                <span className="text-primary text-3xl leading-none">&ldquo;</span>
            </div>
            <p className="text-gray-text text-sm leading-relaxed mb-6">{quote}</p>
            <div className="flex items-center gap-3">
                <img
                    src={avatar}
                    alt={name}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                    <p className="font-bold text-dark text-sm">{name}</p>
                    <span className="text-primary text-xs">{role}</span>
                </div>
            </div>
        </div>
    );
}
