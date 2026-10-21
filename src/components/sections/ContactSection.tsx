'use client';

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {Mail, Phone, MapPin} from 'lucide-react';
import {CONTACT_DETAILS} from '@/constants/contact';

/* ─── Floating Label Input ──────────────────────────────────── */
function FloatingInput({
  id,
  label,
  type = 'text',
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="floating-label-group relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        required={required}
        suppressHydrationWarning
        className="peer w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-6 pb-2 text-sm text-slate-900 dark:text-slate-100
          focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
          transition-all duration-200 placeholder-transparent"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-sm text-slate-400 pointer-events-none px-1 bg-white dark:bg-slate-900
          transition-all duration-200 ease-out
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
          peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-500 dark:peer-[:not(:placeholder-shown)]:text-slate-400">
        {label}
      </label>
    </div>
  );
}

/* ─── Floating Label Textarea ───────────────────────────────── */
function FloatingTextarea({
  id,
  label,
  rows = 5,
  required,
}: {
  id: string;
  label: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <div className="floating-label-group textarea-group relative">
      <textarea
        id={id}
        name={id}
        placeholder=" "
        rows={rows}
        required={required}
        suppressHydrationWarning
        className="peer w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-7 pb-3 text-sm text-slate-900 dark:text-slate-100
          focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
          transition-all duration-200 placeholder-transparent resize-none min-h-[120px]"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-sm text-slate-400 pointer-events-none px-1 bg-white dark:bg-slate-900
          transition-all duration-200 ease-out
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
          peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-500 dark:peer-[:not(:placeholder-shown)]:text-slate-400">
        {label}
      </label>
    </div>
  );
}

/* ─── Contact Info Pill Card ────────────────────────────────── */
function ContactPill({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-green-50 dark:bg-emerald-950/20 border border-green-100 dark:border-emerald-900/30 rounded-2xl px-5 py-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
      <div className="size-10 rounded-full bg-white dark:bg-slate-900 border border-green-200 dark:border-emerald-800/40 flex items-center justify-center shrink-0 shadow-sm">
        <Icon className="size-5 text-primary" />
      </div>
      <div className="space-y-0.5 min-w-0">
        <p className="text-slate-900 dark:text-slate-100 text-xs font-semibold font-outfit uppercase tracking-wider">
          {title}
        </p>
        {href ? (
          <Link
            href={href}
            className="text-slate-600 dark:text-slate-350 hover:text-primary dark:hover:text-primary transition-colors text-sm leading-tight block truncate">
            {value}
          </Link>
        ) : (
          <p className="text-slate-600 dark:text-slate-350 text-sm leading-tight">{value}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function ContactSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      {threshold: 0.2},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-950 @container py-24 md:py-32 border-t border-slate-200 dark:border-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative background SVG shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large circle — top right */}
        <svg
          className="absolute -top-32 -right-32 opacity-[0.04] text-primary"
          width="500" height="500" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="249" stroke="currentColor" strokeWidth="2"/>
          <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="250" cy="250" r="110" stroke="currentColor" strokeWidth="1"/>
        </svg>
        {/* Triangle — bottom left */}
        <svg
          className="absolute -bottom-20 -left-20 opacity-[0.04] text-primary"
          width="400" height="400" viewBox="0 0 400 400" fill="none">
          <polygon points="200,20 380,380 20,380" stroke="currentColor" strokeWidth="2"/>
          <polygon points="200,80 320,360 80,360" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        {/* Small dot grid */}
        <div className="absolute inset-0 dot-grid-bg opacity-30" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div ref={headerRef} className="reveal text-center md:text-left space-y-4">
          <h2 className="text-balance text-4xl font-semibold md:text-5xl tracking-tight text-slate-900 dark:text-white font-outfit">
            Let&apos;s Build Your Vision Together
          </h2>
          <p className="text-slate-650 dark:text-slate-400 text-lg leading-relaxed max-w-2xl font-outfit">
            Ready to turn your ideas into a high-performance reality? Reach out
            today and start your journey towards digital excellence.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5 mt-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_DETAILS.map((c, i) => {
              const iconMap = { email: Mail, phone: Phone, location: MapPin };
              return (
                <ContactPill
                  key={i}
                  icon={iconMap[c.type]}
                  title={c.title}
                  value={c.value}
                  href={c.href}
                />
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg dark:shadow-none shadow-slate-200/30 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {success && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-primary text-sm font-semibold animate-fade-in">
                  ✓ Your message has been sent successfully! We will get back to you soon.
                </div>
              )}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold animate-fade-in">
                  ✗ {error}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-5">
                <FloatingInput id="name" label="Name" required />
                <FloatingInput id="email" label="Email" type="email" required />
              </div>

              <FloatingInput id="subject" label="Subject — How can we help you?" />

              <FloatingTextarea
                id="message"
                label="Share Your Plan — Tell us about your project..."
                rows={5}
                required
              />

              {/* Shine button */}
              <button
                type="submit"
                id="contact-submit-btn"
                disabled={loading}
                className="shine-btn w-full h-12 rounded-xl bg-primary text-white text-base font-semibold
                  transition-all duration-300
                  hover:bg-secondary hover:shadow-[0_0_24px_rgba(16,185,129,0.45)]
                  active:scale-[0.98]
                  focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Contact = ContactSection;
