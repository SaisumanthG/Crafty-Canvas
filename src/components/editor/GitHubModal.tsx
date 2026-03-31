import { useState } from 'react';
import { X, Github, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GitHubModalProps {
  html: string;
  title: string;
  onClose: () => void;
}

export function GitHubModal({ html, title, onClose }: GitHubModalProps) {
  const [repoName, setRepoName] = useState(title.toLowerCase().replace(/\s+/g, '-'));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('webcraft_gh_token');

  const handlePush = async () => {
    if (!token) { setError('Connect GitHub first in Settings → GitHub'); return; }
    if (!repoName.trim()) { setError('Enter a repo name'); return; }
    setLoading(true); setError('');

    try {
      // Get user
      const userRes = await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${token}` } });
      if (!userRes.ok) throw new Error('Invalid GitHub token');
      const user = await userRes.json();

      // Try create repo
      const createRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: repoName, private: false, auto_init: true }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        if (!err.errors?.some((e: any) => e.message?.includes('already exists'))) {
          throw new Error(err.message || 'Failed to create repo');
        }
      }

      // Wait briefly for repo init
      await new Promise(r => setTimeout(r, 1500));

      // Push index.html
      const content = btoa(unescape(encodeURIComponent(html)));
      await fetch(`https://api.github.com/repos/${user.login}/${repoName}/contents/index.html`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Deploy from WebCraft', content, branch: 'main' }),
      });

      // Push a basic style.css
      const css = '/* Styles are inlined in index.html */';
      const cssContent = btoa(css);
      await fetch(`https://api.github.com/repos/${user.login}/${repoName}/contents/style.css`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Add style.css', content: cssContent, branch: 'main' }),
      });

      setRepoUrl(`https://github.com/${user.login}/${repoName}`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-[420px] rounded-xl border border-editor-border bg-editor-sidebar p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-editor-text-bright" />
            <h3 className="text-sm font-semibold text-editor-text-bright">Push to GitHub</h3>
          </div>
          <button onClick={onClose} className="text-editor-text hover:text-editor-text-bright"><X className="h-4 w-4" /></button>
        </div>

        {success ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-7 w-7 text-green-400" />
            </div>
            <p className="text-sm text-editor-text-bright mb-2">Pushed successfully!</p>
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-editor-accent hover:underline">{repoUrl}</a>
          </div>
        ) : (
          <>
            {!token && (
              <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-300">
                Connect GitHub first: Settings → GitHub tab → paste your Personal Access Token
              </div>
            )}
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-medium text-editor-text">Repository Name</label>
              <input value={repoName} onChange={e => setRepoName(e.target.value)} className="w-full rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none" />
            </div>
            {error && <p className="mb-3 text-xs text-red-400">{error}</p>}
            <button onClick={handlePush} disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-lg bg-editor-accent py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
              {loading ? 'Pushing...' : 'Create Repo & Push'}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
