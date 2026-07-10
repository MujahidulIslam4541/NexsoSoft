'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Briefcase, Users, Plus, Edit2, Trash2, CheckCircle, XCircle,
  MapPin, Clock, DollarSign, X, Eye,
  ChevronDown, ArrowRight, Phone, Mail, ExternalLink, Search,
  ToggleLeft, ToggleRight, FileText,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────── */
type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salaryRange?: string | null;
  isActive: boolean;
  createdAt: string;
  _count?: { applications: number };
};

type Application = {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvUrl: string;
  portfolioUrl?: string | null;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  appliedAt: string;
  job?: { title: string; department: string };
};

const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract'];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:     { label: 'Pending',     color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30' },
  reviewed:    { label: 'Reviewed',    color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/30' },
  shortlisted: { label: 'Shortlisted', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  rejected:    { label: 'Rejected',    color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/30' },
};

const emptyJob = { title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', salaryRange: '' };

/* ─── Alert Component ─────────────────────────────────── */
function Alert({ msg, type, onClose }: { msg: string; type: 'success' | 'error'; onClose: () => void }) {
  const isSuccess = type === 'success';
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-2xl backdrop-blur-md text-sm font-semibold animate-fade-in
      ${isSuccess ? 'bg-emerald-950/90 border-emerald-800/60 text-emerald-300' : 'bg-red-950/90 border-red-800/60 text-red-300'}`}>
      {isSuccess ? <CheckCircle className="size-5 shrink-0" /> : <XCircle className="size-5 shrink-0" />}
      <span>{msg}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <X className="size-4" />
      </button>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────── */
function CareersAdminInner() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams?.get('tab') as 'jobs' | 'applications') || 'jobs';

  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>(initialTab);

  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState(emptyJob);
  const [jobSearch, setJobSearch] = useState('');

  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [appFilter, setAppFilter] = useState<string>('all');
  const [appJobFilter, setAppJobFilter] = useState<string>('all');

  // UI state
  const [alert, setAlert] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  const showAlert = (msg: string, type: 'success' | 'error') => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 4000);
  };

  /* ── Fetch Jobs ──────────────────────────────────────── */
  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const res = await fetch('/api/admin/careers');
      const data = await res.json();
      if (res.ok) setJobs(data.data);
    } catch { showAlert('Failed to load jobs.', 'error'); }
    finally { setJobsLoading(false); }
  }, []);

  /* ── Fetch Applications ──────────────────────────────── */
  const fetchApplications = useCallback(async () => {
    setAppsLoading(true);
    try {
      const params = new URLSearchParams();
      if (appFilter !== 'all') params.set('status', appFilter);
      if (appJobFilter !== 'all') params.set('jobId', appJobFilter);
      const res = await fetch(`/api/admin/careers/applications?${params}`);
      const data = await res.json();
      if (res.ok) setApplications(data.data);
    } catch { showAlert('Failed to load applications.', 'error'); }
    finally { setAppsLoading(false); }
  }, [appFilter, appJobFilter]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);
  useEffect(() => {
    if (activeTab === 'applications') fetchApplications();
  }, [activeTab, fetchApplications]);

  /* ── Job Form ────────────────────────────────────────── */
  const openJobForm = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setJobForm({
        title: job.title, department: job.department, location: job.location,
        type: job.type, description: job.description, requirements: job.requirements,
        salaryRange: job.salaryRange || '',
      });
    } else {
      setEditingJob(null);
      setJobForm(emptyJob);
    }
    setShowJobForm(true);
  };

  const closeJobForm = () => { setShowJobForm(false); setEditingJob(null); setJobForm(emptyJob); };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const action = editingJob ? 'updateJob' : 'createJob';
      const payload = editingJob ? { id: editingJob.id, ...jobForm } : jobForm;
      const res = await fetch('/api/admin/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
      });
      if (!res.ok) throw new Error();
      showAlert(editingJob ? 'Job updated successfully!' : 'New job posted successfully!', 'success');
      closeJobForm();
      fetchJobs();
    } catch { showAlert('Failed to save job.', 'error'); }
    finally { setSaving(false); }
  };

  const handleToggleJob = async (job: Job) => {
    try {
      const res = await fetch('/api/admin/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggleJob', payload: { id: job.id, isActive: !job.isActive } }),
      });
      if (!res.ok) throw new Error();
      showAlert(`Job ${!job.isActive ? 'activated' : 'deactivated'}.`, 'success');
      fetchJobs();
    } catch { showAlert('Failed to toggle job status.', 'error'); }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Delete this job? All applications will also be deleted.')) return;
    try {
      const res = await fetch('/api/admin/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteJob', payload: { id } }),
      });
      if (!res.ok) throw new Error();
      showAlert('Job deleted.', 'success');
      fetchJobs();
    } catch { showAlert('Failed to delete job.', 'error'); }
  };

  /* ── Application Actions ─────────────────────────────── */
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/careers/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateStatus', payload: { id, status } }),
      });
      if (!res.ok) throw new Error();
      showAlert('Status updated.', 'success');
      if (selectedApp?.id === id) setSelectedApp(prev => prev ? { ...prev, status: status as any } : null);
      fetchApplications();
    } catch { showAlert('Failed to update status.', 'error'); }
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm('Delete this application permanently?')) return;
    try {
      const res = await fetch('/api/admin/careers/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteApplication', payload: { id } }),
      });
      if (!res.ok) throw new Error();
      showAlert('Application deleted.', 'success');
      if (selectedApp?.id === id) setSelectedApp(null);
      fetchApplications();
    } catch { showAlert('Failed to delete application.', 'error'); }
  };

  /* ── Filtered Lists ──────────────────────────────────── */
  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.department.toLowerCase().includes(jobSearch.toLowerCase())
  );

  /* ─── RENDER ───────────────────────────────────────── */
  return (
    <div className="space-y-8 font-outfit">

      {/* Alert */}
      {alert && <Alert msg={alert.msg} type={alert.type} onClose={() => setAlert(null)} />}

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
              <h2 className="text-lg font-bold text-white">
                {editingJob ? 'Edit Job Posting' : 'Post a New Job'}
              </h2>
              <button onClick={closeJobForm} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="p-8 space-y-5">
              {/* Row 1: Title + Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Title *</label>
                  <input
                    required value={jobForm.title}
                    onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g. Senior React Developer"
                    className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm focus:outline-none focus:border-primary transition-all text-white placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department *</label>
                  <input
                    required value={jobForm.department}
                    onChange={e => setJobForm({ ...jobForm, department: e.target.value })}
                    placeholder="e.g. Engineering"
                    className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm focus:outline-none focus:border-primary transition-all text-white placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Row 2: Location + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location *</label>
                  <input
                    required value={jobForm.location}
                    onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm focus:outline-none focus:border-primary transition-all text-white placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Type *</label>
                  <div className="relative">
                    <select
                      value={jobForm.type}
                      onChange={e => setJobForm({ ...jobForm, type: e.target.value })}
                      className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-4 pr-10 text-sm focus:outline-none focus:border-primary transition-all text-white appearance-none cursor-pointer"
                    >
                      {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salary Range (optional)</label>
                <input
                  value={jobForm.salaryRange}
                  onChange={e => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                  placeholder="e.g. $2,000–$3,500/month or Negotiable"
                  className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm focus:outline-none focus:border-primary transition-all text-white placeholder:text-slate-600"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Description *</label>
                <textarea
                  required rows={5} value={jobForm.description}
                  onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Describe the role, responsibilities, and what the ideal candidate will be doing..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-all text-white resize-none placeholder:text-slate-600"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requirements *</label>
                <textarea
                  required rows={5} value={jobForm.requirements}
                  onChange={e => setJobForm({ ...jobForm, requirements: e.target.value })}
                  placeholder="List the required skills, qualifications, and experience. You can use bullet points (one per line)."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-all text-white resize-none placeholder:text-slate-600"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit" disabled={saving}
                  className="flex-1 h-12 bg-primary hover:bg-emerald-600 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-primary/10"
                >
                  {saving ? (
                    <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>{editingJob ? 'Update Job' : 'Publish Job'}</>
                  )}
                </button>
                <button
                  type="button" onClick={closeJobForm}
                  className="px-6 h-12 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedApp.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">Applied for: <span className="text-primary font-semibold">{selectedApp.job?.title}</span></p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <Mail className="size-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Email</p>
                    <p className="text-sm text-white truncate">{selectedApp.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <Phone className="size-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Phone</p>
                    <p className="text-sm text-white">{selectedApp.phone}</p>
                  </div>
                </div>
              </div>

              {selectedApp.portfolioUrl && (
                <a
                  href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="size-4" />
                  <span>{selectedApp.portfolioUrl}</span>
                </a>
              )}

              {/* Cover Letter */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="size-4" /> Cover Letter
                </h3>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedApp.coverLetter}
                </div>
              </div>

              {/* CV Download / View */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="size-4" /> Attached Resume / CV
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedApp.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/30 rounded-xl text-sm font-bold transition-all"
                  >
                    <FileText className="size-4" /> View / Download CV
                  </a>
                </div>
              </div>

              {/* Status + Actions */}
              <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-800">
                <div className="space-y-2 w-full">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => handleStatusChange(selectedApp.id, key)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedApp.status === key ? `${cfg.bg} ${cfg.color} ${cfg.border}` : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteApp(selectedApp.id)}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-950/20 border border-red-900/30 text-red-400 rounded-xl text-xs font-bold hover:bg-red-950/40 transition-all cursor-pointer"
                >
                  <Trash2 className="size-4" /> Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Career Management</h1>
          <p className="text-slate-400 text-sm mt-1">Post jobs and review all incoming applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/careers" target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-sm font-semibold hover:border-slate-700 transition-all">
            <ExternalLink className="size-4" /> View Public Page
          </a>
          <button onClick={() => openJobForm()}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/10 cursor-pointer">
            <Plus className="size-4" /> Post New Job
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-0">
        {(['jobs', 'applications'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-xl transition-all cursor-pointer border-b-2 -mb-px ${
              activeTab === tab
                ? 'text-primary border-primary bg-primary/5'
                : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-900'
            }`}
          >
            {tab === 'jobs' ? <Briefcase className="size-4" /> : <Users className="size-4" />}
            <span className="capitalize">{tab}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              activeTab === tab ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-slate-400'
            }`}>
              {tab === 'jobs' ? jobs.length : applications.length}
            </span>
          </button>
        ))}
      </div>

      {/* ─── JOBS TAB ─────────────────────────────────── */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
            <input
              value={jobSearch}
              onChange={e => setJobSearch(e.target.value)}
              placeholder="Search jobs by title or department…"
              className="w-full h-11 pl-11 pr-4 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all text-white placeholder:text-slate-600"
            />
          </div>

          {jobsLoading ? (
            <div className="flex justify-center py-20">
              <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Briefcase className="size-14 text-slate-700 mx-auto" />
              <p className="text-slate-500 text-sm">{jobSearch ? 'No jobs match your search.' : 'No job postings yet. Create your first one!'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div key={job.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700/60 transition-all group">
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        job.isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500 border-slate-700'
                      }`}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {job.type}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        {job.department}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-base group-hover:text-primary transition-colors">{job.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-slate-500" />{job.location}</span>
                      {job.salaryRange && <span className="flex items-center gap-1.5"><DollarSign className="size-3.5 text-slate-500" />{job.salaryRange}</span>}
                      <span className="flex items-center gap-1.5"><Users className="size-3.5 text-slate-500" />{job._count?.applications || 0} applicants</span>
                      <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-slate-500" />{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleJob(job)}
                      title={job.isActive ? 'Deactivate' : 'Activate'}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        job.isActive
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'text-slate-500 bg-slate-800 border-slate-700 hover:text-white'
                      }`}
                    >
                      {job.isActive ? <ToggleRight className="size-5" /> : <ToggleLeft className="size-5" />}
                    </button>
                    <button
                      onClick={() => openJobForm(job)}
                      title="Edit Job"
                      className="p-2.5 text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-xl hover:border-slate-600 transition-all cursor-pointer"
                    >
                      <Edit2 className="size-4" />
                    </button>
                    <button
                      onClick={() => {
                        setAppJobFilter(job.id);
                        setActiveTab('applications');
                      }}
                      title="View Applications"
                      className="p-2.5 text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-xl hover:bg-sky-500/20 transition-all cursor-pointer"
                    >
                      <Eye className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      title="Delete Job"
                      className="p-2.5 text-red-400 bg-red-950/10 border border-red-900/30 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── APPLICATIONS TAB ─────────────────────────── */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Status filter */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
              {(['all', 'pending', 'reviewed', 'shortlisted', 'rejected'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setAppFilter(s)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer capitalize ${
                    appFilter === s ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s === 'all' ? 'All Status' : STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>

            {/* Job filter */}
            <div className="relative">
              <select
                value={appJobFilter}
                onChange={e => setAppJobFilter(e.target.value)}
                className="h-10 pl-4 pr-9 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Jobs</option>
                {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" />
            </div>

            {appJobFilter !== 'all' && (
              <button onClick={() => setAppJobFilter('all')}
                className="flex items-center gap-1.5 px-3 h-10 text-xs text-slate-400 hover:text-white border border-slate-800 rounded-xl hover:border-slate-700 transition-all cursor-pointer">
                <X className="size-3.5" /> Clear
              </button>
            )}
          </div>

          {appsLoading ? (
            <div className="flex justify-center py-20">
              <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Users className="size-14 text-slate-700 mx-auto" />
              <p className="text-slate-500 text-sm">No applications found for the selected filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map(app => {
                const cfg = STATUS_CONFIG[app.status];
                return (
                  <div key={app.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700/60 transition-all">
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                          {cfg.label}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          {app.job?.title} — {app.job?.department}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm">{app.name}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5"><Mail className="size-3.5 text-slate-500" />{app.email}</span>
                        <span className="flex items-center gap-1.5"><Phone className="size-3.5 text-slate-500" />{app.phone}</span>
                        <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-slate-500" />{new Date(app.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Quick status changer */}
                      <div className="relative">
                        <select
                          value={app.status}
                          onChange={e => handleStatusChange(app.id, e.target.value)}
                          className={`h-9 pl-3 pr-8 rounded-xl text-xs font-bold border appearance-none cursor-pointer focus:outline-none ${cfg.bg} ${cfg.color} ${cfg.border}`}
                        >
                          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                            <option key={k} value={k}>{v.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3 pointer-events-none" />
                      </div>

                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-2.5 text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-xl hover:bg-sky-500/20 transition-all cursor-pointer"
                        title="View Full Application"
                      >
                        <ArrowRight className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteApp(app.id)}
                        className="p-2.5 text-red-400 bg-red-950/10 border border-red-900/30 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Suspense wrapper (required by Next.js for useSearchParams) ── */
export default function CareersAdmin() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <CareersAdminInner />
    </Suspense>
  );
}
