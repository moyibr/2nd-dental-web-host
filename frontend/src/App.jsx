// App — Root component wrapping layout and home page, injecting dynamic theme
import { useEffect } from 'react';
import TopBar from './layouts/TopBar';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import MobileActionBar from './layouts/MobileActionBar';
import Home from './pages/Home';
import SEOHead from './components/SEOHead';
import WhatsAppButton from './components/WhatsAppButton';
import { applyTheme } from './theme/applyTheme.js';

export default function App() {
    useEffect(() => {
        applyTheme();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <SEOHead />
            <TopBar />
            <Navbar />
            <Home />
            <Footer />
            {/* Floating chat button — desktop/tablet only */}
            <WhatsAppButton />
            {/* Sticky Call / WhatsApp / Book bar — mobile only */}
            <MobileActionBar />
        </div>
    );
}
