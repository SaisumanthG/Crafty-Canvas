import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 } from './utils';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  changePassword: (current: string, newPass: string) => { success: boolean; error?: string };
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

const USERS_KEY = 'webcraft_users';
const SESSION_KEY = 'webcraft_session';

function getUsers(): Record<string, { user: User; password: string }> {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch { return {}; }
}

function saveUsers(users: Record<string, { user: User; password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const sessionId = localStorage.getItem(SESSION_KEY);
      if (sessionId) {
        const users = getUsers();
        if (users[sessionId]) setUser(users[sessionId].user);
      }
    } catch (e) {
      console.error('Session restore error:', e);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    try {
      const users = getUsers();
      const entry = Object.values(users).find(u => u.user.email === email);
      if (!entry) return { success: false, error: 'No account found with this email' };
      if (entry.password !== password) return { success: false, error: 'Incorrect password. Please try again.' };
      setUser(entry.user);
      localStorage.setItem(SESSION_KEY, entry.user.id);
      return { success: true };
    } catch (e) {
      console.error('Login error:', e);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = (name: string, email: string, password: string): { success: boolean; error?: string } => {
    try {
      const users = getUsers();
      if (Object.values(users).some(u => u.user.email === email)) {
        return { success: false, error: 'An account with this email already exists' };
      }
      const id = v4();
      const newUser: User = { id, name, email, createdAt: new Date().toISOString() };
      users[id] = { user: newUser, password };
      saveUsers(users);
      setUser(newUser);
      localStorage.setItem(SESSION_KEY, id);
      return { success: true };
    } catch (e) {
      console.error('Registration error:', e);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    const users = getUsers();
    if (users[user.id]) { users[user.id].user = updated; saveUsers(users); }
  };

  const changePassword = (current: string, newPass: string): { success: boolean; error?: string } => {
    if (!user) return { success: false, error: 'Not logged in' };
    const users = getUsers();
    if (!users[user.id]) return { success: false, error: 'User not found' };
    if (users[user.id].password !== current) return { success: false, error: 'Current password is incorrect' };
    users[user.id].password = newPass;
    saveUsers(users);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}
