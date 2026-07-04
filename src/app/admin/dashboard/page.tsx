'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, HelpCircle, Star, Sparkles, MessageSquare, ArrowRight, Briefcase, Users } from 'lucide-react';

interface StatsOverview {
  totalMessages: number;
  totalFAQs: number;
  totalTestimonials: number;
  totalFeatures: number;
  totalJobs: number;
  pendingApplications: number;
  recentMessages: any[];
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [messagesRes, contentRes, careersRes, appsRes] = await Promise.all([
          fetch('/api/admin/messages'),
          fetch('/api/admin/content'),
          fetch('/api/admin/careers'),
          fetch('/api/admin/careers/applications?status=pending'),
        ]);

        const messagesData = await messagesRes.json();
        const contentData = await contentRes.json();
        const careersData = careersRes.ok ? await careersRes.json() : { data: [] };
        const appsData = appsRes.ok ? await appsRes.json() : { data: [] };

        if (messagesRes.ok && contentRes.ok) {
          setStats({
            totalMessages: messagesData.data.length,
            totalFAQs: contentData.data.faqs.length,
            totalTestimonials: contentData.data.testimonials.length,
            totalFeatures: contentData.data.features.length,
            totalJobs: careersData.data?.length || 0,
            pendingApplications: appsData.data?.length || 0,
            recentMessages: messagesData.data.slice(0, 3),
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const cards = [
    { name: 'Total Messages', value: stats?.totalMessages || 0, icon: Mail, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', href: '/admin/dashboard/messages' },
    { name: 'Features', value: stats?.totalFeatures || 0, icon: Sparkles, color: 'bg-violet-500/10 text-violet-400 border-violet-500/20', href: '/admin/dashboard/content' },
    { name: 'Testimonials', value: stats?.totalTestimonials || 0, icon: Star, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', href: '/admin/dashboard/content' },
    { name: 'FAQs', value: stats?.totalFAQs || 0, icon: HelpCircle, color: 'bg-sky-500/10 text-sky-400 border-sky-500/20', href: '/admin/dashboard/content' },
    { name: 'Active Jobs', value: stats?.totalJobs || 0, icon: Briefcase, color: 'bg-rose-500/10 text-rose-400 border-rose-500/20', href: '/admin/dashboard/careers' },
    { name: 'New Applications', value: stats?.pendingApplications || 0, icon: Users, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', href: '/admin/dashboard/careers?tab=applications' },
  ];

  return (
    <div className="space-y-8 font-outfit">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Quick statistics and recent updates of your site.</p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className={`p-6 border rounded-2xl ${card.color} flex items-center justify-between hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className="space-y-2">
                <span className="text-sm font-semibold text-slate-400 block">{card.name}</span>
                <span className="text-4xl font-extrabold tracking-tight">{card.value}</span>
              </div>
              <div className={`size-12 rounded-xl flex items-center justify-center border ${card.color}`}>
                <Icon className="size-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <MessageSquare className="size-5 text-primary" />
              <span>Recent Contact Inquiries</span>
            </h2>
            <Link
              href="/admin/dashboard/messages"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {stats?.recentMessages && stats.recentMessages.length > 0 ? (
              stats.recentMessages.map((msg: any) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700/60 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-white text-sm">{msg.name}</h3>
                      <p className="text-xs text-slate-400">{msg.email}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold bg-slate-900 border border-slate-800 rounded-full px-2.5 py-0.5">
                      {new Date(msg.createdAt).toLocaleDateString('en-US')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-semibold mt-1">Sub: {msg.subject}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{msg.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500 text-sm">
                No recent messages received.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white">Quick Tasks</h2>
          </div>
          <div className="space-y-3">
            <Link
              href="/admin/dashboard/content"
              className="block p-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-semibold text-slate-300 hover:border-primary hover:text-primary transition-all"
            >
              ✍️ Customize Homepage Content
            </Link>
            <Link
              href="/admin/dashboard/messages"
              className="block p-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-semibold text-slate-300 hover:border-primary hover:text-primary transition-all"
            >
              📬 Check Inbound Inquiries
            </Link>
            <Link
              href="/admin/dashboard/careers"
              className="block p-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-semibold text-slate-300 hover:border-primary hover:text-primary transition-all"
            >
              💼 Manage Career Postings
            </Link>
            <Link
              href="/"
              target="_blank"
              className="block p-4 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-semibold text-slate-300 hover:border-primary hover:text-primary transition-all"
            >
              🌐 Open Public Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
