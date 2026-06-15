'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, Upload, PlusCircle, AlertCircle, FileText, CheckCircle, Copy, Check } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { submitComplaint, fileToBase64 } from '@/lib/complaints';
import { COMPLAINT_CATEGORIES } from '@/lib/constants';
import { ComplaintCategory, ComplaintPriority, User } from '@/lib/types';
import { useToast } from '@/components/ui/Toast';

export default function SubmitComplaintPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  
  const [category, setCategory] = useState<ComplaintCategory>('Bullying/Cyberbullying');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [priority, setPriority] = useState<ComplaintPriority>('Medium');
  
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const curr = getCurrentUser();
    setUser(curr);
    if (curr) {
      setIsAnonymous(false);
    }
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      await processFile(selected);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      await processFile(selected);
    }
  };

  const processFile = async (selected: File) => {
    if (selected.size > 5 * 1024 * 1024) {
      showToast('File size exceeds 5MB.', 'warning');
      return;
    }
    setFile(selected);
    try {
      const b64 = await fileToBase64(selected);
      setFileBase64(b64);
    } catch (err) {
      showToast('Failed to read file.', 'danger');
    }
  };

  const handleCopy = () => {
    if (!successId) return;
    navigator.clipboard.writeText(successId);
    setCopied(true);
    showToast('Ticket ID copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter an issue title.', 'warning');
      return;
    }
    if (!description.trim()) {
      showToast('Please describe the issue in detail.', 'warning');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = submitComplaint(
        category,
        title,
        description,
        isAnonymous,
        priority,
        fileBase64,
        file ? file.name : null,
        user ? user.email : null,
        user ? user.name : 'Anonymous'
      );

      setLoading(false);

      if (result.success && result.complaintId) {
        setSuccessId(result.complaintId);
        showToast('Complaint filed successfully!', 'success');
      } else {
        showToast(result.message || 'Submission failed.', 'danger');
      }
    }, 1500);
  };

  if (successId) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-950">
        <div className="w-full max-w-lg glass-card p-8 text-center border border-emerald-500/20 bg-emerald-500/5 dark:bg-slate-900/50 backdrop-blur-md shadow-xl rounded-3xl space-y-6">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-pulse-glow">
            <CheckCircle className="w-12 h-12" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-deep-navy dark:text-white">Submission Successful!</h1>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            Your complaint was registered securely. To check status updates and logs in the future, save your unique ticket ID:
          </p>

          <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-sm mx-auto">
            <span className="font-mono font-bold text-lg text-deep-navy dark:text-white tracking-wider">
              {successId}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 text-un-blue hover:bg-blue-50 dark:hover:bg-slate-900 rounded-xl transition-colors cursor-pointer"
              title="Copy ID"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <p className="text-xs text-rose-500 font-bold">
            ⚠️ WARNING: Anonymous ticket IDs cannot be recovered if lost! Please copy this ticket ID now.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              onClick={() => {
                setSuccessId(null);
                setTitle('');
                setDescription('');
                setFile(null);
                setFileBase64(null);
              }}
              className="btn-secondary py-3 px-6 text-sm"
            >
              File Another Report
            </button>
            <button
              onClick={() => router.push(user ? '/dashboard' : '/')}
              className="btn-primary py-3 px-6 text-sm"
            >
              {user ? 'Go to Dashboard' : 'Go to Homepage'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white tracking-tight">
          File a Complaint
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          State your concerns safely. You can report 100% anonymously by toggling the identity shields.
        </p>
        <div className="w-24 h-1 bg-un-blue mx-auto rounded-full mt-4" />
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 border border-white/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-lg rounded-3xl space-y-6">
        
        <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-slate-950/40 border border-blue-500/10 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isAnonymous ? 'bg-purple-500/10 text-purple-600' : 'bg-blue-500/10 text-un-blue'}`}>
              {isAnonymous ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-deep-navy dark:text-white">
                {isAnonymous ? 'Anonymous Reporting Active' : 'Public Profile Linked'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isAnonymous
                  ? 'Your profile details, email, and name are omitted from the ticket records.'
                  : `Reporting as ${user?.name || 'registered user'}.`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isAnonymous ? 'bg-purple-600' : 'bg-gray-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isAnonymous ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Grievance Category</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {COMPLAINT_CATEGORIES.map(cat => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value as ComplaintCategory)}
                className={`p-3 text-left border rounded-xl flex flex-col gap-1 transition-all duration-200 cursor-pointer ${
                  category === cat.value
                    ? 'border-un-blue bg-blue-50/20 dark:bg-slate-800/40 ring-1 ring-un-blue'
                    : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/20 hover:border-gray-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="font-bold text-sm text-deep-navy dark:text-white">{cat.label}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                  {cat.description.substring(0, 45)}...
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Estimated Priority</label>
          <div className="flex gap-2">
            {(['Low', 'Medium', 'High', 'Urgent'] as ComplaintPriority[]).map(prio => {
              let activeClass = 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-slate-800';
              if (priority === prio) {
                if (prio === 'Low') activeClass = 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900';
                if (prio === 'Medium') activeClass = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900';
                if (prio === 'High') activeClass = 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-900';
                if (prio === 'Urgent') activeClass = 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900';
              }
              return (
                <button
                  key={prio}
                  type="button"
                  onClick={() => setPriority(prio)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    priority === prio
                      ? activeClass
                      : 'border-gray-200 dark:border-gray-800 text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800/40 bg-white/20'
                  }`}
                >
                  {prio}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Complaint Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Broken streetlights near computer department walkway"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Issue Description</label>
          <textarea
            rows={6}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the situation in detail. Provide location, dates, and names of any involved parties (if comfortable)..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Attach Evidence (Optional)</label>
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
              dragActive
                ? 'border-un-blue bg-blue-50/10'
                : 'border-gray-200 dark:border-gray-800 bg-white/10 dark:bg-slate-950/10 hover:border-gray-300 dark:hover:border-slate-700'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
            <label htmlFor="file-upload" className="flex flex-col items-center gap-2 cursor-pointer w-full text-center">
              <Upload className="w-8 h-8 text-un-blue animate-float" />
              <div className="text-sm font-bold text-deep-navy dark:text-white">
                {file ? file.name : 'Drag & Drop your file here'}
              </div>
              <div className="text-xs text-slate-400">
                {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'PNG, JPG, PDF up to 5MB'}
              </div>
              {!file && <span className="btn-secondary py-1.5 px-4 text-xs font-bold mt-2">Browse Files</span>}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3.5 text-base disabled:opacity-50 mt-4"
        >
          {loading ? 'Registering Complaint...' : (
            <>
              <PlusCircle className="w-5 h-5" /> Submit Complaint
            </>
          )}
        </button>

      </form>
    </div>
  );
}
