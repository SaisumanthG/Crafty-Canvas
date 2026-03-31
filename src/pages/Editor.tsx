import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ArrowLeft, Save, Eye, Download, Globe, Undo2, Redo2, Monitor, Tablet, Smartphone, Palette, Github, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import { getSiteById, updateSite, publishSite, deserializeComponents, serializeComponents } from '@/lib/siteStorage';
import { exportToHTML } from '@/lib/htmlExporter';
import { createComponent } from '@/lib/componentRegistry';
import { applyThemeToComponents, Theme } from '@/lib/themes';
import { ComponentPalette } from '@/components/editor/ComponentPalette';
import { CanvasComponent } from '@/components/editor/CanvasComponent';
import { PropertyPanel } from '@/components/editor/PropertyPanel';
import { ThemePicker } from '@/components/editor/ThemePicker';
import { PreviewModal } from '@/components/editor/PreviewModal';
import { ExportModal } from '@/components/editor/ExportModal';
import { PublishModal } from '@/components/editor/PublishModal';
import { GitHubModal } from '@/components/editor/GitHubModal';
import { VercelDeployModal } from '@/components/editor/VercelDeployModal';

export default function Editor() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get('id');
  const [site, setSite] = useState<any>(null);
  const [components, setComponents] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [rightTab, setRightTab] = useState<'props' | 'themes'>('props');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [dragType, setDragType] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);
  const [showVercel, setShowVercel] = useState(false);

  const [history, setHistory] = useState<any[][]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  useEffect(() => {
    if (!id) return;
    const s = getSiteById(id);
    if (!s) { navigate('/sites'); return; }
    setSite(s);
    setTitle(s.title);
    const comps = deserializeComponents(s.components_json);
    setComponents(comps);
    setHistory([comps]);
    setHistoryIdx(0);
  }, [id]);

  const pushHistory = useCallback((newComps: any[]) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIdx + 1);
      const next = [...trimmed, newComps].slice(-50);
      setHistoryIdx(next.length - 1);
      return next;
    });
  }, [historyIdx]);

  const updateComponents = useCallback((newComps: any[]) => {
    setComponents(newComps);
    pushHistory(newComps);
  }, [pushHistory]);

  const undo = () => { if (historyIdx > 0) { setHistoryIdx(historyIdx - 1); setComponents(history[historyIdx - 1]); } };
  const redo = () => { if (historyIdx < history.length - 1) { setHistoryIdx(historyIdx + 1); setComponents(history[historyIdx + 1]); } };

  const selected = components.find(c => c.id === selectedId);

  const handleSave = () => {
    if (!id) return;
    updateSite(id, { title, components_json: serializeComponents(components) });
    toast.success('Saved!');
  };

  const handlePublish = () => {
    if (!id || !site) return;
    const h = exportToHTML(components, title);
    publishSite(id, h);
    setShowPublish(true);
    toast.success('Published!');
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.droppableId === 'palette') {
      if (dragType) {
        const newComp = createComponent(dragType);
        const newComps = [...components];
        newComps.splice(result.destination.index, 0, newComp);
        updateComponents(newComps);
        setSelectedId(newComp.id);
        setDragType(null);
      }
      return;
    }
    const reordered = [...components];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    updateComponents(reordered);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragType) {
      const newComp = createComponent(dragType);
      updateComponents([...components, newComp]);
      setSelectedId(newComp.id);
      setDragType(null);
    }
  };

  const handleComponentChange = (updated: any) => {
    updateComponents(components.map(c => c.id === updated.id ? updated : c));
  };

  const handleDuplicate = () => {
    if (!selected) return;
    const clone = createComponent(selected.type, selected.props);
    const idx = components.findIndex(c => c.id === selected.id);
    const newComps = [...components];
    newComps.splice(idx + 1, 0, clone);
    updateComponents(newComps);
    setSelectedId(clone.id);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    updateComponents(components.filter(c => c.id !== selectedId));
    setSelectedId(null);
  };

  const handleThemeApply = (theme: Theme) => {
    const themed = applyThemeToComponents(components, theme);
    updateComponents(themed);
    if (id) updateSite(id, { global_styles_json: JSON.stringify(theme) });
    toast.success(`Theme "${theme.name}" applied!`);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); handleSave(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault(); handleDelete();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const viewportWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };

  if (!site) return <div className="flex h-screen items-center justify-center bg-editor-bg text-editor-text">Loading...</div>;

  const html = exportToHTML(components, title);

  return (
    <div className="flex h-screen flex-col bg-editor-bg">
      {/* Top toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-editor-border bg-editor-sidebar px-3">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/sites')} className="rounded-lg p-1.5 text-editor-text hover:bg-editor-hover hover:text-editor-text-bright">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-editor-accent/20">
              <Globe className="h-3.5 w-3.5 text-editor-accent" />
            </div>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-40 rounded-md border border-transparent bg-transparent px-1.5 py-0.5 text-sm font-medium text-editor-text-bright hover:border-editor-border focus:border-editor-accent focus:outline-none" />
          </div>
          <span className="rounded-full bg-editor-hover px-2 py-0.5 text-[10px] text-editor-text">{components.length} blocks</span>
        </div>

        <div className="flex items-center gap-1">
          {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as const).map(([v, Icon]) => (
            <button key={v} onClick={() => setViewport(v)} className={`rounded-lg p-1.5 transition-colors ${viewport === v ? 'bg-editor-hover text-editor-text-bright' : 'text-editor-text hover:text-editor-text-bright'}`}>
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={undo} disabled={historyIdx <= 0} className="rounded-lg p-1.5 text-editor-text hover:bg-editor-hover disabled:opacity-30">
            <Undo2 className="h-4 w-4" />
          </button>
          <button onClick={redo} disabled={historyIdx >= history.length - 1} className="rounded-lg p-1.5 text-editor-text hover:bg-editor-hover disabled:opacity-30">
            <Redo2 className="h-4 w-4" />
          </button>
          <div className="mx-1 h-5 w-px bg-editor-border" />
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-1 rounded-lg border border-editor-border px-2.5 py-1 text-xs text-editor-text hover:bg-editor-hover hover:text-editor-text-bright">
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
          <button onClick={() => setShowExport(true)} className="flex items-center gap-1 rounded-lg border border-editor-border px-2.5 py-1 text-xs text-editor-text hover:bg-editor-hover hover:text-editor-text-bright">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button onClick={() => setShowGitHub(true)} className="flex items-center gap-1 rounded-lg border border-editor-border px-2.5 py-1 text-xs text-editor-text hover:bg-editor-hover hover:text-editor-text-bright">
            <Github className="h-3.5 w-3.5" /> GitHub
          </button>
          <button onClick={handleSave} className="flex items-center gap-1 rounded-lg border border-editor-border px-2.5 py-1 text-xs text-editor-text hover:bg-editor-hover hover:text-editor-text-bright">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
          <button onClick={() => setShowVercel(true)} className="flex items-center gap-1 rounded-lg bg-editor-accent px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90">
            <Rocket className="h-3.5 w-3.5" /> Publish
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-56 shrink-0 border-r border-editor-border bg-editor-sidebar">
          <div className="border-b border-editor-border px-3 py-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-editor-text">Components</h3>
          </div>
          <ComponentPalette onDragStart={setDragType} />
        </div>

        <div className="flex-1 overflow-auto bg-editor-bg p-6 canvas-grid" onDragOver={e => e.preventDefault()} onDrop={handleCanvasDrop}>
          <div className="mx-auto" style={{ maxWidth: viewportWidths[viewport], transition: 'max-width 0.3s' }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="canvas">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[400px] rounded-lg border border-editor-border bg-editor-surface">
                    {components.length === 0 && (
                      <div className="flex h-64 items-center justify-center text-sm text-editor-text">
                        Drag components here to start building
                      </div>
                    )}
                    {components.map((comp, idx) => (
                      <Draggable key={comp.id} draggableId={comp.id} index={idx}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <CanvasComponent
                              component={comp}
                              isSelected={comp.id === selectedId}
                              onClick={() => { setSelectedId(comp.id); setRightTab('props'); }}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        <div className="w-72 shrink-0 border-l border-editor-border bg-editor-sidebar">
          <div className="flex border-b border-editor-border">
            <button onClick={() => setRightTab('props')} className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${rightTab === 'props' ? 'border-b-2 border-editor-accent text-editor-text-bright' : 'text-editor-text hover:text-editor-text-bright'}`}>
              Properties
            </button>
            <button onClick={() => setRightTab('themes')} className={`flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-medium transition-colors ${rightTab === 'themes' ? 'border-b-2 border-editor-accent text-editor-text-bright' : 'text-editor-text hover:text-editor-text-bright'}`}>
              <Palette className="h-3 w-3" /> Themes
            </button>
          </div>

          {rightTab === 'props' && (
            selected ? (
              <PropertyPanel component={selected} onChange={handleComponentChange} onDuplicate={handleDuplicate} onDelete={handleDelete} />
            ) : (
              <div className="flex h-40 items-center justify-center text-xs text-editor-text">
                Select a component to edit
              </div>
            )
          )}

          {rightTab === 'themes' && (
            <div className="p-3 editor-scroll overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
              <ThemePicker category={site.category || 'saas'} selected={null} onSelect={handleThemeApply} columns={2} />
            </div>
          )}
        </div>
      </div>

      {showPreview && <PreviewModal html={html} onClose={() => setShowPreview(false)} />}
      {showExport && <ExportModal html={html} title={title} onClose={() => setShowExport(false)} />}
      {showPublish && <PublishModal slug={site.slug} onClose={() => setShowPublish(false)} />}
      {showGitHub && <GitHubModal html={html} title={title} onClose={() => setShowGitHub(false)} />}
      {showVercel && <VercelDeployModal html={html} title={title} onClose={() => setShowVercel(false)} />}
    </div>
  );
}
