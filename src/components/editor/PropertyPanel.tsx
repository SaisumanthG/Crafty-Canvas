import { useState } from 'react';
import { Copy, Trash2, ChevronDown } from 'lucide-react';

interface PropertyPanelProps {
  component: any;
  onChange: (updated: any) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const STOCK_IMAGES: Record<string, string[]> = {
  Abstract: [
    'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1567095761054-7a02e69e5b2b?w=400&h=250&fit=crop',
  ],
  Business: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
  ],
  Technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop',
  ],
  Nature: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=250&fit=crop',
  ],
  People: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop',
  ],
  Food: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=250&fit=crop',
  ],
};

const TEXT_ALIGN_OPTIONS = ['left', 'center', 'right'];

export function PropertyPanel({ component, onChange, onDuplicate, onDelete }: PropertyPanelProps) {
  const [subTab, setSubTab] = useState<'properties' | 'images'>('properties');
  const [imageCategory, setImageCategory] = useState('Abstract');
  const p = component.props;

  const update = (key: string, value: any) => {
    onChange({ ...component, props: { ...p, [key]: value } });
  };

  const Field = ({ label, prop, type = 'text' }: { label: string; prop: string; type?: string }) => {
    if (p[prop] === undefined) return null;
    return (
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-medium text-editor-text">{label}</label>
        {type === 'textarea' ? (
          <textarea value={p[prop]} onChange={e => update(prop, e.target.value)} rows={3} className="w-full rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none" />
        ) : type === 'color' ? (
          <div className="flex gap-2 items-center">
            <input type="color" value={p[prop]} onChange={e => update(prop, e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-editor-border bg-transparent shrink-0" />
            <input type="text" value={p[prop]} onChange={e => update(prop, e.target.value)} className="flex-1 rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none" />
          </div>
        ) : type === 'select-align' ? (
          <div className="relative">
            <select value={p[prop]} onChange={e => update(prop, e.target.value)} className="w-full appearance-none rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none pr-8">
              {TEXT_ALIGN_OPTIONS.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-editor-text pointer-events-none" />
          </div>
        ) : type === 'range' ? (
          <div className="flex items-center gap-3">
            <input type="range" min="0" max="200" value={parseInt(p[prop]) || 0} onChange={e => update(prop, e.target.value + 'px')} className="flex-1 accent-editor-accent" />
            <span className="text-xs text-editor-text-bright w-12 text-right">{p[prop]}</span>
          </div>
        ) : (
          <input type={type} value={p[prop]} onChange={e => update(prop, e.target.value)} className="w-full rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none" />
        )}
      </div>
    );
  };

  const handleImageSelect = (url: string) => {
    if (p.src !== undefined) update('src', url);
    else if (p.bgImage !== undefined) update('bgImage', url);
    else update('bgImage', url);
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const url = e.dataTransfer.getData('text/plain');
    if (url) handleImageSelect(url);
  };

  return (
    <div className="editor-scroll overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
      {/* Component header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <span className="rounded-md bg-editor-accent/20 px-2 py-0.5 text-xs font-semibold text-editor-accent capitalize">{component.type}</span>
        <div className="flex gap-1">
          <button onClick={onDuplicate} className="rounded p-1.5 text-editor-text transition-colors hover:bg-editor-hover hover:text-editor-text-bright" title="Duplicate">
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button onClick={onDelete} className="rounded p-1.5 text-editor-text transition-colors hover:bg-red-500/20 hover:text-red-400" title="Delete">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Sub-tabs: Properties | Images */}
      <div className="flex border-b border-editor-border mx-4">
        <button onClick={() => setSubTab('properties')} className={`flex-1 py-2 text-xs font-medium transition-colors ${subTab === 'properties' ? 'border-b-2 border-editor-accent text-editor-accent' : 'text-editor-text hover:text-editor-text-bright'}`}>
          Properties
        </button>
        <button onClick={() => setSubTab('images')} className={`flex-1 py-2 text-xs font-medium transition-colors ${subTab === 'images' ? 'border-b-2 border-editor-accent text-editor-accent' : 'text-editor-text hover:text-editor-text-bright'}`}>
          Images
        </button>
      </div>

      {subTab === 'properties' && (
        <div className="p-4">
          {/* Text properties */}
          <Field label="Headline" prop="heading" />
          <Field label="Subheadline" prop="subheading" type="textarea" />
          <Field label="Text" prop="text" type={component.type === 'richtext' ? 'textarea' : 'text'} />
          <Field label="Brand" prop="brand" />
          <Field label="Quote" prop="quote" type="textarea" />
          <Field label="Author" prop="author" />
          <Field label="Role" prop="role" />

          {/* Buttons */}
          <Field label="Primary Button" prop="buttonText" />
          <Field label="Secondary Button (optional)" prop="secondaryButtonText" />

          {/* Form */}
          <Field label="Placeholder" prop="placeholder" />
          <Field label="Alt Text" prop="alt" />
          <Field label="Copyright" prop="copyright" />

          {/* URLs */}
          <Field label="URL" prop="url" />
          <Field label="Image Source" prop="src" />

          {/* Colors */}
          <Field label="Background" prop="bgColor" type="color" />
          <Field label="Text Color" prop="textColor" type="color" />
          <Field label="Accent Color" prop="accentColor" type="color" />
          <Field label="Button Color" prop="buttonColor" type="color" />
          <Field label="Button Text Color" prop="buttonTextColor" type="color" />
          <Field label="Link Color" prop="linkColor" type="color" />
          <Field label="Color" prop="color" type="color" />

          {/* Background Image URL */}
          <Field label="Background Image URL" prop="bgImage" />

          {/* Text Align */}
          {p.textAlign !== undefined && (
            <Field label="Text Align" prop="textAlign" type="select-align" />
          )}

          {/* Padding Y */}
          {p.paddingY !== undefined && (
            <Field label="Padding Y" prop="paddingY" type="range" />
          )}

          {/* Sizing */}
          <Field label="Font Size" prop="fontSize" />
          <Field label="Font Weight" prop="fontWeight" />
          <Field label="Width" prop="width" />
          <Field label="Height" prop="height" />
          <Field label="Padding" prop="padding" />
          <Field label="Margin" prop="margin" />
          <Field label="Border Radius" prop="borderRadius" />
          <Field label="Max Width" prop="maxWidth" />
          <Field label="Gap" prop="gap" />
          <Field label="Thickness" prop="thickness" />
          <Field label="Size" prop="size" />
          <Field label="Columns" prop="columns" type="number" />
          <Field label="Level" prop="level" />
        </div>
      )}

      {subTab === 'images' && (
        <div className="p-4">
          <p className="mb-3 text-xs text-editor-text">Click an image to apply</p>

          {/* Category pills */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {Object.keys(STOCK_IMAGES).map(cat => (
              <button
                key={cat}
                onClick={() => setImageCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${imageCategory === cat ? 'bg-editor-accent/20 text-editor-accent border border-editor-accent/40' : 'border border-editor-border text-editor-text hover:text-editor-text-bright hover:border-editor-accent/30'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image grid */}
          <div
            className="grid grid-cols-2 gap-2"
            onDragOver={e => e.preventDefault()}
            onDrop={handleImageDrop}
          >
            {STOCK_IMAGES[imageCategory]?.map((url, i) => (
              <button
                key={i}
                onClick={() => handleImageSelect(url)}
                className="group relative overflow-hidden rounded-lg border border-editor-border hover:border-editor-accent/50 transition-colors"
              >
                <img src={url} alt={`${imageCategory} ${i + 1}`} className="h-20 w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              </button>
            ))}
          </div>

          {/* Custom URL input */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-editor-text">Or paste image URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={p.bgImage || p.src || ''}
              onChange={e => {
                if (p.src !== undefined) update('src', e.target.value);
                else update('bgImage', e.target.value);
              }}
              className="w-full rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none"
            />
          </div>

          {/* Drag & drop zone */}
          <div
            className="mt-3 flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-editor-border text-xs text-editor-text hover:border-editor-accent/40 transition-colors"
            onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-editor-accent'); }}
            onDragLeave={e => { e.currentTarget.classList.remove('border-editor-accent'); }}
            onDrop={e => {
              e.preventDefault();
              e.currentTarget.classList.remove('border-editor-accent');
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                const reader = new FileReader();
                reader.onload = () => {
                  if (typeof reader.result === 'string') handleImageSelect(reader.result);
                };
                reader.readAsDataURL(files[0]);
              } else {
                const url = e.dataTransfer.getData('text/plain');
                if (url) handleImageSelect(url);
              }
            }}
          >
            Drop an image here
          </div>
        </div>
      )}
    </div>
  );
}
