import { useState } from 'react';
import { Copy, Trash2 } from 'lucide-react';

interface PropertyPanelProps {
  component: any;
  onChange: (updated: any) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function PropertyPanel({ component, onChange, onDuplicate, onDelete }: PropertyPanelProps) {
  const p = component.props;

  const update = (key: string, value: any) => {
    onChange({ ...component, props: { ...p, [key]: value } });
  };

  const Field = ({ label, prop, type = 'text' }: { label: string; prop: string; type?: string }) => {
    if (p[prop] === undefined) return null;
    return (
      <div className="mb-3">
        <label className="mb-1 block text-xs text-editor-text">{label}</label>
        {type === 'textarea' ? (
          <textarea value={p[prop]} onChange={e => update(prop, e.target.value)} rows={3} className="w-full rounded-md border border-editor-border bg-editor-bg px-3 py-1.5 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none" />
        ) : type === 'color' ? (
          <div className="flex gap-2">
            <input type="color" value={p[prop]} onChange={e => update(prop, e.target.value)} className="h-8 w-8 cursor-pointer rounded border border-editor-border bg-transparent" />
            <input type="text" value={p[prop]} onChange={e => update(prop, e.target.value)} className="flex-1 rounded-md border border-editor-border bg-editor-bg px-3 py-1.5 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none" />
          </div>
        ) : type === 'select' ? null : (
          <input type={type} value={p[prop]} onChange={e => update(prop, e.target.value)} className="w-full rounded-md border border-editor-border bg-editor-bg px-3 py-1.5 text-sm text-editor-text-bright focus:border-editor-accent focus:outline-none" />
        )}
      </div>
    );
  };

  return (
    <div className="p-4 editor-scroll overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-editor-text-bright capitalize">{component.type}</h3>
        <div className="flex gap-1">
          <button onClick={onDuplicate} className="rounded p-1.5 text-editor-text transition-colors hover:bg-editor-hover hover:text-editor-text-bright" title="Duplicate">
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button onClick={onDelete} className="rounded p-1.5 text-editor-text transition-colors hover:bg-red-500/10 hover:text-red-400" title="Delete">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Common text fields */}
      <Field label="Heading" prop="heading" />
      <Field label="Subheading" prop="subheading" />
      <Field label="Text" prop="text" type={component.type === 'richtext' ? 'textarea' : 'text'} />
      <Field label="Brand" prop="brand" />
      <Field label="Quote" prop="quote" type="textarea" />
      <Field label="Author" prop="author" />
      <Field label="Role" prop="role" />
      <Field label="Button Text" prop="buttonText" />
      <Field label="Placeholder" prop="placeholder" />
      <Field label="Alt Text" prop="alt" />
      <Field label="Copyright" prop="copyright" />
      
      {/* URLs */}
      <Field label="URL" prop="url" />
      <Field label="Image Source" prop="src" />

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
      <Field label="Text Align" prop="textAlign" />

      {/* Colors */}
      <Field label="Background Color" prop="bgColor" type="color" />
      <Field label="Text Color" prop="textColor" type="color" />
      <Field label="Accent Color" prop="accentColor" type="color" />
      <Field label="Button Color" prop="buttonColor" type="color" />
      <Field label="Button Text Color" prop="buttonTextColor" type="color" />
      <Field label="Link Color" prop="linkColor" type="color" />
      <Field label="Color" prop="color" type="color" />
    </div>
  );
}
