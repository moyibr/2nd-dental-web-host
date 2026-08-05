// ServiceHighlight — Horizontal icon + title + description card for the highlights strip
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function ServiceHighlight({ icon, title, description }) {
    const ref = useScrollAnimation();

    return (
        <div ref={ref} className="scroll-hidden flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
            <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-dark mb-1">{title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
