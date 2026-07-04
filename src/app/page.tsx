import HeroSection from '@/components/hero-section';
import Features from '@/components/features-1';
import IntegrationsSection from '@/components/integrations-7';
import Stats from '@/components/stats-3';
import FAQSection from '@/components/faqs-3';
import Contact from '@/components/contact-1';
import Testimonials from '@/components/testimonials-1';
import DevelopmentProcess from '@/pages/DevelopmentProcess/DevelopmentProcess';
import FooterSection from '@/components/footer-two';
import { prisma } from '@/lib/db';

export default async function Home() {
  // Fetch dynamic page contents from the database.
  // Using Promise.all for optimized concurrent fetching.
  const [hero, features, processSteps, stats, testimonials, faqs] = await Promise.all([
    prisma.heroSettings.findUnique({ where: { id: 'hero' } }).catch(() => null),
    prisma.featureItem.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
    prisma.processStep.findMany({ orderBy: { stepNumber: 'asc' } }).catch(() => []),
    prisma.statItem.findMany().catch(() => []),
    prisma.testimonialItem.findMany().catch(() => []),
    prisma.fAQItem.findMany({ orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  return (
    <div className="relative min-h-screen font-outfit bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <HeroSection heroData={hero || undefined} />

      <div id="features">
        <Features initialFeatures={features.length > 0 ? features : undefined} />
      </div>

      <IntegrationsSection />

      <div id="solution">
        <DevelopmentProcess initialSteps={processSteps.length > 0 ? processSteps : undefined} />
      </div>

      <div id="stats">
        <Stats initialStats={stats.length > 0 ? stats : undefined} />
      </div>

      <div id="testimonials">
        <Testimonials initialTestimonials={testimonials.length > 0 ? testimonials : undefined} />
      </div>

      <div id="about">
        <FAQSection initialFAQs={faqs.length > 0 ? faqs : undefined} />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <FooterSection />
    </div>
  );
}
