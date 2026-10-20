'use client';

import {
  ArrowRight,
  Layout,
  Code,
  Server,
  Sparkles,
  Cloud,
  Database,
  type LucideIcon,
} from 'lucide-react';
import React, {useEffect, useRef} from 'react';
import Link from 'next/link';
import {SERVICES, type ServiceItem} from '@/constants/features';

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); }
    }, {threshold});
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function ServiceCard({service, delay = 0}: {service: ServiceItem; delay?: number}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add('revealed'), delay); obs.disconnect(); }
    }, {threshold: 0.1});
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`reveal tilt-card-3d group relative flex flex-col gap-5 p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm
        gradient-border-card cursor-default overflow-hidden
        ${service.featured ? 'lg:col-span-2' : ''}
        ${service.border}`}>

      {/* Gradient top-right corner blob */}
      <div className={`absolute -top-16 -right-16 size-52 rounded-full bg-linear-to-br ${service.color} blur-3xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none`} />

      {/* Gradient bottom-left corner blob */}
      <div className="absolute -bottom-16 -left-16 size-36 rounded-full bg-linear-to-tr from-emerald-500/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Number */}
      <span className="text-[11px] tracking-[0.3em] font-bold text-slate-355 dark:text-slate-500 uppercase tilt-card-3d-child">{service.number}</span>

      {/* Icon */}
      <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/20 group-hover:border-primary/30 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 tilt-card-3d-child`}>
        <Icon size={19} className={`${service.iconColor} group-hover:scale-110 transition-transform duration-300`} />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3 tilt-card-3d-child">
        <h3 className={`font-bold text-slate-900 dark:text-slate-100 leading-snug ${service.featured ? 'text-2xl' : 'text-lg'} group-hover:text-primary transition-colors duration-300`}>
          {service.title}
        </h3>
        <p className={`text-slate-600 dark:text-slate-400 leading-relaxed ${service.featured ? 'text-[15px] max-w-sm' : 'text-sm'}`}>
          {service.description}
        </p>
      </div>

      {service.featured && (
        <div className="flex items-center gap-2 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 tilt-card-3d-child">
          <span>Explore service</span>
          <ArrowRight size={14} />
        </div>
      )}
    </div>
  );
}

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Code,
  Server,
  Sparkles,
  Cloud,
  Database,
};

const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Sparkles;
};

const stylingOptions = [
  { color: 'from-violet-500/10 to-purple-500/5', iconColor: 'text-violet-600', border: 'group-hover:border-violet-500/30', featured: true },
  { color: 'from-sky-500/10 to-blue-500/5', iconColor: 'text-sky-600', border: 'group-hover:border-sky-500/30', featured: false },
  { color: 'from-emerald-500/10 to-green-500/5', iconColor: 'text-emerald-600', border: 'group-hover:border-emerald-500/30', featured: false },
  { color: 'from-amber-500/10 to-orange-500/5', iconColor: 'text-amber-600', border: 'group-hover:border-amber-500/30', featured: false },
  { color: 'from-cyan-500/10 to-teal-500/5', iconColor: 'text-cyan-600', border: 'group-hover:border-cyan-500/30', featured: false },
  { color: 'from-rose-500/10 to-pink-500/5', iconColor: 'text-rose-600', border: 'group-hover:border-rose-500/30', featured: false },
];

export default function Features({
  initialFeatures
}: {
  initialFeatures?: {
    id: string;
    title: string;
    description: string;
    iconName: string;
    order: number;
  }[];
}) {
  const headerRef = useReveal(0.2);

  const featuresList = initialFeatures
    ? initialFeatures.map((f, idx) => {
        const style = stylingOptions[idx % stylingOptions.length];
        return {
          title: f.title,
          description: f.description,
          icon: getIcon(f.iconName),
          number: String(idx + 1).padStart(2, '0'),
          ...style,
        };
      })
    : SERVICES;

  return (
    <section id="features" className="relative bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      {/* Background grid */}
      <div className="absolute inset-0 hero-grid opacity-15 pointer-events-none" aria-hidden />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full pointer-events-none filter blur-[80px]"
        style={{background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)'}}
        aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36">
        {/* Header */}
        <div ref={headerRef} className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
              <div className="size-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">What we offer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              Services built for<br />
              <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg,#34d399,#10b981)'}}>
                scale &amp; precision
              </span>
            </h2>
          </div>
          <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
            From ideation to deployment — high-performance applications that drive your business forward.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuresList.map((s, i) => (
            <ServiceCard key={i} service={s} delay={i * 70} />
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-14 flex justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-300 hover:text-primary rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md">
            Discuss your project
            <ArrowRight size={14} className="text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
