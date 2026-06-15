'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'danger' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => {
          let bgClass = 'bg-blue-50 dark:bg-slate-900 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
          let Icon = Info;

          if (toast.type === 'success') {
            bgClass = 'bg-emerald-50 dark:bg-slate-900 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200';
            Icon = CheckCircle2;
          } else if (toast.type === 'danger') {
            bgClass = 'bg-rose-50 dark:bg-slate-900 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200';
            Icon = AlertCircle;
          } else if (toast.type === 'warning') {
            bgClass = 'bg-amber-50 dark:bg-slate-900 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200';
            Icon = AlertTriangle;
          }

          return (
            <div
              key={toast.id}
              className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg pointer-events-auto animate-fade-in-up transition-all duration-300 ${bgClass}`}
              role="alert"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 text-sm font-medium">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
