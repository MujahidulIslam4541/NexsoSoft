'use client';

import Image from 'next/image';
import React, {useEffect, useRef, useState} from 'react';

const testimonials = [
  {
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250&h=250&auto=format&fit=crop',
    name: 'Tanvir Ahmed',
    role: 'Founder of ShopEase BD',
    quote: 'StackMajix helped us scale our delivery platform during the peak festive season. Their technical support and 24/7 availability were lifesavers for our local business.',
    accent: 'from-emerald-500/10 to-primary/5',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
    name: 'David Miller',
    role: 'Tech Lead at RetailHub',
    quote: "We needed a reliable partner for our cloud transition. They didn't just perform the migration; they optimized our entire workflow for performance.",
    accent: 'from-sky-500/10 to-blue-500/5',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
    name: 'James Wilson',
    role: 'Operations Manager',
    quote: "The software they developed for our inventory tracking has been zero-bug for over 6 months now. It's exactly what we needed for our warehouse teams.",
    accent: 'from-violet-500/10 to-purple-500/5',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=250&h=250&auto=format&fit=crop',
    name: 'Robert Smith',
    role: 'Software Architect',
    quote: "Their code quality is cleaner than anything we've seen from other external partners. They follow best practices religiously and it shows in the final product.",
    accent: 'from-amber-500/10 to-orange-500/5',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="size-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({
  initialTestimonials
}: {
  initialTestimonials?: {
    id: string;
    clientName: string;
    feedback: string;
    role: string;
    rating: number;
    avatarUrl: string;
  }[];
}) {
  const testimonialsList = initialTestimonials
    ? initialTestimonials.map((t, idx) => {
        const accents = [
          'from-emerald-500/10 to-primary/5',
          'from-sky-500/10 to-blue-500/5',
          'from-violet-500/10 to-purple-500/5',
          'from-amber-500/10 to-orange-500/5',
        ];
        return {
          avatar: t.avatarUrl,
          name: t.clientName,
          role: t.role,
          quote: t.feedback,
          accent: accents[idx % accents.length],
        };
      })
    : testimonials;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(p => (p + 1) % testimonialsList.length), 4000);
    return () => clearInterval(id);
  }, [paused, testimonialsList.length]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); }
    }, {threshold: 0.2});
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-white dark:bg-slate-950 overflow-hidden py-28 md:py-36 transition-colors duration-300">
      {/* Border glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 dark:via-slate-800 to-transparent" />

      {/* Big decorative "—quote mark */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-[16rem] leading-none font-serif text-emerald-500/5 dark:text-emerald-500/3 select-none pointer-events-none" aria-hidden>
        &ldquo;
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="reveal text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
            <div className="size-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Client stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by{' '}
            <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg,#34d399,#10b981)'}}>
              Industry Leaders
            </span>
          </h2>
          <p className="text-slate-650 dark:text-slate-400 text-lg max-w-xl mx-auto">
            We&apos;ve collaborated with fast-growing startups and established enterprises to build software that moves the needle.
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>
          {testimonialsList.map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`relative group overflow-hidden rounded-2xl border p-7 cursor-pointer
                transition-all duration-500 ease-out
                ${i === active
                  ? 'border-primary bg-emerald-50/15 dark:bg-emerald-950/10 shadow-xl dark:shadow-none shadow-emerald-500/5 scale-[1.02]'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-primary/30 hover:-translate-y-1 hover:shadow-md'
                }`}>

              {/* Corner gradient blob */}
              <div className={`absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br ${t.accent} blur-3xl opacity-0 group-hover:opacity-100 ${i === active ? 'opacity-100' : ''} transition-opacity duration-500 pointer-events-none`} />

              {/* Big quote deco */}
              <div className="absolute top-4 right-6 text-7xl leading-none font-serif text-slate-200/30 dark:text-slate-800/30 select-none pointer-events-none" aria-hidden>&ldquo;</div>

              {/* Stars */}
              <Stars />

              {/* Quote */}
              <p className="mt-4 text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed italic mb-6 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative size-11 shrink-0">
                  <div className="absolute inset-0 rounded-full p-[2px]"
                    style={{background: 'linear-gradient(135deg,#34d399,#10b981)'}}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-900">
                      <Image src={t.avatar} alt={t.name} className="object-cover w-full h-full" width={44} height={44} unoptimized />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-slate-200 font-bold text-sm leading-tight">{t.name}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{t.role}</p>
                </div>
                {i === active && (
                  <div className="ml-auto size-2 rounded-full bg-primary animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dot nav */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonialsList.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === active ? 'w-7 h-2 bg-primary' : 'w-2 h-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
