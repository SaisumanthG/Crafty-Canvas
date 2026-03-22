import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Check } from 'lucide-react';
import { getThemesByCategory, Theme } from '@/lib/themes';

interface ThemePickerProps {
  category: string;
  selected: Theme | null;
  onSelect: (theme: Theme) => void;
  columns?: number;
}

const categories = ['saas', 'portfolio', 'business', 'restaurant'];
const categoryLabels: Record<string, string> = { saas: 'SaaS', portfolio: 'Portfolio', business: 'Business', restaurant: 'Restaurant' };

export function ThemePicker({ category, selected, onSelect, columns = 2 }: ThemePickerProps) {
  const [activeCategory, setActiveCategory] = useState(category);
  const [search, setSearch] = useState('');

  const themes = useMemo(() => {
    let t = getThemesByCategory(activeCategory);
    if (search) t = t.filter(th => th.name.toLowerCase().includes(search.toLowerCase()));
    return t;
  }, [activeCategory, search]);

  const gridCols = columns === 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2';

  return (
    <div>
      {/* Category tabs */}
      <div className="mb-4 flex gap-1 rounded-lg bg-landing-bg p-1">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'text-landing-text hover:text-landing-bright'}`}>
            {categoryLabels[cat]}
            <span className="ml-1 opacity-60">({getThemesByCategory(cat).length})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-landing-text" />
        <input
          type="text"
          placeholder="Search themes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-lg border border-landing-border bg-landing-surface py-2 pl-10 pr-4 text-sm text-landing-bright placeholder:text-landing-text/50 focus:border-primary focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className={`grid ${gridCols} gap-3 max-h-[500px] overflow-y-auto editor-scroll pr-1`}>
        {themes.map(theme => {
          const isSelected = selected?.id === theme.id;
          return (
            <button key={theme.id} onClick={() => onSelect(theme)}
              className={`relative rounded-lg border p-3 text-left transition-all ${isSelected ? 'border-primary bg-primary/10' : 'border-landing-border bg-landing-surface hover:border-landing-text/30'}`}>
              {isSelected && <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />}
              {/* Mini preview */}
              <div className="mb-2 overflow-hidden rounded-md" style={{ background: theme.bg }}>
                <div className="h-2 w-full" style={{ background: theme.primary }} />
                <div className="flex gap-1 p-2">
                  <div className="h-4 flex-1 rounded-sm" style={{ background: theme.surface }} />
                  <div className="h-4 w-6 rounded-sm" style={{ background: theme.primary }} />
                </div>
                <div className="flex gap-1 px-2 pb-2">
                  <div className="h-2 w-8 rounded-sm" style={{ background: theme.text, opacity: 0.5 }} />
                  <div className="h-2 w-6 rounded-sm" style={{ background: theme.text, opacity: 0.3 }} />
                </div>
              </div>
              {/* Color dots */}
              <div className="mb-1.5 flex gap-1">
                {[theme.primary, theme.bg, theme.surface, theme.text, theme.secondary].map((c, i) => (
                  <div key={i} className="h-3 w-3 rounded-full border border-landing-border/50" style={{ background: c }} />
                ))}
              </div>
              <p className="text-xs font-medium text-landing-bright">{theme.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
