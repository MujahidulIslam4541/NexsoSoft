'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { HeroHeader } from '@/components/header';
import FooterTwo from '@/components/footer-two';
import {
  MapPin, Briefcase, DollarSign, Clock, ArrowLeft, Send,
  CheckCircle2, User, Mail, Phone, FileText, ExternalLink, ChevronDown,
} from 'lucide-react';

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salaryRange?: string | null;
  createdAt: string;
};

const TYPE_COLORS: Record<string, string> = {
  'Full-time':  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'Part-time':  'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
  'Remote':     'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30',
  'Internship': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  'Contract':   'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
};

const emptyForm = { name: '', email: '', phone: '', coverLetter: '', portfolioUrl: '' };

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadJob() {
      try {
        const res = await fetch(`/api/careers/${id}`);
        if (res.status === 404) { setNotFound(true); return; }
        const data = await res.json();
        if (data.success) setJob(data.data);
      } catch { setNotFound(true); }
      finally { setLoading(false); }
    }
    if (id) loadJob();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setError('Please upload your CV.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      // 1. Upload CV file
      const formData = new FormData();
      formData.append('file', cvFile);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const uploadData = await uploadRes.json();
      
      if (!uploadRes.ok) {
        setError(uploadData.error || 'Failed to upload CV. Please try again.');
        setSubmitting(false);
        return;
      }

      // 2. Submit application with cvUrl
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: id, cvUrl: uploadData.url, ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Failed to submit your application. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-white dark:bg-slate-950 font-outfit px-6">
        <Briefcase className="size-16 text-slate-300 dark:text-slate-700" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job Not Found</h1>
        <p className="text-slate-500 text-sm text-center max-w-sm">This position may have been filled or is no longer active.</p>
        <Link href="/careers" className="flex items-center gap-2 text-primary font-semibold hover:underline">
          <ArrowLeft className="size-4" /> Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-outfit">
      <HeroHeader />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* Back link */}
        <Link href="/careers"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-8">
          <ArrowLeft className="size-4" /> All Openings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-10 items-start">

          {/* ── LEFT: Job Details ────────────────────── */}
          <div className="space-y-8">
            {/* Job header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${TYPE_COLORS[job.type] || 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}`}>
                  {job.type}
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full border bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700">
                  {job.department}
                </span>
              </div>

              <h1 className="text-[clamp(1.8rem,4vw,2.75rem)] font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-5 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><MapPin className="size-4 text-slate-400" />{job.location}</span>
                {job.salaryRange && <span className="flex items-center gap-1.5"><DollarSign className="size-4 text-slate-400" />{job.salaryRange}</span>}
                <span className="flex items-center gap-1.5"><Clock className="size-4 text-slate-400" />
                  Posted {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">About the Role</h2>
              <div className="text-slate-600 dark:text-slate-400 text-sm leading-[1.9] whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Requirements</h2>
              <div className="space-y-2">
                {job.requirements.split('\n').filter(r => r.trim()).map((req, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="size-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    <span className="leading-relaxed">{req.replace(/^[-•*]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile-only apply CTA */}
            <div className="lg:hidden">
              <a href="#apply-form"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 text-sm">
                Apply for this Position <Send className="size-4" />
              </a>
            </div>
          </div>

          {/* ── RIGHT: Application Form ───────────────── */}
          <div id="apply-form" className="sticky top-24">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-100/80 dark:shadow-none">
              {submitted ? (
                /* ── Success state ── */
                <div className="text-center space-y-5 py-6">
                  <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="size-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Application Sent!</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Thanks for applying for <strong className="text-slate-700 dark:text-slate-300">{job.title}</strong>. We&apos;ll review your application and get back to you shortly.
                  </p>
                  <Link href="/careers"
                    className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline mt-2">
                    <ArrowLeft className="size-4" /> Back to all positions
                  </Link>
                </div>
              ) : (
                /* ── Form ── */
                <>
                  <div className="mb-6 space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Apply Now</h2>
                    <p className="text-xs text-slate-500">All fields marked * are required.</p>
                  </div>

                  {error && (
                    <div className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <input
                          required type="text"
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <input
                          required type="email"
                          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="you@email.com"
                          className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <input
                          required type="tel"
                          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="+880 17XX XXX XXXX"
                          className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    {/* Portfolio */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Portfolio / GitHub / LinkedIn</label>
                      <div className="relative">
                        <ExternalLink className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <input
                          type="url"
                          value={form.portfolioUrl} onChange={e => setForm({ ...form, portfolioUrl: e.target.value })}
                          placeholder="https://yourportfolio.com"
                          className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        />
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cover Letter *</label>
                      <textarea
                        required rows={5}
                        value={form.coverLetter} onChange={e => setForm({ ...form, coverLetter: e.target.value })}
                        placeholder="Tell us why you're a great fit for this role and what excites you about working at StackMajix…"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-all text-slate-900 dark:text-white resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      />
                    </div>

                    {/* CV Upload */}
                    <div className="space-y-1.5 pb-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Upload CV / Resume *</label>
                      <input
                        required type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={e => setCvFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-slate-500 dark:text-slate-400
                          file:mr-4 file:py-2.5 file:px-4
                          file:rounded-xl file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary/10 file:text-primary
                          hover:file:bg-primary/20
                          border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950
                          cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-400">Accepted formats: PDF, DOC, DOCX. Max size 5MB.</p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit" disabled={submitting}
                      className="w-full h-12 bg-primary hover:bg-emerald-600 disabled:opacity-60 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/15 text-sm cursor-pointer"
                    >
                      {submitting ? (
                        <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Send className="size-4" /> Submit Application</>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                      By submitting, you agree to our{' '}
                      <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <FooterTwo />
    </div>
  );
}
