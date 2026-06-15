'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateProfile } from '@/lib/auth';
import { getUserComplaints } from '@/lib/complaints';
import { Complaint, User } from '@/lib/types';
import { getStatusBadgeClass, formatDate, formatDateTime } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { User as UserIcon, Settings, LayoutDashboard, PlusCircle, Paperclip, ClipboardList, X } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const router = useRouter();
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileMobile, setProfileMobile] = useState('');
  const [updating, setUpdating] = useState(false);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    const curr = getCurrentUser();
    if (!curr) {
      showToast('Please sign in to access your dashboard.', 'warning');
      router.push('/login');
      return;
    }
    setUser(curr);
    setProfileName(curr.name);
    setProfileEmail(curr.email);
    setProfileMobile(curr.mobile);
    
    const list = getUserComplaints(curr.email);
    setComplaints(list);
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!profileName.trim() || !profileEmail.trim() || !profileMobile.trim()) {
      showToast('All profile fields are required.', 'warning');
      return;
    }

    setUpdating(true);
    setTimeout(() => {
      const res = updateProfile(user.email, profileName, profileEmail, profileMobile);
      setUpdating(false);
      if (res.success) {
        showToast(res.message || 'Profile updated!', 'success');
        setUser(getCurrentUser());
        window.dispatchEvent(new Event('auth-change'));
      } else {
        showToast(res.message || 'Failed to update profile.', 'danger');
      }
    }, 1000);
  };

  if (!user) return null;

  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
  const pendingComplaints = totalComplaints - resolvedComplaints;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-un-blue/10 to-purple-accent/10 p-6 sm:p-8 rounded-3xl border border-un-blue/10 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-deep-navy dark:text-white">
            Welcome back, <span className="gradient-text">{user.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Student Safe Portal Panel. Register issues and review tracking logs.
          </p>
        </div>
        <Link href="/submit-complaint" className="btn-primary py-2.5 px-5 text-sm self-start sm:self-auto">
          <PlusCircle className="w-4 h-4" /> Report New Issue
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-left transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-un-blue text-white shadow-md'
                : 'text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800/40 bg-white/20'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>My Grievances</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-left transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-un-blue text-white shadow-md'
                : 'text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800/40 bg-white/20'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>
        </aside>

        <main className="lg:col-span-9 space-y-8">
          {activeTab === 'overview' ? (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-card p-4 text-center border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm">
                  <div className="text-2xl font-black text-deep-navy dark:text-white">{totalComplaints}</div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">Total Filed</div>
                </div>
                <div className="glass-card p-4 text-center border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm">
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{pendingComplaints}</div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">Pending</div>
                </div>
                <div className="glass-card p-4 text-center border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{resolvedComplaints}</div>
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">Resolved</div>
                </div>
              </div>

              <div className="glass-card border border-white/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                  <h3 className="text-lg font-extrabold text-deep-navy dark:text-white">Grievance Ticket Logs</h3>
                  <p className="text-xs text-slate-400">Click on any record below to open full details and timeline.</p>
                </div>
                <div className="overflow-x-auto">
                  {complaints.length > 0 ? (
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-gray-50/50 dark:bg-slate-950/20 text-slate-400 font-bold text-xs uppercase border-b border-gray-100 dark:border-slate-800">
                        <tr>
                          <th className="px-6 py-3.5">Ticket ID</th>
                          <th className="px-6 py-3.5">Category</th>
                          <th className="px-6 py-3.5">Title</th>
                          <th className="px-6 py-3.5">Filed Date</th>
                          <th className="px-6 py-3.5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {complaints.map(ticket => (
                          <tr
                            key={ticket.id}
                            onClick={() => setSelectedComplaint(ticket)}
                            className="hover:bg-gray-50/40 dark:hover:bg-slate-800/20 transition-colors cursor-pointer"
                          >
                            <td className="px-6 py-4 font-mono font-bold text-un-blue">{ticket.id}</td>
                            <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-300">
                              {ticket.category}
                            </td>
                            <td className="px-6 py-4 text-xs font-bold text-deep-navy dark:text-white max-w-xs truncate">
                              {ticket.title}
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-400">
                              {formatDate(ticket.createdAt)}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={getStatusBadgeClass(ticket.status)}>
                                {ticket.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-xs font-semibold space-y-2">
                      <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
                      <p>You haven't filed any complaints yet.</p>
                      <Link href="/submit-complaint" className="text-un-blue underline">
                        File your first report now.
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card p-8 border border-white/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-deep-navy dark:text-white">Profile Configuration</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={e => setProfileEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Mobile Number</label>
                  <input
                    type="text"
                    value={profileMobile}
                    onChange={e => setProfileMobile(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={updating}
                  className="btn-primary px-6 py-2.5 text-xs disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border border-white/50 dark:border-white/5 bg-white/95 dark:bg-slate-900/95 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
            
            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-slate-800/80 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Ticket Reference
                </span>
                <h2 className="text-xl font-mono font-bold text-deep-navy dark:text-white tracking-wide">
                  {selectedComplaint.id}
                </h2>
              </div>
              <span className={getStatusBadgeClass(selectedComplaint.status)}>
                {selectedComplaint.status}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="font-extrabold text-lg text-deep-navy dark:text-white leading-tight">
                    {selectedComplaint.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Filed on {formatDate(selectedComplaint.createdAt)} • Category: {selectedComplaint.category}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedComplaint.description}
                </p>

                {selectedComplaint.attachment && (
                  <div className="pt-4 border-t border-gray-100 dark:border-slate-800/60 space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Paperclip className="w-4 h-4" /> Attached Evidence
                    </div>
                    {selectedComplaint.attachment.startsWith('data:image') ? (
                      <div className="relative max-w-xs aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-black/5 dark:bg-black/20">
                        <img
                          src={selectedComplaint.attachment}
                          alt={selectedComplaint.attachmentName || 'Attachment preview'}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <a
                        href={selectedComplaint.attachment}
                        download={selectedComplaint.attachmentName || 'complaint_file'}
                        className="inline-flex items-center gap-2 text-xs font-bold text-un-blue hover:underline bg-blue-50/50 dark:bg-slate-800/50 px-3 py-2 rounded-xl border border-blue-100 dark:border-blue-900/35"
                      >
                        Download {selectedComplaint.attachmentName || 'Attachment'}
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h4 className="font-bold text-deep-navy dark:text-white text-sm">Progress Timeline</h4>
                <div className="space-y-6 pl-1 pt-2 relative">
                  {selectedComplaint.history.map((log, idx) => {
                    const isLast = idx === selectedComplaint.history.length - 1;
                    const isCompleted = log.status === 'Resolved';
                    
                    let stepClass = 'timeline-step completed';
                    if (isLast) {
                      stepClass = isCompleted ? 'timeline-step completed active' : 'timeline-step active';
                    }

                    return (
                      <div key={idx} className={stepClass}>
                        <div className="space-y-1 pb-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-xs text-deep-navy dark:text-white">
                              {log.status}
                            </span>
                            <span className="text-[9px] font-semibold text-slate-400">
                              {formatDateTime(log.timestamp)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                            {log.note}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
