import React from 'react';
import { MessageSquareWarning, AlertTriangle, ShieldOff, BookOpen, MapPin, Fingerprint } from 'lucide-react';
import { COMPLAINT_CATEGORIES } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<any>> = {
  MessageSquareWarning: MessageSquareWarning,
  AlertTriangle: AlertTriangle,
  ShieldOff: ShieldOff,
  BookOpen: BookOpen,
  MapPin: MapPin,
};

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/50 dark:border-slate-800/50">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-xs font-bold text-un-blue uppercase tracking-widest">Grievance Verticals</h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white tracking-tight">
          What Can You Report?
        </h3>
        <p className="text-base text-slate-500 dark:text-slate-400">
          Raise concerns about safety, well-being, and community development. We route your voice to the right authorities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COMPLAINT_CATEGORIES.map(category => {
          const IconComponent = iconMap[category.icon] || AlertTriangle;
          return (
            <div
              key={category.value}
              className="glass-card p-8 flex flex-col justify-between border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: category.color }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-deep-navy dark:text-white">{category.label}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          );
        })}

        <div className="relative overflow-hidden p-8 flex flex-col justify-between rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-un-blue via-un-blue to-purple-accent text-white border border-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/15 text-white backdrop-blur-sm">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold">Guaranteed Anonymity</h4>
            <p className="text-sm text-blue-50/90 leading-relaxed">
              We encrypt your details. No trackable logs, IP captures, or mandatory identity tags are kept when you toggle anonymous reporting.
            </p>
            <div className="inline-flex items-center gap-1 text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm mt-2">
              🔒 End-to-End Privacy Shield
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
