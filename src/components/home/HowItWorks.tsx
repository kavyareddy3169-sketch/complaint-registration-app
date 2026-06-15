import React from 'react';
import { FormInput, EyeOff, ClipboardList } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Write Details',
      description: 'Submit your issue title, description, category, and attach photos or evidence.',
      icon: FormInput,
    },
    {
      number: '2',
      title: 'Toggle Identity',
      description: 'Choose whether to report anonymously or sign with your student account.',
      icon: EyeOff,
    },
    {
      number: '3',
      title: 'Get ID & Track',
      description: 'Receive your unique complaint ticket ID and monitor resolution in real-time.',
      icon: ClipboardList,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/50 dark:border-slate-800/50">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-xs font-bold text-un-blue uppercase tracking-widest">Workflow</h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-deep-navy dark:text-white tracking-tight">
          How It Works
        </h3>
        <p className="text-base text-slate-500 dark:text-slate-400">
          A secure, structured, and easy-to-follow process to register and resolve concerns.
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-un-blue via-purple-accent to-un-blue -translate-y-12 z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="text-center space-y-4 max-w-sm mx-auto">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-un-blue to-purple-accent text-white flex items-center justify-center shadow-lg font-bold text-xl relative z-10 animate-float">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full flex items-center justify-center font-bold text-sm shadow-md border-2 border-white dark:border-slate-950 z-20">
                    {step.number}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-deep-navy dark:text-white pt-2">{step.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
