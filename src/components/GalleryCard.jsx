// GalleryCard — Single facility/equipment photo with a caption overlay
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function GalleryCard({ image, caption }) {
    const ref = useScrollAnimation();

    return (
        <div ref={ref} className="scroll-hidden relative group overflow-hidden rounded-2xl">
            <img
                src={image}
                alt={caption}
                loading="lazy"
                decoding="async"
                className="w-full h-56 sm:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                <h3 className="text-white font-bold text-base sm:text-lg">{caption}</h3>
            </div>
        </div>
    );
}
