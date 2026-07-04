import {
  SiOpenai, SiAnthropic, SiDocker, SiStripe, SiPaypal,
  SiSupabase, SiPrisma, SiGithub, SiSlack, SiCloudflare,
  SiMongodb, SiRedis, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs,
} from 'react-icons/si';
import {FaAws} from 'react-icons/fa';
import {LogoIcon} from '@/components/logo';
import {cn} from '@/lib/utils';
import {InfiniteSlider} from '@/components/infinite-slider';

const TECH_ROW_1 = [
  {name: 'OpenAI',      icon: <SiOpenai      className="text-slate-800 dark:text-slate-200" />},
  {name: 'Stripe',      icon: <SiStripe      className="text-indigo-600" />},
  {name: 'AWS',         icon: <FaAws         className="text-orange-500" />},
  {name: 'GitHub',      icon: <SiGithub      className="text-slate-800" />},
  {name: 'React',       icon: <SiReact       className="text-sky-500" />},
  {name: 'Docker',      icon: <SiDocker      className="text-blue-500" />},
];
const TECH_ROW_2 = [
  {name: 'Claude',      icon: <SiAnthropic   className="text-orange-600" />},
  {name: 'PayPal',      icon: <SiPaypal      className="text-blue-600" />},
  {name: 'Supabase',    icon: <SiSupabase    className="text-emerald-500" />},
  {name: 'Next.js',     icon: <SiNextdotjs   className="text-slate-900 dark:text-slate-250" />},
  {name: 'Cloudflare',  icon: <SiCloudflare  className="text-orange-500" />},
  {name: 'MongoDB',     icon: <SiMongodb     className="text-emerald-600" />},
];
const TECH_ROW_3 = [
  {name: 'Prisma',      icon: <SiPrisma      className="text-slate-800 dark:text-slate-200" />},
  {name: 'Slack',       icon: <SiSlack       className="text-purple-600" />},
  {name: 'Redis',       icon: <SiRedis       className="text-rose-600" />},
  {name: 'Node.js',     icon: <SiNodedotjs   className="text-green-600" />},
  {name: 'Tailwind',    icon: <SiTailwindcss className="text-sky-500" />},
  {name: 'OpenAI',      icon: <SiOpenai      className="text-slate-800 dark:text-slate-200" />},
];

export default function IntegrationsSection() {
  return (
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden py-12 md:py-20 transition-colors duration-300">
      {/* Top & bottom border glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Subtle radial glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{background: 'radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)'}}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div
          className="relative mx-auto max-w-xl
          mask-[radial-gradient(ellipse_55%_55%_at_50%_50%,#000_60%,transparent_100%)]">

          {/* Row 1 */}
          <div className="py-3">
            <InfiniteSlider gap={28} speed={22} speedOnHover={12}>
              {TECH_ROW_1.map((item, idx) => (
                <IntegCard key={idx}>{item.icon}</IntegCard>
              ))}
            </InfiniteSlider>
          </div>

          {/* Row 2 */}
          <div className="py-3">
            <InfiniteSlider gap={28} speed={28} speedOnHover={12} reverse>
              {TECH_ROW_2.map((item, idx) => (
                <IntegCard key={idx}>{item.icon}</IntegCard>
              ))}
            </InfiniteSlider>
          </div>

          {/* Row 3 */}
          <div className="py-3">
            <InfiniteSlider gap={28} speed={18} speedOnHover={12}>
              {TECH_ROW_3.map((item, idx) => (
                <IntegCard key={idx}>{item.icon}</IntegCard>
              ))}
            </InfiniteSlider>
          </div>

          {/* Center logo with pulse ring */}
          <div className="absolute inset-0 m-auto flex size-fit items-center justify-center">
            <div className="relative">
              <div className="animate-pulse-ring absolute inset-0 rounded-full" />
              <div
                className="absolute -inset-5 rounded-full pointer-events-none"
                style={{background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)'}}
              />
              <IntegCard className="size-20 bg-white dark:bg-slate-950 border-primary/30 shadow-2xl shadow-primary/10 ring-4 ring-slate-100 dark:ring-slate-900" isCenter>
                <LogoIcon className="size-10" />
              </IntegCard>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="mt-12 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Seamlessly Integrated{' '}
            <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg,#34d399,#10b981)'}}>
              Ecosystem
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            We build and deploy using an industry-leading technical stack,
            ensuring your software is scalable, secure, and ready for the global market.
          </p>
        </div>
      </div>
    </section>
  );
}

function IntegCard({children, className, isCenter = false}: {
  children: React.ReactNode; className?: string; isCenter?: boolean;
}) {
  return (
    <div className={cn(
      'relative z-20 flex size-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm',
      'transition-all duration-300 hover:border-primary/50 hover:scale-110 hover:shadow-[0_0_16px_rgba(16,185,129,0.2)] cursor-pointer',
      className,
    )}>
      <div className={cn('m-auto size-fit flex items-center justify-center *:size-5', isCenter && '*:size-9', 'dark:*:text-slate-200')}>
        {children}
      </div>
    </div>
  );
}
