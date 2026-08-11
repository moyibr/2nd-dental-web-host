// src/theme/applyTheme.js
// Injects the config's brand colors as CSS variables and loads the chosen
// Google Font. Extracted out of App.jsx so theme logic lives in one place.
import { config, getFont } from '../config.js';

export function applyTheme() {
    const root = document.documentElement;
    const { theme, business } = config;

    root.style.setProperty('--theme-primary', theme.primaryColor);
    root.style.setProperty('--theme-primary-dark', theme.primaryDarkColor);
    root.style.setProperty('--theme-primary-light', theme.primaryLightColor);
    root.style.setProperty('--theme-secondary', theme.secondaryColor);
    root.style.setProperty('--theme-accent', theme.accentColor);

    const font = getFont();
    root.style.setProperty('--theme-font', font.family);

    if (!document.querySelector(`link[href="${font.url}"]`)) {
        const link = document.createElement('link');
        link.href = font.url;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    // Page <title>/meta/JSON-LD are owned by <SEOHead /> — this only sets the favicon.
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = business.favicon;
    }
}
