'use client';

import React from 'react';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';

const DEFAULT_STEPS = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Discovery',
    description: 'We analyze all project requirements to understand your core business logic.\nProvide clear obligations and technical evaluations to start solutions together.\nEstablish a strategic roadmap and clear project goals from day one.',
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Design',
    description: 'In the design phase, the visual identity and UI/UX of your project is refined.\nThe prototype is developed iteratively until reaching your complete satisfaction.\nAdditions are meticulously recorded and incorporated into the development blueprint.',
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Development',
    description: 'Full-scale implementation begins based on the approved high-fidelity prototypes.\nWe use modern stacks like React and Next.js to ensure performance and scalability.\nYou will receive regular updates and transparent progress on ongoing work.',
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Testing',
    description: 'Comprehensive feature testing ensures every functionality works flawlessly.\nQuality assurance is our most critical step before handing over the project.\nEvery correction needed is logged and addressed to achieve a zero-bug state.',
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Improvement',
    description: 'Findings from the rigorous testing phase are corrected and deeply implemented.\nWe polish the user experience and optimize performance for production.\nThe client reviews the final product through a transparent proofing process.',
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Completion',
    description: 'Finally, your software is live, properly integrated, and working perfectly.\nWe provide a full handover of production assets and essential documentation.\nWe ensure you are 100% satisfied with the outcome of your new platform.',
  },
];

const lottieUrls: Record<number, string> = {
  1: 'https://lottie.host/8ddf9e05-d506-4b9d-ba65-0725c4242e9f/gyX6LlaFMh.lottie',
  2: 'https://lottie.host/e451eb3b-f24e-43e3-a5ea-3df9dd43f11a/6SuhbeUjIk.lottie',
  3: 'https://lottie.host/a0d03b15-c39c-4004-8bb9-72b843eba18c/q2EvKtZs3x.lottie',
  4: 'https://lottie.host/b685a7d3-2953-4368-bc22-7eaa8100ca32/is83ivHM4F.lottie',
  5: 'https://lottie.host/e882bf67-e306-42a8-b6de-2f4b48aaf968/1qFH4uxT22.lottie',
  6: 'https://lottie.host/df2ce67b-7845-4c8d-af43-1943d139397b/WX6N92vYMy.lottie',
};

export default function DevelopmentProcess({
  initialSteps
}: {
  initialSteps?: {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
  }[];
}) {
  const stepsList = initialSteps || DEFAULT_STEPS;

  return (
    <section className="px-6 py-24 md:py-32 font-outfit bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-5xl mx-auto">
          <h2 className="text-balance text-4xl font-semibold md:text-5xl tracking-tight text-zinc-900 dark:text-white font-outfit">
            Our Strategic Development Process
          </h2>
          <p className="text-zinc-650 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto font-outfit">
            We partner with you to engineer solutions that scale. From initial
            discovery to final deployment, we ensure every step is handled with
            architectural precision.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28 mt-24">
          {stepsList.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const lottieUrl = lottieUrls[step.stepNumber] || lottieUrls[1];
            const stepNumStr = String(step.stepNumber).padStart(2, '0');

            return (
              <div key={step.id || idx} className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-24 group">
                <div className={`relative flex justify-center ${isEven ? '' : 'order-first md:order-last'}`}>
                  <div className="absolute inset-0 blur-[120px] rounded-full scale-150 bg-green-400/20 group-hover:bg-emerald-400/35 transition-colors duration-700"></div>
                  <div className="w-full max-w-100 lg:max-w-120 aspect-square relative z-10 group-hover:scale-[1.03] group-hover:rotate-1 transition-all duration-700 ease-out">
                    <DotLottieReact
                      src={lottieUrl}
                      loop
                      autoplay
                    />
                  </div>
                </div>
                <div className={`relative tilt-card-3d p-8 md:p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 bg-white/30 dark:bg-slate-900/20 backdrop-blur-md ${isEven ? '' : 'order-last md:order-first'}`}>
                  <span className="absolute -top-12 md:-top-16 left-6 text-[100px] md:text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-200/60 to-slate-200/0 dark:from-slate-800/40 dark:to-slate-800/0 select-none -z-10 leading-none group-hover:from-emerald-500/20 group-hover:to-teal-500/0 group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 ease-out tilt-card-3d-child">
                    {stepNumStr}
                  </span>
                  <div className="mb-6 space-y-2 tilt-card-3d-child">
                    <span className="text-primary font-medium tracking-widest text-sm uppercase block">
                      Step {stepNumStr}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  <div className="space-y-4 tilt-card-3d-child text-zinc-650 dark:text-slate-355 text-base leading-relaxed">
                    {step.description.split('\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
