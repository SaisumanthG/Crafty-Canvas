import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setAttempts(a => a + 1);
      setError(result.error || 'Login failed');
      if (attempts >= 1) setShowForgot(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-landing-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-landing-bright">WebCraft</span>
        </div>

        <div className="rounded-2xl border border-landing-border bg-landing-surface p-8">
          <h1 className="mb-2 text-center text-2xl font-bold text-landing-bright">Welcome back</h1>
          <p className="mb-8 text-center text-sm text-landing-text">Sign in to continue building</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="••••••••" />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <div>
                    <p className="text-xs text-red-300">{error}</p>
                    {showForgot && (
                      <button type="button" onClick={() => { setError(''); setShowForgot(false); }}
                        className="mt-1 text-xs font-medium text-primary hover:underline">
                        Forgot password? Reset it
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
              Login <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-landing-text">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
