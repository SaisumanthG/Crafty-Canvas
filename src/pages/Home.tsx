import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Layers, Palette, Zap, Download, Eye } from 'lucide-react';

const features = [
  { icon: Layers, title: 'Drag & Drop Builder', desc: 'Visually compose pages with 20+ components' },
  { icon: Palette, title: '100 Built-in Themes', desc: 'Professional color themes across 4 categories' },
  { icon: Zap, title: 'Instant Preview', desc: 'See your changes in real-time as you build' },
  { icon: Download, title: 'Export HTML', desc: 'Download clean, responsive HTML files' },
  { icon: Eye, title: 'One-Click Publish', desc: 'Publish your site with a single click' },
  { icon: Sparkles, title: '5 Starter Templates', desc: 'SaaS, Portfolio, Business, Restaurant & more' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-landing-bg">
      {/* Navbar */}
      <nav className="border-b border-landing-border px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-landing-bright">WebCraft</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/sites')} className="rounded-lg px-4 py-2 text-sm text-landing-text transition-colors hover:text-landing-bright">
              My Sites
            </button>
            <button onClick={() => navigate('/new')} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
              Create Site
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-landing-border bg-landing-surface px-4 py-1.5 text-sm text-landing-text">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            No-code website builder
          </div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-landing-bright md:text-7xl">
            Build Websites<br />
            <span className="text-primary">Without Code</span>
          </h1>
          <p className="mb-10 text-lg text-landing-text md:text-xl">
            Drag, drop, and publish beautiful websites in minutes. 100 themes, 5 templates, full HTML export.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => navigate('/new')} className="rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:opacity-90">
              Start Building →
            </button>
            <button onClick={() => navigate('/sites')} className="rounded-xl border border-landing-border bg-landing-surface px-8 py-4 text-lg font-semibold text-landing-bright transition-colors hover:bg-landing-border">
              My Sites
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t border-landing-border px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-landing-bright">Everything you need to build</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-landing-border bg-landing-surface p-6 transition-colors hover:border-primary/30">
                <f.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold text-landing-bright">{f.title}</h3>
                <p className="text-sm text-landing-text">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-landing-border px-6 py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold text-landing-bright">Ready to create?</h2>
        <p className="mb-8 text-landing-text">Start with a template or build from scratch.</p>
        <button onClick={() => navigate('/new')} className="rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:opacity-90">
          Create Your First Site
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-landing-border px-6 py-8 text-center text-sm text-landing-text">
        © 2026 WebCraft. Built with ❤️
      </footer>
    </div>
  );
}
