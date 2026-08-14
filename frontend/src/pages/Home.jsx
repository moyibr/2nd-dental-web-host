// Home — Assembles all page sections using data from clinic.config.json.
// Every optional section is gated behind its featureFlags.* toggle.
import HeroSlider from '../components/HeroSlider';
import AppointmentForm from '../components/AppointmentForm';
import ServiceHighlight from '../components/ServiceHighlight';
import ServiceCard from '../components/ServiceCard';
import StatsCounter from '../components/StatsCounter';
import DoctorCard from '../components/DoctorCard';
import CTABanner from '../components/CTABanner';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import GalleryCard from '../components/GalleryCard';
import BlogCard from '../components/BlogCard';
import PricingCard from '../components/PricingCard';
import FAQAccordion from '../components/FAQAccordion';
import LocationMap from '../components/LocationMap';

import { config, isEnabled } from '../config.js';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Home() {
    const aboutRef = useScrollAnimation();
    const servicesHeaderRef = useScrollAnimation();
    const teamHeaderRef = useScrollAnimation();
    const testimonialsHeaderRef = useScrollAnimation();
    const galleryHeaderRef = useScrollAnimation();
    const blogHeaderRef = useScrollAnimation();
    const pricingHeaderRef = useScrollAnimation();
    const faqHeaderRef = useScrollAnimation();

    const {
        highlights,
        services,
        about,
        team,
        gallery,
        blog,
        pricing,
    } = config;

    const showPricing = isEnabled('showPricing');
    const showBlog = isEnabled('showBlog');
    const showGallery = isEnabled('showGallery');
    const showFAQ = isEnabled('showFAQ');
    const showTestimonials = isEnabled('showTestimonials');

    return (
        <main>
            {/* ── 1. Hero Slider ── */}
            <HeroSlider />

            {/* ── 2. Appointment Form + Highlights ── */}
            <section id="contact" className="py-14 sm:py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
                        <AppointmentForm />
                        <div className="flex flex-col">
                            <span className="text-primary text-sm font-medium uppercase tracking-wider">Why Choose Us</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-1 mb-6 sm:mb-8">We Offer Best Dental Services</h2>
                            <div className="flex flex-col gap-2">
                                {highlights.map((h) => (
                                    <ServiceHighlight key={h.id} {...h} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. Services Grid ── */}
            <section id="services" className="py-14 sm:py-16 md:py-24 bg-gray-light">
                <div className="max-w-7xl mx-auto px-4">
                    <div ref={servicesHeaderRef} className="scroll-hidden text-center mb-10 sm:mb-14">
                        <span className="text-primary text-sm font-medium uppercase tracking-wider">Services</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">Our Dental Services</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {services.map((s) => (
                            <ServiceCard key={s.id} {...s} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. About / Stats ── */}
            <section id="about" className="py-14 sm:py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                        <div className="rounded-2xl overflow-hidden">
                            <img
                                src={about.image}
                                alt="Clinic interior"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-72 sm:h-96 lg:h-[500px] object-cover"
                            />
                        </div>
                        <div ref={aboutRef} className="scroll-hidden">
                            <span className="text-primary text-sm font-medium uppercase tracking-wider">Welcome to Our Clinic</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2 mb-4">
                                {about.heading}
                            </h2>
                            <p className="text-gray-text leading-relaxed mb-8">
                                {about.description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {about.stats.map((stat, i) => (
                                    <StatsCounter key={i} icon={stat.icon} target={stat.target} caption={stat.caption} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. Team ── */}
            <section id="doctors" className="py-14 sm:py-16 md:py-24 bg-gray-light">
                <div className="max-w-7xl mx-auto px-4">
                    <div ref={teamHeaderRef} className="scroll-hidden text-center mb-10 sm:mb-14">
                        <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Team</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">Experienced Dental Specialists</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {team.map((member) => (
                            <DoctorCard key={member.id} {...member} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. CTA Banner ── */}
            <CTABanner />

            {/* ── 7. Testimonials ── */}
            {showTestimonials && (
                <section id="testimonials" className="py-14 sm:py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div ref={testimonialsHeaderRef} className="scroll-hidden text-center mb-8 sm:mb-10">
                            <span className="text-primary text-sm font-medium uppercase tracking-wider">Reviews</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">Happy Patients</h2>
                        </div>
                        <TestimonialsCarousel />
                    </div>
                </section>
            )}

            {/* ── 8. Facility Gallery ── */}
            {showGallery && (
                <section className="py-14 sm:py-16 md:py-24 bg-gray-light">
                    <div className="max-w-7xl mx-auto px-4">
                        <div ref={galleryHeaderRef} className="scroll-hidden text-center mb-10 sm:mb-14">
                            <span className="text-primary text-sm font-medium uppercase tracking-wider">Take A Look Inside</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">A Clean, Modern Facility</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {gallery.map((item) => (
                                <GalleryCard key={item.id} {...item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 9. Blog Preview ── */}
            {showBlog && (
                <section id="blog" className="py-14 sm:py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div ref={blogHeaderRef} className="scroll-hidden text-center mb-10 sm:mb-14">
                            <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Blog</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">Recent From Blog</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {blog.map((post) => (
                                <BlogCard key={post.id} {...post} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 10. Pricing ── */}
            {showPricing && (
                <section id="pricing" className="py-14 sm:py-16 md:py-24 bg-gray-light">
                    <div className="max-w-7xl mx-auto px-4">
                        <div ref={pricingHeaderRef} className="scroll-hidden text-center mb-10 sm:mb-14">
                            <span className="text-primary text-sm font-medium uppercase tracking-wider">Our Pricing</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">Pricing & Packages</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {pricing.plans.map((plan) => (
                                <PricingCard key={plan.id} {...plan} />
                            ))}
                        </div>
                        {pricing.note && (
                            <p className="text-center text-gray-text text-xs mt-8">{pricing.note}</p>
                        )}
                    </div>
                </section>
            )}

            {/* ── 11. FAQ ── */}
            {showFAQ && (
                <section id="faq" className="py-14 sm:py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div ref={faqHeaderRef} className="scroll-hidden text-center mb-10 sm:mb-14">
                            <span className="text-primary text-sm font-medium uppercase tracking-wider">Questions</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-dark mt-2">Frequently Asked Questions</h2>
                        </div>
                        <FAQAccordion />
                    </div>
                </section>
            )}

            {/* ── 12. Visit Us / Map ── */}
            <LocationMap />
        </main>
    );
}
