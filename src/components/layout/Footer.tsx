import React from 'react';
import Link from 'next/link';
import { Shield, Github, Twitter, Mail, PhoneCall, Heart } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, FOOTER_QUOTE } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Shield className="w-7 h-7 text-un-blue group-hover:scale-105 transition-transform" />
              <span className="font-bold text-lg text-white">
                People's <span className="text-un-blue">Voice</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {APP_TAGLINE}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-un-blue hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-un-blue hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:support@peoplesvoice.org" className="p-2 rounded-lg bg-slate-800 hover:bg-un-blue hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-un-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-un-blue transition-colors">About Mission</Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-un-blue transition-colors">Track Complaint</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-un-blue transition-colors">Contact & Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal & Trust</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-un-blue transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-un-blue transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-un-blue transition-colors">Anonymous Safe Harbor</a>
              </li>
              <li>
                <a href="#" className="hover:text-un-blue transition-colors">Data Protection (GDPR)</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Assistance */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-1">Emergency Help</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you are facing immediate danger, harassment, or safety issues, please contact emergency lines directly.
            </p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <PhoneCall className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">Youth Safety Helpline</div>
                <div className="text-sm font-bold text-un-blue">1-800-273-TALK</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 {APP_NAME}. Built with dignity and transparency for youth empowerment.
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span>{FOOTER_QUOTE}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
