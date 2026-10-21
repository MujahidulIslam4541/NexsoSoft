'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <Shield className="size-4 animate-pulse" />
            <span>Trust & Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Last Updated: June 25, 2026. Your privacy and trust are paramount to us at StackMajix.
          </p>
        </div>

        {/* Policy Body */}
        <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-none backdrop-blur-sm space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <FileText className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                1. Introduction
              </h2>
            </div>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              Welcome to StackMajix (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at <a href="mailto:stackmajix@gmail.com" className="text-primary hover:underline font-semibold">stackmajix@gmail.com</a>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <Eye className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                2. Information We Collect
              </h2>
            </div>
            <div className="space-y-3 text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, or when you contact us.</p>
              <ul className="grid gap-2.5 mt-2 pl-4 list-none">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Contact Data:</strong> Name, email address, phone number, and details regarding your software projects or inquiries.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Usage Data:</strong> Information automatically collected when you visit our website, including your IP address, browser type, operating system, and pages viewed.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Cookies:</strong> Standard tracking technologies to improve performance, analyze usage, and customize your experience. See our Cookie Policy for more details.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <Lock className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                3. How We Use Your Information
              </h2>
            </div>
            <div className="space-y-3 text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              <p>We use personal information collected via our Site for a variety of business purposes described below:</p>
              <ul className="grid gap-2.5 mt-2 pl-4 list-none">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span>To respond to your user inquiries and fulfill request for services.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span>To send administrative information, project updates, or legal notices to you.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span>To optimize, troubleshoot, and monitor the health and performance of our digital solutions.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span>To comply with legal obligations and prevent fraud or malicious activities.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <Shield className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                4. Information Sharing & Security
              </h2>
            </div>
            <div className="space-y-3 text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              <p>We only share information with your consent, to comply with laws, or to protect our rights. We do not sell or lease your personal information to third parties.</p>
              <p>We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-green-50 dark:bg-emerald-950/40 border border-green-150 dark:border-emerald-900/30 flex items-center justify-center text-primary shrink-0">
                <CheckCircle className="size-4.5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                5. Your Privacy Rights
              </h2>
            </div>
            <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm md:text-base">
              Depending on your location, you may have rights under applicable data protection laws (such as GDPR or CCPA). These may include the right to request access to and obtain a copy of your personal information, request rectification or erasure, or restrict processing of your data. To make such a request, please contact us.
            </p>
          </section>

          {/* Contact Section inside Policy */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Questions? Contact StackMajix Support</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Email us at <a href="mailto:stackmajix@gmail.com" className="text-primary hover:underline font-semibold">stackmajix@gmail.com</a> or call <a href="tel:01307164307" className="text-primary hover:underline font-semibold">01307164307</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
