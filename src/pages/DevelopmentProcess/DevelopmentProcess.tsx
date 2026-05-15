import React from 'react';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';

export default function DevelopmentProcess() {
  return (
    <section className="px-6 py-24 md:py-32 font-outfit !bg-white overflow-hidden">
<div className='max-w-7xl mx-auto '>
        <div className="text-center space-y-4 max-w-5xl mx-auto">
        <h2 className="text-balance text-4xl font-semibold md:text-5xl tracking-tight text-zinc-900 font-outfit">
          Our Strategic Development Process
        </h2>
        <p className="text-zinc-600 text-lg leading-relaxed max-w-2xl mx-auto font-outfit">
          We partner with you to engineer solutions that scale. From initial
          discovery to final deployment, we ensure every step is handled with
          architectural precision.
        </p>
      </div>

      <div className="space-y-32 md:space-y-48">
        {/* STEP 01 - Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-32">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 blur-[120px] rounded-full scale-150 bg-green-400/30"></div>
            <div className="w-full max-w-100 lg:max-w-125 aspect-square relative z-10">
              <DotLottieReact
                src="https://lottie.host/8ddf9e05-d506-4b9d-ba65-0725c4242e9f/gyX6LlaFMh.lottie"
                loop
                autoplay
              />
            </div>
          </div>
          <div className="relative">
            <span className="absolute -top-16 md:-top-24 left-0 text-[120px] md:text-[180px] font-black text-zinc-200 select-none -z-10 leading-none">
              01
            </span>
            <div className="mb-8 space-y-2">
              <span className="text-primary font-medium tracking-widest text-sm uppercase block">
                Step 01
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                Discovery
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                We analyze all project requirements to understand your core
                business logic.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Provide clear obligations and technical evaluations to start
                solutions together.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Establish a strategic roadmap and clear project goals from day
                one.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 02 - Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-32">
          <div className="relative order-last md:order-first">
            <span className="absolute -top-16 md:-top-24 left-0 text-[120px] md:text-[180px] font-black text-zinc-200 select-none -z-10 leading-none">
              02
            </span>
            <div className="mb-8 space-y-2">
              <span className="text-primary font-medium tracking-widest text-sm uppercase block">
                Step 02
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                Design
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                In the design phase, the visual identity and UI/UX of your
                project is refined.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                The prototype is developed iteratively until reaching your
                complete satisfaction.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Additions are meticulously recorded and incorporated into the
                development blueprint.
              </p>
            </div>
          </div>
          <div className="relative flex justify-center order-first md:order-last">
            <div className="absolute inset-0 blur-[120px] rounded-full scale-150 bg-green-400/30"></div>
            <div className="w-full max-w-100 lg:max-w-125 aspect-square relative z-10">
              <DotLottieReact
                src="https://lottie.host/e451eb3b-f24e-43e3-a5ea-3df9dd43f11a/6SuhbeUjIk.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>

        {/* STEP 03 - Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-32">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 blur-[120px] rounded-full scale-150 bg-green-400/30"></div>
            <div className="w-full max-w-100 lg:max-w-125 aspect-square relative z-10">
              <DotLottieReact
                src="https://lottie.host/a0d03b15-c39c-4004-8bb9-72b843eba18c/q2EvKtZs3x.lottie"
                loop
                autoplay
              />
            </div>
          </div>
          <div className="relative">
            <span className="absolute -top-16 md:-top-24 left-0 text-[120px] md:text-[180px] font-black text-zinc-200 select-none -z-10 leading-none">
              03
            </span>
            <div className="mb-8 space-y-2">
              <span className="text-primary font-medium tracking-widest text-sm uppercase block">
                Step 03
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                Development
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Full-scale implementation begins based on the approved
                high-fidelity prototypes.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                We use modern stacks like React and Next.js to ensure
                performance and scalability.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                You will receive regular insights and transparent updates on
                ongoing work.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 04 - Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-32">
          <div className="relative order-last md:order-first">
            <span className="absolute -top-16 md:-top-24 left-0 text-[120px] md:text-[180px] font-black text-zinc-200 select-none -z-10 leading-none">
              04
            </span>
            <div className="mb-8 space-y-2">
              <span className="text-primary font-medium tracking-widest text-sm uppercase block">
                Step 04
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                Testing
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Comprehensive feature testing ensures every functionality works
                flawlessly.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Quality assurance is our most critical step before handing over
                the project.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Every correction needed is logged and addressed to achieve a
                zero-bug state.
              </p>
            </div>
          </div>
          <div className="relative flex justify-center order-first md:order-last">
            <div className="absolute inset-0 blur-[120px] rounded-full scale-150 bg-green-400/30"></div>
            <div className="w-full max-w-100 lg:max-w-125 aspect-square relative z-10">
              <DotLottieReact
                src="https://lottie.host/b685a7d3-2953-4368-bc22-7eaa8100ca32/is83ivHM4F.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>

        {/* STEP 05 - Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-32">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 blur-[120px] rounded-full scale-150 bg-green-400/30"></div>
            <div className="w-full max-w-100 lg:max-w-125 aspect-square relative z-10">
              <DotLottieReact
                src="https://lottie.host/e882bf67-e306-42a8-b6de-2f4b48aaf968/1qFH4uxT22.lottie"
                loop
                autoplay
              />
            </div>
          </div>
          <div className="relative">
            <span className="absolute -top-16 md:-top-24 left-0 text-[120px] md:text-[180px] font-black text-zinc-200 select-none -z-10 leading-none">
              05
            </span>
            <div className="mb-8 space-y-2">
              <span className="text-primary font-medium tracking-widest text-sm uppercase block">
                Step 05
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                Improvement
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Findings from the rigorous testing phase are corrected and
                deeply implemented.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                We polish the user experience and optimize performance for
                production.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                The client reviews the final product through a transparent
                proofing process.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 06 - Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 lg:gap-32">
          <div className="relative order-last md:order-first">
            <span className="absolute -top-16 md:-top-24 left-0 text-[120px] md:text-[180px] font-black text-zinc-200 select-none -z-10 leading-none">
              06
            </span>
            <div className="mb-8 space-y-2">
              <span className="text-primary font-medium tracking-widest text-sm uppercase block">
                Step 06
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                Completion
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                Finally, your software is live, properly integrated, and working
                perfectly.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                We provide a full handover of production assets and essential
                documentation.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                We ensure you are 100% satisfied with the outcome of your new
                platform.
              </p>
            </div>
          </div>
          <div className="relative flex justify-center order-first md:order-last">
            <div className="absolute inset-0 blur-[120px] rounded-full scale-150 bg-green-400/30"></div>
            <div className="w-full max-w-100 lg:max-w-125 aspect-square relative z-10">
              <DotLottieReact
                src="https://lottie.host/df2ce67b-7845-4c8d-af43-1943d139397b/WX6N92vYMy.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
</div>
    </section>
  );
}
