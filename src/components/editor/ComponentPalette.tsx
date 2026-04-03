import { getComponentsByCategory, type ComponentCategory } from '@/lib/componentRegistry';
import { Type, AlignLeft, FileText, Link, Image, Video, Star, Grid3x3, Minus, MoveVertical, Square, Columns3, MousePointer2, FormInput, Mail, Layout, LayoutGrid, Quote, Megaphone, BarChart3, DollarSign, PanelTop, PanelBottom } from 'lucide-react';

const iconMap: Record<string, any> = {
  Type, AlignLeft, FileText, Link, Image, Video, Star, Grid3x3, Minus, MoveVertical, Square, Columns3, MousePointer2, FormInput, Mail, Layout, LayoutGrid, Quote, Megaphone, BarChart3, DollarSign, PanelTop, PanelBottom,
};

const categoryLabels: Record<ComponentCategory, string> = {
  text: '📝 Text',
  media: '🖼 Media',
  layout: '📐 Layout',
  interactive: '🔘 Interactive',
  sections: '📄 Sections',
};

interface ComponentPaletteProps {
  onDragStart: (type: string) => void;
}

export function ComponentPalette({ onDragStart }: ComponentPaletteProps) {
  const groups = getComponentsByCategory();

  return (
    <div className="overflow-y-auto p-3 h-full">
      {(Object.keys(groups) as ComponentCategory[]).map(cat => (
        <div key={cat} className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-editor-text">{categoryLabels[cat]}</h4>
          <div className="grid grid-cols-2 gap-1.5">
            {groups[cat].map(comp => {
              const Icon = iconMap[comp.icon] || Square;
              return (
                <div
                  key={comp.type}
                  draggable
                  onDragStart={() => onDragStart(comp.type)}
                  className="flex cursor-grab flex-col items-center gap-1 rounded-lg border border-editor-border bg-editor-bg p-2.5 text-center transition-colors hover:border-editor-accent/40 hover:bg-editor-hover active:cursor-grabbing"
                >
                  <Icon className="h-4 w-4 text-editor-text" />
                  <span className="text-[10px] text-editor-text">{comp.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
