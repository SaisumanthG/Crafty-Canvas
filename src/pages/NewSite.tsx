import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, FileText, Rocket, User, Building2, UtensilsCrossed, Check } from 'lucide-react';
import { templates, getTemplate, categoryMap } from '@/lib/templates';
import { getThemesByCategory, applyThemeToComponents, Theme } from '@/lib/themes';
import { createSite, serializeComponents } from '@/lib/siteStorage';
import { ThemePicker } from '@/components/editor/ThemePicker';

const templateIcons: Record<string, any> = { blank: FileText, landing: Rocket, portfolio: User, business: Building2, restaurant: UtensilsCrossed };

export default function NewSite() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [title, setTitle] = useState('');

  const category = categoryMap[selectedTemplate] || 'saas';

  const handleCreate = () => {
    const { components } = getTemplate(selectedTemplate);
    const themed = selectedTheme ? applyThemeToComponents(components, selectedTheme) : components;
    const site = createSite({
      title: title || templates.find(t => t.id === selectedTemplate)?.name + ' Site' || 'Untitled Site',
      category,
      components_json: serializeComponents(themed),
      global_styles_json: selectedTheme ? JSON.stringify(selectedTheme) : '{}',
    });
    navigate(`/editor?id=${site.id}`);
  };

  return (
    <div className="min-h-screen bg-landing-bg">
      <nav className="border-b border-landing-border px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => step === 2 ? setStep(1) : navigate('/')} className="text-landing-text transition-colors hover:text-landing-bright">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-landing-bright">New Site</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-landing-text">
            <span className={step >= 1 ? 'text-primary font-medium' : ''}>1. Template</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-primary font-medium' : ''}>2. Theme</span>
          </div>
        </div>
      </nav>

      {step === 1 && (
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="mb-2 text-3xl font-bold text-landing-bright">Choose a Template</h1>
          <p className="mb-10 text-landing-text">Pick a starting point for your website.</p>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {templates.map((t, i) => {
              const Icon = templateIcons[t.id] || FileText;
              return (
                <motion.button key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => { setSelectedTemplate(t.id); setStep(2); }}
                  className="group flex flex-col items-center rounded-xl border border-landing-border bg-landing-surface p-6 text-center transition-all hover:border-primary/50 hover:bg-landing-border">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-landing-bg transition-colors group-hover:bg-primary/10">
                    <Icon className="h-7 w-7 text-landing-text transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="mb-1 font-semibold text-landing-bright">{t.name}</h3>
                  <p className="mb-2 text-xs text-landing-text">{t.description}</p>
                  {t.id !== 'blank' && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">25 themes</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-landing-bright">Choose a Theme</h1>
              <p className="text-sm text-landing-text">Pick a color scheme for your {selectedTemplate} site</p>
            </div>
          </div>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Site title (optional)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full max-w-sm rounded-lg border border-landing-border bg-landing-surface px-4 py-2.5 text-landing-bright placeholder:text-landing-text/50 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Default option */}
          <button
            onClick={() => setSelectedTheme(null)}
            className={`mb-4 flex items-center gap-3 rounded-lg border px-4 py-3 transition-all ${!selectedTheme ? 'border-primary bg-primary/10' : 'border-landing-border bg-landing-surface hover:border-landing-text/30'}`}
          >
            {!selectedTheme && <Check className="h-4 w-4 text-primary" />}
            <span className="text-sm font-medium text-landing-bright">Default (no theme)</span>
          </button>

          <ThemePicker category={category} selected={selectedTheme} onSelect={setSelectedTheme} columns={5} />

          {/* Selected preview bar */}
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
            <button onClick={handleCreate} className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90">
              Create Website →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
