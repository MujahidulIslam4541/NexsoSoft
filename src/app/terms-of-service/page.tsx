'use client';

import React from 'react';
import { HeroHeader } from '@/components/header';
import { FileText, FileSignature, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen font-outfit bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <HeroHeader />

      {/* Decorative Background Elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-teal-500/0 blur-3xl opacity-50 dark:opacity-30" />
        <div className="absolute top-[20%] left-[-100px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/5 to-emerald-500/0 blur-3xl opacity-40 dark:opacity-20" />
        <div className="absolute inset-0 dot-grid-bg opacity-[0.15] dark:opacity-[0.07]" />
      </div>

      {/* Main Content Container */}
      <main className="relative mx-auto max-w-4xl px-6 pt-36 pb-24 md:pt-40 md:pb-32">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-emerald-950/30 border border-green-100 dark:border-emerald-900/30 text-primary text-sm font-semibold tracking-wide uppercase">
            <Scale className="size-4 animate-pulse" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Last Updated: June 25, 2026. Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Terms Body */}
        <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-none backdrop-blur-sm space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <FileSignature className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                1. Agreement to Terms
              </h2>
            </div>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and StackMajix (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), concerning your access to and use of the <a href="https://stack-mjix.vercel.app" className="text-primary hover:underline font-semibold">stack-mjix.vercel.app</a> website as well as any other media form, channel, mobile website or application related, linked, or otherwise connected thereto.
            </p>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              By accessing the site or utilizing our software development services, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <FileText className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                2. Intellectual Property Rights
              </h2>
            </div>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              Unless otherwise indicated, the Site and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <CheckCircle className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                3. User Representations & Service Delivery
              </h2>
            </div>
            <div className="space-y-3 text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              <p>By using the Site, you represent and warrant that:</p>
              <ul className="grid gap-2.5 mt-2 pl-4 list-none">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span>All registration and project information you submit will be true, accurate, current, and complete.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span>You have the legal capacity and you agree to comply with these Terms of Service.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span>Our software development, design, and consultancy deliverables will be delivered according to milestones agreed upon in individual Service Level Agreements (SLAs) or Statement of Works (SOWs) signed separately.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <AlertTriangle className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                4. Prohibited Activities
              </h2>
            </div>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. Prohibited activity includes downloading, hacking, reverse-engineering, or copying components of our services without authorization.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <Scale className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                5. Limitation of Liability
              </h2>
            </div>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or our custom software builds, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Contact Section inside Terms */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Legal Questions? Contact Us</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Email us at <a href="mailto:stackmajix@gmail.com" className="text-primary hover:underline font-semibold">stackmajix@gmail.com</a> or call <a href="tel:01307164307" className="text-primary hover:underline font-semibold">01307164307</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
