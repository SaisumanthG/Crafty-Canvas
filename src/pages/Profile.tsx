import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Calendar, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) { navigate('/login'); return null; }

  const handleSave = () => {
    updateProfile({ name, email });
    toast.success('Profile updated!');
  };

  return (
    <div className="min-h-screen bg-landing-bg">
      <nav className="border-b border-landing-border px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button onClick={() => navigate('/')} className="text-landing-text hover:text-landing-bright"><ArrowLeft className="h-5 w-5" /></button>
          <h1 className="text-lg font-bold text-landing-bright">Profile</h1>
        </div>
      </nav>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-landing-border bg-landing-surface p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-landing-bright">{user.name}</h2>
              <p className="text-sm text-landing-text">{user.email}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-landing-text"><User className="h-3.5 w-3.5" /> Name</label>
              <input value={name} onChange={e => setName(e.target.value)}
                className="w-full rounded-lg border border-landing-border bg-landing-bg px-4 py-2.5 text-sm text-landing-bright focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-landing-text"><Mail className="h-3.5 w-3.5" /> Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border border-landing-border bg-landing-bg px-4 py-2.5 text-sm text-landing-bright focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-landing-text"><Calendar className="h-3.5 w-3.5" /> Member since</label>
              <p className="text-sm text-landing-text">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              <Save className="h-4 w-4" /> Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
