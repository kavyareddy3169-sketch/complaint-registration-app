import React from 'react';
import { ShieldCheck, EyeOff, ClipboardCheck, RefreshCw, Paperclip, Lock, Heart, Award, Users, Compass, Zap } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, MISSION_STATEMENT } from '@/lib/constants';

export const metadata = {
  title: `About Us | ${APP_NAME}`,
  description: 'Understand the mission, values, and features of our secure reporting portal.',
};

export default function AboutPage() {
  const features = [
    { title: 'Secure Registration', desc: 'Sign up with confidence. Your personal records are isolated and securely protected.', icon: ShieldCheck },
    { title: 'Anonymous Reporting', desc: 'File concerns without revealing your identity. Absolute privacy protection.', icon: EyeOff },
    { title: 'Complaint Tracking', desc: 'Check resolution status using your unique generated ticket identification code.', icon: ClipboardCheck },
    { title: 'Real-Time Updates', desc: 'Follow along as the timeline updates with logs from reviewing committees.', icon: RefreshCw },
    { title: 'Evidence Upload', desc: 'Attach screenshots, documents, or image evidence directly to validate your reports.', icon: Paperclip },
    { title: 'Data Privacy', desc: 'GDPR-compliant data deletion policies and system configurations prioritizing safety.', icon: Lock },
  ];

  const values = [
    { title: 'Trust', desc: 'Fostering a secure environment where every user knows they are heard and protected.', icon: Award },
    { title: 'Safety', desc: 'Prioritizing safety over administrative convenience, ensuring protection from harassment.', icon: ShieldCheck },
    { title: 'Inclusion', desc: 'Everyone has a voice regardless of background, year, gender, or status on campus.', icon: Users },
    { title: 'Transparency', desc: 'Providing clear insight into complaint status, history, and accountability measures.', icon: Compass },
    { title: 'Youth Empowerment', desc: 'Giving students direct leverage to shape and clean their campuses and neighborhoods.', icon: Zap },
  ];

  return (
    <div className="relative py-12 space-y-20">
      <section className="text-center max-w-4xl mx-auto px-4 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-navy dark:text-white tracking-tight">
          About <span className="text-un-blue">{APP_NAME}</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
          {APP_TAGLINE}
        </p>
        <div className="w-24 h-1 bg-un-blue mx-auto rounded-full mt-4" />
      </section>

      <section className="bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 py-12 px-4 sm:px-6 border-y border-gray-200/40 dark:border-slate-800/40">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-un-blue">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <blockquote className="text-xl sm:text-2xl font-semibold text-deep-navy dark:text-gray-100 italic leading-relaxed">
            "{MISSION_STATEMENT}"
          </blockquote>
          <cite className="block text-sm font-bold text-un-blue uppercase tracking-wider not-italic">
            — Our Foundational Pledge
          </cite>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-deep-navy dark:text-white">Platform Features</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A comprehensive set of security, registration, and action parameters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="glass-card p-6 flex gap-4 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                <div className="p-3 rounded-xl bg-blue-500/10 text-un-blue h-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-deep-navy dark:text-white">{feat.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-deep-navy dark:text-white">Our Values</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Guiding directives for trust, dignity, safety, and action.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="glass-card p-6 text-center space-y-4 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-deep-navy dark:text-white">{val.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
