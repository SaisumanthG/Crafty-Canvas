import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Rocket, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthContext';

export default function Settings() {
  const navigate = useNavigate();
  const { user, changePassword } = useAuth();
  const [tab, setTab] = useState<'password' | 'vercel'>('password');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [vercelToken, setVercelToken] = useState(localStorage.getItem('webcraft_vercel_token') || '');
  const [vercelConnected, setVercelConnected] = useState(!!localStorage.getItem('webcraft_vercel_token'));

  if (!user) { navigate('/login'); return null; }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    if (newPass !== confirmPass) { setPassError('Passwords do not match'); return; }
    if (newPass.length < 6) { setPassError('Password must be at least 6 characters'); return; }
    const result = changePassword(currentPass, newPass);
    if (result.success) {
      toast.success('Password changed!');
      setCurrentPass(''); setNewPass(''); setConfirmPass('');
    } else {
      setPassError(result.error || 'Failed');
    }
  };

  const handleVercelSave = () => {
    if (vercelToken.trim()) {
      localStorage.setItem('webcraft_vercel_token', vercelToken.trim());
      setVercelConnected(true);
      toast.success('Vercel connected!');
    } else {
      localStorage.removeItem('webcraft_vercel_token');
      setVercelConnected(false);
      toast.success('Vercel disconnected');
    }
  };

  const tabs = [
    { id: 'password' as const, label: 'Password', icon: Lock },
    { id: 'vercel' as const, label: 'Vercel', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-landing-bg">
      <nav className="border-b border-landing-border px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button onClick={() => navigate('/')} className="text-landing-text hover:text-landing-bright"><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-lg font-bold text-landing-bright">Settings</h1>
        </div>
      </nav>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-6 flex gap-2">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === t.id ? 'bg-primary text-primary-foreground' : 'border border-landing-border text-landing-text hover:text-landing-bright'}`}>
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-landing-border bg-landing-surface p-8">
          {tab === 'password' && (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <h2 className="mb-4 text-lg font-bold text-landing-bright">Change Password</h2>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-landing-text">Current Password</label>
                <input type="password" required value={currentPass} onChange={e => setCurrentPass(e.target.value)}
                  className="w-full rounded-lg border border-landing-border bg-landing-bg px-4 py-2.5 text-sm text-landing-bright focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-landing-text">New Password</label>
                <input type="password" required value={newPass} onChange={e => setNewPass(e.target.value)}
                  className="w-full rounded-lg border border-landing-border bg-landing-bg px-4 py-2.5 text-sm text-landing-bright focus:border-primary focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-landing-text">Confirm New Password</label>
                <input type="password" required value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                  className="w-full rounded-lg border border-landing-border bg-landing-bg px-4 py-2.5 text-sm text-landing-bright focus:border-primary focus:outline-none" />
              </div>
              {passError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <p className="text-xs text-red-300">{passError}</p>
                </div>
              )}
              <button type="submit" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Update Password
              </button>
            </form>
          )}

          {tab === 'vercel' && (
            <div className="space-y-4">
              <h2 className="mb-4 text-lg font-bold text-landing-bright">Vercel Deployment</h2>
              {vercelConnected && (
                <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2.5">
                  <Check className="h-4 w-4 text-green-400" />
                  <p className="text-xs text-green-300">Vercel connected</p>
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-landing-text">Vercel API Token</label>
                <input type="password" value={vercelToken} onChange={e => setVercelToken(e.target.value)} placeholder="vercel_xxxxxxxxxxxx"
                  className="w-full rounded-lg border border-landing-border bg-landing-bg px-4 py-2.5 text-sm text-landing-bright focus:border-primary focus:outline-none" />
                <p className="mt-1 text-xs text-landing-text/60">Generate at vercel.com → Settings → Tokens</p>
              </div>
              <button onClick={handleVercelSave} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                {vercelConnected ? 'Update Token' : 'Connect Vercel'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
