import { ComplaintStatus } from './types';

export function generateComplaintId(): string {
  return 'CMP-' + Math.floor(100000 + Math.random() * 900000);
}

export function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatDate(isoString: string, options?: Intl.DateTimeFormatOptions): string {
  try {
    const date = new Date(isoString);
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options || defaultOptions);
  } catch (e) {
    return isoString;
  }
}

export function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return isoString;
  }
}

export function evaluatePasswordStrength(password: string) {
  let score = 0;
  if (!password) return { score: 0, percent: 0, label: 'Empty', className: 'strength-weak' };

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  let percent = (score / 5) * 100;
  let label = 'Very Weak';
  let className = 'strength-weak';

  if (score === 5) {
    label = 'Very Strong';
    className = 'strength-very-strong';
  } else if (score >= 4) {
    label = 'Strong';
    className = 'strength-strong';
  } else if (score >= 3) {
    label = 'Medium';
    className = 'strength-medium';
  } else {
    label = 'Weak';
    className = 'strength-weak';
  }

  return { score, percent, label, className };
}

export function getStatusBadgeClass(status: ComplaintStatus): string {
  switch (status) {
    case 'Submitted':
      return 'badge-submitted';
    case 'Under Review':
      return 'badge-review';
    case 'In Progress':
      return 'badge-progress';
    case 'Resolved':
      return 'badge-resolved';
    default:
      return 'badge-submitted';
  }
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
