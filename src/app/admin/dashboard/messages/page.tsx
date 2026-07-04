'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Trash2, Eye, Calendar, User, MessageSquare, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function MessageManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      if (res.ok) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="size-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-outfit">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Contact Messages</h1>
        <p className="text-slate-400 text-sm mt-1">Read and manage inquiries sent through the public contact form.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <Mail className="size-5 text-primary" />
              <span>Inbox ({messages.length})</span>
            </h2>

            <div className="divide-y divide-slate-800 space-y-4">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`pt-4 first:pt-0 flex items-start justify-between gap-4 cursor-pointer group ${
                      selectedMessage?.id === msg.id ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-bold truncate transition-colors ${
                          selectedMessage?.id === msg.id ? 'text-primary' : 'text-white group-hover:text-primary'
                        }`}>
                          {msg.name}
                        </h3>
                        <span className="text-[10px] text-slate-500 font-semibold bg-slate-950 border border-slate-800 rounded-full px-2 py-0.5">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium truncate">Sub: {msg.subject}</p>
                      <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">{msg.message}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMessage(msg);
                        }}
                        className="p-2 text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
                        title="View Details"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        disabled={deletingId === msg.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(msg.id);
                        }}
                        className="p-2 text-red-400 hover:text-white bg-red-950/10 border border-red-900/30 hover:bg-red-950/30 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                        title="Delete Message"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-slate-500 text-sm flex flex-col items-center gap-3">
                  <AlertCircle className="size-8 text-slate-600" />
                  <span>Your inbox is empty. No messages found.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Reader Panel */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sticky top-24 min-h-[400px] flex flex-col">
            {selectedMessage ? (
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="border-b border-slate-800 pb-4 space-y-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="size-5 text-primary" />
                    <span>Read Inquiry</span>
                  </h2>
                  <div className="space-y-2">
                    <div className="flex gap-2.5 items-center text-xs text-slate-350">
                      <User className="size-4 text-slate-500 shrink-0" />
                      <span className="font-bold truncate">{selectedMessage.name}</span>
                    </div>
                    <div className="flex gap-2.5 items-center text-xs text-slate-400 pl-6.5">
                      <a href={`mailto:${selectedMessage.email}`} className="hover:text-primary hover:underline truncate">
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="flex gap-2.5 items-center text-xs text-slate-400">
                      <Calendar className="size-4 text-slate-500 shrink-0" />
                      <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Subject</span>
                    <h3 className="text-sm font-bold text-white mt-1">{selectedMessage.subject}</h3>
                  </div>
                  <div className="flex-1 min-h-[150px] bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-y-auto">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Message Body</span>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <button
                  disabled={deletingId === selectedMessage.id}
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="w-full h-11 bg-red-950/20 border border-red-900/30 hover:bg-red-950/40 text-red-400 font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-auto"
                >
                  <Trash2 className="size-4" />
                  <span>Delete Message</span>
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 text-sm gap-3 py-16">
                <Mail className="size-10 text-slate-700 animate-pulse" />
                <span>Select a message from the left to read its details.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
