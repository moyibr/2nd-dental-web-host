// Footer — 5-column footer with brand, services, quick links, recent posts, and contact info
import { clinicConfig } from '../config/clinicConfig';

export default function Footer() {
    const { business, social, services, blog, footer, navigation } = clinicConfig;

    return (
        <footer className="relative bg-secondary text-white overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-black/40 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <a href="#home" className="flex flex-col leading-tight mb-4">
                            <span className="text-2xl font-bold text-primary">{business.name}</span>
                            <span className="text-xs text-gray-400 tracking-wider uppercase">{business.tagline}</span>
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            {footer.aboutText}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {Object.entries(social).map(([platform, url]) => {
                                if (!url) return null;
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        aria-label={platform}
                                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-primary hover:text-white transition-colors capitalize"
                                    >
                                        {platform === 'twitter' ? '𝕏' : platform === 'facebook' ? 'f' : platform[0]}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
                        <ul className="space-y-2">
                            {services.slice(0, 5).map((s) => (
                                <li key={s.id}>
                                    <a href="#services" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2">
                                        <span className="text-primary text-xs">→</span> {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-2">
                            {navigation.slice(0, 6).map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2">
                                        <span className="text-primary text-xs">→</span> {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recent Posts Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Recent Posts</h3>
                        <div className="space-y-4">
                            {blog.slice(0, 3).map((post) => (
                                <a key={post.id} href="#blog" className="flex gap-3 group">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        loading="lazy"
                                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity"
                                    />
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">📅 {post.date}</p>
                                        <h4 className="text-sm text-gray-300 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                            {post.title}
                                        </h4>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Have Questions?</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5">📍</span>
                                <span>{business.address}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5">📞</span>
                                <a href={`tel:${business.phone}`} className="hover:text-primary transition-colors">{business.phone}</a>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5">✉️</span>
                                <a href={`mailto:${business.email}`} className="hover:text-primary transition-colors">{business.email}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className="border-t border-white/10 pt-6 text-center">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} {business.name}. {footer.copyrightText}
                    </p>
                </div>
            </div>
        </footer>
    );
}
