// App — Root component wrapping layout and home page, injecting dynamic theme
import { useEffect } from 'react';
import TopBar from './layouts/TopBar';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import { clinicConfig } from './config/clinicConfig';

export default function App() {
    // Inject dynamic theme variables and font
    useEffect(() => {
        const root = document.documentElement;
        const { theme } = clinicConfig;

        root.style.setProperty('--theme-primary', theme.primaryColor);
        root.style.setProperty('--theme-primary-dark', theme.primaryDarkColor);
        root.style.setProperty('--theme-primary-light', theme.primaryLightColor);
        root.style.setProperty('--theme-secondary', theme.secondaryColor);
        root.style.setProperty('--theme-accent', theme.accentColor);
        root.style.setProperty('--theme-font', theme.fontFamily);

        // Dynamically load font if not already present
        if (!document.querySelector(`link[href="${theme.fontUrl}"]`)) {
            const link = document.createElement('link');
            link.href = theme.fontUrl;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        // Update document title and favicon
        document.title = `${clinicConfig.business.name} — ${clinicConfig.business.tagline}`;
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = clinicConfig.business.favicon;
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />
            <Home />
            <Footer />
        </div>
    );
}
