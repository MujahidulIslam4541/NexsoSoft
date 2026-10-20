'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Cloud,
  Cpu,
  Globe,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import {HeroHeader} from './header';
import {HERO_DATA, type HeroData} from '@/constants/hero';

/* ═════════════ CONTENT (এখানে নিজের সত্যি তথ্য বসাও) ═════════════ */
const QUOTE_HREF = '#contact';
const HIGHLIGHT = new Set(['scalable', 'software', 'solutions', 'stunning', 'drive', 'results']);

const STATS = [
  {value: '50+', label: 'Projects delivered'},
  {value: '15+', label: 'Clients worldwide'},
  {value: '24h', label: 'Reply time'},
];

type Service = {
  id: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  stack: string[];
  steps: string[];
  timeline: string;
};


const SERVICES: Service[] = [
  {
    id: 'web',
    label: 'Web',
    icon: Globe,
    blurb: 'Fast, SEO-ready web apps and platforms that scale with your users.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind','Node.js' ,'PHP','Laravel'],
    steps: ['Discovery & scope', 'UI / UX design', 'Build & integrate', 'Launch & monitor'],
    timeline: '4–8 weeks',
  },
  {
    id: 'ai',
    label: 'AI',
    icon: Cpu,
    blurb: 'Practical AI features and automations wired into your real workflow.',
    stack: ['OpenAI', 'LLM APIs', 'Vector DB', 'Next.js'],
    steps: ['Use-case analysis', 'Data & model setup', 'Integrate & test', 'Deploy & tune'],
    timeline: '4–8 weeks',
  },
  {
    id: 'saas',
    label: 'SaaS',
    icon: Cloud,
    blurb: 'Multi-tenant SaaS products with auth, billing and dashboards, built to scale.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL','MySQL', 'Stripe','PHP','Laravel'],
    steps: ['MVP scoping', 'Architecture & design', 'Build core features', 'Launch & iterate'],
    timeline: '8–12 weeks',
  },
];

/* ═════════════ MOTION HELPERS ═════════════ */
const fadeUp = (delay: number) => ({
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.6, delay, ease: 'easeOut' as const},
});

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

/* ═════════════ HEADLINE ═════════════ */
const container: Variants = {
  hidden: {},
  show: {transition: {staggerChildren: 0.1, delayChildren: 0.25}},
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
      className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
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

/* ═════════════ PLANNER: STEP ROW ═════════════ */
function Step({label, index}: {label: string; index: number}) {
  const delay = 0.25 + index * 0.4;
  return (
    <li className="flex items-center gap-3">
      <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-[10px] font-semibold text-slate-500 dark:border-white/15 dark:text-slate-400">
        {index + 1}
        <motion.span
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: delay + 0.5, type: 'spring', stiffness: 400, damping: 20}}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-primary text-white">
          <Check size={12} strokeWidth={3} />
        </motion.span>
      </span>

      <div className="min-w-0 flex-1">
        <p className="mb-1.5 truncate text-[13px] font-medium text-slate-800 dark:text-slate-200">
          {label}
        </p>
        <div className="h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <motion.div
            className="h-full origin-left rounded-full bg-linear-to-r from-emerald-400 to-emerald-600"
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            transition={{delay, duration: 0.5, ease: 'easeOut'}}
          />
        </div>
      </div>
    </li>
  );
}

/* ═════════════ PLANNER: FLOATING CHIP ═════════════ */
function FloatingChip({
  className,
  delay,
  icon: Icon,
  children,
}: {
  className: string;
  delay: number;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      initial={{opacity: 0, scale: 0.85}}
      animate={{opacity: 1, scale: 1}}
      transition={{delay, duration: 0.5, ease: 'easeOut'}}>
      <motion.div
        animate={{y: [0, -6, 0]}}
        transition={{duration: 4, repeat: Infinity, ease: 'easeInOut', delay}}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-lg sm:px-3.5 sm:py-2 sm:text-xs dark:border-white/10 dark:bg-slate-800 dark:text-slate-100">
        <Icon size={13} className="text-primary" />
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═════════════ PLANNER ═════════════ */
const AUTOPLAY_MS = 6500;

function ProjectPlanner() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const reduceMotion = useReducedMotion();
  const paused = hovered || interacted || !!reduceMotion;

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % SERVICES.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  const s = SERVICES[active];

  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.7, delay: 0.5, ease: 'easeOut'}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative mx-auto w-full max-w-120 lg:ml-auto lg:mr-0">
      <div className="pointer-events-none absolute -inset-6 rounded-4xl bg-primary/10 blur-3xl dark:bg-primary/15" />

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-xl shadow-slate-200/60 backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-none">
        {/* autoplay progress */}
        {!interacted && (
          <motion.div
            key={`${active}-${paused}`}
            className="absolute inset-x-0 top-0 h-0.5 origin-left bg-primary"
            initial={{scaleX: 0}}
            animate={{scaleX: paused ? 0 : 1}}
            transition={{duration: AUTOPLAY_MS / 1000, ease: 'linear'}}
          />
        )}

        {/* header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            <span className="size-1.5 rounded-full bg-primary" />
            Plan your project
          </span>
          <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
            0{active + 1} / 0{SERVICES.length}
          </span>
        </div>

        {/* project type */}
        <div
          role="tablist"
          aria-label="Project type"
          className="mb-5 flex gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800/70">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            const isActive = i === active;
            return (
              <button
                key={svc.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActive(i);
                  setInteracted(true);
                }}
                className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white dark:text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}>
                {isActive && (
                  <motion.span
                    layoutId="planner-pill"
                    className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                    transition={{type: 'spring', stiffness: 400, damping: 32}}
                  />
                )}
                <Icon size={13} className="relative z-10" />
                <span className="relative z-10">{svc.label}</span>
              </button>
            );
          })}
        </div>

        {/* panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.25}}>
            <p className="min-h-16 text-sm leading-relaxed text-slate-600 sm:min-h-11 dark:text-slate-400">
              {s.blurb}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  {t}
                </span>
              ))}
            </div>

            <ol className="mt-5 space-y-3.5">
              {s.steps.map((label, i) => (
                <Step key={label} label={label} index={i} />
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>

        {/* footer */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Typical MVP</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={s.id}
                initial={{opacity: 0, y: 6}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -6}}
                transition={{duration: 0.2}}
                className="text-sm font-bold text-slate-900 dark:text-white">
                {s.timeline}
              </motion.p>
            </AnimatePresence>
          </div>

          <Link
            href={QUOTE_HREF}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-primary hover:text-white dark:text-emerald-300 dark:hover:text-white">
            Start this project
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <FloatingChip className="-top-4 right-3 sm:-right-5 sm:-top-6" delay={1.2} icon={Clock}>
        Reply within 24h
      </FloatingChip>
      <FloatingChip className="-bottom-4 right-6 sm:-bottom-6 sm:right-8" delay={1.5} icon={Zap}>
        Free consultation
      </FloatingChip>
    </motion.div>
  );
}

/* ═════════════ MAIN ═════════════ */
export default function HeroSection({heroData = HERO_DATA}: {heroData?: HeroData}) {
  const mx = useMotionValue(700);
  const my = useMotionValue(260);
  const sx = useSpring(mx, {stiffness: 120, damping: 25});
  const sy = useSpring(my, {stiffness: 120, damping: 25});
  const spotLight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(16,185,129,0.12), transparent 70%)`;
  const spotDark = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(16,185,129,0.18), transparent 70%)`;

  return (
    <MotionConfig reducedMotion="user">
      <HeroHeader />

      <main className="overflow-x-hidden">
        <section
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
          }}
          className="relative flex min-h-[82vh] flex-col overflow-hidden bg-white transition-colors duration-300 lg:min-h-[88vh] dark:bg-slate-950">
          {/* background */}
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
          <motion.div
            className="pointer-events-none absolute inset-0 dark:hidden"
            style={{background: spotLight}}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute inset-0 hidden dark:block"
            style={{background: spotDark}}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32"
            aria-hidden
            style={{background: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)'}}
          />

          {/* content */}
          <div className="relative z-10 flex flex-1 items-center">
            <div className="mx-auto w-full max-w-340 px-5 pb-14 pt-28 sm:px-6 lg:px-12 lg:pt-32">
              <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                {/* left */}
                <div className="space-y-6 md:space-y-8">
                  <motion.div
                    {...fadeUp(0)}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    Open for new projects
                  </motion.div>

                  <AnimatedHeadline text={heroData.title} />

                  <motion.p
                    {...fadeUp(0.9)}
                    className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                    {heroData.subtitle}
                  </motion.p>

                  <motion.div {...fadeUp(1.05)} className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <Magnetic>
                      <Link
                        href={heroData.ctaHref}
                        className="hero-cta-gradient shine-btn inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:scale-[1.03] hover:shadow-[0_4px_30px_rgba(16,185,129,0.4)] active:scale-[0.97] sm:px-7 sm:py-3.5 ">
                        Build Your Vission
                        <span className="flex size-6 items-center justify-center rounded-full bg-white/20">
                          <ArrowRight size={13} />
                        </span>
                      </Link>
                    </Magnetic>

                    {/* <Magnetic>
                      <Link
                        href={QUOTE_HREF}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-[15px] font-semibold text-slate-700 transition-all duration-300 hover:border-primary/50 hover:text-primary sm:px-7 sm:py-3.5 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">
                        Request a Quote
                      </Link>
                    </Magnetic> */}
                  </motion.div>

                  <div className="grid max-w-md grid-cols-3 gap-4 border-t border-slate-200 pt-6 sm:gap-6 dark:border-white/10">
                    {STATS.map((st, i) => (
                      <motion.div key={st.label} {...fadeUp(1.25 + i * 0.12)}>
                        <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                          {st.value}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{st.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* right */}
                <ProjectPlanner />
              </div>
            </div>
          </div>

          {/* scroll indicator (শুধু বড় screen-এ) */}
          <div className="relative z-10 hidden flex-col items-center gap-2 pb-8 text-slate-400/80 sm:flex">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              animate={{y: [0, 6, 0]}}
              transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}>
              <ChevronDown size={18} className="text-primary/60" />
            </motion.div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}