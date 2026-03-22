import { useState, useRef, useEffect } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';

interface PreviewModalProps {
  html: string;
  onClose: () => void;
}

export function PreviewModal({ html, onClose }: PreviewModalProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widths = { desktop: '100%', tablet: '768px', mobile: '375px' };

  useEffect(() => {
    if (iframeRef.current && html) {
      const doc = iframeRef.current.contentDocument;
      if (doc) { doc.open(); doc.write(html); doc.close(); }
    }
  }, [html, device]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div className="flex h-[90vh] w-[95vw] flex-col rounded-xl border border-editor-border bg-editor-sidebar" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-editor-border px-4 py-3">
          <div className="flex gap-1">
            {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as const).map(([d, Icon]) => (
              <button key={d} onClick={() => setDevice(d)} className={`rounded-lg p-2 transition-colors ${device === d ? 'bg-editor-accent text-primary-foreground' : 'text-editor-text hover:bg-editor-hover'}`}>
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-editor-text hover:bg-editor-hover"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex flex-1 items-start justify-center overflow-auto bg-editor-bg p-4">
          <iframe ref={iframeRef} style={{ width: widths[device], height: '100%', border: 'none', borderRadius: '8px', background: '#fff' }} title="Preview" />
        </div>
      </div>
    </div>
  );
}
