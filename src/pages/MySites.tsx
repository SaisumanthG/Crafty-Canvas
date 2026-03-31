import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, MoreVertical, Pencil, Eye, Trash2, Globe } from 'lucide-react';
import { getAllSites, deleteSite, deserializeComponents, type Website } from '@/lib/siteStorage';
import { Navbar } from '@/components/layout/Navbar';

function SiteMiniPreview({ site }: { site: Website }) {
  const comps = deserializeComponents(site.components_json);
  const navbar = comps.find(c => c.type === 'navbar');
  const hero = comps.find(c => c.type === 'hero');
  const features = comps.find(c => c.type === 'features');
  const bg = hero?.props?.bgColor || navbar?.props?.bgColor || '#0A0A0A';
  const accent = hero?.props?.accentColor || navbar?.props?.accentColor || '#7C3AED';
  const textCol = hero?.props?.textColor || '#FFFFFF';

  return (
    <div className="h-full w-full overflow-hidden rounded-t-lg" style={{ background: bg }}>
      {navbar && (
        <div className="flex items-center justify-between px-3 py-1.5" style={{ background: navbar.props?.bgColor || bg }}>
          <div className="h-1.5 w-10 rounded" style={{ background: accent }} />
          <div className="flex gap-1">
            {(navbar.props?.links || []).slice(0, 4).map((_: any, i: number) => (
              <div key={i} className="h-1 w-5 rounded" style={{ background: textCol, opacity: 0.3 }} />
            ))}
          </div>
        </div>
      )}
      {hero && (
        <div className="px-3 py-3">
          <div className="mb-1 h-2 w-3/4 rounded" style={{ background: textCol, opacity: 0.9 }} />
          <div className="mb-1 h-1.5 w-full rounded" style={{ background: textCol, opacity: 0.3 }} />
          <div className="mb-2 h-1.5 w-2/3 rounded" style={{ background: textCol, opacity: 0.3 }} />
          <div className="h-3 w-12 rounded" style={{ background: accent }} />
        </div>
      )}
      {features && (
        <div className="flex gap-1 px-3 pb-1">
          {[1,2,3].map(i => (
            <div key={i} className="flex-1 rounded p-1" style={{ background: textCol, opacity: 0.05 }}>
              <div className="mb-0.5 h-1 w-full rounded" style={{ background: accent, opacity: 0.5 }} />
              <div className="h-0.5 w-full rounded" style={{ background: textCol, opacity: 0.2 }} />
            </div>
          ))}
        </div>
      )}
      {!navbar && !hero && (
        <div className="flex h-full items-center justify-center p-4">
          <div className="h-2 w-16 rounded" style={{ background: '#666', opacity: 0.3 }} />
        </div>
      )}
    </div>
  );
}

export default function MySites() {
  const navigate = useNavigate();
  const [sites, setSites] = useState<Website[]>([]);

  useEffect(() => {
    setSites(getAllSites());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this site?')) {
      deleteSite(id);
      setSites(getAllSites());
    }
  };

  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-landing-bg">
      <Navbar />
      <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-4">
        <button onClick={() => navigate('/new')} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> New Site
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold text-landing-bright">My Sites</h1>
        {sites.length === 0 ? (
          <div className="rounded-xl border border-dashed border-landing-border py-20 text-center">
            <p className="mb-4 text-landing-text">No sites yet</p>
            <button onClick={() => navigate('/new')} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              Create Your First Site
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sites.map((site, i) => (
              <motion.div key={site.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-xl border border-landing-border bg-landing-surface transition-colors hover:border-landing-text/20">
                {/* Preview thumbnail */}
                <div className="aspect-[16/10] overflow-hidden">
                  <SiteMiniPreview site={site} />
                </div>
                <div className="border-t border-landing-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold text-landing-bright">{site.title}</h3>
                    <div className="relative">
                      <button onClick={() => setMenuOpen(menuOpen === site.id ? null : site.id)} className="rounded-lg p-1.5 text-landing-text transition-colors hover:bg-landing-border hover:text-landing-bright">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {menuOpen === site.id && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-landing-border bg-landing-surface py-1 shadow-xl">
                          <button onClick={() => { navigate(`/editor?id=${site.id}`); setMenuOpen(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-landing-text hover:bg-landing-border hover:text-landing-bright">
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button onClick={() => { navigate(`/view?id=${site.id}`); setMenuOpen(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-landing-text hover:bg-landing-border hover:text-landing-bright">
                            <Eye className="h-3.5 w-3.5" /> Preview
                          </button>
                          <button onClick={() => { handleDelete(site.id); setMenuOpen(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-landing-border">
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{site.category}</span>
                    {site.is_published && (
                      <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                        <Globe className="h-3 w-3" /> Published
                      </span>
                    )}
                    <span className="ml-auto text-xs text-landing-text">
                      {new Date(site.updated_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
