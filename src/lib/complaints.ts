import { Complaint, ComplaintResult, ComplaintCategory, ComplaintPriority, ComplaintStatus, User } from './types';
import { generateComplaintId } from './utils';
import { saveUsers, getUsers } from './auth';

const COMPLAINTS_KEY = 'peoples_voice_complaints';

export function getComplaints(): Complaint[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(COMPLAINTS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

export function saveComplaints(complaints: Complaint[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
}

export function submitComplaint(
  category: ComplaintCategory,
  title: string,
  description: string,
  isAnonymous: boolean,
  priority: ComplaintPriority = 'Medium',
  attachment: string | null = null,
  attachmentName: string | null = null,
  userEmail: string | null = null,
  userName: string = 'Anonymous'
): ComplaintResult {
  const complaints = getComplaints();
  const id = generateComplaintId();
  const timestamp = new Date().toISOString();

  const newComplaint: Complaint = {
    id,
    email: isAnonymous ? null : userEmail,
    name: isAnonymous ? 'Anonymous' : userName,
    category,
    title,
    description,
    isAnonymous,
    attachment,
    attachmentName,
    priority,
    status: 'Submitted',
    createdAt: timestamp,
    history: [
      {
        status: 'Submitted',
        timestamp,
        note: 'Complaint registered successfully.',
      },
    ],
  };

  complaints.unshift(newComplaint);
  saveComplaints(complaints);

  return {
    success: true,
    message: 'Complaint submitted successfully.',
    complaintId: id,
    complaint: newComplaint,
  };
}

export function findComplaintById(id: string): Complaint | null {
  const complaints = getComplaints();
  return complaints.find(c => c.id.toLowerCase() === id.toLowerCase().trim()) || null;
}

export function getUserComplaints(email: string): Complaint[] {
  const complaints = getComplaints();
  return complaints.filter(c => c.email?.toLowerCase() === email.toLowerCase());
}

export function updateComplaintStatus(
  complaintId: string,
  newStatus: ComplaintStatus,
  note: string
): ComplaintResult {
  const complaints = getComplaints();
  const index = complaints.findIndex(c => c.id.toLowerCase() === complaintId.toLowerCase());
  if (index === -1) {
    return { success: false, message: 'Complaint not found.' };
  }

  const timestamp = new Date().toISOString();
  complaints[index].status = newStatus;
  complaints[index].history.push({
    status: newStatus,
    timestamp,
    note: note || `Status updated to ${newStatus}`,
  });

  saveComplaints(complaints);
  return { success: true, message: 'Status updated successfully.', complaint: complaints[index] };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export function initMockData(): void {
  if (typeof window === 'undefined') return;

  const users = getUsers();
  if (users.length === 0) {
    const defaultUsers: User[] = [
      {
        name: 'Jane Doe',
        email: 'student@report.org',
        mobile: '9876543210',
        password: 'Student@123',
        role: 'student',
      },
    ];
    saveUsers(defaultUsers);
  }

  const complaints = getComplaints();
  if (complaints.length === 0) {
    const now = new Date();
    const subTime = (daysAgo: number) => new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

    const mockComplaints: Complaint[] = [
      {
        id: 'CMP-826354',
        email: 'student@report.org',
        name: 'Jane Doe',
        category: 'Bullying/Cyberbullying',
        title: 'Cyberbullying in Discord Study Group',
        description: 'Several students are posting offensive memes and coordinating exclusions of others in the official study group.',
        isAnonymous: false,
        attachment: null,
        attachmentName: null,
        priority: 'High',
        status: 'In Progress',
        createdAt: subTime(5),
        history: [
          { status: 'Submitted', timestamp: subTime(5), note: 'Complaint registered.' },
          { status: 'Under Review', timestamp: subTime(4), note: 'Reviewing the provided links and screenshots.' },
          { status: 'In Progress', timestamp: subTime(3), note: 'Escalated to the student counseling committee.' },
        ],
      },
      {
        id: 'CMP-129483',
        email: null,
        name: 'Anonymous',
        category: 'Safety Issues',
        title: 'Dark Walkway near East Gate Entrance',
        description: 'The streetlights near the East Gate entrance have been broken for two weeks. It feels unsafe walking to the parking lot after evening classes.',
        isAnonymous: true,
        attachment: null,
        attachmentName: null,
        priority: 'Urgent',
        status: 'Resolved',
        createdAt: subTime(10),
        history: [
          { status: 'Submitted', timestamp: subTime(10), note: 'Complaint registered anonymously.' },
          { status: 'Under Review', timestamp: subTime(9), note: 'Maintenance team dispatched to verify.' },
          { status: 'In Progress', timestamp: subTime(8), note: 'Procuring replacement bulbs and fixing wiring.' },
          { status: 'Resolved', timestamp: subTime(6), note: 'Bulbs replaced, lighting restored. Area verified safe.' },
        ],
      },
      {
        id: 'CMP-573921',
        email: 'student@report.org',
        name: 'Jane Doe',
        category: 'School/College Issues',
        title: 'Library Book Shortage for Semester 2',
        description: 'Required reference textbooks for the Computer Science 202 course are out of stock. There are only 2 copies for 80 students.',
        isAnonymous: false,
        attachment: null,
        attachmentName: null,
        priority: 'Medium',
        status: 'Under Review',
        createdAt: subTime(2),
        history: [
          { status: 'Submitted', timestamp: subTime(2), note: 'Complaint registered.' },
          { status: 'Under Review', timestamp: subTime(1), note: 'Contacted library administration to check budget availability.' },
        ],
      },
    ];

    saveComplaints(mockComplaints);
  }
}
