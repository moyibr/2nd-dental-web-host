// ServiceCard — Centered icon + title + description card for the services grid
import useScrollAnimation from '../hooks/useScrollAnimation';
import { config } from '../config.js';

export default function ServiceCard({ icon, title, description, price, duration }) {
    const ref = useScrollAnimation();
    const currency = config.business.currency || '$';

    return (
        <div
            ref={ref}
            className="scroll-hidden bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100"
        >
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary-light flex items-center justify-center text-3xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:brightness-200">{icon}</span>
            </div>
            <h3 className="text-lg font-bold text-dark mb-3 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-gray-text text-sm leading-relaxed">{description}</p>
            {(price || duration) && (
                <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-gray-100 text-xs">
                    {price && <span className="font-semibold text-primary">{currency}{price}</span>}
                    {duration && <span className="text-gray-text">⏱ {duration}</span>}
                </div>
            )}
        </div>
    );
}
