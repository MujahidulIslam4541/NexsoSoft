import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import IntegrationsSection from '@/components/sections/IntegrationsSection';
import DevelopmentProcessSection from '@/components/sections/DevelopmentProcessSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import { HERO_DATA } from '@/constants/hero';

export default function Home() {
  return (
    <div className="relative min-h-screen font-outfit bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <HeroSection heroData={HERO_DATA} />

      <div id="features">
        <FeaturesSection />
      </div>

      <IntegrationsSection />

      <div id="solution">
        <DevelopmentProcessSection />
      </div>

      <div id="stats">
        <StatsSection />
      </div>

      <div id="testimonials">
        <TestimonialsSection />
      </div>

      <div id="about">
        <FAQSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}
