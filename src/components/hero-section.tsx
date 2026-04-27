import React from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {HeroHeader} from './header';
import {InfiniteSlider} from '@/components/ui/infinite-slider';
import {ProgressiveBlur} from '@/components/ui/progressive-blur';
import {ChevronRight} from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiCss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiLaravel,
  SiPhp,
  SiPrisma,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiOpenai,
} from 'react-icons/si';
import {FaAws} from 'react-icons/fa';

export default function HeroSection() {
  return (
    <>
      <HeroHeader />

      <main className="overflow-x-hidden">
        <section className="bg-background">
          <div className="relative">
            {/* Text Content */}
            <div className="relative z-10 flex min-h-[70vh] flex-col justify-center px-6 lg:min-h-[85vh]">
              <div className="mx-auto w-full max-w-7xl pt-12 lg:px-12 lg:pt-20">
                <div className="max-w-lg">
                  <h1 className="text-balance text-5xl md:text-6xl xl:text-7xl ">
                    Build Stunning Websites That Drive Results
                  </h1>
                  <p className="mt-6 text-balance text-lg">
                    Craft. Build. Ship Modern Websites With Latest Technology
                    and AI Support.
                  </p>

                  <div className="mt-8 flex items-center gap-2">
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-full pl-5 pr-3 text-base bg-primary text-white hover:bg-green-600 transition-colors duration-300">
                      <Link href="#link">
                        <span className="text-nowrap">Start Building</span>
                        <ChevronRight className="ml-1" />
                      </Link>
                    </Button>
                    <Button
                      key={2}
                      asChild
                      size="lg"
                      variant="ghost"
                      className="h-12 rounded-full px-5 text-base text-slate-900 hover:bg-slate-100 transition-colors duration-300">
                      <Link href="#link">
                        <span className="text-nowrap">Request a Building</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Seamless Blended Video Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="not-dark:invert size-full -scale-x-100 object-contain mix-blend-screen opacity"
                src="https://videos.pexels.com/video-files/35968183/15249566_1920_1080_30fps.mp4"></video>

              {/* Magic Gradients to fade edges into background */}
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
              <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-background"></div>
            </div>
          </div>
        </section>

        <section className="bg-background py-6 relative z-10">
          <div className="group relative m-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">
                  Powering The Latest Technology
                </p>
              </div>
              <div className="**:fill-foreground relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={80}>
                  <div className="flex items-center gap-2">
                    <SiReact size={28} />
                    <span className="text-sm font-semibold">React</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiNextdotjs size={28} />
                    <span className="text-sm font-semibold">Next.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiTailwindcss size={28} />
                    <span className="text-sm font-semibold">Tailwind</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiCss size={28} />
                    <span className="text-sm font-semibold">CSS3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiHtml5 size={28} />
                    <span className="text-sm font-semibold">HTML5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiNodedotjs size={28} />
                    <span className="text-sm font-semibold">Node.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiExpress size={28} />
                    <span className="text-sm font-semibold">Express</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiNestjs size={28} />
                    <span className="text-sm font-semibold">NestJS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiLaravel size={28} />
                    <span className="text-sm font-semibold">Laravel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiPhp size={28} />
                    <span className="text-sm font-semibold">PHP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiPrisma size={28} />
                    <span className="text-sm font-semibold">Prisma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiMysql size={28} />
                    <span className="text-sm font-semibold">MySQL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiMongodb size={28} />
                    <span className="text-sm font-semibold">MongoDB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaAws size={28} />
                    <span className="text-sm font-semibold">AWS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiDocker size={28} />
                    <span className="text-sm font-semibold">Docker</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SiOpenai size={28} />
                    <span className="text-sm font-semibold">AI Support</span>
                  </div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20 pointer-events-none"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20 pointer-events-none"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
