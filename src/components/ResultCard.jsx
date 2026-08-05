// ResultCard — Before/after gallery card with image and patient info overlay
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function ResultCard({ image, name, info }) {
    const ref = useScrollAnimation();

    return (
        <div ref={ref} className="scroll-hidden relative group overflow-hidden rounded-2xl">
            <img
                src={image}
                alt={`Result — ${name}`}
                loading="lazy"
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                <div>
                    <span className="text-white/70 text-xs">{info}</span>
                    <h3 className="text-white font-bold text-lg">{name}</h3>
                </div>
            </div>
        </div>
    );
}
