'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, KeyRound, Mail, ArrowLeft } from 'lucide-react';
import { simulateForgotPassword } from '@/lib/auth';
import { useToast } from '@/components/ui/Toast';

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrMobile.trim()) {
      showToast('Please enter your email address or mobile number.', 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = simulateForgotPassword(emailOrMobile);
      setLoading(false);

      if (result.success) {
        showToast(result.message || 'Verification code sent.', 'success');
        setEmailOrMobile('');
      } else {
        showToast(result.message || 'Error executing request.', 'danger');
      }
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-8 border border-white/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-xl rounded-3xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 text-un-blue mb-2">
              <KeyRound className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-deep-navy dark:text-white">Reset Password</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide your email or mobile to send reset codes.
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Email or Mobile</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={emailOrMobile}
                  onChange={e => setEmailOrMobile(e.target.value)}
                  placeholder="student@report.org"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm disabled:opacity-50 mt-2"
            >
              {loading ? 'Sending Request...' : 'Send Recovery Code'}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-un-blue hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
