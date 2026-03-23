import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, FolderOpen, Settings, LogOut, Sun, Moon, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useAppTheme } from '@/lib/ThemeContext';

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useAppTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="border-b border-landing-border bg-landing-bg/80 backdrop-blur-sm px-6 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-landing-bright">WebCraft</span>
        </button>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="rounded-lg p-2 text-landing-text transition-colors hover:bg-landing-surface hover:text-landing-bright">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <div ref={ref} className="relative">
              <button onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-lg border border-landing-border px-3 py-1.5 text-sm text-landing-bright transition-colors hover:bg-landing-surface">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {user.name.split(' ')[0]}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>

              {open && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-landing-border bg-landing-surface py-1 shadow-xl">
                  {[
                    { icon: User, label: 'Profile', action: () => navigate('/profile') },
                    { icon: FolderOpen, label: 'My Sites', action: () => navigate('/sites') },
                    { icon: Settings, label: 'Settings', action: () => navigate('/settings') },
                  ].map(item => (
                    <button key={item.label} onClick={() => { item.action(); setOpen(false); }}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-landing-text transition-colors hover:bg-landing-border hover:text-landing-bright">
                      <item.icon className="h-4 w-4" /> {item.label}
                    </button>
                  ))}
                  <div className="my-1 h-px bg-landing-border" />
                  <button onClick={() => { logout(); setOpen(false); navigate('/'); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-landing-border">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => navigate('/login')} className="rounded-lg px-4 py-1.5 text-sm text-landing-text transition-colors hover:text-landing-bright">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
