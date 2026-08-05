// useScrollAnimation — IntersectionObserver hook for fade-in-on-scroll effects
import { useEffect, useRef } from 'react';

export default function useScrollAnimation(threshold = 0.15) {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-visible');
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}
