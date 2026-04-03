import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, Search, FileText, Rocket, Users, Building2, UtensilsCrossed, Layers, Check, Star, Heart, GraduationCap, Home, Calendar, ShoppingBag, Palette, Plane, Dumbbell } from 'lucide-react';
import { templates, getTemplate, getTemplatesByCategory, type Template } from '@/lib/templates';
import { getThemesByCategory, applyThemeToComponents, Theme } from '@/lib/themes';
import { createSite, serializeComponents, serializePages } from '@/lib/siteStorage';
import { ThemePicker } from '@/components/editor/ThemePicker';
import { Navbar } from '@/components/layout/Navbar';

const categories = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'saas', label: 'SaaS / Tech', icon: Rocket },
  { id: 'portfolio', label: 'Portfolio', icon: Star },
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed },
  { id: 'wellness', label: 'Wellness & Spa', icon: Sparkles },
  { id: 'fitness', label: 'Fitness & Gym', icon: Dumbbell },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'health', label: 'Health & Clinic', icon: Heart },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'realestate', label: 'Real Estate', icon: Home },
  { id: 'event', label: 'Events', icon: Calendar },
  { id: 'fashion', label: 'Fashion', icon: ShoppingBag },
  { id: 'hotel', label: 'Hotel', icon: Building2 },
  { id: 'nonprofit', label: 'Nonprofit', icon: Heart },
  { id: 'agency', label: 'Creative Agency', icon: Palette },
  { id: 'techlanding', label: 'Tech Landing', icon: Rocket },
  { id: 'foodbev', label: 'Food & Beverage', icon: UtensilsCrossed },
];

function TemplateMiniPreview({ template }: { template: Template }) {
  const comps = template.getComponents();
  const navbar = comps.find(c => c.type === 'navbar');
  const hero = comps.find(c => c.type === 'hero');
  const bg = hero?.props?.bgColor || navbar?.props?.bgColor || '#0A0A0A';
  const accent = hero?.props?.accentColor || navbar?.props?.accentColor || '#7C3AED';
  const textCol = hero?.props?.textColor || '#FFFFFF';

  return (
    <div className="h-full w-full overflow-hidden rounded-t-lg" style={{ background: bg }}>
      <div className="flex items-center justify-between px-3 py-1.5" style={{ background: navbar?.props?.bgColor || bg }}>
        <div className="h-1.5 w-10 rounded" style={{ background: accent }} />
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="h-1 w-5 rounded" style={{ background: textCol, opacity: 0.3 }} />)}
        </div>
      </div>
      <div className="px-3 py-3">
        <div className="mb-1 h-2 w-3/4 rounded" style={{ background: textCol, opacity: 0.9 }} />
        <div className="mb-1 h-1.5 w-full rounded" style={{ background: textCol, opacity: 0.3 }} />
        <div className="mb-2 h-1.5 w-2/3 rounded" style={{ background: textCol, opacity: 0.3 }} />
        <div className="h-3 w-12 rounded" style={{ background: accent }} />
      </div>
      <div className="flex gap-1 px-3 pb-1">
        {[1,2,3].map(i => (
          <div key={i} className="flex-1 rounded p-1" style={{ background: textCol, opacity: 0.05 }}>
            <div className="mb-0.5 h-1 w-full rounded" style={{ background: accent, opacity: 0.5 }} />
            <div className="h-0.5 w-full rounded" style={{ background: textCol, opacity: 0.2 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NewSite() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [title, setTitle] = useState('');

  const filteredTemplates = useMemo(() => {
    let list = getTemplatesByCategory(activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  const handleSelectTemplate = (t: Template) => {
    if (t.id === 'blank') {
      const site = createSite({ title: 'Untitled Site', category: 'saas', components_json: '[]', global_styles_json: '{}' });
      navigate(`/editor?id=${site.id}`);
      return;
    }
    setSelectedTemplate(t);
    setStep(2);
  };

  const handleDoubleClickCreate = (t: Template) => {
    if (t.id === 'blank') { handleSelectTemplate(t); return; }
    const { components, category, pages } = getTemplate(t.id);
    const site = createSite({
      title: t.name + ' Site',
      category,
      components_json: serializeComponents(components),
      pages_json: serializePages(pages),
      global_styles_json: '{}',
    });
    navigate(`/editor?id=${site.id}`);
  };

  const handleCreate = () => {
    if (!selectedTemplate) return;
    const { components, category, pages } = getTemplate(selectedTemplate.id);
    const themed = selectedTheme ? applyThemeToComponents(components, selectedTheme) : components;
    const themedPages = selectedTheme ? pages.map(p => ({ ...p, components: applyThemeToComponents(p.components, selectedTheme) })) : pages;
    const site = createSite({
      title: title || selectedTemplate.name + ' Site',
      category,
      components_json: serializeComponents(themed),
      pages_json: serializePages(themedPages),
      global_styles_json: selectedTheme ? JSON.stringify(selectedTheme) : '{}',
    });
    navigate(`/editor?id=${site.id}`);
  };

  const totalCount = getTemplatesByCategory('all').length;

  return (
    <div className="min-h-screen bg-landing-bg">
      <Navbar />

      <div className="border-b border-landing-border bg-landing-surface/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => step > 1 ? setStep((step - 1) as 1 | 2) : navigate('/')} className="rounded-lg p-1.5 text-landing-text transition-colors hover:bg-landing-border hover:text-landing-bright">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-landing-bright">Create New Site</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {['Template', 'Customize'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && <span className="text-landing-text/40">→</span>}
                <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${step > i ? 'bg-primary/15 text-primary font-medium' : 'text-landing-text'}`}>
                  {step > i + 1 && <Check className="h-3 w-3" />}
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-7xl px-6 py-8">
            <div className="mb-6">
              <h1 className="mb-1 text-2xl font-bold text-landing-bright">Choose a Template</h1>
              <p className="text-sm text-landing-text">{totalCount} professionally designed templates across {categories.length - 1} categories.</p>
            </div>

            {/* Category tabs + search */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {categories.map(cat => {
                const Icon = cat.icon;
                const count = cat.id === 'all' ? totalCount : getTemplatesByCategory(cat.id).length;
                return (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${activeCategory === cat.id ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-landing-surface text-landing-text hover:bg-landing-border hover:text-landing-bright border border-landing-border'}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {cat.label}
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeCategory === cat.id ? 'bg-primary-foreground/20' : 'bg-landing-border'}`}>{count}</span>
                  </button>
                );
              })}
              <div className="ml-auto flex items-center gap-2 rounded-lg border border-landing-border bg-landing-surface px-3 py-1.5">
                <Search className="h-4 w-4 text-landing-text/50" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..."
                  className="w-48 bg-transparent text-sm text-landing-bright placeholder:text-landing-text/40 focus:outline-none" />
              </div>
            </div>

            {/* Blank canvas option */}
            <motion.button onClick={() => handleSelectTemplate(templates[0])} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex w-full items-center gap-4 rounded-xl border-2 border-dashed border-landing-border bg-landing-surface/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-landing-surface">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-landing-border">
                <FileText className="h-6 w-6 text-landing-text" />
              </div>
              <div>
                <h3 className="font-semibold text-landing-bright">Blank Canvas</h3>
                <p className="text-xs text-landing-text">Start from scratch — drag and drop components to build your own layout</p>
              </div>
            </motion.button>

            {/* Template grid */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredTemplates.map((t, i) => (
                <motion.button key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.4) }}
                  onClick={() => handleSelectTemplate(t)}
                  className="group overflow-hidden rounded-xl border border-landing-border bg-landing-surface text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className="aspect-[4/3] overflow-hidden">
                    <TemplateMiniPreview template={t} />
                  </div>
                  <div className="border-t border-landing-border p-3">
                    <h3 className="mb-0.5 text-sm font-semibold text-landing-bright group-hover:text-primary transition-colors">{t.name}</h3>
                    <p className="text-xs text-landing-text line-clamp-1">{t.description}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{t.category}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="py-20 text-center text-landing-text">No templates match your search.</div>
            )}
          </motion.div>
        )}

        {step === 2 && selectedTemplate && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-6xl px-6 py-8">
            <div className="mb-6">
              <h1 className="mb-1 text-2xl font-bold text-landing-bright">Customize: {selectedTemplate.name}</h1>
              <p className="text-sm text-landing-text">Choose a theme and name your site. Everything can be edited later.</p>
            </div>

            <div className="mb-6">
              <input type="text" placeholder="Site title (optional)" value={title} onChange={e => setTitle(e.target.value)}
                className="w-full max-w-sm rounded-lg border border-landing-border bg-landing-surface px-4 py-2.5 text-landing-bright placeholder:text-landing-text/50 focus:border-primary focus:outline-none" />
            </div>

            <button onClick={() => setSelectedTheme(null)}
              className={`mb-4 flex items-center gap-3 rounded-lg border px-4 py-3 transition-all ${!selectedTheme ? 'border-primary bg-primary/10' : 'border-landing-border bg-landing-surface hover:border-landing-text/30'}`}>
              {!selectedTheme && <Check className="h-4 w-4 text-primary" />}
              <span className="text-sm font-medium text-landing-bright">Default theme (template colors)</span>
            </button>

            <ThemePicker category={selectedTemplate.category} selected={selectedTheme} onSelect={setSelectedTheme} columns={5} />

            {selectedTheme && (
              <div className="mt-6 flex items-center gap-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
                <div className="flex gap-1.5">
                  {[selectedTheme.primary, selectedTheme.bg, selectedTheme.surface, selectedTheme.text, selectedTheme.secondary].map((c, i) => (
                    <div key={i} className="h-5 w-5 rounded-full border border-landing-border" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-sm font-medium text-landing-bright">{selectedTheme.name}</span>
              </div>
            )}

            <div className="mt-8">
              <button onClick={handleCreate} className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 shadow-lg shadow-primary/20">
                Create Website →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}