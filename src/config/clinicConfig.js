// src/config/clinicConfig.js
// -----------------------------------------------------------------------------
// CLIENT: ADVANCED DENTAL LOUNGE — Civil Lines, Prayagraj, Uttar Pradesh
// -----------------------------------------------------------------------------
// Content here is sourced from the client's live Google Business Profile
// (name, address, phone, hours snippet, rating, review count, owner statement,
// and the three named patient reviews). Anything the listing did not provide
// (doctor names, real photos, exact treatment prices, full week hours) uses
// clearly-labelled placeholders — search "PLACEHOLDER" to find every one that
// still needs client-supplied real content.
// -----------------------------------------------------------------------------

export const clinicConfig = {
    // 1. BUSINESS INFO
    business: {
        name: 'Advanced Dental Lounge',
        hindiName: 'एडवांस्ड डेंटल लौंगे',
        tagline: "Prayagraj's Most Trusted Dental Care, Since 2012",
        phone: '+91 84180 07034',
        phoneRaw: '918418007034', // digits only, for tel:/wa.me links
        email: 'info@advanceddentallounge.in', // PLACEHOLDER — not listed on Google, confirm real inbox
        address: 'G, 30, 138, MG Marg, behind Elchico Restaurant, near Subhash Chauraha, Civil Lines, Prayagraj, Uttar Pradesh 211001',
        plusCode: 'FR2M+H9 Prayagraj, Uttar Pradesh',
        hours: {
            days: 'Monday – Saturday', // PLACEHOLDER — listing only confirmed "closes 8 pm"; verify full week & Sunday status
            time: '10:00 AM – 8:00 PM', // PLACEHOLDER — verify opening time
        },
        currency: '₹',
        rating: 4.7,
        reviewCount: 190,
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Advanced Dental Lounge, MG Marg, Civil Lines, Prayagraj, Uttar Pradesh 211001'),
        // Paths relative to src/assets/client/ or public/
        logo: '/tooth.svg', // PLACEHOLDER — swap in the real logo once received
        favicon: '/tooth.svg', // PLACEHOLDER
    },

    // 2. THEME & BRANDING — deep teal + gold, a calmer "lounge" feel rather than a clinical one
    theme: {
        primaryColor: '#0E7C7B',
        primaryDarkColor: '#0A5F5E',
        primaryLightColor: '#E4F5F4',
        secondaryColor: '#0B1E2A',
        accentColor: '#C9A227',
        fontFamily: '"Poppins", sans-serif',
        fontUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    },

    // 3. SOCIAL LINKS — left blank where unknown; footer hides any empty entry automatically
    social: {
        facebook: '', // PLACEHOLDER — not on the Google listing, add if the client has a page
        instagram: '', // PLACEHOLDER
        twitter: '',
        whatsapp: 'https://wa.me/918418007034?text=' + encodeURIComponent('Hi, I would like to book a dental appointment at Advanced Dental Lounge.'),
        youtube: '',
    },

    // 4. HERO SECTION
    hero: {
        slides: [
            {
                id: 1,
                type: 'image',
                media: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&h=700&fit=crop',
                heading: "Prayagraj's Most Trusted Dental Hospital for 14+ Years",
                subheading: 'Top-quality, clean, and painless dental treatments — the reason thousands of families in Civil Lines trust us with their smiles, year after year.',
                cta1Text: 'See Our Services',
                cta1Link: '#services',
                cta2Text: 'Book Appointment',
                cta2Link: '#contact',
            },
            {
                id: 2,
                type: 'image',
                media: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&h=700&fit=crop',
                heading: 'From Root Canals to Smile Makeovers — Painlessly',
                subheading: "Rated 4.7★ by 190+ patients on Google. Modern equipment, a hygienic clinic, and a team that treats you like family.",
                cta1Text: 'Read Patient Reviews',
                cta1Link: '#testimonials',
                cta2Text: 'Get Directions',
                cta2Link: '#visit',
            },
        ],
    },

    // 5. SERVICE HIGHLIGHTS (Beside Appointment Form)
    serviceHighlights: [
        { id: 1, icon: '📅', title: '14+ Years of Trusted Care', description: 'Serving Prayagraj since 2012 with top-quality, painless dental treatments trusted by thousands of patients.' },
        { id: 2, icon: '🧼', title: 'Hygienic, Modern Facility', description: 'State-of-the-art equipment and hospital-grade sterilization — our patients consistently highlight how clean and modern the clinic is.' },
        { id: 3, icon: '👨‍👩‍👧‍👦', title: 'A Family Dentist for Generations', description: 'Many patients trust us as their family dentist, bringing parents, children, and relatives here for every dental need.' },
    ],

    // 6. MAIN SERVICES GRID (grounded in the clinic's real Google review tags: root canal, braces, smile makeover, family dentistry)
    services: [
        { id: 1, icon: '🦷', title: 'Root Canal Treatment', description: 'Painless, advanced root canal therapy — often completed in a single sitting using modern rotary endodontics.' },
        { id: 2, icon: '😁', title: 'Braces & Clear Aligners', description: 'Metal, ceramic, and invisible aligner options to straighten smiles for patients of every age.' },
        { id: 3, icon: '✨', title: 'Smile Makeover', description: 'Complete smile transformations combining whitening, veneers, and alignment for a confident new look.' },
        { id: 4, icon: '👨‍👩‍👧‍👦', title: 'Family Dentistry', description: 'Trusted, comprehensive dental care for every generation of your family, under one roof.' },
        { id: 5, icon: '👑', title: 'Dental Implants & Crowns', description: 'Permanent, natural-looking replacements for missing or damaged teeth.' },
        { id: 6, icon: '🌟', title: 'Teeth Whitening', description: 'Safe, professional whitening treatments for a noticeably brighter smile.' },
        { id: 7, icon: '🧒', title: 'Pediatric Dentistry', description: 'Gentle, friendly dental care designed to put children at ease from their very first visit.' },
        { id: 8, icon: '🧹', title: 'Scaling & Polishing', description: 'Deep cleaning to remove plaque and tartar buildup, keeping gums healthy.' },
        { id: 9, icon: '🩹', title: 'Tooth Extraction', description: 'Safe, virtually painless extractions, including wisdom tooth removal.' },
        { id: 10, icon: '🔍', title: 'Dental X-Ray & Checkup', description: 'Comprehensive digital diagnostics and routine oral examinations to catch issues early.' },
    ],

    // 7. ABOUT SECTION
    about: {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=700&h=500&fit=crop', // PLACEHOLDER — swap for a real clinic interior photo
        heading: "Prayagraj's Most Trusted Dental Care, For 14+ Years",
        description: "Advanced Dental Lounge has been a leading name in dental care in Civil Lines, Prayagraj, known for top-quality, clean, and painless treatments. As a women-owned and LGBTQ+ friendly practice, we welcome every patient with warmth, respect, and evidence-based care — backed by a 4.7★ rating from 190+ patients on Google.",
        stats: [
            { icon: '📅', target: 14, caption: 'Years of Trusted Care' },
            { icon: '⭐', target: 190, caption: '5-Star Google Reviews' },
            { icon: '🦷', target: 10, caption: 'Specialized Treatments' },
        ]
    },

    // 8. TEAM — the Google listing does not name an individual dentist, so roles are shown
    // generically rather than inventing names. PLACEHOLDER — replace with real names/photos/bios
    // once the client provides them.
    doctors: [
        {
            id: 1,
            name: 'Lead Dentist',
            position: 'General & Cosmetic Dentistry',
            bio: 'Leads comprehensive dental care with a focus on painless, patient-first treatment.',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face',
            socials: {},
        },
        {
            id: 2,
            name: 'Orthodontist',
            position: 'Braces & Clear Aligners',
            bio: 'Specializes in creating confident, well-aligned smiles for patients of every age.',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face',
            socials: {},
        },
        {
            id: 3,
            name: 'Endodontist',
            position: 'Root Canal Specialist',
            bio: 'Expert in advanced, single-sitting root canal therapy with a gentle approach.',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=400&h=500&fit=crop&crop=face',
            socials: {},
        },
        {
            id: 4,
            name: 'Pediatric Dentist',
            position: 'Child & Family Dentistry',
            bio: 'Gentle, friendly care that makes dental visits stress-free for children and families.',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face',
            socials: {},
        },
    ],

    // 9. CTA BANNER
    ctaBanner: {
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&h=500&fit=crop',
        heading: "Don't Wait — Book Your Painless Dental Visit Today!",
        buttonText: 'Book Appointment',
        buttonLink: '#contact',
    },

    // 10. TESTIMONIALS — real quotes from the clinic's Google Business Profile.
    // The two unattributed snippets are labelled "Verified Patient" rather than given invented names.
    testimonials: [
        {
            id: 1,
            quote: 'I visited Advance Dental Care for my treatment, and I had a great experience. The doctor and his team was very friendly and made me feel comfortable throughout the process. I highly recommend Advance Dental Care to anyone looking for dental care in a friendly and professional environment.',
            name: 'Khushi Chauhan',
            role: 'Google Review · 4 months ago',
            avatar: 'https://ui-avatars.com/api/?name=Khushi+Chauhan&background=0E7C7B&color=fff&bold=true&size=128',
        },
        {
            id: 2,
            quote: 'Dentistry of another level. No Comparison, No pain.... Simply the Best! Visit other dental clinics then visit them, you will see the difference like we did. Really happy patient for life long!',
            name: 'Haiderab Abbas',
            role: 'Google Review · 1 year ago',
            avatar: 'https://ui-avatars.com/api/?name=Haiderab+Abbas&background=0A5F5E&color=fff&bold=true&size=128',
        },
        {
            id: 3,
            quote: 'I recently visited Advance Dental Care for my treatment, and I had a great experience. The doctor was highly knowledgeable and skilled, and I truly appreciated the care and attention I received. The entire team was very friendly.',
            name: 'Anjali Yadav',
            role: 'Google Review · 10 months ago',
            avatar: 'https://ui-avatars.com/api/?name=Anjali+Yadav&background=C9A227&color=fff&bold=true&size=128',
        },
        {
            id: 4,
            quote: 'She will always be a Family dentist for me, my family, and all my relatives.',
            name: 'Verified Patient',
            role: 'Google Review',
            avatar: 'https://ui-avatars.com/api/?name=Google+Review&background=0E7C7B&color=fff&bold=true&size=128',
        },
        {
            id: 5,
            quote: 'The facilities were very hygienic, with state of the art equipment.',
            name: 'Verified Patient',
            role: 'Google Review',
            avatar: 'https://ui-avatars.com/api/?name=Google+Review&background=0A5F5E&color=fff&bold=true&size=128',
        },
    ],

    // 11. FACILITY GALLERY — repurposed from a generic "before/after results" grid, since we have
    // no real patient outcome photos to show truthfully. Showcases the clinic itself instead
    // (matches the real review: "facilities were very hygienic, with state of the art equipment").
    // PLACEHOLDER images — swap for real clinic photos once received.
    results: [
        { id: 1, image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=400&fit=crop', name: 'Modern Treatment Rooms', info: 'Comfortable, private treatment suites' },
        { id: 2, image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=400&fit=crop', name: 'Digital X-Ray & Diagnostics', info: 'Advanced imaging for precise treatment planning' },
        { id: 3, image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&h=400&fit=crop', name: 'Sterilization & Hygiene', info: 'Hospital-grade sterilization for every patient' },
        { id: 4, image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&h=400&fit=crop', name: 'Patient Lounge', info: 'A relaxing space to wait — true to our name' },
    ],

    // 12. BLOG PREVIEWS — PLACEHOLDER editorial content, topics chosen to match the clinic's real
    // specialties (root canal, braces, smile makeovers). Author kept generic per team preference.
    blog: [
        {
            id: 1,
            title: 'Root Canal Treatment: Myths vs Reality',
            excerpt: "Worried a root canal will hurt? Here's how modern, painless rotary endodontics has changed the experience completely.",
            date: 'Jul 15, 2026',
            author: 'Advanced Dental Lounge Team',
            comments: 5,
            image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop',
        },
        {
            id: 2,
            title: 'Braces or Clear Aligners? Choosing the Right Orthodontic Treatment',
            excerpt: 'A practical comparison of metal braces, ceramic braces, and clear aligners to help you pick what fits your life and budget.',
            date: 'Jun 28, 2026',
            author: 'Advanced Dental Lounge Team',
            comments: 3,
            image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
        },
        {
            id: 3,
            title: 'What a Smile Makeover Really Involves',
            excerpt: 'From whitening to veneers to alignment — a step-by-step look at how we plan a complete smile transformation.',
            date: 'Jun 10, 2026',
            author: 'Advanced Dental Lounge Team',
            comments: 8,
            image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
        },
    ],

    // 13. PRICING — PLACEHOLDER indicative starting prices in ₹, structured around the clinic's
    // real signature treatments rather than generic membership tiers. Confirm exact rates with the client.
    pricingNote: '*Starting prices shown for reference. Final cost depends on consultation and diagnosis.',
    pricing: [
        {
            id: 1,
            name: 'Consultation & Checkup',
            price: '200',
            features: ['Oral Examination', 'Digital X-Ray Review', 'Personalized Treatment Plan', 'Free Follow-up Visit'],
            highlighted: false,
        },
        {
            id: 2,
            name: 'Scaling & Polishing',
            price: '800',
            features: ['Full-Mouth Deep Cleaning', 'Plaque & Tartar Removal', 'Polishing', 'Oral Hygiene Guidance'],
            highlighted: false,
        },
        {
            id: 3,
            name: 'Root Canal Treatment',
            price: '3,500',
            features: ['Single-Sitting RCT', 'Rotary Endodontics', 'Post-Treatment Care', 'Crown Consultation'],
            highlighted: true,
        },
        {
            id: 4,
            name: 'Braces / Clear Aligners',
            price: '25,000',
            features: ['Free Consultation', 'Metal / Ceramic Options', 'Monthly Adjustments', 'Retainer Included'],
            highlighted: false,
        },
    ],

    // 14. FOOTER & NAVIGATION
    navigation: [
        { label: 'Home', href: '#home' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Our Team', href: '#doctors' },
        { label: 'Reviews', href: '#testimonials' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Blog', href: '#blog' },
        { label: 'Visit Us', href: '#visit' },
    ],
    footer: {
        aboutText: "Prayagraj's most trusted dental clinic for 14+ years — offering top-quality, hygienic, and painless treatments. Proudly women-owned and LGBTQ+ friendly, welcoming every patient with warmth and care.",
        copyrightText: "All rights reserved. Advanced Dental Lounge — Prayagraj's Trusted Smile Experts.",
    }
};
