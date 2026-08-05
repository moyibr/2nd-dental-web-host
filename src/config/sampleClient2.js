// src/config/sampleClient2.js
// -----------------------------------------------------------------------------
// SAMPLE 2: HAIR TRANSPLANT CLINIC
// -----------------------------------------------------------------------------

export const clinicConfig = {
    // 1. BUSINESS INFO
    business: {
        name: 'Follicle Restore',
        tagline: 'Advanced Hair Transplant Center',
        phone: '+1 (800) 555-HAIR',
        email: 'hello@folliclerestore.com',
        address: '450 Follicle Blvd, Los Angeles, CA 90028',
        hours: {
            days: 'Monday – Saturday',
            time: '9:00 AM – 6:00 PM',
        },
        logo: '/tooth.svg', // Reusing the placeholder for now
        favicon: '/tooth.svg',
    },

    // 2. THEME & BRANDING
    theme: {
        primaryColor: '#6366f1',      // Indigo-500
        primaryDarkColor: '#4f46e5',  // Indigo-600
        primaryLightColor: '#e0e7ff', // Indigo-100
        secondaryColor: '#0f172a',    // Slate-900
        accentColor: '#f59e0b',       // Amber-500
        fontFamily: '"Outfit", sans-serif',
        fontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&display=swap',
    },

    // 3. SOCIAL LINKS
    social: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        whatsapp: '',
        youtube: 'https://youtube.com',
    },

    // 4. HERO SECTION
    hero: {
        slides: [
            {
                id: 1,
                type: 'image',
                media: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=1400&h=700&fit=crop',
                heading: 'Regain Your Confidence with Natural Hair',
                subheading: 'State-of-the-art FUE and FUT hair transplant procedures performed by world-renowned surgeons.',
                cta1Text: 'View Our Results',
                cta1Link: '#results',
                cta2Text: 'Free Consultation',
                cta2Link: '#contact',
            },
            {
                id: 2,
                type: 'image',
                media: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&h=700&fit=crop',
                heading: 'Permanent Solutions for Hair Loss',
                subheading: 'Advanced techniques ensuring maximum density, natural hairlines, and minimal downtime.',
                cta1Text: 'Book Consultation',
                cta1Link: '#contact',
                cta2Text: 'Learn More',
                cta2Link: '#about',
            },
        ],
    },

    // 5. SERVICE HIGHLIGHTS
    serviceHighlights: [
        { id: 1, icon: '📅', title: 'Free Consultation', description: 'Get a personalized hair restoration plan with zero obligation.' },
        { id: 2, icon: '👨‍⚕️', title: 'Expert Surgeons', description: 'Our doctors have successfully performed over 5,000 transplant procedures.' },
        { id: 3, icon: '💎', title: 'Lifetime Guarantee', description: 'We stand by our results with a lifetime guarantee on transplanted hair.' },
    ],

    // 6. MAIN SERVICES GRID
    services: [
        { id: 1, icon: '🔬', title: 'FUE Transplant', description: 'Follicular Unit Extraction for seamless, scar-free hair restoration.' },
        { id: 2, icon: '✂️', title: 'FUT Transplant', description: 'Follicular Unit Transplantation for maximum graft yield in a single session.' },
        { id: 3, icon: '🧔', title: 'Beard Transplant', description: 'Achieve a full, dense beard with precision facial hair restoration.' },
        { id: 4, icon: '👁️', title: 'Eyebrow Transplant', description: 'Restore or enhance your eyebrows with natural-looking results.' },
        { id: 5, icon: '💉', title: 'PRP Therapy', description: 'Platelet-Rich Plasma treatments to stimulate natural hair growth.' },
        { id: 6, icon: '💊', title: 'Medical Therapy', description: 'FDA-approved medications and topical treatments for hair loss prevention.' },
        { id: 7, icon: '⚡', title: 'Laser Therapy', description: 'Low-level laser therapy to improve hair density and scalp health.' },
        { id: 8, icon: '🔄', title: 'Scar Revision', description: 'Advanced techniques to conceal scars from previous procedures.' },
    ],

    // 7. ABOUT SECTION
    about: {
        image: 'https://images.unsplash.com/photo-1551076805-e1869043e560?w=700&h=500&fit=crop',
        heading: 'Pioneers in Hair Restoration',
        description: 'At Follicle Restore, we understand the emotional impact of hair loss. Our clinic combines artistic design with surgical precision to deliver undetectable, natural-looking results that last a lifetime.',
        stats: [
            { icon: '👨', target: 5000, caption: 'Happy Clients' },
            { icon: '🔬', target: 15000000, caption: 'Grafts Planted' },
            { icon: '🏆', target: 15, caption: 'Awards Won' },
        ]
    },

    // 8. DOCTORS
    doctors: [
        {
            id: 1,
            name: 'Dr. Arthur Pendelton',
            position: 'Lead Surgeon',
            bio: 'Board-certified hair restoration surgeon with 20 years of exclusive experience in FUE techniques.',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face',
            socials: { twitter: '#', instagram: '#' },
        },
        {
            id: 2,
            name: 'Dr. Elena Rostova',
            position: 'Restoration Specialist',
            bio: 'Specializes in female hair loss and complex reconstructive cases with an artistic approach.',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=400&h=500&fit=crop&crop=face',
            socials: { twitter: '#', instagram: '#' },
        },
        {
            id: 3,
            name: 'Dr. Marcus Webb',
            position: 'PRP & Medical Director',
            bio: 'Leading researcher in regenerative medicine and non-surgical hair loss treatments.',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face',
            socials: { twitter: '#', instagram: '#' },
        },
        {
            id: 4,
            name: 'Dr. Sophia Lin',
            position: 'Facial Hair Specialist',
            bio: 'Expert in beard and eyebrow transplantation, known for meticulous attention to detail.',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face',
            socials: { twitter: '#', instagram: '#' },
        },
    ],

    // 9. CTA BANNER
    ctaBanner: {
        image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=1400&h=500&fit=crop',
        heading: "Ready to Transform Your Look?",
        buttonText: 'Get Your Free Quote',
        buttonLink: '#contact',
    },

    // 10. TESTIMONIALS
    testimonials: [
        {
            id: 1,
            quote: 'The results exceeded my expectations. Six months later, my hairline looks exactly like it did in my twenties.',
            name: 'James Wilson',
            role: 'Entrepreneur',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        },
        {
            id: 2,
            quote: 'I was hesitant at first, but the team made me feel so comfortable. The procedure was virtually painless.',
            name: 'Michael Chang',
            role: 'Architect',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        },
        {
            id: 3,
            quote: 'Dr. Rostova is an artist. She restored my thinning hair and gave me back my confidence.',
            name: 'Sarah Jenkins',
            role: 'Marketing Director',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
        },
        {
            id: 4,
            quote: 'Best decision I ever made. The recovery was quick, and the density they achieved is incredible.',
            name: 'Robert Davis',
            role: 'Consultant',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
        },
        {
            id: 5,
            quote: 'Professional from start to finish. The aftercare support has been phenomenal.',
            name: 'David Thompson',
            role: 'Software Engineer',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
        },
    ],

    // 11. RESULTS GALLERY
    results: [
        { id: 1, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=400&fit=crop', name: 'John D.', info: '3,500 Grafts FUE' },
        { id: 2, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=400&fit=crop', name: 'Mark S.', info: '2,800 Grafts FUE' },
        { id: 3, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=400&fit=crop', name: 'Alex R.', info: 'Beard Transplant' },
        { id: 4, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=400&fit=crop', name: 'Chris M.', info: 'Crown Restoration' },
    ],

    // 12. BLOG PREVIEWS
    blog: [
        {
            id: 1,
            title: 'FUE vs FUT: Which Hair Transplant Method is Right for You?',
            excerpt: 'Understanding the differences, pros, and cons of the two most popular hair restoration techniques.',
            date: 'Aug 12, 2026',
            author: 'Dr. Arthur Pendelton',
            comments: 12,
            image: 'https://images.unsplash.com/photo-1551076805-e1869043e560?w=600&h=400&fit=crop',
        },
        {
            id: 2,
            title: 'What to Expect During Your Hair Transplant Recovery',
            excerpt: 'A day-by-day guide to the healing process and how to ensure the best possible results.',
            date: 'Jul 24, 2026',
            author: 'Dr. Elena Rostova',
            comments: 8,
            image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&h=400&fit=crop',
        },
        {
            id: 3,
            title: 'Does PRP Therapy Really Work for Hair Loss?',
            excerpt: 'Exploring the science behind Platelet-Rich Plasma and its effectiveness in stimulating hair growth.',
            date: 'Jul 05, 2026',
            author: 'Dr. Marcus Webb',
            comments: 15,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop',
        },
    ],

    // 13. PRICING PLANS
    pricing: [
        {
            id: 1,
            name: 'PRP Therapy',
            price: '800',
            features: ['3 PRP Sessions', 'Scalp Analysis', 'Post-treatment Care Kit', 'Follow-up Consultation'],
            highlighted: false,
        },
        {
            id: 2,
            name: 'FUE Level 1',
            price: '4,500',
            features: ['Up to 1,500 Grafts', 'Local Anesthesia', 'Post-Op Medications', '1 Year Follow-ups', 'PRP Session Included'],
            highlighted: false,
        },
        {
            id: 3,
            name: 'FUE Level 2',
            price: '7,500',
            features: ['Up to 3,000 Grafts', 'Local Anesthesia', 'Post-Op Medications', '1 Year Follow-ups', '2 PRP Sessions Included', 'Hotel Stay (1 Night)'],
            highlighted: true,
        },
        {
            id: 4,
            name: 'VIP Package',
            price: '12,000',
            features: ['Unlimited Grafts (Max Density)', 'Lead Surgeon Guarantee', 'VIP Aftercare', '3 PRP Sessions', 'Hotel Stay (3 Nights)', 'Airport Transfers'],
            highlighted: false,
        },
    ],

    // 14. FOOTER & NAVIGATION
    navigation: [
        { label: 'Home', href: '#home' },
        { label: 'Procedures', href: '#services' },
        { label: 'Our Clinic', href: '#about' },
        { label: 'Surgeons', href: '#doctors' },
        { label: 'Results', href: '#results' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Blog', href: '#blog' },
        { label: 'Consultation', href: '#contact' },
    ],
    footer: {
        aboutText: 'Follicle Restore is a premier hair transplant center dedicated to providing natural, permanent solutions for hair loss using the most advanced techniques available.',
        copyrightText: 'All rights reserved. Restoring confidence, one follicle at a time.',
    }
};
