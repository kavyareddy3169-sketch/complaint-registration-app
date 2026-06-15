'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ShieldAlert, Calendar, User as UserIcon, Tag, AlertTriangle, Paperclip, CheckCircle } from 'lucide-react';
import { findComplaintById } from '@/lib/complaints';
import { Complaint } from '@/lib/types';
import { getStatusBadgeClass, formatDate, formatDateTime } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

function TrackContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  
  const [ticketId, setTicketId] = useState('');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setTicketId(id);
      handleSearch(id);
    }
  }, [searchParams]);

  const handleSearch = (idToSearch?: string) => {
    const id = (idToSearch || ticketId).trim();
    if (!id) {
      showToast('Please enter a ticket ID.', 'warning');
      return;
    }

    const found = findComplaintById(id);
    setSearched(true);
    if (found) {
      setComplaint(found);
      showToast('Ticket found!', 'success');
    } else {
      setComplaint(null);
      showToast('Ticket ID not found. Verify the code and try again.', 'danger');
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white tracking-tight">
          Track Your Complaint
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter your unique ticket reference code to inspect resolution logs and timelines.
        </p>
        <div className="w-24 h-1 bg-un-blue mx-auto rounded-full mt-4" />
      </div>

      <form onSubmit={onSubmit} className="max-w-md mx-auto relative flex gap-2">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            value={ticketId}
            onChange={e => setTicketId(e.target.value)}
            placeholder="e.g. CMP-129483"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-900/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm shadow-sm"
          />
        </div>
        <button type="submit" className="btn-primary py-3 px-6 text-sm">
          Track
        </button>
      </form>

      {searched && (
        <div className="space-y-8 animate-fade-in-up">
          {complaint ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 glass-card p-6 sm:p-8 border border-white/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-2xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-slate-800/80 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Ticket Reference
                    </span>
                    <h2 className="text-xl font-mono font-bold text-deep-navy dark:text-white tracking-wide">
                      {complaint.id}
                    </h2>
                  </div>
                  <span className={getStatusBadgeClass(complaint.status)}>
                    {complaint.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-extrabold text-deep-navy dark:text-white leading-snug">
                    {complaint.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {complaint.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-slate-800/60 text-xs">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Tag className="w-4 h-4 text-un-blue flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[10px] uppercase text-slate-400">Category</div>
                        <div className="font-semibold text-deep-navy dark:text-gray-200 mt-0.5">{complaint.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[10px] uppercase text-slate-400">Priority</div>
                        <div className="font-semibold text-deep-navy dark:text-gray-200 mt-0.5">{complaint.priority}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-un-blue flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[10px] uppercase text-slate-400">Filed On</div>
                        <div className="font-semibold text-deep-navy dark:text-gray-200 mt-0.5">{formatDate(complaint.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <UserIcon className="w-4 h-4 text-un-blue flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[10px] uppercase text-slate-400">Reporter Identity</div>
                        <div className="font-semibold text-deep-navy dark:text-gray-200 mt-0.5">
                          {complaint.isAnonymous ? '🔒 Anonymous' : complaint.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  {complaint.attachment && (
                    <div className="pt-4 border-t border-gray-100 dark:border-slate-800/60 space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Paperclip className="w-4 h-4" /> Attached Evidence
                      </div>
                      {complaint.attachment.startsWith('data:image') ? (
                        <div className="relative max-w-xs aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-black/5 dark:bg-black/20">
                          <img
                            src={complaint.attachment}
                            alt={complaint.attachmentName || 'Attachment preview'}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <a
                          href={complaint.attachment}
                          download={complaint.attachmentName || 'complaint_file'}
                          className="inline-flex items-center gap-2 text-xs font-bold text-un-blue hover:underline bg-blue-50/50 dark:bg-slate-800/50 px-3 py-2 rounded-xl border border-blue-100 dark:border-blue-900/35"
                        >
                          Download {complaint.attachmentName || 'Attachment'}
                        </a>
                      )}
                    </div>
                  )}

                </div>
              </div>

              <div className="lg:col-span-5 glass-card p-6 sm:p-8 border border-white/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-2xl space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-deep-navy dark:text-white">Resolution Progress</h3>
                  <p className="text-xs text-slate-400">Chronological history logs of administrative action.</p>
                </div>

                <div className="space-y-6 pl-1 pt-4 relative">
                  {complaint.history.map((log, idx) => {
                    const isLast = idx === complaint.history.length - 1;
                    const isCompleted = log.status === 'Resolved';
                    
                    let stepClass = 'timeline-step completed';
                    if (isLast) {
                      stepClass = isCompleted ? 'timeline-step completed active' : 'timeline-step active';
                    }

                    return (
                      <div key={idx} className={stepClass}>
                        <div className="space-y-1.5 pb-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-deep-navy dark:text-white">
                              {log.status}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {formatDateTime(log.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {log.note}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="max-w-md mx-auto text-center p-8 glass-card border border-rose-500/10 bg-rose-500/5 rounded-3xl space-y-4">
              <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto animate-float" />
              <h2 className="text-lg font-bold text-rose-600">Ticket Not Found</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                We couldn't find a record for the ticket ID <span className="font-mono font-bold text-rose-700">"{ticketId}"</span>.
                Double check the code spelling, spaces, and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-un-blue"></div>
      </div>
    }>
      <TrackContent />
    </Suspense>
  );
}
