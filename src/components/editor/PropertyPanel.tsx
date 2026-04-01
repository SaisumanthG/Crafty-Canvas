import { useState } from 'react';
import { Copy, Trash2, ChevronDown, Plus, X, ChevronUp, GripVertical } from 'lucide-react';

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
  Wellness: [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1540555700478-4be289fbec6f?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=250&fit=crop',
  ],
  Travel: [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=250&fit=crop',
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
      <div className="mb-3">
        <label className="mb-1 block text-[11px] font-medium text-editor-text">{label}</label>
        {type === 'textarea' ? (
          <textarea value={p[prop]} onChange={e => update(prop, e.target.value)} rows={3} className="w-full rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none resize-none" />
        ) : type === 'color' ? (
          <div className="flex gap-2 items-center">
            <input type="color" value={p[prop]} onChange={e => update(prop, e.target.value)} className="h-7 w-7 cursor-pointer rounded border border-editor-border bg-transparent shrink-0" />
            <input type="text" value={p[prop]} onChange={e => update(prop, e.target.value)} className="flex-1 rounded-lg border border-editor-border bg-editor-bg px-2 py-1.5 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
          </div>
        ) : type === 'select-align' ? (
          <div className="relative">
            <select value={p[prop]} onChange={e => update(prop, e.target.value)} className="w-full appearance-none rounded-lg border border-editor-border bg-editor-bg px-3 py-1.5 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none pr-8">
              {TEXT_ALIGN_OPTIONS.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-2 h-3.5 w-3.5 text-editor-text pointer-events-none" />
          </div>
        ) : type === 'range' ? (
          <div className="flex items-center gap-3">
            <input type="range" min="0" max="200" value={parseInt(p[prop]) || 0} onChange={e => update(prop, e.target.value + 'px')} className="flex-1 accent-editor-accent" />
            <span className="text-[10px] text-editor-text-bright w-10 text-right">{p[prop]}</span>
          </div>
        ) : (
          <input type={type} value={p[prop]} onChange={e => update(prop, e.target.value)} className="w-full rounded-lg border border-editor-border bg-editor-bg px-3 py-1.5 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
        )}
      </div>
    );
  };

  // String array editor (for links, fields, images)
  const StringArrayEditor = ({ label, prop }: { label: string; prop: string }) => {
    const arr: string[] = p[prop] || [];
    if (!Array.isArray(arr)) return null;
    return (
      <div className="mb-3">
        <label className="mb-1 flex items-center justify-between text-[11px] font-medium text-editor-text">
          <span>{label}</span>
          <button onClick={() => update(prop, [...arr, 'New Item'])} className="rounded p-0.5 hover:bg-editor-hover"><Plus className="h-3 w-3" /></button>
        </label>
        <div className="space-y-1">
          {arr.map((item, i) => (
            <div key={i} className="flex gap-1 items-center">
              <input value={item} onChange={e => { const n = [...arr]; n[i] = e.target.value; update(prop, n); }}
                className="flex-1 rounded border border-editor-border bg-editor-bg px-2 py-1 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
              <button onClick={() => update(prop, arr.filter((_, j) => j !== i))} className="rounded p-0.5 text-editor-text hover:bg-red-500/20 hover:text-red-400"><X className="h-3 w-3" /></button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Object array editor (for items: [{title, desc}], stats: [{value, label}])
  const ItemsEditor = ({ label, prop }: { label: string; prop: string }) => {
    const arr: any[] = p[prop] || [];
    if (!Array.isArray(arr)) return null;
    const isStats = arr.length > 0 && arr[0]?.value !== undefined;
    return (
      <div className="mb-3">
        <label className="mb-1 flex items-center justify-between text-[11px] font-medium text-editor-text">
          <span>{label} ({arr.length})</span>
          <button onClick={() => update(prop, [...arr, isStats ? { value: '0', label: 'Label' } : { title: 'New Item', desc: 'Description' }])}
            className="rounded p-0.5 hover:bg-editor-hover"><Plus className="h-3 w-3" /></button>
        </label>
        <div className="space-y-2">
          {arr.map((item, i) => (
            <div key={i} className="rounded-lg border border-editor-border bg-editor-bg p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-editor-text">#{i + 1}</span>
                <button onClick={() => update(prop, arr.filter((_, j) => j !== i))} className="rounded p-0.5 text-editor-text hover:bg-red-500/20 hover:text-red-400"><X className="h-3 w-3" /></button>
              </div>
              {isStats ? (
                <>
                  <input value={item.value || ''} onChange={e => { const n = [...arr]; n[i] = { ...n[i], value: e.target.value }; update(prop, n); }}
                    placeholder="Value" className="mb-1 w-full rounded border border-editor-border bg-editor-sidebar px-2 py-1 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
                  <input value={item.label || ''} onChange={e => { const n = [...arr]; n[i] = { ...n[i], label: e.target.value }; update(prop, n); }}
                    placeholder="Label" className="w-full rounded border border-editor-border bg-editor-sidebar px-2 py-1 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
                </>
              ) : (
                <>
                  <input value={item.title || ''} onChange={e => { const n = [...arr]; n[i] = { ...n[i], title: e.target.value }; update(prop, n); }}
                    placeholder="Title" className="mb-1 w-full rounded border border-editor-border bg-editor-sidebar px-2 py-1 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
                  <input value={item.desc || ''} onChange={e => { const n = [...arr]; n[i] = { ...n[i], desc: e.target.value }; update(prop, n); }}
                    placeholder="Description" className="w-full rounded border border-editor-border bg-editor-sidebar px-2 py-1 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Pricing plans editor
  const PlansEditor = () => {
    const plans: any[] = p.plans || [];
    if (!Array.isArray(plans)) return null;
    return (
      <div className="mb-3">
        <label className="mb-1 flex items-center justify-between text-[11px] font-medium text-editor-text">
          <span>Plans ({plans.length})</span>
          <button onClick={() => update('plans', [...plans, { name: 'New Plan', price: '$0', features: ['Feature 1'], highlighted: false }])}
            className="rounded p-0.5 hover:bg-editor-hover"><Plus className="h-3 w-3" /></button>
        </label>
        <div className="space-y-2">
          {plans.map((plan, i) => (
            <div key={i} className="rounded-lg border border-editor-border bg-editor-bg p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-editor-text">Plan #{i + 1}</span>
                <div className="flex gap-1">
                  <label className="flex items-center gap-1 text-[10px] text-editor-text">
                    <input type="checkbox" checked={plan.highlighted || false} onChange={e => { const n = [...plans]; n[i] = { ...n[i], highlighted: e.target.checked }; update('plans', n); }}
                      className="rounded accent-editor-accent" /> Featured
                  </label>
                  <button onClick={() => update('plans', plans.filter((_, j) => j !== i))} className="rounded p-0.5 text-editor-text hover:bg-red-500/20 hover:text-red-400"><X className="h-3 w-3" /></button>
                </div>
              </div>
              <input value={plan.name || ''} onChange={e => { const n = [...plans]; n[i] = { ...n[i], name: e.target.value }; update('plans', n); }}
                placeholder="Plan name" className="mb-1 w-full rounded border border-editor-border bg-editor-sidebar px-2 py-1 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
              <input value={plan.price || ''} onChange={e => { const n = [...plans]; n[i] = { ...n[i], price: e.target.value }; update('plans', n); }}
                placeholder="Price" className="mb-1 w-full rounded border border-editor-border bg-editor-sidebar px-2 py-1 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
              <div className="mt-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-editor-text">Features</span>
                  <button onClick={() => { const n = [...plans]; n[i] = { ...n[i], features: [...(n[i].features || []), 'New feature'] }; update('plans', n); }}
                    className="rounded p-0.5 hover:bg-editor-hover"><Plus className="h-2.5 w-2.5" /></button>
                </div>
                {(plan.features || []).map((f: string, fi: number) => (
                  <div key={fi} className="flex gap-1 items-center mb-0.5">
                    <input value={f} onChange={e => { const n = [...plans]; const feats = [...(n[i].features || [])]; feats[fi] = e.target.value; n[i] = { ...n[i], features: feats }; update('plans', n); }}
                      className="flex-1 rounded border border-editor-border bg-editor-sidebar px-2 py-0.5 text-[11px] text-editor-text-bright focus:border-editor-accent focus:outline-none" />
                    <button onClick={() => { const n = [...plans]; n[i] = { ...n[i], features: (n[i].features || []).filter((_: any, j: number) => j !== fi) }; update('plans', n); }}
                      className="rounded p-0.5 text-editor-text hover:text-red-400"><X className="h-2.5 w-2.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') handleImageSelect(reader.result);
      };
      reader.readAsDataURL(files[0]);
      return;
    }
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
          <Field label="Secondary Button" prop="secondaryButtonText" />
          <Field label="Button URL" prop="url" />

          {/* Form */}
          <Field label="Placeholder" prop="placeholder" />
          <Field label="Alt Text" prop="alt" />
          <Field label="Copyright" prop="copyright" />

          {/* URLs */}
          <Field label="Image Source" prop="src" />

          {/* Array editors */}
          {p.links && <StringArrayEditor label="Navigation Links" prop="links" />}
          {p.fields && <StringArrayEditor label="Form Fields" prop="fields" />}
          {p.images && <StringArrayEditor label="Gallery Images" prop="images" />}
          {p.items && <ItemsEditor label="Items" prop="items" />}
          {p.plans && <PlansEditor />}

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
          {p.textAlign !== undefined && <Field label="Text Align" prop="textAlign" type="select-align" />}

          {/* Padding Y */}
          {p.paddingY !== undefined && <Field label="Padding Y" prop="paddingY" type="range" />}

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
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${imageCategory === cat ? 'bg-editor-accent/20 text-editor-accent border border-editor-accent/40' : 'border border-editor-border text-editor-text hover:text-editor-text-bright hover:border-editor-accent/30'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-2" onDragOver={e => e.preventDefault()} onDrop={handleImageDrop}>
            {STOCK_IMAGES[imageCategory]?.map((url, i) => (
              <button key={i} onClick={() => handleImageSelect(url)}
                className="group relative overflow-hidden rounded-lg border border-editor-border hover:border-editor-accent/50 transition-colors">
                <img src={url} alt={`${imageCategory} ${i + 1}`} className="h-20 w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              </button>
            ))}
          </div>

          {/* Custom URL input */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-editor-text">Or paste image URL</label>
            <input type="text" placeholder="https://..."
              value={p.bgImage || p.src || ''}
              onChange={e => {
                if (p.src !== undefined) update('src', e.target.value);
                else update('bgImage', e.target.value);
              }}
              className="w-full rounded-lg border border-editor-border bg-editor-bg px-3 py-2 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" />
          </div>

          {/* Drag & drop zone */}
          <div className="mt-3 flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-editor-border text-xs text-editor-text hover:border-editor-accent/40 transition-colors"
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
