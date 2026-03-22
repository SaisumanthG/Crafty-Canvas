import { useState } from 'react';
import { X, Check, Copy, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface PublishModalProps {
  slug: string;
  onClose: () => void;
}

export function PublishModal({ slug, onClose }: PublishModalProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://${slug}.webcraft.app`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-[400px] rounded-xl border border-editor-border bg-editor-sidebar p-8 text-center" onClick={e => e.stopPropagation()}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <Check className="h-8 w-8 text-green-400" />
        </motion.div>
        <h3 className="mb-2 text-xl font-bold text-editor-text-bright">Published! 🎉</h3>
        <p className="mb-6 text-sm text-editor-text">Your site is now live</p>
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-editor-border bg-editor-bg px-3 py-2.5">
          <span className="flex-1 truncate text-left text-sm text-editor-text-bright">{url}</span>
          <button onClick={handleCopy} className="text-editor-text hover:text-editor-text-bright">
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="flex-1 rounded-lg border border-editor-border py-2 text-sm text-editor-text hover:bg-editor-hover">
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
          <button onClick={onClose} className="flex-1 rounded-lg bg-editor-accent py-2 text-sm text-primary-foreground">
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
