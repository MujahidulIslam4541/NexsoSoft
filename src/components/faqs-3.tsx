'use client';

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {DynamicIcon, type IconName} from 'lucide-react/dynamic';
import Link from 'next/link';
import React, {useEffect, useRef, useState} from 'react';

type FAQItem = {id: string; icon: IconName; question: string; answer: string};

const faqItems: FAQItem[] = [
  {
    id: 'item-1', icon: 'code-2',
    question: 'What types of software services do you provide?',
    answer: 'We specialize in custom web applications, mobile app development (iOS & Android), and backend systems. Whether you need a modern website or a complex business tool, we have the expertise to build it.',
  },
  {
    id: 'item-2', icon: 'cpu',
    question: 'What technology stack do you use?',
    answer: 'We primarily work with React, Next.js, and Node.js for high-performance applications. For styling and UI, we use Tailwind CSS, and for database management, we rely on modern solutions like Supabase, PostgreSQL, and MongoDB.',
  },
  {
    id: 'item-3', icon: 'calendar',
    question: 'How long does it take to complete a project?',
    answer: 'A typical project can take anywhere from 4 to 12 weeks depending on its size and complexity. We follow an agile process, delivering parts of the software in small phases so you can see progress early and often.',
  },
  {
    id: 'item-4', icon: 'message-square',
    question: 'How do we communicate during development?',
    answer: 'Communication is key to our success. We use tools like Slack for daily updates and hold weekly video calls to show you the latest progress. You will have a dedicated project manager to answer any questions at any time.',
  },
  {
    id: 'item-5', icon: 'life-buoy',
    question: 'Do you offer support after the project is finished?',
    answer: 'Yes, we provide ongoing maintenance and support packages to ensure your software stays secure and updated. We are always here to help you add new features or fix any issues as your business grows.',
  },
];

export default function FAQsThree({
  initialFAQs
}: {
  initialFAQs?: {
    id: string;
    question: string;
    answer: string;
    iconName: string;
    order: number;
  }[];
}) {
  const [open, setOpen] = useState<string | undefined>(undefined);
  const headerRef = useRef<HTMLDivElement>(null);

  const faqsList = initialFAQs
    ? initialFAQs.map((f) => ({
        id: f.id,
        icon: f.iconName as IconName,
        question: f.question,
        answer: f.answer,
      }))
    : faqItems;

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
      {/* Border glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      {/* Grid bg */}
      <div className="absolute inset-0 hero-grid opacity-10 pointer-events-none" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left sticky */}
          <div className="lg:w-80 shrink-0">
            <div ref={headerRef} className="reveal lg:sticky lg:top-24 space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">FAQ</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Frequently Asked<br />
                <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg,#34d399,#10b981)'}}>
                  Questions
                </span>
              </h2>

              <p className="text-slate-650 dark:text-slate-400 text-[15px] leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Contact our{' '}
                <Link href="#contact" className="text-primary hover:text-secondary underline underline-offset-2 transition-colors">
                  support team
                </Link>
              </p>

              {/* Decorative lines */}
              <div className="space-y-2 pt-2">
                {[100, 70, 45].map((w, i) => (
                  <div key={i} className="h-px bg-gradient-to-r from-primary/30 to-transparent" style={{width: `${w}%`}} />
                ))}
              </div>
            </div>
          </div>

          {/* Right accordion */}
          <div className="flex-1">
            <Accordion type="single" collapsible className="space-y-3" value={open} onValueChange={setOpen}>
              {faqsList.map((item) => {
                const isOpen = open === item.id;
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className={`rounded-2xl border overflow-hidden transition-all duration-300
                      ${isOpen
                        ? 'border-primary bg-emerald-50/10 dark:bg-emerald-950/10 shadow-lg dark:shadow-none shadow-emerald-500/5'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-primary/30 hover:bg-slate-50/50 dark:hover:bg-slate-900/80'
                      }`}>
                    <AccordionTrigger className="px-6 py-5 hover:no-underline cursor-pointer">
                      <div className="flex items-center gap-4 text-left">
                        <div className={`size-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                          ${isOpen ? 'bg-primary/20 border border-primary/30' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800'}`}>
                          <DynamicIcon name={item.icon} className={`size-4 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`} />
                        </div>
                        <span className={`text-[15px] font-semibold transition-colors duration-200 ${isOpen ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-slate-350'}`}>
                          {item.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="pl-12">
                        <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">{item.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
