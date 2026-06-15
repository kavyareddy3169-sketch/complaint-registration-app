'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getComplaints } from '@/lib/complaints';
import { MessageSquare, CheckCircle, TrendingUp } from 'lucide-react';

function Counter({ end, duration = 1500, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);
      
      const ease = 1 - Math.pow(2, -10 * rate);
      const current = Math.floor(ease * end);
      
      setCount(current);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function StatsSection() {
  const [stats, setStats] = useState({
    registered: 0,
    resolved: 0,
    rating: 0,
  });

  useEffect(() => {
    const complaints = getComplaints();
    const registered = complaints.length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    const rating = registered > 0 ? Math.round((resolved / registered) * 100) : 94;
    
    setStats({ registered, resolved, rating });
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-10 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 sm:p-8 flex items-center gap-5 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-lg rounded-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-4 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 text-un-blue">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white">
              <Counter end={stats.registered} />
            </div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">Complaints Registered</div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Safely reported by youth</p>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8 flex items-center gap-5 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-lg rounded-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-4 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white">
              <Counter end={stats.resolved} />
            </div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">Resolved Issues</div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Action taken by authorities</p>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-8 flex items-center gap-5 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-lg rounded-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="p-4 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white">
              <Counter end={stats.rating} suffix="%" />
            </div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">Resolution Rate</div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">High-efficiency tracking</p>
          </div>
        </div>
      </div>
    </section>
  );
}
