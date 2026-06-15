export interface User {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role?: 'student' | 'admin';
}

export interface ComplaintHistory {
  status: ComplaintStatus;
  timestamp: string;
  note: string;
}

export type ComplaintStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';

export type ComplaintCategory =
  | 'Bullying/Cyberbullying'
  | 'Harassment'
  | 'Safety Issues'
  | 'School/College Issues'
  | 'Civic Issues';

export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Complaint {
  id: string;
  email: string | null;
  name: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  isAnonymous: boolean;
  attachment: string | null;
  attachmentName: string | null;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  history: ComplaintHistory[];
}

export interface AuthResult {
  success: boolean;
  message?: string;
  isAdmin?: boolean;
  redirect?: string;
}

export interface ComplaintResult {
  success: boolean;
  message?: string;
  complaintId?: string;
  complaint?: Complaint;
}
