import HeroSection from '@/components/hero-section';
import Features from '@/components/features-1';
import IntegrationsSection from '@/components/integrations-7';
import Stats from '@/components/stats-3';
import FAQSection from '@/components/faqs-3';
import Contact from '@/components/contact-1';
import Testimonials from '@/components/testimonials-1';
import DevelopmentProcess from '@/components/development-process';
import FooterSection from '@/components/footer-two';
import { HERO_DATA } from '@/constants/hero';

export default function Home() {
  return (
    <div className="relative min-h-screen font-outfit bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <HeroSection heroData={HERO_DATA} />

      <div id="features">
        <Features />
      </div>

      <IntegrationsSection />

      <div id="solution">
        <DevelopmentProcess />
      </div>

      <div id="stats">
        <Stats />
      </div>

      <div id="testimonials">
        <Testimonials />
      </div>

      <div id="about">
        <FAQSection />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <FooterSection />
    </div>
  );
}
