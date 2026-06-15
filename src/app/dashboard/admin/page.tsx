'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAdminLoggedIn } from '@/lib/auth';
import { getComplaints, updateComplaintStatus } from '@/lib/complaints';
import { Complaint, ComplaintStatus } from '@/lib/types';
import { getStatusBadgeClass, formatDate, formatDateTime } from '@/lib/utils';
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES } from '@/lib/constants';
import { useToast } from '@/components/ui/Toast';
import { X, ClipboardList, Filter, RefreshCw, BarChart2, PieChart, ShieldAlert } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const router = useRouter();
  const { showToast } = useToast();

  const [isAdmin, setIsAdmin] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  const [isMounted, setIsMounted] = useState(false);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [updateStatus, setUpdateStatus] = useState<ComplaintStatus>('Submitted');
  const [updateNote, setUpdateNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadData = () => {
    const list = getComplaints();
    setComplaints(list);
    setFilteredComplaints(list);
  };

  useEffect(() => {
    setIsMounted(true);
    const curr = getCurrentUser();
    const adminCheck = isAdminLoggedIn();
    
    if (!curr || !adminCheck) {
      showToast('Access denied. Administrator privileges required.', 'danger');
      router.push('/login');
      return;
    }
    
    setIsAdmin(true);
    loadData();
  }, []);

  useEffect(() => {
    let result = complaints;
    if (filterCategory !== 'All') {
      result = result.filter(c => c.category === filterCategory);
    }
    if (filterStatus !== 'All') {
      result = result.filter(c => c.status === filterStatus);
    }
    setFilteredComplaints(result);
  }, [filterCategory, filterStatus, complaints]);

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    setUpdating(true);
    setTimeout(() => {
      const res = updateComplaintStatus(selectedComplaint.id, updateStatus, updateNote);
      setUpdating(false);
      
      if (res.success) {
        showToast('Complaint status updated successfully!', 'success');
        setSelectedComplaint(null);
        setUpdateNote('');
        loadData();
      } else {
        showToast(res.message || 'Update failed.', 'danger');
      }
    }, 1200);
  };

  if (!isAdmin) return null;

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const underReview = complaints.filter(c => c.status === 'Under Review').length;
  const submitted = complaints.filter(c => c.status === 'Submitted').length;

  const categoryCounts = COMPLAINT_CATEGORIES.reduce((acc, cat) => {
    acc[cat.value] = complaints.filter(c => c.category === cat.value).length;
    return acc;
  }, {} as Record<string, number>);

  const doughnutData = {
    labels: COMPLAINT_CATEGORIES.map(c => c.label),
    datasets: [
      {
        data: COMPLAINT_CATEGORIES.map(c => categoryCounts[c.value] || 0),
        backgroundColor: COMPLAINT_CATEGORIES.map(c => c.color),
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Submitted', 'Under Review', 'In Progress', 'Resolved'],
    datasets: [
      {
        label: 'Tickets',
        data: [submitted, underReview, inProgress, resolved],
        backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981'],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-lg">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-rose-500 animate-float" />
            <span>Administrator Control Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global ticket database. Manage reviews, dispatch tasks, and check resolution rate.
          </p>
        </div>
        <button
          onClick={loadData}
          className="btn-primary py-2.5 px-4 text-xs self-start sm:self-auto flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-card p-4 text-center border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm">
          <div className="text-2xl font-black text-slate-700 dark:text-white">{total}</div>
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">Total Tickets</div>
        </div>
        <div className="glass-card p-4 text-center border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm">
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{submitted}</div>
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">Submitted</div>
        </div>
        <div className="glass-card p-4 text-center border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm">
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{underReview}</div>
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">Under Review</div>
        </div>
        <div className="glass-card p-4 text-center border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm">
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{inProgress}</div>
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">In Progress</div>
        </div>
        <div className="glass-card p-4 text-center border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm col-span-2 md:col-span-1">
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{resolved}</div>
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-0.5">Resolved</div>
        </div>
      </div>

      {isMounted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-3xl flex flex-col items-center">
            <h3 className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5 self-start">
              <PieChart className="w-4 h-4 text-un-blue" /> Category Share
            </h3>
            <div className="w-full max-w-[260px] aspect-square flex items-center justify-center">
              <Doughnut
                data={doughnutData}
                options={{
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
          </div>

          <div className="glass-card p-6 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-3xl flex flex-col justify-between">
            <h3 className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-purple-500" /> Status Quantities
            </h3>
            <div className="w-full aspect-[2/1] flex items-center justify-center">
              <Bar
                data={barData}
                options={{
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { beginAtZero: true, ticks: { precision: 0 } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="glass-card p-4 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-sm rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-un-blue" />
          <span>Filters</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Category:</span>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:outline-none focus:border-un-blue font-semibold"
            >
              <option value="All">All Categories</option>
              {COMPLAINT_CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Status:</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 text-xs focus:outline-none focus:border-un-blue font-semibold"
            >
              <option value="All">All Statuses</option>
              {COMPLAINT_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="glass-card border border-white/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-800">
          <h3 className="text-lg font-extrabold text-deep-navy dark:text-white">Active Grievance Ledger</h3>
          <p className="text-xs text-slate-400">Select any record below to inspect details, download attachments, and update workflow status.</p>
        </div>
        
        <div className="overflow-x-auto">
          {filteredComplaints.length > 0 ? (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/50 dark:bg-slate-950/20 text-slate-400 font-bold text-xs uppercase border-b border-gray-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Ticket ID</th>
                  <th className="px-6 py-3.5">Reporter</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Title</th>
                  <th className="px-6 py-3.5">Filed Date</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredComplaints.map(ticket => (
                  <tr
                    key={ticket.id}
                    onClick={() => {
                      setSelectedComplaint(ticket);
                      setUpdateStatus(ticket.status);
                    }}
                    className="hover:bg-gray-50/40 dark:hover:bg-slate-800/20 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-un-blue">{ticket.id}</td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-300">
                      {ticket.isAnonymous ? '🔒 Anonymous' : ticket.name}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-300">
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
              <p>No complaints match the specified filters.</p>
            </div>
          )}
        </div>
      </div>

      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border border-white/50 dark:border-white/5 bg-white/95 dark:bg-slate-900/95 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
            
            <button
              onClick={() => {
                setSelectedComplaint(null);
                setUpdateNote('');
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-slate-800/80 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Ticket Control
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

                <form onSubmit={handleUpdateStatusSubmit} className="pt-4 border-t border-gray-100 dark:border-slate-800/60 space-y-4">
                  <h4 className="font-extrabold text-sm text-deep-navy dark:text-white uppercase tracking-wider">Update Ticket Workflow</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                      <select
                        value={updateStatus}
                        onChange={e => setUpdateStatus(e.target.value as ComplaintStatus)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:border-un-blue font-semibold"
                      >
                        {COMPLAINT_STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Resolution Progress Note</label>
                    <textarea
                      rows={3}
                      value={updateNote}
                      onChange={e => setUpdateNote(e.target.value)}
                      placeholder="Write administrative action logs (e.g. dispatched building electrician team)..."
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 text-xs focus:outline-none focus:border-un-blue resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={updating}
                    className="btn-primary w-full py-2.5 text-xs disabled:opacity-50"
                  >
                    {updating ? 'Updating Ticket...' : 'Update Status & Log Note'}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h4 className="font-bold text-deep-navy dark:text-white text-sm">Progress Logs History</h4>
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
