'use client';

import Link from 'next/link';
import {motion, MotionConfig, useMotionValue, useSpring, type Variants} from 'motion/react';
import {ArrowRight, ChevronDown, Zap, Globe, Shield, type LucideIcon} from 'lucide-react';
import {HeroHeader} from './header';
import {HERO_DATA, type HeroData} from '@/constants/hero';

/* ───────────── helpers ───────────── */
const HIGHLIGHT = new Set(['scalable', 'software', 'solutions', 'stunning', 'drive', 'results']);

const fadeUp = (delay: number) => ({
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.6, delay, ease: 'easeOut' as const},
});

/* ───────────── Magnetic wrapper ───────────── */
function Magnetic({children, strength = 12}: {children: React.ReactNode; strength?: number}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, {stiffness: 200, damping: 15, mass: 0.2});
  const sy = useSpring(y, {stiffness: 200, damping: 15, mass: 0.2});

  return (
    <motion.div
      style={{x: sx, y: sy}}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left - r.width / 2) / r.width) * strength);
        y.set(((e.clientY - r.top - r.height / 2) / r.height) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}>
      {children}
    </motion.div>
  );
}

/* ───────────── Headline ───────────── */
const container: Variants = {
  hidden: {},
  show: {transition: {staggerChildren: 0.1, delayChildren: 0.2}},
};
const word: Variants = {
  hidden: {opacity: 0, y: 24, filter: 'blur(8px)'},
  show: {opacity: 1, y: 0, filter: 'blur(0px)', transition: {duration: 0.5, ease: 'easeOut'}},
};

function AnimatedHeadline({text}: {text: string}) {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="text-[clamp(2.5rem,5.2vw,4.5rem)] font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white">
      {text.split(' ').map((w, i) => {
        const highlighted = HIGHLIGHT.has(w.toLowerCase().replace(/[^a-z]/g, ''));
        return (
          <motion.span
            key={i}
            variants={word}
            className={`mr-[0.25em] inline-block ${
              highlighted
                ? 'bg-linear-to-br from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent'
                : ''
            }`}>
            {w}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}

/* ───────────── Stat badge ───────────── */
function StatBadge({icon: Icon, value, label, delay}: {
  icon: LucideIcon;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 12}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4, delay}}
      className="flex cursor-default items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:bg-emerald-50/30 hover:shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/15">
        <Icon size={14} className="text-primary" />
      </div>
      <div>
        <p className="text-sm font-bold leading-none text-slate-800 dark:text-slate-200">{value}</p>
        <p className="mt-0.5 text-xs leading-none text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </motion.div>
  );
}

/* ───────────── Code card ───────────── */
type Tok = 'k' | 'f' | 's' | 'b' | 'p';

const TOKEN_STYLE: Record<Tok, string> = {
  k: 'text-violet-600 dark:text-violet-400 font-semibold',
  f: 'text-sky-600 dark:text-sky-400 font-semibold',
  s: 'text-emerald-600 dark:text-emerald-400',
  b: 'text-orange-600 dark:text-orange-400',
  p: 'text-slate-700 dark:text-slate-300',
};

const CODE: [Tok, string][][] = [
  [['k', 'const '], ['f', 'buildApp'], ['p', ' = async () => {']],
  [['p', '  '], ['k', 'const '], ['p', 'stack = ['], ['s', '"Next.js"'], ['p', ', '], ['s', '"AI"'], ['p', '];']],
  [['p', '  '], ['k', 'await '], ['f', 'deploy'], ['p', '('], ['s', '"production"'], ['p', ');']],
  [['p', '  '], ['k', 'return '], ['p', '{ success: '], ['b', 'true'], ['p', ' };']],
  [['p', '};']],
];

const barClass =
  'flex items-center gap-4 border-slate-200 bg-slate-100/50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-800/50';

function FloatingBadge({
  className,
  delay,
  icon: Icon,
  label,
  value,
  tone,
}: {
  className: string;
  delay: number;
  icon: LucideIcon;
  label: string;
  value: string;
  tone: 'primary' | 'emerald';
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{opacity: 0, scale: 0.8}}
      animate={{opacity: 1, scale: 1}}
      transition={{delay, duration: 0.5, ease: 'easeOut'}}>
      <motion.div
        animate={{y: [0, -6, 0]}}
        transition={{duration: 4, repeat: Infinity, ease: 'easeInOut', delay}}
        className="flex cursor-default items-center gap-2 rounded-xl border border-slate-200/80 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-xl transition-shadow hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/95">
        <div
          className={`flex size-6 items-center justify-center rounded-lg ${
            tone === 'primary' ? 'bg-primary/20' : 'bg-emerald-500/20'
          }`}>
          <Icon size={11} className={tone === 'primary' ? 'text-primary' : 'text-emerald-600'} />
        </div>
        <div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{value}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CodeCard() {
  return (
    <div className="relative w-full max-w-[500px] select-none">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/95 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/95 dark:shadow-none">
        {/* Title bar */}
        <div className={`${barClass} gap-2 border-b py-3`}>
          <span className="size-3 rounded-full bg-red-500/80" />
          <span className="size-3 rounded-full bg-yellow-500/80" />
          <span className="size-3 rounded-full bg-green-500/80" />
          <span className="ml-3 font-mono text-xs text-slate-400 dark:text-slate-500">
            buildApp.ts — NexsoSoft
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-[10px] text-emerald-600/80">running</span>
          </span>
        </div>

        {/* Code body */}
        <div className="px-5 py-5 font-mono text-[13px] leading-7">
          {CODE.map((line, i) => (
            <div key={i} className="flex items-center">
              <span className="mr-4 w-6 shrink-0 text-right text-[11px] text-slate-300 dark:text-slate-600">
                {i + 1}
              </span>
              <code className="whitespace-pre">
                {line.map(([type, text], j) => (
                  <span key={j} className={TOKEN_STYLE[type]}>
                    {text}
                  </span>
                ))}
              </code>
              {i === CODE.length - 1 && (
                <motion.span
                  className="ml-0.5 inline-block h-3.5 w-0.5 bg-primary"
                  animate={{opacity: [1, 1, 0, 0]}}
                  transition={{duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1]}}
                />
              )}
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className={`${barClass} border-t font-mono text-[10px] text-slate-400 dark:text-slate-500`}>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            TypeScript
          </span>
          <span>
            Deploying
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{opacity: [0.2, 1, 0.2]}}
                transition={{duration: 1.2, repeat: Infinity, delay: i * 0.2}}>
                .
              </motion.span>
            ))}
          </span>
          <span className="ml-auto text-emerald-600/80">✓ 0 errors</span>
        </div>
      </div>

      <FloatingBadge
        className="-right-3 -top-5"
        delay={1.2}
        icon={Zap}
        label="Deployment"
        value="Live in 2m 14s"
        tone="primary"
      />
      <FloatingBadge
        className="-bottom-5 -left-3"
        delay={1.5}
        icon={Shield}
        label="Security Score"
        value="A+ / 100"
        tone="emerald"
      />
    </div>
  );
}

/* ───────────── Main ───────────── */
export default function HeroSection({heroData = HERO_DATA}: {heroData?: HeroData}) {
  return (
    <MotionConfig reducedMotion="user">
      <HeroHeader />

      <main className="overflow-x-hidden">
        <section className="relative flex min-h-[82vh] flex-col overflow-hidden bg-white transition-colors duration-300 lg:min-h-[88vh] dark:bg-slate-950">
          {/* Background layers */}
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div
              className="aurora-1 absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full blur-[60px]"
              style={{background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.03) 50%, transparent 70%)'}}
            />
            <div
              className="aurora-2 absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full blur-[80px]"
              style={{background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, rgba(52,211,153,0.02) 50%, transparent 70%)'}}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            aria-hidden
            style={{background: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)'}}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-1 items-center">
            <div className="mx-auto w-full max-w-340 px-6 pb-12 pt-24 md:pb-16 md:pt-28 lg:px-12">
              <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.25fr_0.75fr]">
                {/* Left */}
                <div className="space-y-6 md:space-y-8">
                  <AnimatedHeadline text={heroData.title} />

                  <motion.p
                    {...fadeUp(0.9)}
                    className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    {heroData.subtitle}
                  </motion.p>

                  <motion.div {...fadeUp(1.1)} className="flex flex-wrap items-center gap-4">
                    <Magnetic>
                      <Link
                        href={heroData.ctaHref}
                        className="hero-cta-gradient shine-btn inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:scale-[1.03] hover:shadow-[0_4px_30px_rgba(16,185,129,0.4)] active:scale-[0.97]">
                        {heroData.ctaText}
                        <span className="flex size-6 items-center justify-center rounded-full bg-white/20">
                          <ArrowRight size={13} />
                        </span>
                      </Link>
                    </Magnetic>

                    <Magnetic>
                      <Link
                        href={heroData.ctaHref}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-[15px] font-semibold text-slate-700 transition-all duration-300 hover:border-primary/50 hover:bg-emerald-50/20 hover:text-primary dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
                        Request a Quote
                      </Link>
                    </Magnetic>
                  </motion.div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <StatBadge icon={Globe} value="50+ Projects" label="Delivered globally" delay={1.3} />
                    <StatBadge icon={Zap} value="15+ Clients" label="Around the world" delay={1.45} />
                    <StatBadge icon={Shield} value="Top Rated" label="Trusted partners" delay={1.6} />
                  </div>
                </div>

                {/* Right */}
                <div className="hidden items-center justify-end lg:flex">
                  <CodeCard />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="relative z-10 flex flex-col items-center gap-2 pb-10 text-slate-400/80">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em]">Scroll</span>
            <motion.div animate={{y: [0, 6, 0]}} transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}>
              <ChevronDown size={18} className="text-primary/60" />
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}