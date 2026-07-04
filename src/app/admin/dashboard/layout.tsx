'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Mail,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
  Briefcase,
} from 'lucide-react';
import { Logo } from '@/components/logo';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Customizer', href: '/admin/dashboard/content', icon: Settings },
    { name: 'Messages', href: '/admin/dashboard/messages', icon: Mail },
    { name: 'Careers', href: '/admin/dashboard/careers', icon: Briefcase },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-white font-outfit">
      {/* Header Info */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <Logo />
        </Link>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary tracking-wider uppercase select-none">
          <Shield className="size-3" />
          <span>Admin</span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Icon className={`size-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors text-slate-350"
        >
          <span>View Site</span>
          <ExternalLink className="size-3.5" />
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold bg-red-950/20 border border-red-900/30 text-red-400 rounded-xl hover:bg-red-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="size-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen flex bg-slate-950 text-white font-outfit">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-0 h-screen">
          <NavContent />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for Mobile */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-20">
          <Link href="/">
            <Logo />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-10 flex">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            {/* Sidebar drawer */}
            <div className="relative flex flex-col w-64 max-w-xs h-full bg-slate-900 animate-slide-right">
              <NavContent />
            </div>
          </div>
        )}

        {/* Content Block */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
