// PricingCard — Plan name, price, features list, and CTA button
import useScrollAnimation from '../hooks/useScrollAnimation';
import { clinicConfig } from '../config/clinicConfig';

export default function PricingCard({ name, price, features, highlighted }) {
    const ref = useScrollAnimation();
    const currency = clinicConfig.business.currency || '$';

    return (
        <div
            ref={ref}
            className={`scroll-hidden rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 ${highlighted
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                    : 'bg-white shadow-sm border border-gray-100 hover:shadow-lg'
                }`}
        >
            <span className={`text-sm font-medium uppercase tracking-wider ${highlighted ? 'text-white/70' : 'text-primary'}`}>
                {name}
            </span>
            <div className="mt-3 mb-6">
                <span className={`text-sm align-top ${highlighted ? 'text-white/70' : 'text-gray-text'}`}>{currency}</span>
                <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-dark'}`}>{price}</span>
            </div>
            <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                    <li
                        key={i}
                        className={`text-sm flex items-center gap-2 ${highlighted ? 'text-white/80' : 'text-gray-text'}`}
                    >
                        <span className={`text-xs ${highlighted ? 'text-white' : 'text-primary'}`}>→</span>
                        {feature}
                    </li>
                ))}
            </ul>
            <a
                href="#contact"
                className={`block w-full py-3.5 rounded-full font-semibold text-sm transition-all ${highlighted
                        ? 'bg-white text-primary hover:bg-gray-100'
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
            >
                Get Started
            </a>
        </div>
    );
}
