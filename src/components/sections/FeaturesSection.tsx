'use client';

import Link from 'next/link';
import {motion, MotionConfig} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {FEATURES_HEADER, SERVICES, type ServiceItem} from '@/constants/features';

// lg screen-এ কোন card ২ column নেবে (SERVICES-এর order অনুযায়ী)
// UI/UX, Web, Backend, AI, Cloud, Database
const WIDE = [true, false, false, true, true, false];

function ServiceCard({
  service,
  wide,
  index,
}: {
  service: ServiceItem;
  wide: boolean;
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.15}}
      transition={{duration: 0.6, delay: (index % 3) * 0.08, ease: 'easeOut'}}
      whileHover={{y: -4, transition: {duration: 0.3}}}
      className={`group relative flex cursor-default flex-col gap-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-7 backdrop-blur-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/50 ${
        wide ? 'lg:col-span-2' : ''
      }`}>
      {/* Hover: শুধু উপরের border ধীরে ধীরে বাম থেকে ডানে আসে */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-primary via-emerald-400 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
      />

      {/* Corner glows */}
      <div
        className={`pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-linear-to-br ${service.color} opacity-0 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-100`}
      />
      <div className="pointer-events-none absolute -bottom-16 -left-16 size-36 rounded-full bg-linear-to-tr from-emerald-500/5 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

      {/* Number */}
      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
        {service.number}
      </span>

      {/* Icon */}
      <div className="flex size-11 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30 group-hover:bg-emerald-50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] dark:border-slate-800/80 dark:bg-slate-900 dark:group-hover:bg-emerald-950/20">
        <Icon
          size={19}
          className={`${service.iconColor} transition-transform duration-300 group-hover:scale-110`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <h3
          className={`font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-primary dark:text-slate-100 ${
            wide ? 'text-2xl' : 'text-lg'
          }`}>
          {service.title}
        </h3>
        <p
          className={`leading-relaxed text-slate-600 dark:text-slate-400 ${
            wide ? 'max-w-sm text-[15px]' : 'text-sm'
          }`}>
          {service.description}
        </p>
      </div>

      {wide && (
        <div className="flex -translate-x-2 items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span>Explore service</span>
          <ArrowRight size={14} />
        </div>
      )}
    </motion.article>
  );
}

export default function FeaturesSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="features"
        className="relative overflow-hidden bg-white transition-colors duration-300 dark:bg-slate-950">
        {/* Top glow line */}
        <div className="absolute left-1/2 top-0 h-32 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-primary/20 to-transparent" />

        {/* Background grid */}
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/4 h-75 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
          style={{background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)'}}
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-36">
          {/* Header */}
          <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.6, ease: 'easeOut'}}
            className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                <div className="size-1.5 animate-pulse rounded-full bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {FEATURES_HEADER.badge}
                </span>
              </div>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl dark:text-white">
                {FEATURES_HEADER.title}
                <br />
                <span className="bg-linear-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  {FEATURES_HEADER.highlightText}
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {FEATURES_HEADER.subtitle}
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.number} service={service} wide={WIDE[i]} index={i} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex justify-center md:mt-14">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-emerald-50/20 hover:text-primary hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-emerald-950/20">
              Discuss your project
              <ArrowRight size={14} className="text-primary" />
            </Link>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
export const Features = FeaturesSection;
