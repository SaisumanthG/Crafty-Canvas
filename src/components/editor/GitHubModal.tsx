import { useState } from 'react';
import { X, Github, Check, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GitHubModalProps {
  html: string;
  title: string;
  onClose: () => void;
}

export function GitHubModal({ html, title, onClose }: GitHubModalProps) {
  const [repoName, setRepoName] = useState(title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const token = localStorage.getItem('webcraft_gh_token');

  const handlePush = async () => {
    if (!token) { setError('Connect GitHub first in Settings → GitHub'); return; }
    if (!repoName.trim()) { setError('Enter a repo name'); return; }
    setLoading(true); setError(''); setStatusMsg('Validating token...');

    try {
      // Step 1: Validate token & get user
      const userRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
      });
      if (!userRes.ok) {
        const errData = await userRes.json().catch(() => ({}));
        throw new Error(errData.message || `GitHub auth failed (${userRes.status}). Check your token has 'repo' scope.`);
      }
      const user = await userRes.json();
      const owner = user.login;

      setStatusMsg('Creating repository...');

      // Step 2: Create repo (handle "already exists")
      let repoExists = false;
      const createRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github.v3+json' },
        body: JSON.stringify({ name: repoName, private: false, auto_init: true, description: `Created with WebCraft` }),
      });

      if (!createRes.ok) {
        const errData = await createRes.json().catch(() => ({}));
        if (errData.errors?.some((e: any) => e.message?.includes('already exists'))) {
          repoExists = true;
        } else {
          throw new Error(errData.message || `Failed to create repo (${createRes.status})`);
        }
      }

      // Step 3: Wait for repo init (only for new repos)
      if (!repoExists) {
        setStatusMsg('Waiting for repo initialization...');
        await new Promise(r => setTimeout(r, 2000));
      }

      // Step 4: Get existing file SHA if updating
      setStatusMsg('Pushing index.html...');
      let indexSha: string | undefined;
      try {
        const existingRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/index.html`, {
          headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
        });
        if (existingRes.ok) {
          const existingData = await existingRes.json();
          indexSha = existingData.sha;
        }
      } catch { /* file doesn't exist yet, that's fine */ }

      // Step 5: Push index.html
      const content = btoa(unescape(encodeURIComponent(html)));
      const pushBody: any = { message: repoExists && indexSha ? 'Update from WebCraft' : 'Deploy from WebCraft', content, branch: 'main' };
      if (indexSha) pushBody.sha = indexSha;

      const pushRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/index.html`, {
        method: 'PUT',
        headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github.v3+json' },
        body: JSON.stringify(pushBody),
      });

      if (!pushRes.ok) {
        const errData = await pushRes.json().catch(() => ({}));
        throw new Error(errData.message || `Failed to push index.html (${pushRes.status})`);
      }

      // Step 6: Push README
      setStatusMsg('Pushing README.md...');
      let readmeSha: string | undefined;
      try {
        const existingReadme = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/README.md`, {
          headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
        });
        if (existingReadme.ok) {
          const data = await existingReadme.json();
          readmeSha = data.sha;
        }
      } catch { /* ok */ }

      const readmeContent = btoa(unescape(encodeURIComponent(`# ${title}\n\nBuilt with [WebCraft](https://webcraft.app)\n`)));
      const readmeBody: any = { message: 'Update README', content: readmeContent, branch: 'main' };
      if (readmeSha) readmeBody.sha = readmeSha;

      await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/README.md`, {
        method: 'PUT',
        headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github.v3+json' },
        body: JSON.stringify(readmeBody),
      });

      setRepoUrl(`https://github.com/${owner}/${repoName}`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Push failed');
    } finally {
      setLoading(false);
      setStatusMsg('');
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
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">GitHub token required</p>
                    <p>Go to Settings → GitHub tab → paste a Personal Access Token with <code className="bg-yellow-500/20 px-1 rounded">repo</code> scope.</p>
                    <a href="https://github.com/settings/tokens/new?scopes=repo&description=WebCraft" target="_blank" rel="noopener noreferrer" className="text-yellow-200 underline mt-1 inline-block">Create token on GitHub →</a>
                  </div>
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-medium text-editor-text">Repository Name</label>
              <input value={repoName} onChange={e => setRepoName(e.target.value.replace(/[^a-z0-9-]/gi, '-').toLowerCase())} className="w-full rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none" placeholder="my-website" />
            </div>
            {error && (
              <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-400 flex items-start gap-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {statusMsg && <p className="mb-3 text-xs text-editor-text animate-pulse">{statusMsg}</p>}
            <button onClick={handlePush} disabled={loading || !token} className="w-full flex items-center justify-center gap-2 rounded-lg bg-editor-accent py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
              {loading ? 'Pushing...' : 'Create Repo & Push'}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
