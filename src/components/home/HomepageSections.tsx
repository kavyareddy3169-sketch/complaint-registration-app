import React from 'react';
import { Rocket, ShieldCheck, Eye, Users, Globe, Heart } from 'lucide-react';

export default function HomepageSections() {
  const missionAreas = [
    {
      title: 'Youth Empowerment',
      description: 'Building critical tools that allow young leaders and students to raise their voice, initiate action, and direct positive change.',
      icon: Rocket,
      gradient: 'from-purple-500/10 to-indigo-500/10 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Safe Reporting',
      description: 'A platform prioritizing personal security with robust anonymity options and encrypted storage to report without fear.',
      icon: ShieldCheck,
      gradient: 'from-blue-500/10 to-cyan-500/10 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-un-blue',
    },
    {
      title: 'Transparency & Accountability',
      description: 'Public stats trackers and ticket timeline histories ensuring administration is responsive and accountable for all reports.',
      icon: Eye,
      gradient: 'from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Community Development',
      description: 'Turning grievances into civic suggestions that foster cleaner campus environments, library stocks, and safety parameters.',
      icon: Users,
      gradient: 'from-amber-500/10 to-orange-500/10 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Digital Inclusion',
      description: 'High-accessibility design layouts optimized for mobile, low bandwidth, and simple screen-reader navigation paradigms.',
      icon: Globe,
      gradient: 'from-cyan-500/10 to-sky-500/10 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Awareness & Support',
      description: 'Resource hubs that connect students to active counselors, anti-bullying definitions, and direct security contact directories.',
      icon: Heart,
      gradient: 'from-rose-500/10 to-pink-500/10 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/50 dark:border-slate-800/50">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-xs font-bold text-un-blue uppercase tracking-widest">Our Mission Areas</h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white tracking-tight">
          Pillars of Safe Expression
        </h3>
        <p className="text-base text-slate-500 dark:text-slate-400">
          Our platform is structured on core human rights and youth empowerment values. Here is what we advocate:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {missionAreas.map((area, idx) => {
          const Icon = area.icon;
          return (
            <div
              key={idx}
              className={`glass-card p-6 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-2xl bg-gradient-to-br ${area.gradient} transition-all duration-300`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${area.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-deep-navy dark:text-white">{area.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
