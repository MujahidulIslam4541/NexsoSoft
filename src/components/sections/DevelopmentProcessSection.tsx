'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react';

function StepLottie({ src }: { src: string }) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !dotLottie) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dotLottie.play();
        } else {
          dotLottie.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [dotLottie]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <DotLottieReact
        src={src}
        loop
        autoplay={false}
        dotLottieRefCallback={setDotLottie}
      />
    </div>
  );
}

import { PROCESS_STEPS, LOTTIE_URLS, type ProcessStep } from '@/constants/process';

export default function DevelopmentProcessSection({
  initialSteps = PROCESS_STEPS,
}: {
  initialSteps?: ProcessStep[];
}) {
  const stepsList = initialSteps;

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
            const lottieUrl = LOTTIE_URLS[step.stepNumber] || LOTTIE_URLS[1];
            const stepNumStr = String(step.stepNumber).padStart(2, '0');

            return (
              <div key={step.id || idx} className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-24 group">
                <div className={`relative flex justify-center ${isEven ? '' : 'order-first md:order-last'}`}>
                  <div className="absolute inset-0 blur-[120px] rounded-full scale-150 bg-green-400/20 group-hover:bg-emerald-400/35 transition-colors duration-700"></div>
                  <div className="w-full max-w-100 lg:max-w-120 aspect-square relative z-10 group-hover:scale-[1.03] group-hover:rotate-1 transition-all duration-700 ease-out">
                    <StepLottie src={lottieUrl} />
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

export const DevelopmentProcess = DevelopmentProcessSection;
