import { useState } from 'react';
import { X, Check, Loader2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface VercelDeployModalProps {
  html: string;
  title: string;
  onClose: () => void;
}

export function VercelDeployModal({ html, title, onClose }: VercelDeployModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deployUrl, setDeployUrl] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('webcraft_vercel_token');
  const projectName = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleDeploy = async () => {
    if (!token) { setError('Add your Vercel token in Settings → Vercel'); return; }
    setLoading(true); setError('');

    try {
      const res = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          files: [
            { file: 'index.html', data: html },
          ],
          projectSettings: {
            framework: null,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || 'Deployment failed');
      }

      const data = await res.json();
      setDeployUrl(`https://${data.url}`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Deploy failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-[420px] rounded-xl border border-editor-border bg-editor-sidebar p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-editor-text-bright" />
            <h3 className="text-sm font-semibold text-editor-text-bright">Deploy to Vercel</h3>
          </div>
          <button onClick={onClose} className="text-editor-text hover:text-editor-text-bright"><X className="h-4 w-4" /></button>
        </div>

        {success ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
              <Check className="h-7 w-7 text-green-400" />
            </div>
            <p className="text-sm text-editor-text-bright mb-2">Deployed! 🚀</p>
            <a href={deployUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-editor-accent hover:underline">{deployUrl}</a>
          </div>
        ) : (
          <>
            {!token && (
              <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-300">
                Add your Vercel token first: Settings → Vercel tab → paste your token
              </div>
            )}
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-medium text-editor-text">Project Name</label>
              <p className="text-sm text-editor-text-bright">{projectName}</p>
            </div>
            {error && <p className="mb-3 text-xs text-red-400">{error}</p>}
            <button onClick={handleDeploy} disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-lg bg-editor-accent py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
              {loading ? 'Deploying...' : 'Deploy to Vercel'}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
