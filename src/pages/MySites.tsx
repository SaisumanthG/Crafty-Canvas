import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Plus, MoreVertical, Pencil, Eye, Trash2, Globe } from 'lucide-react';
import { getAllSites, deleteSite, type Website } from '@/lib/siteStorage';

export default function MySites() {
  const navigate = useNavigate();
  const [sites, setSites] = useState<Website[]>(getAllSites());
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Delete this site?')) {
      deleteSite(id);
      setSites(getAllSites());
    }
    setMenuOpen(null);
  };

  return (
    <div className="min-h-screen bg-landing-bg">
      <nav className="border-b border-landing-border px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-landing-bright">WebCraft</span>
          </button>
          <button onClick={() => navigate('/new')} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> New Site
          </button>
        </div>
      </nav>

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
                className="relative rounded-xl border border-landing-border bg-landing-surface p-5 transition-colors hover:border-landing-text/20">
                <div className="mb-3 flex items-center justify-between">
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
                        <button onClick={() => handleDelete(site.id)} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-landing-border">
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{site.category}</span>
                  {site.is_published && (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                      <Globe className="h-3 w-3" /> Published
                    </span>
                  )}
                </div>
                <p className="text-xs text-landing-text">
                  Updated {new Date(site.updated_date).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
