import { User, AuthResult } from './types';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './constants';

const USERS_KEY = 'peoples_voice_users';
const CURRENT_USER_KEY = 'peoples_voice_current_user';

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return null;
  }
}

export function isAdminLoggedIn(): boolean {
  const current = getCurrentUser();
  return current?.role === 'admin';
}

export function registerUser(
  name: string,
  email: string,
  mobile: string,
  password: string,
  confirmPassword?: string
): AuthResult {
  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match.' };
  }

  if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return { success: false, message: 'This email is reserved.' };
  }

  const users = getUsers();
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { success: false, message: 'Email already registered.' };
  }

  const newUser: User = {
    name,
    email,
    mobile,
    password,
    role: 'student'
  };

  users.push(newUser);
  saveUsers(users);

  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  }

  return { success: true, redirect: '/dashboard' };
}

export function loginUser(username: string, password: string): AuthResult {
  if (
    username.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  ) {
    const adminUser: User = {
      name: 'Administrator',
      email: ADMIN_EMAIL,
      mobile: '0000000000',
      password: ADMIN_PASSWORD,
      role: 'admin',
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
    }
    return { success: true, isAdmin: true, redirect: '/dashboard/admin' };
  }

  const users = getUsers();
  const found = users.find(
    u =>
      (u.email.toLowerCase() === username.toLowerCase() || u.mobile === username) &&
      u.password === password
  );

  if (!found) {
    return { success: false, message: 'Invalid email/mobile or password.' };
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
  }

  return { success: true, isAdmin: false, redirect: '/dashboard' };
}

export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function updateProfile(
  currentEmail: string,
  name: string,
  email: string,
  mobile: string
): AuthResult {
  if (currentEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return { success: false, message: 'Cannot edit admin profile.' };
  }

  const users = getUsers();
  const index = users.findIndex(u => u.email.toLowerCase() === currentEmail.toLowerCase());
  if (index === -1) {
    return { success: false, message: 'User not found.' };
  }

  if (email.toLowerCase() !== currentEmail.toLowerCase()) {
    const conflict = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (conflict) {
      return { success: false, message: 'Email already in use.' };
    }
  }

  users[index].name = name;
  users[index].email = email;
  users[index].mobile = mobile;

  saveUsers(users);

  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]));
  }

  return { success: true, message: 'Profile updated successfully.' };
}

export function simulateForgotPassword(emailOrMobile: string): AuthResult {
  if (emailOrMobile.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return {
      success: true,
      message: 'Password reset link sent to registered admin contact.',
    };
  }

  const users = getUsers();
  const found = users.find(
    u => u.email.toLowerCase() === emailOrMobile.toLowerCase() || u.mobile === emailOrMobile
  );

  if (!found) {
    return { success: false, message: 'No registered user found with that email or mobile.' };
  }

  return {
    success: true,
    message: `Simulated password reset instructions were sent to ${found.email}.`,
  };
}
