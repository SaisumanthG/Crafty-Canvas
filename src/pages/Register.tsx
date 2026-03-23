import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, Mail, Lock, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'slide'>('form');

  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    const result = register(name, email, password);
    if (result.success) {
      setStep('slide');
      setTimeout(() => navigate('/'), 1500);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-landing-bg px-4">
      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div key="form" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }} className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-landing-bright">WebCraft</span>
            </div>

            <div className="rounded-2xl border border-landing-border bg-landing-surface p-8">
              <h1 className="mb-2 text-center text-2xl font-bold text-landing-bright">Create account</h1>
              <p className="mb-8 text-center text-sm text-landing-text">Start building websites for free</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-landing-text">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-landing-text/50" />
                    <input type="text" required value={name} onChange={e => setName(e.target.value)}
                      className="w-full rounded-lg border border-landing-border bg-landing-bg py-2.5 pl-10 pr-4 text-sm text-landing-bright placeholder:text-landing-text/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-landing-text">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-landing-text/50" />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-landing-border bg-landing-bg py-2.5 pl-10 pr-4 text-sm text-landing-bright placeholder:text-landing-text/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-landing-text">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-landing-text/50" />
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-landing-border bg-landing-bg py-2.5 pl-10 pr-4 text-sm text-landing-bright placeholder:text-landing-text/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Min 6 characters" />
                  </div>
                  {password.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex flex-1 gap-1">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`h-1 flex-1 rounded-full ${i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-landing-border'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-landing-text">{strengthLabels[passwordStrength]}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-landing-text">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-landing-text/50" />
                    <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                      className="w-full rounded-lg border border-landing-border bg-landing-bg py-2.5 pl-10 pr-4 text-sm text-landing-bright placeholder:text-landing-text/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="••••••••" />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <p className="text-xs text-red-300">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
                  Sign Up <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-landing-text">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:underline">Login</Link>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-10 w-10 text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-landing-bright">Welcome to WebCraft!</h2>
            <p className="mt-2 text-landing-text">Redirecting you to the dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
