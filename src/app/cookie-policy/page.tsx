'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Eye, FileText, CheckCircle, HelpCircle } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="relative min-h-screen font-outfit bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <Header />

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
            <HelpCircle className="size-4 animate-pulse" />
            <span>Tracking & Analytics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Last Updated: June 25, 2026. This policy explains how and why we use cookies on our website.
          </p>
        </div>

        {/* Cookie Policy Body */}
        <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-none backdrop-blur-sm space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <FileText className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                1. What are Cookies?
              </h2>
            </div>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.
            </p>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              Cookies set by the website owner (in this case, StackMajix) are called &quot;first-party cookies&quot;. Cookies set by parties other than the website owner are called &quot;third-party cookies&quot;. Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., like advertising, interactive content, and analytics).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <Eye className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                2. How We Use Cookies
              </h2>
            </div>
            <div className="space-y-3 text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Site.</p>
              <ul className="grid gap-2.5 mt-2 pl-4 list-none">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Essential Website Cookies:</strong> These cookies are strictly necessary to provide you with services available through our Site and to use some of its features.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our Site but are non-essential to their use. However, without these cookies, certain functionality (like video) may become unavailable.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Site is being used or how effective our marketing campaigns are, or to help us customize our Site for you.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <HelpCircle className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                3. How Can I Control Cookies?
              </h2>
            </div>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
            </p>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              To learn more about how to manage cookies on popular browsers, please visit the official help pages of Chrome, Safari, Firefox, or Microsoft Edge.
            </p>
          </section>

          {/* Contact Section inside Cookies */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cookie Concerns? Contact Us</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Email us at <a href="mailto:stackmajix@gmail.com" className="text-primary hover:underline font-semibold">stackmajix@gmail.com</a> or call <a href="tel:01307164307" className="text-primary hover:underline font-semibold">01307164307</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
