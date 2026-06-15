import { ComplaintStatus } from './types';

export const APP_NAME = "People's Voice";
export const APP_TAGLINE = 'Every Voice Matters. Every Concern Deserves Attention.';
export const MISSION_STATEMENT = 'Empowering students and young people to raise their voices, report concerns safely, and contribute to stronger, more inclusive communities.';
export const TRUST_BANNER = 'Dignity, Safety, Equality, and Accountability for Every Student.';
export const FOOTER_QUOTE = 'Building stronger communities by ensuring every student has a voice.';

export const ADMIN_EMAIL = 'admin@report.org';
export const ADMIN_PASSWORD = 'Admin@123';

export const COMPLAINT_CATEGORIES: { value: string; label: string; icon: string; color: string; bgColor: string; description: string }[] = [
  { value: 'Bullying/Cyberbullying', label: 'Bullying & Cyberbullying', icon: 'MessageSquareWarning', color: '#6C63FF', bgColor: '#ede9fe', description: 'Report physical intimidation, exclusion, verbal abuse, or social media harassment and digital threats.' },
  { value: 'Harassment', label: 'Harassment', icon: 'AlertTriangle', color: '#ef4444', bgColor: '#fee2e2', description: 'Flag inappropriate comments, gestures, or persistent unwanted attention safely and 100% anonymously.' },
  { value: 'Safety Issues', label: 'Safety Issues', icon: 'ShieldOff', color: '#d97706', bgColor: '#fef3c7', description: 'Report physical hazards, poorly lit walkways, structural building defects, or security lapses on campuses.' },
  { value: 'School/College Issues', label: 'School/College Issues', icon: 'BookOpen', color: '#0284c7', bgColor: '#e0f2fe', description: 'Log scheduling clashes, grading discrepancy processes, counselor issues, or academic mistreatment.' },
  { value: 'Civic Issues', label: 'Civic Issues', icon: 'MapPin', color: '#059669', bgColor: '#d1fae5', description: 'Highlight community and public transport issues, waterlogging, or waste dumping around educational hubs.' },
];

export const COMPLAINT_STATUSES: ComplaintStatus[] = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];

export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Submitted': { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-900/50' },
  'Under Review': { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-900/50' },
  'In Progress': { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-900/50' },
  'Resolved': { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-900/50' },
};
