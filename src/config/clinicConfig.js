// src/config/clinicConfig.js
// -----------------------------------------------------------------------------
// WHITE-LABEL CLINIC CONFIGURATION
// -----------------------------------------------------------------------------
// This single file controls all content, branding, and media for the website.
// To onboard a new client, simply update the values in this object and place
// their media files in the `src/assets/client/` directory.
// -----------------------------------------------------------------------------

export const clinicConfig = {
    // 1. BUSINESS INFO
    business: {
        name: 'Toothcare',
        tagline: 'Dental Clinic Services',
        phone: '+1 (555) 392-3929',
        email: 'info@toothcaredental.com',
        address: '203 Bright Smile Ave, San Francisco, CA 94102',
        hours: {
            days: 'Monday – Friday',
            time: '8:00 AM – 8:00 PM',
        },
        // Paths relative to src/assets/client/ or public/
        logo: '/tooth.svg',
        favicon: '/tooth.svg',
    },

    // 2. THEME & BRANDING
    theme: {
        primaryColor: '#01d28e',      // Main brand color (buttons, highlights)
        primaryDarkColor: '#00b377',  // Hover states
        primaryLightColor: '#e6faf3', // Light backgrounds
        secondaryColor: '#1a1a2e',    // Footer, dark sections
        accentColor: '#ffb534',       // Optional accent (badges, stars)
        fontFamily: '"Roboto", sans-serif',
        fontUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap',
    },

    // 3. SOCIAL LINKS
    social: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        whatsapp: '',
        youtube: '',
    },

    // 4. HERO SECTION
    hero: {
        slides: [
            {
                id: 1,
                type: 'image', // 'image' or 'video'
                media: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&h=700&fit=crop',
                heading: 'Trusted Dental Care for Your Entire Family',
                subheading: 'Experience world-class dentistry with a personal touch. Our expert team uses the latest technology to deliver beautiful, healthy smiles.',
                cta1Text: 'See Our Services',
                cta1Link: '#services',
                cta2Text: 'Book Appointment',
                cta2Link: '#contact',
            },
            {
                id: 2,
                type: 'image',
                media: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&h=700&fit=crop',
                heading: 'A Brighter Smile Starts Here',
                subheading: 'From routine cleanings to advanced cosmetic procedures, we provide comprehensive dental solutions tailored to your unique needs.',
                cta1Text: 'Make An Appointment',
                cta1Link: '#contact',
                cta2Text: 'Learn More',
                cta2Link: '#about',
            },
        ],
    },

    // 5. SERVICE HIGHLIGHTS (Beside Appointment Form)
    serviceHighlights: [
        { id: 1, icon: '📅', title: 'Easy Booking', description: 'Schedule your appointment online in seconds — choose your preferred time, date, and dentist.' },
        { id: 2, icon: '👨‍⚕️', title: 'Expert Team', description: 'Our board-certified dentists bring decades of combined experience and specialize in cosmetic and preventive care.' },
        { id: 3, icon: '💰', title: 'Best Price Guarantee', description: 'We offer competitive, transparent pricing with flexible payment plans so quality dental care fits every budget.' },
    ],

    // 6. MAIN SERVICES GRID
    services: [
        { id: 1, icon: '🛡️', title: 'Tooth Protection', description: 'Comprehensive preventive care including sealants, fluoride treatments, and custom mouthguards.' },
        { id: 2, icon: '👑', title: 'Dental Implants', description: 'State-of-the-art titanium implants that look, feel, and function just like your natural teeth.' },
        { id: 3, icon: '🦷', title: 'Dental Care', description: 'Routine checkups, cleanings, and personalized oral hygiene plans to maintain optimal dental health.' },
        { id: 4, icon: '✨', title: 'Teeth Whitening', description: 'Professional-grade whitening treatments that safely brighten your smile by several shades.' },
        { id: 5, icon: '🔬', title: 'Dental Calculus', description: 'Advanced scaling and root planing to remove stubborn tartar buildup and prevent gum disease.' },
        { id: 6, icon: '🩹', title: 'Tooth Removal', description: 'Gentle, pain-free extractions using modern techniques and sedation options for challenging cases.' },
        { id: 7, icon: '🧹', title: 'Tartar Removal', description: 'Deep cleaning procedures that eliminate plaque and tartar from hard-to-reach areas.' },
        { id: 8, icon: '🔍', title: 'Tooth Inspection', description: 'Comprehensive digital X-rays and oral examinations to detect issues early and plan precise treatments.' },
    ],

    // 7. ABOUT SECTION
    about: {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=700&h=500&fit=crop',
        heading: 'Innovative Approach to Modern Dental Treatment',
        description: 'At Toothcare, we combine cutting-edge dental technology with compassionate care. Our state-of-the-art facility is designed for your comfort, and our team of specialists delivers personalized treatment plans that prioritize both your oral health and overall well-being.',
        stats: [
            { icon: '❤️', target: 3000, caption: 'Happy Patients' },
            { icon: '🦷', target: 2200, caption: 'Treatments Done' },
            { icon: '📅', target: 24, caption: 'Years Experience' },
        ]
    },

    // 8. DOCTORS
    doctors: [
        {
            id: 1,
            name: 'Dr. Sarah Mitchell',
            position: 'Head Dentist',
            bio: 'Passionate about transforming smiles with 15+ years of experience in cosmetic and restorative dentistry.',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face',
            socials: { twitter: '#', facebook: '#', instagram: '#' },
        },
        {
            id: 2,
            name: 'Dr. James Parker',
            position: 'Orthodontist',
            bio: 'Specializing in Invisalign and modern braces for patients of all ages with a gentle approach.',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face',
            socials: { twitter: '#', facebook: '#', instagram: '#' },
        },
        {
            id: 3,
            name: 'Dr. Emily Chen',
            position: 'Periodontist',
            bio: 'Expert in gum health and implant placement with a commitment to patient comfort and education.',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=400&h=500&fit=crop&crop=face',
            socials: { twitter: '#', facebook: '#', instagram: '#' },
        },
        {
            id: 4,
            name: 'Dr. Michael Torres',
            position: 'Endodontist',
            bio: 'Known for painless root canal treatments using advanced microscopic technology and care.',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face',
            socials: { twitter: '#', facebook: '#', instagram: '#' },
        },
    ],

    // 9. CTA BANNER
    ctaBanner: {
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&h=500&fit=crop',
        heading: "Don't Wait — Schedule Your Visit Today!",
        buttonText: 'Make An Appointment',
        buttonLink: '#contact',
    },

    // 10. TESTIMONIALS
    testimonials: [
        {
            id: 1,
            quote: 'I was terrified of going to the dentist, but the team at Toothcare made me feel completely at ease. My smile has never looked better!',
            name: 'Amanda Richardson',
            role: 'Business Owner',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
        },
        {
            id: 2,
            quote: 'After years of hiding my teeth, Dr. Mitchell gave me the confidence to smile again. The implant procedure was smoother than I expected.',
            name: 'David Okafor',
            role: 'Software Engineer',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        },
        {
            id: 3,
            quote: 'The whitening results are unreal — I get compliments everywhere I go. The staff is friendly, professional, and genuinely caring.',
            name: 'Sophia Martinez',
            role: 'Marketing Director',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
        },
        {
            id: 4,
            quote: 'Best dental experience I have ever had. From the modern office to the painless procedures, everything was top-notch.',
            name: 'Ryan Patel',
            role: 'Teacher',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        },
        {
            id: 5,
            quote: 'Scheduling was effortless and the team even followed up after my procedure. I truly felt cared for beyond just my teeth.',
            name: 'Jennifer Liu',
            role: 'Architect',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
        },
    ],

    // 11. RESULTS GALLERY
    results: [
        { id: 1, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=400&fit=crop', name: 'Sarah Johnson', info: 'USA, 28 years' },
        { id: 2, image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=400&fit=crop', name: 'Emma Taylor', info: 'Canada, 34 years' },
        { id: 3, image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&h=400&fit=crop', name: 'Michael Chen', info: 'UK, 41 years' },
        { id: 4, image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&h=400&fit=crop', name: 'Lisa Martinez', info: 'Australia, 26 years' },
    ],

    // 12. BLOG PREVIEWS
    blog: [
        {
            id: 1,
            title: 'How to Keep Your Teeth Healthy Between Visits',
            excerpt: 'Simple daily habits and proven techniques that protect your enamel, prevent cavities, and keep your breath fresh.',
            date: 'Jul 15, 2026',
            author: 'Dr. Sarah Mitchell',
            comments: 5,
            image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop',
        },
        {
            id: 2,
            title: 'The Truth About Teeth Whitening: What Really Works',
            excerpt: 'We separate fact from fiction on whitening strips, LED kits, and professional treatments so you can choose wisely.',
            date: 'Jun 28, 2026',
            author: 'Dr. Emily Chen',
            comments: 3,
            image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
        },
        {
            id: 3,
            title: 'Dental Implants vs Bridges: Which Is Right for You?',
            excerpt: 'A comprehensive comparison of longevity, cost, comfort, and aesthetics to help you make an informed decision.',
            date: 'Jun 10, 2026',
            author: 'Dr. James Parker',
            comments: 8,
            image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
        },
    ],

    // 13. PRICING PLANS
    pricing: [
        {
            id: 1,
            name: 'Basic Plan',
            price: 50,
            features: ['Diagnostic Services', 'Professional Consultation', 'Basic Cleaning', 'Oral Exam & X-rays', 'Fluoride Treatment', 'Hygiene Kit'],
            highlighted: false,
        },
        {
            id: 2,
            name: 'Standard Plan',
            price: 79,
            features: ['Diagnostic Services', 'Professional Consultation', 'Deep Cleaning', 'Oral Exam & X-rays', 'Teeth Whitening', 'Dental Sealants'],
            highlighted: false,
        },
        {
            id: 3,
            name: 'Premium Plan',
            price: 89,
            features: ['All Standard Features', 'Tooth Implants', 'Surgical Extractions', 'Cosmetic Bonding', 'Root Canal Therapy', 'Priority Booking'],
            highlighted: true,
        },
        {
            id: 4,
            name: 'Ultimate Plan',
            price: 99,
            features: ['All Premium Features', 'Full Mouth Restoration', 'Invisalign Consultation', 'Emergency Coverage', 'Family Discount', 'Annual Checkups'],
            highlighted: false,
        },
    ],

    // 14. FOOTER & NAVIGATION
    navigation: [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Doctors', href: '#doctors' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' },
    ],
    footer: {
        aboutText: 'Providing exceptional dental care with a gentle touch. Your smile is our passion and your comfort is our priority.',
        copyrightText: 'All rights reserved. Crafted with ❤️ for healthy smiles.',
    }
};
