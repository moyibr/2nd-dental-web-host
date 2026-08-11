// FAQAccordion — Accessible expand/collapse list built from config.faq
import { useState } from 'react';
import { config } from '../config.js';

export default function FAQAccordion() {
    const [openId, setOpenId] = useState(config.faq?.[0]?.id ?? null);

    if (!config.faq || config.faq.length === 0) return null;

    return (
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-y border-gray-200">
            {config.faq.map((item) => {
                const isOpen = openId === item.id;
                return (
                    <div key={item.id}>
                        <h3>
                            <button
                                type="button"
                                onClick={() => setOpenId(isOpen ? null : item.id)}
                                aria-expanded={isOpen}
                                aria-controls={`faq-panel-${item.id}`}
                                className="w-full flex items-center justify-between gap-4 min-h-14 py-4 text-left text-dark font-semibold hover:text-primary transition-colors"
                            >
                                <span>{item.question}</span>
                                <span
                                    aria-hidden="true"
                                    className={`flex-shrink-0 text-primary text-xl leading-none transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                                >
                                    +
                                </span>
                            </button>
                        </h3>
                        <div
                            id={`faq-panel-${item.id}`}
                            role="region"
                            className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                            <div className="overflow-hidden">
                                <p className="text-gray-text text-sm leading-relaxed">{item.answer}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
