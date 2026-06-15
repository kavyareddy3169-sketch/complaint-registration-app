'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, ChevronDown, ChevronUp, Send, ShieldAlert } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { APP_NAME } from '@/lib/constants';

interface FAQItem {
  question: string;
  answer: string;
}

export default function ContactPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showToast('Please fill in all fields.', 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      showToast('Message sent successfully! We will get back to you soon.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  const faqs: FAQItem[] = [
    {
      question: 'Is my report truly anonymous?',
      answer: 'Yes. When you choose to submit anonymously, your name and email are completely stripped from the complaint ticket. The system does not save IP addresses or cookies linked to your profile on the ticket itself.',
    },
    {
      question: 'How do I track my report after submission?',
      answer: 'Upon filing a complaint, you will receive a unique ticket ID (e.g. CMP-123456). Write this down or copy it. You can navigate to the "Track" page at any time, input this ID, and view the progress logs and current status.',
    },
    {
      question: 'Who reviews the complaints?',
      answer: 'Complaints are routed to the designated administrative panel, which includes trained student coordinators, counselors, and community board leads depending on the category selected.',
    },
    {
      question: 'Can I add evidence to my complaint later?',
      answer: 'Currently, evidence attachments must be uploaded at the time of submission. If you need to submit supplementary information, you can submit a secondary report referencing the original ticket ID.',
    },
    {
      question: 'What should I do in case of an immediate physical emergency?',
      answer: 'People\'s Voice is not a real-time crisis dispatcher. If you are in immediate physical danger, please call national security helplines or campus emergency security teams directly. Check the numbers listed under our emergency helpline list.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-navy dark:text-white tracking-tight">
          Contact & Support
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Need assistance or have questions about how our platform operates? Send us a message or review our FAQs.
        </p>
        <div className="w-24 h-1 bg-un-blue mx-auto rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 glass-card p-8 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-deep-navy dark:text-white">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Inquiry about anonymous reporting"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your question or feedback in detail..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-slate-950/50 focus:border-un-blue dark:focus:border-un-blue focus:outline-none text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm disabled:opacity-50"
            >
              {loading ? 'Sending...' : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-deep-navy dark:text-white">Get in Touch</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-un-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-deep-navy dark:text-white">Office Location</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">UN Youth Development Hub, Block C</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-un-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-deep-navy dark:text-white">Email Address</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">support@peoplesvoice.org</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-un-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-deep-navy dark:text-white">Direct Phone Support</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">+1 (555) 019-2834</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 to-red-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-200 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              <h3 className="font-bold text-lg">Emergency Help?</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              For direct security concerns, sexual harassment emergencies, or campus threats, please dial the 24/7 Security Helpline immediately.
            </p>
            <div className="text-lg font-extrabold text-rose-600 dark:text-rose-400">+1-800-273-TALK</div>
          </div>
        </div>
      </div>

      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-deep-navy dark:text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Everything you need to know about safety, anonymity, and processes.</p>
        </div>

        <div className="space-y-4 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card border border-white/40 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 font-bold text-left text-deep-navy dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {isOpen && (
                  <div className="p-5 border-t border-gray-100 dark:border-slate-800/60 bg-gray-50/30 dark:bg-slate-950/20 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
