import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layers, Palette, Zap, Download, Eye, Play, GripVertical, MousePointerClick, ArrowRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/lib/AuthContext';

const features = [
  { icon: Layers, title: 'Drag & Drop Builder', desc: 'Visually compose pages with 20+ components' },
  { icon: Palette, title: '100 Built-in Themes', desc: 'Professional color themes across 4 categories' },
  { icon: Zap, title: 'Instant Preview', desc: 'See your changes in real-time as you build' },
  { icon: Download, title: 'Export HTML', desc: 'Download clean, responsive HTML files' },
  { icon: Eye, title: 'One-Click Publish', desc: 'Publish your site with a single click' },
  { icon: Sparkles, title: '100 Starter Templates', desc: 'SaaS, Portfolio, Business, Restaurant — fully editable' },
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartBuilding = () => {
    if (user) navigate('/new');
    else navigate('/login');
  };

  return (
    <div className="min-h-screen bg-landing-bg">
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-28 text-center">
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
            <button onClick={handleStartBuilding} className="rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:opacity-90">
              Start Building Free →
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
          <h2 className="mb-16 text-center text-3xl font-bold text-landing-bright">Everything You Need to Build</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-landing-border bg-landing-surface p-6 transition-colors hover:border-primary/30">
                <f.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold text-landing-bright">{f.title}</h3>
                <p className="text-sm text-landing-text">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Content Boxes - Video + Drag & Drop */}
      <section className="border-t border-landing-border px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Video Box */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl border border-landing-border bg-landing-surface">
            <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-primary/20 via-landing-bg to-primary/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,58,237,0.15),transparent_60%)]" />
              {/* Fake editor mockup */}
              <div className="relative w-4/5 overflow-hidden rounded-lg border border-landing-border bg-landing-bg shadow-2xl">
                <div className="flex h-6 items-center gap-1.5 border-b border-landing-border bg-landing-surface px-3">
                  <div className="h-2 w-2 rounded-full bg-red-500/60" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                  <div className="h-2 w-2 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-[9px] text-landing-text/60">WebCraft Editor</span>
                </div>
                <div className="flex h-32">
                  <div className="w-14 border-r border-landing-border bg-landing-surface p-1.5">
                    {[1,2,3,4].map(i => <div key={i} className="mb-1 h-4 w-full rounded bg-landing-border" />)}
                  </div>
                  <div className="flex-1 p-2 space-y-1.5">
                    <div className="h-8 rounded bg-primary/20" />
                    <div className="h-3 w-3/4 rounded bg-landing-border" />
                    <div className="h-3 w-1/2 rounded bg-landing-border" />
                    <div className="flex gap-1">
                      <div className="h-6 w-16 rounded bg-primary/30" />
                      <div className="h-6 w-16 rounded bg-landing-border" />
                    </div>
                  </div>
                  <div className="w-16 border-l border-landing-border bg-landing-surface p-1.5">
                    {[1,2,3].map(i => <div key={i} className="mb-1 h-3 w-full rounded bg-landing-border" />)}
                  </div>
                </div>
              </div>
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }}
                  className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary/90 shadow-lg shadow-primary/30">
                  <Play className="h-7 w-7 text-primary-foreground ml-1" />
                </motion.div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-bold text-landing-bright">See It In Action</h3>
              <p className="text-sm text-landing-text">Watch how easy it is to build a complete website from scratch in under 2 minutes using WebCraft's visual editor.</p>
            </div>
          </motion.div>

          {/* Drag & Drop Explainer Box */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-landing-border bg-landing-surface p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <GripVertical className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-landing-bright">Drag & Drop Everything</h3>
                <p className="text-xs text-landing-text">No code, no complexity</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: MousePointerClick, title: 'Pick a Component', desc: '20+ ready-made blocks: heroes, navbars, pricing tables, galleries and more' },
                { icon: GripVertical, title: 'Drag to Position', desc: 'Simply drag any component onto your canvas and reorder by dragging up/down' },
                { icon: Palette, title: 'Customize Everything', desc: 'Click any element to edit text, colors, images, spacing — all visually' },
                { icon: Eye, title: 'Live Preview', desc: 'See changes instantly. Toggle desktop, tablet, and mobile views in one click' },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 rounded-lg border border-landing-border/50 bg-landing-bg/50 p-3 transition-colors hover:border-primary/30">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-landing-bright">{step.title}</h4>
                    <p className="text-xs text-landing-text">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-landing-border px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="mb-4 text-3xl font-bold text-landing-bright">Ready to create?</h2>
          <p className="mb-2 text-landing-text">Start with a template or build from scratch.</p>
          <p className="mb-8 text-sm text-landing-text/60">No credit card required. Free forever.</p>
          <button onClick={handleStartBuilding}
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:opacity-90 hover:gap-3">
            Create Your First Site <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-landing-border px-6 py-8 text-center text-sm text-landing-text">
        © 2026 WebCraft. Built with ❤️
      </footer>
    </div>
  );
}
