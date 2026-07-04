'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, User, CheckCircle, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-outfit bg-slate-950 text-white overflow-hidden">
      {/* Decorative Grid and Glows */}
      <div className="absolute inset-0 dot-grid-bg opacity-[0.05]" aria-hidden />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl opacity-60 pointer-events-none" />

      <div className="relative w-full max-w-md px-6">
        {/* Logo and Head */}
        <div className="text-center mb-8 space-y-3">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to manage and customize StackMajix site content.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-950/30 border border-red-900/30 text-red-400 text-sm">
              <ShieldAlert className="size-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-green-950/30 border border-green-900/30 text-primary text-sm">
              <CheckCircle className="size-5 shrink-0" />
              <span>Login successful! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <User className="size-4.5" />
                </span>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  disabled={loading || success}
                  className="w-full h-12 bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder-slate-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="size-4.5" />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading || success}
                  className="w-full h-12 bg-slate-950/80 border border-slate-800 rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder-slate-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full h-12 bg-primary hover:bg-secondary disabled:bg-primary/50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-primary/30"
            >
              {loading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a href="/" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
