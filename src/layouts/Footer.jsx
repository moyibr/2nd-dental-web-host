// Footer — Brand, services, quick links, recent posts (if enabled), and NAP contact block
import { config, isEnabled, telLink, mailLink, formatAddress } from '../config.js';

export default function Footer() {
    const { business, socials, services, blog, footer, navigation } = config;
    const showBlog = isEnabled('showBlog');

    return (
        <footer className="relative bg-secondary text-white overflow-hidden pb-20 lg:pb-0">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-black/40 pointer-events-none" />

            <div className={`relative max-w-7xl mx-auto px-4 pt-12 sm:pt-16 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12 ${showBlog ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
                {/* Brand Column */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <a href="#home" className="flex flex-col leading-tight mb-4">
                        <span className="text-2xl font-bold text-primary">{business.name}</span>
                        <span className="text-xs text-gray-400 tracking-wider uppercase">{business.tagline}</span>
                    </a>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {footer.aboutText}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(socials).map(([platform, url]) => {
                            if (!url) return null;
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={platform}
                                    className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-primary hover:text-white transition-colors capitalize"
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
                                <a href="#services" className="flex items-center min-h-11 sm:min-h-0 text-gray-400 text-sm hover:text-primary transition-colors gap-2">
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
                                <a href={link.href} className="flex items-center min-h-11 sm:min-h-0 text-gray-400 text-sm hover:text-primary transition-colors gap-2">
                                    <span className="text-primary text-xs">→</span> {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent Posts Column — only when blog is enabled */}
                {showBlog && (
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Recent Posts</h3>
                        <div className="space-y-4">
                            {blog.slice(0, 3).map((post) => (
                                <a key={post.id} href="#blog" className="flex gap-3 group">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        loading="lazy"
                                        decoding="async"
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
                )}

                {/* Contact / NAP Column — kept consistent with the rest of the site for local SEO (Name/Address/Phone) */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Visit Us</h3>
                    <address className="not-italic text-sm text-gray-400">
                        <p className="font-semibold text-white mb-3">{business.name}</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5">📍</span>
                                <span>{formatAddress()}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-0.5">📞</span>
                                <a href={telLink()} className="hover:text-primary transition-colors">{config.contact.phoneDisplay}</a>
                            </li>
                            {mailLink() && (
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5">✉️</span>
                                    <a href={mailLink()} className="hover:text-primary transition-colors">{config.contact.email}</a>
                                </li>
                            )}
                        </ul>
                    </address>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="relative border-t border-white/10 pt-6 pb-2 text-center px-4">
                <p className="text-gray-500 text-xs">
                    © {new Date().getFullYear()} {business.name}. {footer.copyrightText}
                </p>
            </div>
        </footer>
    );
}
