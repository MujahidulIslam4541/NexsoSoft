import Link from 'next/link';
import { prisma } from '@/lib/db';
import { MapPin, Briefcase, Clock, DollarSign, ArrowRight, Users, Zap } from 'lucide-react';
import { HeroHeader } from '@/components/header';
import FooterTwo from '@/components/footer-two';

export const metadata = {
  title: 'Careers — StackMajix | Join Our Team',
  description: 'Explore open positions at StackMajix. We are hiring passionate engineers, designers, and innovators to help us build world-class software.',
};

const TYPE_COLORS: Record<string, string> = {
  'Full-time':  'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
  'Part-time':  'bg-sky-500/10 text-sky-500 border-sky-500/30',
  'Remote':     'bg-violet-500/10 text-violet-500 border-violet-500/30',
  'Internship': 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  'Contract':   'bg-rose-500/10 text-rose-500 border-rose-500/30',
};

export default async function CareersPage() {
  const jobs = await prisma.careerJob.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { applications: true } } },
  }).catch(() => []);

  const departments = [...new Set(jobs.map(j => j.department))];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-outfit">
      <HeroHeader />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white dark:bg-slate-950">
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase">
            <Zap className="size-3.5" /> We&apos;re Hiring
          </div>

          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1.12] tracking-tight text-slate-900 dark:text-white">
            Build the Future <br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #10b981, #059669)' }}>
              With Us
            </span>
          </h1>

          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join a passionate team of engineers, designers, and problem-solvers building world-class software for ambitious businesses across the globe.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{jobs.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">Open Positions</p>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-800 self-stretch hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{departments.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">Departments</p>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-800 self-stretch hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">100%</p>
              <p className="text-xs text-slate-500 mt-0.5">Remote Friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Job Listings ─────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-6">
        {jobs.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <Briefcase className="size-14 text-slate-300 dark:text-slate-700 mx-auto" />
            <h2 className="text-xl font-bold text-slate-600 dark:text-slate-400">No Open Positions Right Now</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              We don&apos;t have any active openings at the moment, but check back soon or reach out to us directly.
            </p>
            <Link href="/#contact"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-primary text-white text-sm font-bold rounded-full hover:bg-emerald-600 transition-all">
              Get in Touch <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Department groups */}
            {departments.map(dept => {
              const deptJobs = jobs.filter(j => j.department === dept);
              return (
                <div key={dept} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{dept}</h2>
                    <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600">
                      {deptJobs.length} {deptJobs.length === 1 ? 'role' : 'roles'}
                    </span>
                  </div>

                  {deptJobs.map(job => (
                    <Link
                      key={job.id}
                      href={`/careers/${job.id}`}
                      className="group block bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5"><MapPin className="size-4 text-slate-400" />{job.location}</span>
                            {job.salaryRange && (
                              <span className="flex items-center gap-1.5"><DollarSign className="size-4 text-slate-400" />{job.salaryRange}</span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <Users className="size-4 text-slate-400" />
                              {job._count.applications} applied
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="size-4 text-slate-400" />
                              <span suppressHydrationWarning>
                                {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${TYPE_COLORS[job.type] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                            Apply <ArrowRight className="size-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })}
          </>
        )}
      </section>

      {/* ── CTA Band ─────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Don&apos;t see the right role?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            We&apos;re always on the lookout for great talent. Send us your portfolio and let us know how you&apos;d like to contribute.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
          >
            Say Hello <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <FooterTwo />
    </div>
  );
}
