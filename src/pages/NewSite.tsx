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

const CATEGORY_IMAGES: Record<string, string> = {
  saas: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  portfolio: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
  business: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
  restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  wellness: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
  fitness: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
  travel: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
  health: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
  education: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
  realestate: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
  event: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
  fashion: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
  nonprofit: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop',
  agency: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
  techlanding: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
  foodbev: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
};

function getTemplatePreviewUrl(template: Template, index: number) {
  const nameQuery = template.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .join(',');

  const categoryQuery = template.category
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .join(',');

  const query = [nameQuery, categoryQuery, 'website']
    .filter(Boolean)
    .join(',');

  return `https://source.unsplash.com/800x600/?${query}&sig=${index + 1}`;
}

function TemplateMiniPreview({ template, index }: { template: Template; index: number }) {
  const comps = template.getComponents();
  const hero = comps.find(c => c.type === 'hero');
  const accent = hero?.props?.accentColor || '#7C3AED';
  const primaryImageUrl = getTemplatePreviewUrl(template, index);
  const fallbackUrl = getTemplatePreviewUrl(template, index + 500);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-lg">
      <img src={primaryImageUrl} alt={template.name} className="h-full w-full object-cover" loading="lazy"
        onError={(event) => {
          const image = event.currentTarget;
          if (image.src !== fallbackUrl) image.src = fallbackUrl;
        }}
        style={{ filter: `hue-rotate(${(index * 37) % 360}deg) saturate(${0.8 + (index % 5) * 0.1})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-2 left-3 right-3">
        <div className="h-2 w-12 rounded" style={{ background: accent }} />
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
                  onDoubleClick={() => handleDoubleClickCreate(t)}
                  className="group overflow-hidden rounded-xl border border-landing-border bg-landing-surface text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div className="aspect-[4/3] overflow-hidden">
                    <TemplateMiniPreview template={t} index={i} />
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