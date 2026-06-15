'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, Menu, X, Sun, Moon, LogOut, FileText, User as UserIcon } from 'lucide-react';
import { getCurrentUser, logoutUser, isAdminLoggedIn } from '@/lib/auth';
import { useToast } from '@/components/ui/Toast';
import { User } from '@/lib/types';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const syncAuth = () => {
    setUser(getCurrentUser());
    setIsAdmin(isAdminLoggedIn());
  };

  useEffect(() => {
    syncAuth();

    window.addEventListener('auth-change', syncAuth);
    window.addEventListener('storage', syncAuth);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const isDark = document.documentElement.classList.contains('dark') || 
                   localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {
      window.removeEventListener('auth-change', syncAuth);
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event('auth-change'));
    showToast('Logged out successfully', 'success');
    setMobileMenuOpen(false);
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Track', href: '/track' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Shield className="w-8 h-8 text-un-blue group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold text-xl tracking-tight text-deep-navy dark:text-white">
              People's <span className="text-un-blue">Voice</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-un-blue ${
                    isActive ? 'text-un-blue' : 'text-deep-navy/80 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-deep-navy dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin ? (
                  <Link href="/dashboard/admin" className="btn-secondary text-xs py-2 px-4">
                    Admin Panel
                  </Link>
                ) : (
                  <>
                    <Link href="/submit-complaint" className="btn-primary text-xs py-2 px-4">
                      <FileText className="w-4 h-4" /> Report Issue
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-1.5 text-sm font-semibold text-deep-navy dark:text-gray-200 hover:text-un-blue transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-un-blue" />
                      <span>{user.name.split(' ')[0]}</span>
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-deep-navy dark:text-gray-200 hover:text-un-blue transition-colors px-3 py-2"
                >
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-xs py-2 px-4">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-deep-navy dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-deep-navy dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-x-0 top-[60px] bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ease-in-out transform origin-top z-45 ${
          mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-semibold text-base transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/30 text-un-blue'
                    : 'text-deep-navy dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="border-t border-gray-200 dark:border-gray-800 my-3"></div>

          {user ? (
            <div className="space-y-3 px-3">
              <div className="flex items-center gap-2 py-2">
                <UserIcon className="w-5 h-5 text-un-blue" />
                <span className="font-semibold text-deep-navy dark:text-gray-200">{user.name}</span>
              </div>
              {isAdmin ? (
                <Link
                  href="/dashboard/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full btn-secondary py-2 text-sm"
                >
                  Admin Panel
                </Link>
              ) : (
                <>
                  <Link
                    href="/submit-complaint"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full btn-primary py-2 text-sm"
                  >
                    <FileText className="w-4 h-4" /> Report Issue
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center w-full btn-secondary py-2 text-sm"
                  >
                    My Dashboard
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-rose-200 dark:border-rose-900/50 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 font-semibold text-sm transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 px-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-deep-navy dark:text-gray-200 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center btn-primary py-2 text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
