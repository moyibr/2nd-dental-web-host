// DoctorCard — Photo card with name, specialization, and social links visible on hover
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function DoctorCard({ name, qualification, specialization, bio, photo, socials = {} }) {
    const ref = useScrollAnimation();
    const socialEntries = Object.entries(socials).filter(([, url]) => url);

    return (
        <div ref={ref} className="scroll-hidden group">
            <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                    src={photo}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-72 sm:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Social Overlay */}
                {socialEntries.length > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <div className="flex gap-2">
                            {socialEntries.map(([platform, url]) => (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={platform}
                                    className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm hover:bg-primary transition-colors"
                                >
                                    {platform === 'twitter' ? '𝕏' : platform === 'facebook' ? 'f' : '📷'}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="text-center">
                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">{name}</h3>
                <span className="text-primary text-sm font-medium block">{specialization}</span>
                {qualification && <span className="text-gray-text text-xs">{qualification}</span>}
                <p className="text-gray-text text-sm mt-2 leading-relaxed">{bio}</p>
            </div>
        </div>
    );
}
