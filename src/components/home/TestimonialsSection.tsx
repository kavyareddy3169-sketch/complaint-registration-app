import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya S.',
      role: 'Engineering Student, Age 19',
      quote: 'The anonymous reporting feature really works. I was able to raise a bullying issue in our laboratory without any fear of academic retaliation. The problem was resolved quietly in three days.',
      initials: 'PS',
      stars: 5,
      avatarBg: 'bg-blue-500/10 text-un-blue',
    },
    {
      name: 'Rahul M.',
      role: 'Arts Student, Age 17',
      quote: 'I reported waterlogging and waste piling right outside our college back entrance using the Civic Issues category. The authorities repaired the sewer lines and cleaned the road within a week.',
      initials: 'RM',
      stars: 5,
      avatarBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      name: 'Dr. Anitha K.',
      role: 'College Dean',
      quote: 'People\'s Voice provides us with a clear, objective admin dashboard that visualizes students\' complaints. It helps our staff respond efficiently to real issues, maintaining trust on campus.',
      initials: 'AK',
      stars: 5,
      avatarBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/50 dark:border-slate-800/50">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-xs font-bold text-un-blue uppercase tracking-widest">Student Voices</h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white tracking-tight">
          What Our Community Says
        </h3>
        <p className="text-base text-slate-500 dark:text-slate-400">
          Hear how our platform facilitates safe communication, swift action, and transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.map((test, idx) => (
          <div
            key={idx}
            className="glass-card p-8 flex flex-col justify-between border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md shadow-md rounded-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: test.stars }).map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{test.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-slate-800/60">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${test.avatarBg}`}>
                {test.initials}
              </div>
              <div>
                <h5 className="font-bold text-deep-navy dark:text-white text-sm">{test.name}</h5>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{test.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
