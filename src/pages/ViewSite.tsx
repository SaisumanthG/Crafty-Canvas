import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { exportToHTML } from '@/lib/htmlExporter';
import { getSiteById, deserializeComponents, deserializePages } from '@/lib/siteStorage';

export default function ViewSite() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!id) return;
    const site = getSiteById(id);
    if (!site) return;
    if (site.published_html) {
      setHtml(site.published_html);
    } else {
      const components = deserializeComponents(site.components_json);
      const pages = deserializePages(site.pages_json || '[]');
      setHtml(exportToHTML(components, site.title, pages));
    }
  }, [id]);

  useEffect(() => {
    if (iframeRef.current && html) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  if (!id) return <div className="flex h-screen items-center justify-center bg-landing-bg text-landing-text">No site ID</div>;

  return (
    <div className="h-screen w-screen">
      <iframe ref={iframeRef} className="h-full w-full border-0" title="Site Preview" />
    </div>
  );
}
