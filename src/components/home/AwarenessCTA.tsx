import React from 'react';
import Link from 'next/link';
import { Megaphone, CheckCircle2 } from 'lucide-react';

export default function AwarenessCTA() {
  const checkpoints = [
    '100% Secure & Optional Anonymous Reporting',
    'Real-Time Ticket Tracking and Progress Logs',
    'Administrative Action and Accountability Checks',
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 text-white p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Megaphone className="w-4 h-4" />
              <span>Awareness Campaign</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Know Your Right to Report
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              You are entitled to a safe, welcoming, and inclusive educational environment.
              Reporting concerns is not just a right—it is a critical tool for building a healthier community.
            </p>

            <ul className="space-y-3 pt-2">
              {checkpoints.map((pt, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-4 justify-center">
            <Link href="/submit-complaint" className="btn-primary py-3.5 px-6 text-center text-base">
              Report An Issue
            </Link>
            <Link
              href="/about"
              className="py-3.5 px-6 text-center text-sm font-semibold border border-slate-700 hover:border-slate-500 rounded-xl bg-slate-800/30 hover:bg-slate-800/60 text-white transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
