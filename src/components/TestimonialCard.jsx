// TestimonialCard — Quote card with avatar, name, and review source/date
export default function TestimonialCard({ quote, name, source, date, avatar }) {
    const avatarSrc = avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0E7C7B&color=fff&bold=true&size=128`;

    return (
        <div className="flex-shrink-0 w-[85vw] max-w-sm sm:w-96 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3 mb-4">
                <span className="text-primary text-3xl leading-none" aria-hidden="true">&ldquo;</span>
            </div>
            <p className="text-gray-text text-sm leading-relaxed mb-6">{quote}</p>
            <div className="flex items-center gap-3">
                <img
                    src={avatarSrc}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                />
                <div>
                    <p className="font-bold text-dark text-sm">{name}</p>
                    <span className="text-primary text-xs">{source}{date ? ` · ${date}` : ''}</span>
                </div>
            </div>
        </div>
    );
}
