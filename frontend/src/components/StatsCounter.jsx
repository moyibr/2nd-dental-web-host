// StatsCounter — Animated counter with icon and caption label
import { useState, useEffect, useRef } from 'react';

export default function StatsCounter({ icon, target, caption }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                    observer.unobserve(node);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const duration = 2000;
        const step = Math.max(1, Math.ceil(target / (duration / 16)));
        const timer = setInterval(() => {
            setCount((prev) => {
                const next = prev + step;
                if (next >= target) {
                    clearInterval(timer);
                    return target;
                }
                return next;
            });
        }, 16);
        return () => clearInterval(timer);
    }, [started, target]);

    return (
        <div ref={ref} className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-dark">{count.toLocaleString()}+</h3>
                <span className="text-gray-text text-sm">{caption}</span>
            </div>
        </div>
    );
}
