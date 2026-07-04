'use client';

import React, { useEffect, useState } from 'react';
import {
  Settings,
  Sparkles,
  Star,
  HelpCircle,
  Activity,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Eye,
  ListOrdered
} from 'lucide-react';

export default function ContentCustomizer() {
  const [activeTab, setActiveTab] = useState<'hero' | 'features' | 'testimonials' | 'faqs' | 'process' | 'stats'>('hero');
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Status Alerts
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Forms state
  const [heroForm, setHeroForm] = useState({ title: '', subtitle: '', ctaText: '', ctaHref: '' });

  // List Items Editor State
  const [editingItem, setEditingItem] = useState<any>(null); // holds the item currently being created or edited
  const [showEditor, setShowEditor] = useState(false);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      if (res.ok && data.success) {
        setContent(data.data);
        if (data.data.hero) {
          setHeroForm({
            title: data.data.hero.title || '',
            subtitle: data.data.hero.subtitle || '',
            ctaText: data.data.hero.ctaText || '',
            ctaHref: data.data.hero.ctaHref || '',
          });
        }
      }
    } catch (err) {
      console.error('Error loading content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const triggerAlert = (type: 'success' | 'error', msg: string) => {
    if (type === 'success') {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateHero',
          payload: heroForm,
        }),
      });
      if (res.ok) {
        triggerAlert('success', 'Hero copy updated and cached!');
        fetchContent();
      } else {
        throw new Error();
      }
    } catch (err) {
      triggerAlert('error', 'Failed to update hero settings.');
    }
  };

  const handleUpsertItem = async (e: React.FormEvent) => {
    e.preventDefault();
    let action = '';
    switch (activeTab) {
      case 'features': action = 'upsertFeature'; break;
      case 'testimonials': action = 'upsertTestimonial'; break;
      case 'faqs': action = 'upsertFAQ'; break;
      case 'process': action = 'upsertProcess'; break;
      case 'stats': action = 'upsertStat'; break;
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          payload: editingItem,
        }),
      });
      if (res.ok) {
        triggerAlert('success', 'Content saved successfully!');
        setShowEditor(false);
        setEditingItem(null);
        fetchContent();
      } else {
        throw new Error();
      }
    } catch (err) {
      triggerAlert('error', 'Failed to save item.');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    let action = '';
    switch (activeTab) {
      case 'features': action = 'deleteFeature'; break;
      case 'testimonials': action = 'deleteTestimonial'; break;
      case 'faqs': action = 'deleteFAQ'; break;
      case 'process': action = 'deleteProcess'; break;
      case 'stats': action = 'deleteStat'; break;
    }

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          payload: { id },
        }),
      });
      if (res.ok) {
        triggerAlert('success', 'Item deleted!');
        fetchContent();
      } else {
        throw new Error();
      }
    } catch (err) {
      triggerAlert('error', 'Failed to delete item.');
    }
  };

  const openEditor = (item: any = null) => {
    if (item) {
      setEditingItem({ ...item });
    } else {
      // Setup empty structure depending on active tab
      switch (activeTab) {
        case 'features':
          setEditingItem({ title: '', description: '', iconName: 'Sparkles', order: 0 });
          break;
        case 'testimonials':
          setEditingItem({ clientName: '', role: '', feedback: '', rating: 5, avatarUrl: '' });
          break;
        case 'faqs':
          setEditingItem({ question: '', answer: '', iconName: 'HelpCircle', order: 0 });
          break;
        case 'process':
          setEditingItem({ stepNumber: 1, title: '', description: '' });
          break;
        case 'stats':
          setEditingItem({ number: '', label: '', icon: 'Star' });
          break;
      }
    }
    setShowEditor(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'hero', name: 'Hero Header', icon: Settings },
    { id: 'features', name: 'Features', icon: Sparkles },
    { id: 'process', name: 'Process Steps', icon: ListOrdered },
    { id: 'stats', name: 'Statistics', icon: Activity },
    { id: 'testimonials', name: 'Testimonials', icon: Star },
    { id: 'faqs', name: 'FAQs', icon: HelpCircle },
  ];

  return (
    <div className="space-y-8 font-outfit">
      {/* Alerts */}
      <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none">
        {successMsg && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-950/80 border border-green-950 text-primary text-sm shadow-xl backdrop-blur-md animate-fade-in pointer-events-auto">
            <CheckCircle className="size-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/80 border border-red-950 text-red-400 text-sm shadow-xl backdrop-blur-md animate-fade-in pointer-events-auto">
            <XCircle className="size-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Site Customizer</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and edit all frontend texts, lists, and settings dynamically.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setShowEditor(false);
                setEditingItem(null);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-all shrink-0 cursor-pointer ${
                isActive ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="size-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: HERO */}
      {activeTab === 'hero' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Settings className="size-5 text-primary" />
            <span>Hero Section Copy</span>
          </h2>
          <form onSubmit={handleHeroSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Main Headline</label>
              <input
                type="text"
                required
                value={heroForm.title}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm focus:outline-none focus:border-primary transition-all text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Subtitle Paragraph</label>
              <textarea
                rows={4}
                required
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-all text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">CTA Button Text</label>
                <input
                  type="text"
                  required
                  value={heroForm.ctaText}
                  onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                  className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm focus:outline-none focus:border-primary transition-all text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">CTA Destination Link</label>
                <input
                  type="text"
                  required
                  value={heroForm.ctaHref}
                  onChange={(e) => setHeroForm({ ...heroForm, ctaHref: e.target.value })}
                  className="w-full h-12 bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm focus:outline-none focus:border-primary transition-all text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 h-12 bg-primary hover:bg-secondary text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-primary/10 hover:shadow-primary/20"
            >
              <span>Save & Publish Changes</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT: LIST ITEMS */}
      {activeTab !== 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  <span>Current Items ({content?.[activeTab === 'faqs' ? 'faqs' : activeTab === 'process' ? 'processSteps' : activeTab]?.length || 0})</span>
                </h2>
                <button
                  onClick={() => openEditor()}
                  className="px-4 py-2 bg-primary hover:bg-secondary text-white font-bold rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="size-4" />
                  <span>Add New Item</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {content?.[activeTab === 'faqs' ? 'faqs' : activeTab === 'process' ? 'processSteps' : activeTab]?.length > 0 ? (
                  content[activeTab === 'faqs' ? 'faqs' : activeTab === 'process' ? 'processSteps' : activeTab].map((item: any) => (
                    <div
                      key={item.id}
                      className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl flex justify-between items-start gap-4 hover:border-slate-700/60 transition-colors"
                    >
                      <div className="min-w-0">
                        {activeTab === 'features' && (
                          <div className="space-y-1">
                            <h3 className="font-bold text-sm text-white flex items-center gap-2">
                              <span className="text-xs text-slate-500 font-bold bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">Order {item.order}</span>
                              <span className="truncate">{item.title}</span>
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                            <span className="text-[10px] text-primary font-bold tracking-wide">Icon: {item.iconName}</span>
                          </div>
                        )}
                        {activeTab === 'faqs' && (
                          <div className="space-y-1">
                            <h3 className="font-bold text-sm text-white flex items-center gap-2">
                              <span className="text-xs text-slate-500 font-bold bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">Order {item.order}</span>
                              <span className="truncate">{item.question}</span>
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                        {activeTab === 'testimonials' && (
                          <div className="space-y-1">
                            <h3 className="font-bold text-sm text-white">{item.clientName}</h3>
                            <p className="text-xs text-primary font-medium">{item.role}</p>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.feedback}</p>
                            <span className="text-[10px] text-amber-400 font-bold">Rating: {item.rating} ★</span>
                          </div>
                        )}
                        {activeTab === 'process' && (
                          <div className="space-y-1">
                            <h3 className="font-bold text-sm text-white flex gap-2 items-center">
                              <span className="text-xs text-slate-500 font-bold bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">Step {item.stepNumber}</span>
                              <span>{item.title}</span>
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                          </div>
                        )}
                        {activeTab === 'stats' && (
                          <div className="space-y-1">
                            <h3 className="font-extrabold text-lg text-primary">{item.number}</h3>
                            <p className="text-xs text-slate-350">{item.label}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 shrink-0 items-center">
                        <button
                          onClick={() => openEditor(item)}
                          className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Edit2 className="size-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 text-red-400 hover:text-white bg-red-950/10 border border-red-900/30 rounded-xl hover:bg-red-950/20 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    No items found. Create some above.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Editor form panel */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sticky top-24 min-h-[400px]">
              {showEditor && editingItem ? (
                <form onSubmit={handleUpsertItem} className="space-y-5">
                  <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {editingItem.id ? 'Edit Item' : 'New Item'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditor(false);
                        setEditingItem(null);
                      }}
                      className="text-slate-500 hover:text-white text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Dynamic fields */}
                  {/* FEATURES FIELDS */}
                  {activeTab === 'features' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Feature Title</label>
                        <input
                          type="text" required value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Icon Name (Lucide)</label>
                        <input
                          type="text" required value={editingItem.iconName}
                          onChange={(e) => setEditingItem({ ...editingItem, iconName: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Display Order</label>
                        <input
                          type="number" required value={editingItem.order}
                          onChange={(e) => setEditingItem({ ...editingItem, order: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Description</label>
                        <textarea
                          rows={3} required value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs focus:outline-none focus:border-primary text-white resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* FAQS FIELDS */}
                  {activeTab === 'faqs' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Question</label>
                        <input
                          type="text" required value={editingItem.question}
                          onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Icon Name</label>
                        <input
                          type="text" required value={editingItem.iconName}
                          onChange={(e) => setEditingItem({ ...editingItem, iconName: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Display Order</label>
                        <input
                          type="number" required value={editingItem.order}
                          onChange={(e) => setEditingItem({ ...editingItem, order: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Answer Text</label>
                        <textarea
                          rows={4} required value={editingItem.answer}
                          onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs focus:outline-none focus:border-primary text-white resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* PROCESS STEPS FIELDS */}
                  {activeTab === 'process' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Step Number</label>
                        <input
                          type="number" required value={editingItem.stepNumber}
                          onChange={(e) => setEditingItem({ ...editingItem, stepNumber: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Step Title</label>
                        <input
                          type="text" required value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Description Details</label>
                        <textarea
                          rows={5} required value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs focus:outline-none focus:border-primary text-white resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* STATS FIELDS */}
                  {activeTab === 'stats' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Stat Number (e.g. 50+)</label>
                        <input
                          type="text" required value={editingItem.number}
                          onChange={(e) => setEditingItem({ ...editingItem, number: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Stat Label</label>
                        <input
                          type="text" required value={editingItem.label}
                          onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                          className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* TESTIMONIALS FIELDS */}
                  {activeTab === 'testimonials' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Client Name</label>
                          <input
                            type="text" required value={editingItem.clientName}
                            onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                            className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Client Role</label>
                          <input
                            type="text" required value={editingItem.role}
                            onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                            className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Rating (1-5)</label>
                          <input
                            type="number" min="1" max="5" required value={editingItem.rating}
                            onChange={(e) => setEditingItem({ ...editingItem, rating: e.target.value })}
                            className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Avatar Image URL</label>
                          <input
                            type="text" required value={editingItem.avatarUrl}
                            onChange={(e) => setEditingItem({ ...editingItem, avatarUrl: e.target.value })}
                            className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg px-3 text-xs focus:outline-none focus:border-primary text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Client Feedback</label>
                        <textarea
                          rows={4} required value={editingItem.feedback}
                          onChange={(e) => setEditingItem({ ...editingItem, feedback: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs focus:outline-none focus:border-primary text-white resize-none"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full h-10 bg-primary hover:bg-secondary text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-lg hover:shadow-primary/10"
                  >
                    <span>Save Changes</span>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-slate-500 text-xs gap-3.5 py-20">
                  <Eye className="size-10 text-slate-700" />
                  <span>Select an item to edit, or click &quot;Add New Item&quot; to create one.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
