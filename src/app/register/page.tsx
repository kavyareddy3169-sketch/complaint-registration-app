'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, UserPlus, User as UserIcon, Mail, Phone, Lock } from 'lucide-react';
import { registerUser } from '@/lib/auth';
import { evaluatePasswordStrength } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import { APP_NAME } from '@/lib/constants';

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = evaluatePasswordStrength(password);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Full name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Valid email is required.';
    if (!mobile.trim() || !/^\d{10}$/.test(mobile)) nextErrors.mobile = '10-digit mobile number is required.';
    if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';
    if (!agreeTerms) nextErrors.agreeTerms = 'You must agree to the privacy statement.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const result = registerUser(name, email, mobile, password, confirmPassword);
      setLoading(false);

      if (result.success) {
        showToast('Registration successful! Please login with your credentials.', 'success');
        router.push('/login');
      } else {
        showToast(result.message || 'Registration failed.', 'danger');
      }
    }, 1200);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-8 border border-white/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-xl rounded-3xl space-y-5">
          
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 text-un-blue mb-1">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-deep-navy dark:text-white">Create Your Account</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Register securely to start reporting issues on {APP_NAME}.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm ${
                    errors.name ? 'border-rose-500' : 'border-gray-200 dark:border-gray-800'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-rose-500 font-semibold">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@report.org"
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm ${
                    errors.email ? 'border-rose-500' : 'border-gray-200 dark:border-gray-800'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[10px] text-rose-500 font-semibold">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Mobile Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="9876543210"
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm ${
                    errors.mobile ? 'border-rose-500' : 'border-gray-200 dark:border-gray-800'
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-[10px] text-rose-500 font-semibold">{errors.mobile}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm ${
                    errors.password ? 'border-rose-500' : 'border-gray-200 dark:border-gray-800'
                  }`}
                />
              </div>
              
              {password && (
                <div className="space-y-1 pt-1">
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.className}`}
                      style={{ width: `${strength.percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400">Strength:</span>
                    <span className={
                      strength.score >= 4 ? 'text-emerald-500' : 
                      strength.score >= 3 ? 'text-blue-500' : 
                      strength.score >= 2 ? 'text-amber-500' : 'text-rose-500'
                    }>{strength.label}</span>
                  </div>
                </div>
              )}
              {errors.password && <p className="text-[10px] text-rose-500 font-semibold">{errors.password}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm ${
                    errors.confirmPassword ? 'border-rose-500' : 'border-gray-200 dark:border-gray-800'
                  }`}
                />
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-rose-500 font-semibold">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-un-blue border-gray-300 focus:ring-un-blue"
              />
              <label htmlFor="agreeTerms" className="text-xs text-slate-500 dark:text-slate-400 leading-normal select-none">
                I understand that malicious false reporting is subject to university code of conduct reviews. I accept the safe reporting privacy statement.
              </label>
            </div>
            {errors.agreeTerms && <p className="text-[10px] text-rose-500 font-semibold">{errors.agreeTerms}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 text-sm disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating Account...' : (
                <>
                  <UserPlus className="w-4 h-4" /> Register
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-un-blue hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
