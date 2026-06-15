'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Search, PlusCircle } from 'lucide-react';
import { MISSION_STATEMENT } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-un-blue text-xs font-semibold uppercase tracking-wider animate-pulse-glow">
            <Shield className="w-4 h-4" />
            <span>Safe & Anonymous Reporting</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Every Voice Matters. <br />
            <span className="gradient-text">Shape Your Future.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {MISSION_STATEMENT}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link href="/submit-complaint" className="btn-primary w-full sm:w-auto text-base py-3.5 px-6">
              <PlusCircle className="w-5 h-5" />
              File a Complaint
            </Link>
            <Link href="/track" className="btn-secondary w-full sm:w-auto text-base py-3.5 px-6 border-white/20 text-white hover:bg-white/5 hover:border-white/40 dark:border-slate-700 dark:text-slate-200">
              <Search className="w-5 h-5 text-un-blue" />
              Track Complaint
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-2">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
            <Image
              src="/images/hero-students.png"
              alt="Diverse youth standing together in solidarity, representing empowerment and equality"
              fill
              className="object-cover rounded-xl select-none"
              priority
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 400px"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-un-blue to-purple-accent rounded-2xl opacity-20 blur-xl pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-accent to-blue-500 rounded-full opacity-10 blur-2xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
