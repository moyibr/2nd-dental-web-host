// BlogCard — Blog preview with image, metadata, title, and excerpt
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function BlogCard({ image, date, author, comments, title, excerpt }) {
    const ref = useScrollAnimation();

    return (
        <article ref={ref} className="scroll-hidden bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
            <a href="#blog" className="block overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </a>
            <div className="p-6">
                <div className="flex flex-wrap gap-3 text-xs text-gray-text mb-3">
                    <span>👤 {author}</span>
                    <span>📅 {date}</span>
                    <span>💬 {comments} Comments</span>
                </div>
                <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors leading-snug">
                    <a href="#blog">{title}</a>
                </h3>
                <p className="text-gray-text text-sm leading-relaxed">{excerpt}</p>
            </div>
        </article>
    );
}
