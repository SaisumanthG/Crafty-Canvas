import React from 'react';

interface CanvasComponentProps {
  component: any;
  isSelected: boolean;
  onClick: () => void;
}

export function CanvasComponent({ component, isSelected, onClick }: CanvasComponentProps) {
  const p = component.props;

  const renderInner = () => {
    switch (component.type) {
      case 'navbar':
        return (
          <div className="flex items-center justify-between px-6 py-4" style={{ background: p.bgColor, color: p.textColor }}>
            <strong className="text-lg">{p.brand}</strong>
            <div className="flex gap-4 text-sm">{(p.links || []).map((l: string, i: number) => <span key={i} className="opacity-70">{l}</span>)}</div>
          </div>
        );
      case 'hero':
        return (
          <div className="px-6 py-20 text-center" style={{ background: p.bgColor, color: p.textColor }}>
            <h1 className="mb-4 text-4xl font-extrabold">{p.heading}</h1>
            <p className="mx-auto mb-6 max-w-lg text-base opacity-70">{p.subheading}</p>
            {p.buttonText && <button className="rounded-lg px-6 py-3 font-semibold" style={{ background: p.buttonColor || p.accentColor, color: '#fff' }}>{p.buttonText}</button>}
          </div>
        );
      case 'features':
        return (
          <div className="px-6 py-16" style={{ background: p.bgColor, color: p.textColor }}>
            <h2 className="mb-8 text-center text-2xl font-bold">{p.heading}</h2>
            <div className="grid grid-cols-3 gap-4">
              {(p.items || []).map((it: any, i: number) => (
                <div key={i} className="rounded-lg border border-white/10 p-4">
                  <h3 className="mb-1 font-semibold" style={{ color: p.accentColor }}>{it.title}</h3>
                  <p className="text-sm opacity-70">{it.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="grid grid-cols-3 gap-4 px-6 py-12" style={{ background: p.bgColor, color: p.textColor }}>
            {(p.items || []).map((it: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-extrabold" style={{ color: p.accentColor }}>{it.value}</div>
                <div className="mt-1 text-sm opacity-60">{it.label}</div>
              </div>
            ))}
          </div>
        );
      case 'testimonial':
        return (
          <div className="px-6 py-12 text-center" style={{ background: p.bgColor, color: p.textColor }}>
            <p className="mx-auto max-w-md text-lg italic">{p.quote}</p>
            <p className="mt-4 font-semibold">{p.author}</p>
            <p className="text-sm opacity-60">{p.role}</p>
          </div>
        );
      case 'cta':
        return (
          <div className="px-6 py-16 text-center" style={{ background: p.bgColor, color: p.textColor }}>
            <h2 className="mb-3 text-3xl font-bold">{p.heading}</h2>
            <p className="mb-6 opacity-70">{p.subheading}</p>
            {p.buttonText && <button className="rounded-lg px-6 py-3 font-semibold" style={{ background: p.buttonColor || p.accentColor, color: '#fff' }}>{p.buttonText}</button>}
          </div>
        );
      case 'pricing':
        return (
          <div className="px-6 py-16" style={{ background: p.bgColor, color: p.textColor }}>
            <h2 className="mb-8 text-center text-2xl font-bold">{p.heading}</h2>
            <div className="grid grid-cols-3 gap-4">
              {(p.plans || []).map((pl: any, i: number) => (
                <div key={i} className="rounded-xl border p-5" style={{ borderColor: pl.highlighted ? (p.accentColor || '#7C3AED') : 'rgba(255,255,255,0.1)', background: pl.highlighted ? 'rgba(124,58,237,0.08)' : 'transparent' }}>
                  <h3 className="mb-1 text-lg font-semibold">{pl.name}</h3>
                  <div className="mb-4 text-3xl font-extrabold" style={{ color: p.accentColor }}>{pl.price}</div>
                  <ul className="space-y-2 text-sm">{(pl.features || []).map((f: string, j: number) => <li key={j} className="opacity-70">✓ {f}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        );
      case 'footer':
        return (
          <div className="px-6 py-8" style={{ background: p.bgColor, color: p.textColor }}>
            <div className="flex items-center justify-between">
              <span className="font-medium">{p.brand}</span>
              <div className="flex gap-3 text-sm">{(p.links || []).map((l: string, i: number) => <span key={i} className="opacity-60">{l}</span>)}</div>
            </div>
            <p className="mt-4 text-center text-xs opacity-40">{p.copyright}</p>
          </div>
        );
      case 'heading':
        return <div style={{ padding: '16px 24px', textAlign: p.textAlign }}>{React.createElement(p.level || 'h2', { style: { fontSize: p.fontSize, fontWeight: p.fontWeight, color: p.textColor } }, p.text)}</div>;
      case 'text':
        return <p style={{ padding: '12px 24px', color: p.textColor, fontSize: p.fontSize, textAlign: p.textAlign }}>{p.text}</p>;
      case 'richtext':
        return <div style={{ padding: '12px 24px', color: p.textColor }} dangerouslySetInnerHTML={{ __html: p.text }} />;
      case 'link':
        return <div style={{ padding: '8px 24px' }}><a href="#" style={{ color: p.linkColor, fontSize: p.fontSize }}>{p.text}</a></div>;
      case 'image':
        return <div style={{ padding: '12px 24px' }}><img src={p.src} alt={p.alt} style={{ width: p.width, borderRadius: p.borderRadius }} /></div>;
      case 'video':
        return <div style={{ padding: '12px 24px', aspectRatio: p.aspectRatio }}><iframe src={p.src} className="h-full w-full border-0" /></div>;
      case 'gallery':
        return (
          <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: `repeat(${p.columns || 3}, 1fr)`, gap: p.gap }}>
            {(p.images || []).map((src: string, i: number) => <img key={i} src={src} className="aspect-square w-full rounded-lg object-cover" />)}
          </div>
        );
      case 'divider':
        return <hr style={{ border: 'none', borderTop: `${p.thickness} solid ${p.color}`, margin: `${p.margin} 24px` }} />;
      case 'spacer':
        return <div style={{ height: p.height }} />;
      case 'button':
        return <div style={{ padding: '12px 24px' }}><button style={{ background: p.buttonColor, color: p.buttonTextColor, padding: p.padding, borderRadius: p.borderRadius, fontSize: p.fontSize, fontWeight: 600, border: 'none', cursor: 'pointer' }}>{p.text}</button></div>;
      case 'form':
        return (
          <div style={{ background: p.bgColor, padding: '40px 24px' }}>
            <div className="mx-auto flex max-w-md flex-col gap-3">
              {(p.fields || []).map((f: string, i: number) => <input key={i} placeholder={f} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5" style={{ color: p.textColor }} readOnly />)}
              <button style={{ background: p.buttonColor, color: '#fff', padding: '10px', borderRadius: '8px', fontWeight: 600, border: 'none' }}>{p.buttonText}</button>
            </div>
          </div>
        );
      case 'newsletter':
        return (
          <div style={{ background: p.bgColor, padding: '40px 24px', textAlign: 'center' }}>
            <h3 style={{ color: p.textColor, fontSize: '20px', marginBottom: '12px' }}>{p.heading}</h3>
            <div className="mx-auto flex max-w-md gap-2">
              <input placeholder={p.placeholder} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5" style={{ color: p.textColor }} readOnly />
              <button style={{ background: p.buttonColor, color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, border: 'none' }}>{p.buttonText}</button>
            </div>
          </div>
        );
      case 'icon':
        return <div style={{ padding: '16px 24px', textAlign: 'center', fontSize: `${p.size}px`, color: p.color }}>★</div>;
      case 'container':
        return <div style={{ background: p.bgColor, padding: p.padding, borderRadius: p.borderRadius, maxWidth: p.maxWidth, margin: '0 auto' }}><p className="text-center text-sm opacity-40">Container</p></div>;
      case 'columns':
        return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${p.columns}, 1fr)`, gap: p.gap, padding: '24px' }}>{Array.from({ length: p.columns }).map((_, i) => <div key={i} className="rounded-lg border border-dashed border-white/10 p-8 text-center text-sm opacity-30">Column {i + 1}</div>)}</div>;
      default:
        return <div className="p-4 text-sm opacity-50">[{component.type}]</div>;
    }
  };

  return (
    <div onClick={onClick} className={`relative cursor-pointer transition-all ${isSelected ? 'ring-2 ring-editor-selected ring-offset-1 ring-offset-editor-bg' : 'hover:ring-1 hover:ring-editor-border'}`}>
      {isSelected && (
        <div className="absolute -top-6 left-2 z-10 rounded-t-md bg-editor-selected px-2 py-0.5 text-xs font-medium text-primary-foreground">
          {component.type}
        </div>
      )}
      {renderInner()}
    </div>
  );
}
