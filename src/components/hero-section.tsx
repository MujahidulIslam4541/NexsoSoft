'use client';

import React, {useRef, useEffect, useState} from 'react';
import Link from 'next/link';
import {HeroHeader} from './header';
import {InfiniteSlider} from '@/components/ui/infinite-slider';
import {ProgressiveBlur} from '@/components/ui/progressive-blur';
import {ArrowRight, ChevronDown, Zap, Globe, Shield} from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiCss, SiHtml5,
  SiNodedotjs, SiExpress, SiNestjs, SiLaravel, SiPhp,
  SiPrisma, SiMysql, SiMongodb, SiDocker, SiOpenai,
} from 'react-icons/si';
import {FaAws} from 'react-icons/fa';

/* ─────────────────────────────────────────────────────────────
   MAGNETIC HOOK
───────────────────────────────────────────────────────────── */
function useMagnetic(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left - r.width  / 2) / r.width)  * strength;
    const y = ((e.clientY - r.top  - r.height / 2) / r.height) * strength;
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    ref.current.style.transform = 'translate(0,0)';
  };
  const onEnter = () => {
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.1s ease';
  };
  return {ref, onMove, onLeave, onEnter};
}

/* ─────────────────────────────────────────────────────────────
   WORD-BY-WORD HEADLINE REVEAL
───────────────────────────────────────────────────────────── */
function AnimatedHeadline({text}: {text: string}) {
  const words = text.split(' ');
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLSpanElement>('.hero-word');
    // Stagger reveal on mount
    spans.forEach((span, i) => {
      setTimeout(() => span.classList.add('revealed'), 200 + i * 100);
    });
  }, []);

  const getGradient = (w: string) => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (['scalable', 'software', 'solutions', 'stunning', 'drive', 'results'].includes(clean)) {
      return 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)';
    }
    return null;
  };

  return (
    <h1
      ref={containerRef}
      className="text-[clamp(2.5rem,5.2vw,4.5rem)] font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white"
      style={{perspective: '1000px'}}>
      {words.map((word, i) => {
        const gradient = getGradient(word);
        return (
          <React.Fragment key={i}>
            <span
              className={`hero-word ${gradient ? 'text-transparent bg-clip-text' : ''}`}
              style={
                gradient
                  ? {
                      backgroundImage: gradient,
                      animationDelay: `${200 + i * 100}ms`,
                    }
                  : {animationDelay: `${200 + i * 100}ms`}
              }>
              {word}
            </span>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </h1>
  );
}

/* ─────────────────────────────────────────────────────────────
   LIVE STAT BADGE
───────────────────────────────────────────────────────────── */
function StatBadge({icon: Icon, value, label, delay}: {
  icon: React.ElementType; value: string; label: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setTimeout(() => el.classList.add('revealed'), delay);
  }, [delay]);

  return (
    <div
      ref={ref}
      className="stat-tick flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md rounded-2xl px-4 py-3 hover:border-primary/30 hover:bg-emerald-50/30 hover:shadow-sm transition-all duration-300 cursor-default">
      <div className="size-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-primary" />
      </div>
      <div>
        <p className="text-slate-800 dark:text-slate-200 font-bold text-sm leading-none">{value}</p>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-none">{label}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LIGHT TECH PILL
───────────────────────────────────────────────────────────── */
function TechPill({icon: Icon, label, color}: {
  icon: React.ElementType; label: string; color: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 hover:border-primary/30 transition-all duration-300 cursor-default select-none">
      <Icon size={17} className={color} />
      <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOCK CODE CARD (right-side visual)
───────────────────────────────────────────────────────────── */
function CodeCard() {
  const [tick, setTick] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 4), 900);
    return () => clearInterval(id);
  }, []);

  // Reveal floating badges
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const badges = el.querySelectorAll<HTMLDivElement>('.hero-badge');
    badges.forEach((b) => {
      const delay = parseFloat(b.style.animationDelay ?? '0') || 0;
      setTimeout(() => b.classList.add('revealed'), delay * 1000);
    });
  }, []);

  const lines = [
    {t: 'keyword', v: 'const '}, {t: 'fn', v: 'buildApp'}, {t: 'plain', v: ' = async () => {'},
    {t: 'indent', v: '  '}, {t: 'keyword', v: 'const '}, {t: 'plain', v: 'stack = ['}, {t: 'str', v: '"Next.js"'}, {t: 'plain', v: ', '}, {t: 'str', v: '"AI"'}, {t: 'plain', v: '];'},
    {t: 'indent', v: '  '}, {t: 'fn', v: 'await '}, {t: 'plain', v: 'deploy('}, {t: 'str', v: '"production"'}, {t: 'plain', v: ');'},
    {t: 'indent', v: '  '}, {t: 'keyword', v: 'return '}, {t: 'plain', v: '{ success: '}, {t: 'bool', v: 'true'}, {t: 'plain', v: ' };'},
    {t: 'plain', v: '};'},
  ];

  const colors: Record<string, string> = {
    keyword: 'text-violet-600 dark:text-violet-400 font-semibold',
    fn: 'text-sky-600 dark:text-sky-400 font-semibold',
    str: 'text-emerald-600 dark:text-emerald-400',
    bool: 'text-orange-600 dark:text-orange-400',
    plain: 'text-slate-700 dark:text-slate-300',
    indent: 'text-transparent',
  };

  // Group tokens into code lines
  const codeLines = [
    [lines[0], lines[1], lines[2]],
    [lines[3], lines[4], lines[5], lines[6], lines[7], lines[8], lines[9]],
    [lines[10], lines[11], lines[12], lines[13], lines[14]],
    [lines[15], lines[16], lines[17], lines[18], lines[19]],
    [lines[20]],
  ];

  return (
    <div ref={cardRef} className="relative w-full max-w-[500px] select-none tilt-card-3d">
      {/* Card glow */}
      <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl pointer-events-none" />

      {/* Window frame */}
      <div className="relative bg-slate-50/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-none tilt-card-3d-child">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-slate-400 dark:text-slate-500 font-mono">buildApp.ts — StackMajix</span>
          {/* Live indicator */}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-emerald-600/80 font-mono">running</span>
          </div>
        </div>

        {/* Code body */}
        <div className="px-5 py-5 font-mono text-[13px] leading-7 space-y-0">
          {codeLines.map((line, li) => (
            <div key={li} className="flex items-center gap-0">
              {/* Line number */}
              <span className="w-6 text-slate-300 dark:text-slate-600 text-right shrink-0 mr-4 text-[11px]">
                {li + 1}
              </span>
              {line.map((tok, ti) => (
                <span key={ti} className={colors[tok.t] || 'text-slate-700 dark:text-slate-300'}>
                  {tok.v}
                </span>
              ))}
              {/* Cursor on last line */}
              {li === codeLines.length - 1 && (
                <span className="cursor-blink inline-block w-0.5 h-[14px] bg-primary ml-0.5 -mb-0.5" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom status bar */}
        <div className="px-5 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-primary" />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">TypeScript</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              Deploying{'.'.repeat(tick + 1)}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-[10px] text-emerald-600/80 font-mono">✓ 0 errors</span>
          </div>
        </div>
      </div>

      {/* Floating status badges */}
      <div
        className="hero-badge absolute -top-6 -right-6 tilt-card-3d-child"
        style={{animationDelay: '1.2s'}}>
        <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-xl px-3 py-2 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-primary/40 hover:scale-105 transition-all duration-300 animate-float cursor-default">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-primary/20 flex items-center justify-center">
              <Zap size={11} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Deployment</p>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">Live in 2m 14s</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hero-badge absolute -bottom-6 -left-6 tilt-card-3d-child"
        style={{animationDelay: '1.5s'}}>
        <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-xl px-3 py-2 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-emerald-500/40 hover:scale-105 transition-all duration-300 animate-float-delayed cursor-default">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Shield size={11} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Security Score</p>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">A+ / 100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TECH ROWS
───────────────────────────────────────────────────────────── */
const TECH_ROW_1 = [
  {icon: SiReact, label: 'React', color: 'text-sky-500'},
  {icon: SiNextdotjs, label: 'Next.js', color: 'text-slate-800 dark:text-slate-200'},
  {icon: SiTailwindcss, label: 'Tailwind', color: 'text-cyan-500'},
  {icon: SiCss, label: 'CSS3', color: 'text-blue-500'},
  {icon: SiHtml5, label: 'HTML5', color: 'text-orange-500'},
  {icon: SiNodedotjs, label: 'Node.js', color: 'text-green-600'},
  {icon: SiExpress, label: 'Express', color: 'text-slate-650 dark:text-slate-350'},
  {icon: SiNestjs, label: 'NestJS', color: 'text-rose-500'},
];
const TECH_ROW_2 = [
  {icon: SiLaravel, label: 'Laravel', color: 'text-red-500'},
  {icon: SiPhp, label: 'PHP', color: 'text-indigo-500'},
  {icon: SiPrisma, label: 'Prisma', color: 'text-slate-700 dark:text-slate-300'},
  {icon: SiMysql, label: 'MySQL', color: 'text-blue-600'},
  {icon: SiMongodb, label: 'MongoDB', color: 'text-emerald-600'},
  {icon: FaAws, label: 'AWS', color: 'text-orange-500'},
  {icon: SiDocker, label: 'Docker', color: 'text-sky-500'},
  {icon: SiOpenai, label: 'AI Support', color: 'text-slate-800 dark:text-slate-200'},
];

/* ─────────────────────────────────────────────────────────────
   MAIN HERO COMPONENT
───────────────────────────────────────────────────────────── */
export default function HeroSection({
  heroData = {
    title: 'Build Stunning Websites That Drive Results',
    subtitle: 'Craft. Build. Ship Modern Websites With Latest Technology and AI Support.',
    ctaText: 'Start Building',
    ctaHref: '#contact',
  }
}: {
  heroData?: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
}) {
  const magBtn1 = useMagnetic(12);
  const magBtn2 = useMagnetic(12);
  const subRef  = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pairs: [React.RefObject<HTMLDivElement | null>, number][] = [
      [subRef,    900],
      [btnRef,   1100],
      [statsRef, 1300],
      [badgesRef,1400],
    ];
    pairs.forEach(([r, delay]) => {
      setTimeout(() => { r.current?.classList.add('revealed'); }, delay);
    });
  }, []);


  return (
    <>
      <HeroHeader />

      <main className="overflow-x-hidden">
        {/* ══════════════════════════════════════════════
            HERO SECTION — Clean Light Green Theme
        ══════════════════════════════════════════════ */}
        <section className="relative min-h-[82vh] lg:min-h-[88vh] bg-white dark:bg-slate-950 flex flex-col overflow-hidden transition-colors duration-300">

          {/* ── Layer 0: Moving grid ─────────────────── */}
          <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden />

          {/* ── Layer 1: Radial vignette ─────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.08) 0%, transparent 70%)',
            }}
          />

          {/* ── Layer 2: Aurora blobs ────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {/* Green aurora — top right */}
            <div
              className="aurora-1 absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.03) 50%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            {/* Teal aurora — bottom left */}
            <div
              className="aurora-2 absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(52,211,153,0.08) 0%, rgba(52,211,153,0.02) 50%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
            {/* Deep glow — center */}
            <div
              className="aurora-3 absolute top-[30%] left-[40%] w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 60%)',
                filter: 'blur(50px)',
              }}
            />
          </div>

          {/* ── Layer 3: Top edge fade ───────────────── */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
            aria-hidden
            style={{
              background: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)',
            }}
          />

          {/* ══════════════════════════════════════════════
              MAIN CONTENT
          ══════════════════════════════════════════════ */}
          <div className="relative z-10 flex-1 flex items-center">
            <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-12 pt-24 pb-12 md:pt-28 md:pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-16 items-center">

                {/* ── LEFT: Text column ─────────────── */}
                <div className="space-y-6 md:space-y-8">

                  {/* Headline */}
                  <AnimatedHeadline text={heroData.title} />

                  {/* Sub */}
                  <div
                    ref={subRef}
                    className="hero-sub"
                    style={{animationDelay: '0.6s'}}>
                    <p className="text-slate-650 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                      {heroData.subtitle}
                    </p>
                  </div>

                  {/* CTA buttons */}
                  <div
                    ref={btnRef}
                    className="hero-sub flex flex-wrap items-center gap-4"
                    style={{animationDelay: '0.8s'}}>
                    {/* Primary */}
                    <div
                      ref={magBtn1.ref}
                      onMouseMove={magBtn1.onMove}
                      onMouseLeave={magBtn1.onLeave}
                      onMouseEnter={magBtn1.onEnter}
                      id="hero-cta-primary">
                      <Link
                        href={heroData.ctaHref}
                        className="hero-cta-gradient shine-btn inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-white text-[15px] font-bold shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.4)] hover:scale-[1.03] active:scale-[0.97]">
                        {heroData.ctaText}
                        <span className="size-6 rounded-full bg-white/20 flex items-center justify-center">
                          <ArrowRight size={13} />
                        </span>
                      </Link>
                    </div>

                    {/* Secondary ghost outline */}
                    <div
                      ref={magBtn2.ref}
                      onMouseMove={magBtn2.onMove}
                      onMouseLeave={magBtn2.onLeave}
                      onMouseEnter={magBtn2.onEnter}
                      id="hero-cta-secondary">
                      <Link
                        href={heroData.ctaHref}
                        className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 text-[15px] font-semibold hover:border-primary/50 hover:bg-emerald-50/20 hover:text-primary transition-all duration-300">
                        Request a Quote
                      </Link>
                    </div>
                  </div>

                  {/* Live stats row */}
                  <div
                    ref={statsRef}
                    className="hero-sub flex flex-wrap gap-3 pt-2"
                    style={{animationDelay: '1.0s'}}>
                    <StatBadge icon={Globe}  value="50+ Projects" label="Delivered globally" delay={1100} />
                    <StatBadge icon={Zap}    value="15+ Clients"  label="Around the world"  delay={1250} />
                    <StatBadge icon={Shield} value="Top Rated"    label="Trusted partners"   delay={1400} />
                  </div>
                </div>

                {/* ── RIGHT: Code card visual ────────── */}
                <div className="hidden lg:flex items-center justify-end">
                  <CodeCard />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="relative z-10 flex flex-col items-center gap-2 pb-10 text-slate-400/80">
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown size={18} className="animate-bounce-arrow text-primary/60" />
          </div>

          {/* Bottom edge fade into white */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            aria-hidden
            style={{
              background:
                'linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 100%)',
            }}
          />
        </section>

        {/* ══════════════════════════════════════════════
            TECH STACK MARQUEE — light strip
        ══════════════════════════════════════════════ */}
        <section className="bg-slate-50/60 dark:bg-slate-900/30 border-y border-slate-100/80 dark:border-slate-800/80 py-8 relative z-10 overflow-hidden transition-colors duration-300">
          {/* Subtle top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
            aria-hidden
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.2), transparent)',
            }}
          />

          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Label */}
              <div className="shrink-0 md:border-r md:border-slate-200 dark:border-slate-800 md:pr-8">
                <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-slate-400 text-center md:text-right">
                  Powering The<br />Latest Technology
                </p>
              </div>

              {/* Dual-row marquee */}
              <div className="relative flex-1 space-y-3 overflow-hidden">
                {/* Row 1 → left */}
                <InfiniteSlider speed={35} speedOnHover={18} gap={10}>
                  {TECH_ROW_1.map((t, i) => (
                    <TechPill key={i} icon={t.icon} label={t.label} color={t.color} />
                  ))}
                </InfiniteSlider>

                {/* Row 2 → right */}
                <InfiniteSlider speed={40} speedOnHover={18} gap={10} reverse>
                  {TECH_ROW_2.map((t, i) => (
                    <TechPill key={i} icon={t.icon} label={t.label} color={t.color} />
                  ))}
                </InfiniteSlider>

                {/* Edge masks */}
                <div
                  className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
                  style={{background: 'linear-gradient(to right, var(--background) 0%, transparent 100%)'}}
                />
                <div
                  className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
                  style={{background: 'linear-gradient(to left, var(--background) 0%, transparent 100%)'}}
                />
                <ProgressiveBlur className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10" direction="left" blurIntensity={0.5} />
                <ProgressiveBlur className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10" direction="right" blurIntensity={0.5} />
              </div>
            </div>
          </div>

          {/* Bottom gradient bridge to white next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            aria-hidden
            style={{background: 'linear-gradient(to bottom, transparent, var(--background))'}}
          />
        </section>
      </main>
    </>
  );
}
