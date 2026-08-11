// src/theme/fonts.js
// -----------------------------------------------------------------------------
// ALLOWED FONT LIST
// -----------------------------------------------------------------------------
// `theme.font` in clinic.config.json must be one of the keys below. Keeping
// this as a fixed allow-list (rather than letting clients paste any Google
// Fonts URL into the config) means every onboarded clinic gets a font that's
// actually readable, has the right weights loaded, and can't accidentally
// break the layout or pull in an untrusted URL.
//
// To add a new option: pick a Google Font, add an entry here with the
// weights the template actually uses (300/400/500/600/700/800), then it
// becomes selectable in clinic.config.json as `"theme": { "font": "<key>" }`.
// -----------------------------------------------------------------------------

export const ALLOWED_FONTS = {
    Poppins: {
        family: '"Poppins", sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    },
    Roboto: {
        family: '"Roboto", sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap',
    },
    Inter: {
        family: '"Inter", sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    },
    Outfit: {
        family: '"Outfit", sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
    },
    Nunito: {
        family: '"Nunito", sans-serif',
        url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap',
    },
    'Playfair Display': {
        family: '"Playfair Display", serif',
        url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap',
    },
};

export const DEFAULT_FONT_KEY = 'Poppins';

/** Resolve a config font key to its { family, url }, falling back to the default if unknown. */
export function resolveFont(key) {
    return ALLOWED_FONTS[key] || ALLOWED_FONTS[DEFAULT_FONT_KEY];
}
