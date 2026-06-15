import React from 'react';
import { ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { TRUST_BANNER } from '@/lib/constants';

export default function TrustBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-un-blue via-blue-700 to-deep-navy py-12 px-4 sm:px-6 lg:px-8 text-white text-center">
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-lg pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-6 text-white/40 mb-2">
          <ShieldCheck className="w-8 h-8 text-white/70 animate-float" />
          <HeartHandshake className="w-8 h-8 text-white/70 animate-float" style={{ animationDelay: '1s' }} />
          <Eye className="w-8 h-8 text-white/70 animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-relaxed select-none">
          "{TRUST_BANNER}"
        </h2>
        
        <div className="w-16 h-1 bg-white/30 rounded-full mt-2" />
      </div>
    </section>
  );
}
