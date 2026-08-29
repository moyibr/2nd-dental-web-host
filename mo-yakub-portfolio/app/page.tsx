import About from '@/components/About';
import Build from '@/components/Build';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import MeasureRail from '@/components/MeasureRail';
import MobileContactBar from '@/components/MobileContactBar';
import Process from '@/components/Process';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import Work from '@/components/Work';

export default function Page() {
  return (
    <>
      {/* The content clears the fixed rail on large screens; the bottom padding
          keeps the mobile contact bar from covering the footer. The rail comes
          after the header in the DOM so keyboard focus reaches the masthead
          first — it is positioned, not laid out, so this costs nothing. */}
      <div className="pb-24 md:pb-0 lg:pl-(--rail-w)">
        <SiteHeader />
        <MeasureRail />
        <main id="main">
          <Hero />
          <Work />
          <Build />
          <Process />
          <About />
          <Contact />
        </main>
        <SiteFooter />
      </div>
      <MobileContactBar />
    </>
  );
}
