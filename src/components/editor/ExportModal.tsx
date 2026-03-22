import { useState } from 'react';
import { X, Copy, Download, Check } from 'lucide-react';

interface ExportModalProps {
  html: string;
  title: string;
  onClose: () => void;
}

export function ExportModal({ html, title, onClose }: ExportModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div className="flex h-[80vh] w-[700px] flex-col rounded-xl border border-editor-border bg-editor-sidebar" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-editor-border px-4 py-3">
          <h3 className="text-sm font-semibold text-editor-text-bright">Export HTML</h3>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-lg border border-editor-border px-3 py-1.5 text-xs text-editor-text hover:bg-editor-hover">
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handleDownload} className="flex items-center gap-1.5 rounded-lg bg-editor-accent px-3 py-1.5 text-xs text-primary-foreground">
              <Download className="h-3.5 w-3.5" /> Download
            </button>
            <button onClick={onClose} className="rounded-lg p-1.5 text-editor-text hover:bg-editor-hover"><X className="h-4 w-4" /></button>
          </div>
        </div>
        <pre className="editor-scroll flex-1 overflow-auto p-4 text-xs text-editor-text">
          <code>{html}</code>
        </pre>
      </div>
    </div>
  );
}
