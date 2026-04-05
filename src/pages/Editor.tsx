import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ArrowLeft, Save, Eye, Download, Undo2, Redo2, Monitor, Tablet, Smartphone, Palette, Rocket, Plus, X } from 'lucide-react';
import webcraftLogo from '@/assets/webcraft-logo.png';
import { toast } from 'sonner';
import { getSiteById, updateSite, publishSite, deserializeComponents, serializeComponents, deserializePages, serializePages, type SitePage } from '@/lib/siteStorage';
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
import { VercelDeployModal } from '@/components/editor/VercelDeployModal';

interface EditorSnapshot {
  homeComponents: any[];
  pages: SitePage[];
  activePage: string;
  components: any[];
}

export default function Editor() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get('id');
  const [site, setSite] = useState<any>(null);
  const [homeComponents, setHomeComponents] = useState<any[]>([]);
  const [components, setComponents] = useState<any[]>([]);
  const [pages, setPages] = useState<SitePage[]>([]);
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [rightTab, setRightTab] = useState<'props' | 'themes'>('props');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [dragType, setDragType] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showVercel, setShowVercel] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [newPageName, setNewPageName] = useState('');

  const [history, setHistory] = useState<EditorSnapshot[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const skipHistoryRef = useRef(false);

  const makeSnapshot = useCallback((): EditorSnapshot => ({
    homeComponents: activePage === 'home' ? components : homeComponents,
    pages: activePage !== 'home' ? pages.map(p => p.name === activePage ? { ...p, components } : p) : pages,
    activePage,
    components,
  }), [homeComponents, components, pages, activePage]);

  useEffect(() => {
    if (!id) return;
    const s = getSiteById(id);
    if (!s) { navigate('/sites'); return; }
    setSite(s);
    setTitle(s.title);
    const comps = deserializeComponents(s.components_json);
    setHomeComponents(comps);
    setComponents(comps);
    const sitePages = deserializePages(s.pages_json || '[]');
    setPages(sitePages);
    setActivePage('home');
    const snap: EditorSnapshot = { homeComponents: comps, pages: sitePages, activePage: 'home', components: comps };
    setHistory([snap]);
    setHistoryIdx(0);
  }, [id]);

  // Sync navbar links with pages
  const syncNavbarLinks = useCallback((comps: any[], pageNames: string[]) => {
    return comps.map(c => {
      if (c.type === 'navbar') {
        return { ...c, props: { ...c.props, links: pageNames.filter(n => n !== 'home').map(n => n.charAt(0).toUpperCase() + n.slice(1)) } };
      }
      return c;
    });
  }, []);

  const pushHistory = useCallback((snap: EditorSnapshot) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, historyIdx + 1);
      const next = [...trimmed, snap].slice(-50);
      setHistoryIdx(next.length - 1);
      return next;
    });
  }, [historyIdx]);

  const switchPage = (pageName: string) => {
    if (pageName === activePage) return;
    let newHome = homeComponents;
    let newPages = pages;
    if (activePage === 'home') {
      newHome = components;
      setHomeComponents(components);
    } else {
      newPages = pages.map(p => p.name === activePage ? { ...p, components } : p);
      setPages(newPages);
    }
    let newComps: any[];
    if (pageName === 'home') {
      newComps = newHome;
    } else {
      const page = newPages.find(p => p.name === pageName);
      newComps = page?.components || [];
    }
    setComponents(newComps);
    setActivePage(pageName);
    setSelectedId(null);
    const snap: EditorSnapshot = { homeComponents: newHome, pages: newPages, activePage: pageName, components: newComps };
    pushHistory(snap);
  };

  const allPageNames = ['home', ...pages.map(p => p.name)];

  const addPage = () => {
    const name = newPageName.trim();
    if (!name || name.toLowerCase() === 'home' || pages.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      toast.error('Invalid or duplicate page name');
      return;
    }
    const navbarComp = (activePage === 'home' ? components : homeComponents).find(c => c.type === 'navbar');
    const footerComp = (activePage === 'home' ? components : homeComponents).find(c => c.type === 'footer');
    const defaultComps = [
      createComponent('navbar', navbarComp?.props || undefined),
      createComponent('hero', { heading: name, subheading: `Welcome to the ${name} page`, buttonText: 'Learn More' }),
      createComponent('features', { heading: `${name} Content`, items: [{ title: 'Section 1', desc: 'Add your content here' }, { title: 'Section 2', desc: 'Customize this section' }, { title: 'Section 3', desc: 'Make it your own' }] }),
      createComponent('footer', footerComp?.props || undefined),
    ];
    const newPages = [...pages, { name, components: defaultComps }];
    setPages(newPages);
    // Sync navbar links across all pages
    const updatedPageNames = ['home', ...newPages.map(p => p.name)];
    const syncedHome = syncNavbarLinks(activePage === 'home' ? components : homeComponents, updatedPageNames);
    if (activePage === 'home') {
      setComponents(syncedHome);
      setHomeComponents(syncedHome);
    } else {
      setHomeComponents(syncedHome);
    }
    const syncedPages = newPages.map(p => ({ ...p, components: syncNavbarLinks(p.components, updatedPageNames) }));
    setPages(syncedPages);

    setShowAddPage(false);
    setNewPageName('');
    toast.success(`Page "${name}" added`);
    pushHistory({ homeComponents: syncedHome, pages: syncedPages, activePage, components: activePage === 'home' ? syncedHome : components });
  };

  const deletePage = (pageName: string) => {
    if (pageName === 'home') return;
    pushHistory(makeSnapshot());
    let newComps = components;
    if (activePage === pageName) {
      newComps = homeComponents;
      setComponents(homeComponents);
      setActivePage('home');
    }
    const newPages = pages.filter(p => p.name !== pageName);
    setPages(newPages);
    // Sync navbar links
    const updatedPageNames = ['home', ...newPages.map(p => p.name)];
    const syncedHome = syncNavbarLinks(activePage === pageName ? homeComponents : (activePage === 'home' ? newComps : homeComponents), updatedPageNames);
    setHomeComponents(syncedHome);
    if (activePage === pageName || activePage === 'home') setComponents(syncedHome);
    const syncedPages = newPages.map(p => ({ ...p, components: syncNavbarLinks(p.components, updatedPageNames) }));
    setPages(syncedPages);

    toast.success(`Page "${pageName}" deleted (Ctrl+Z to restore)`);
    pushHistory({
      homeComponents: syncedHome,
      pages: syncedPages,
      activePage: activePage === pageName ? 'home' : activePage,
      components: activePage === pageName ? syncedHome : newComps,
    });
  };

  const updateComponents = useCallback((newComps: any[]) => {
    setComponents(newComps);
    if (activePage === 'home') {
      setHomeComponents(newComps);
    }
    if (!skipHistoryRef.current) {
      const snap: EditorSnapshot = {
        homeComponents: activePage === 'home' ? newComps : homeComponents,
        pages: activePage !== 'home' ? pages.map(p => p.name === activePage ? { ...p, components: newComps } : p) : pages,
        activePage,
        components: newComps,
      };
      pushHistory(snap);
    }
  }, [pushHistory, activePage, homeComponents, pages]);

  const undo = () => {
    if (historyIdx <= 0) return;
    const prev = history[historyIdx - 1];
    setHistoryIdx(historyIdx - 1);
    skipHistoryRef.current = true;
    setHomeComponents(prev.homeComponents);
    setPages(prev.pages);
    setActivePage(prev.activePage);
    setComponents(prev.components);
    skipHistoryRef.current = false;
  };

  const redo = () => {
    if (historyIdx >= history.length - 1) return;
    const next = history[historyIdx + 1];
    setHistoryIdx(historyIdx + 1);
    skipHistoryRef.current = true;
    setHomeComponents(next.homeComponents);
    setPages(next.pages);
    setActivePage(next.activePage);
    setComponents(next.components);
    skipHistoryRef.current = false;
  };

  const selected = components.find(c => c.id === selectedId);

  const getCurrentPages = (): SitePage[] => {
    let currentPages = [...pages];
    if (activePage !== 'home') {
      currentPages = currentPages.map(p => p.name === activePage ? { ...p, components } : p);
    }
    return currentPages;
  };

  const handleSave = () => {
    if (!id) return;
    const currentPages = getCurrentPages();
    const homeComps = activePage === 'home' ? components : homeComponents;
    updateSite(id, {
      title,
      components_json: serializeComponents(homeComps),
      pages_json: serializePages(currentPages),
    });
    const updated = getSiteById(id);
    if (updated) setSite(updated);
    toast.success('Saved!');
  };

  const handlePublish = () => {
    if (!id || !site) return;
    handleSave();
    const homeComps = activePage === 'home' ? components : homeComponents;
    const currentPages = getCurrentPages();
    const h = exportToHTML(homeComps, title, currentPages);
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
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newComp = createComponent('image', { src: reader.result, alt: files[0].name });
          updateComponents([...components, newComp]);
          setSelectedId(newComp.id);
        }
      };
      reader.readAsDataURL(files[0]);
      return;
    }
    const url = e.dataTransfer.getData('text/plain');
    if (url && (url.startsWith('http') || url.startsWith('data:'))) {
      const newComp = createComponent('image', { src: url, alt: 'Dropped image' });
      updateComponents([...components, newComp]);
      setSelectedId(newComp.id);
      return;
    }
    if (dragType) {
      const newComp = createComponent(dragType);
      updateComponents([...components, newComp]);
      setSelectedId(newComp.id);
      setDragType(null);
    }
  };

  const handleComponentChange = useCallback((updated: any) => {
    updateComponents(components.map(c => c.id === updated.id ? updated : c));
  }, [components, updateComponents]);

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
    if (activePage !== 'home') {
      setHomeComponents(prev => applyThemeToComponents(prev, theme));
    }
    setPages(prev => prev.map(p => ({ ...p, components: applyThemeToComponents(p.components, theme) })));
    if (id) updateSite(id, { global_styles_json: JSON.stringify(theme) });
    toast.success(`Theme "${theme.name}" applied to all pages!`);
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

  const currentHomeComps = activePage === 'home' ? components : homeComponents;
  const html = exportToHTML(currentHomeComps, title, getCurrentPages());

  return (
    <div className="flex h-screen flex-col bg-editor-bg">
      {/* Top toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-editor-border bg-editor-sidebar px-3">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/sites')} className="rounded-lg p-1.5 text-editor-text hover:bg-editor-hover hover:text-editor-text-bright">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <img src={webcraftLogo} alt="WebCraft" className="h-6 w-6 rounded-md" />
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
          <button onClick={handleSave} className="flex items-center gap-1 rounded-lg border border-editor-border px-2.5 py-1 text-xs text-editor-text hover:bg-editor-hover hover:text-editor-text-bright">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
          <button onClick={() => { handleSave(); setShowVercel(true); }} className="flex items-center gap-1 rounded-lg bg-editor-accent px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90">
            <Rocket className="h-3.5 w-3.5" /> Publish
          </button>
        </div>
      </div>

      {/* Page tabs */}
      <div className="flex h-9 shrink-0 items-center gap-1 border-b border-editor-border bg-editor-sidebar px-3 overflow-x-auto">
        {allPageNames.map(name => (
          <div key={name} className={`group flex items-center gap-1 rounded-t-md px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${activePage === name ? 'bg-editor-bg text-editor-text-bright border-b-2 border-editor-accent' : 'text-editor-text hover:text-editor-text-bright hover:bg-editor-hover'}`}>
            <span onClick={() => switchPage(name)} className="capitalize">{name}</span>
            {name !== 'home' && (
              <button onClick={(e) => { e.stopPropagation(); deletePage(name); }} className="ml-1 hidden rounded p-0.5 text-editor-text hover:bg-red-500/20 hover:text-red-400 group-hover:block">
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        <button onClick={() => setShowAddPage(true)} className="rounded-md p-1 text-editor-text hover:bg-editor-hover hover:text-editor-text-bright" title="Add page">
          <Plus className="h-3.5 w-3.5" />
        </button>

        {showAddPage && (
          <div className="flex items-center gap-2 ml-2">
            <input value={newPageName} onChange={e => setNewPageName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addPage()} placeholder="Page name..." className="w-28 rounded border border-editor-border bg-editor-bg px-2 py-1 text-xs text-editor-text-bright focus:border-editor-accent focus:outline-none" autoFocus />
            <button onClick={addPage} className="rounded bg-editor-accent px-2 py-1 text-xs text-primary-foreground">Add</button>
            <button onClick={() => { setShowAddPage(false); setNewPageName(''); }} className="rounded p-1 text-editor-text hover:bg-editor-hover"><X className="h-3 w-3" /></button>
          </div>
        )}
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left palette */}
        <div className="w-56 shrink-0 border-r border-editor-border bg-editor-sidebar flex flex-col h-full">
          <div className="border-b border-editor-border px-3 py-2.5 shrink-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-editor-text">Components</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ComponentPalette onDragStart={setDragType} />
          </div>
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

        <div className="w-72 shrink-0 border-l border-editor-border bg-editor-sidebar flex flex-col h-full">
          <div className="flex border-b border-editor-border shrink-0">
            <button onClick={() => setRightTab('props')} className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors ${rightTab === 'props' ? 'border-b-2 border-editor-accent text-editor-text-bright' : 'text-editor-text hover:text-editor-text-bright'}`}>
              Properties
            </button>
            <button onClick={() => setRightTab('themes')} className={`flex-1 flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-medium transition-colors ${rightTab === 'themes' ? 'border-b-2 border-editor-accent text-editor-text-bright' : 'text-editor-text hover:text-editor-text-bright'}`}>
              <Palette className="h-3 w-3" /> Themes
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {rightTab === 'props' && (
              selected ? (
                <PropertyPanel key={selected.id} component={selected} onChange={handleComponentChange} onDuplicate={handleDuplicate} onDelete={handleDelete} />
              ) : (
                <div className="flex h-40 items-center justify-center text-xs text-editor-text">
                  Select a component to edit
                </div>
              )
            )}

            {rightTab === 'themes' && (
              <div className="p-3">
                <ThemePicker category={site.category || 'saas'} selected={null} onSelect={handleThemeApply} columns={2} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showPreview && <PreviewModal html={html} onClose={() => setShowPreview(false)} />}
      {showExport && <ExportModal html={html} title={title} onClose={() => setShowExport(false)} />}
      {showPublish && <PublishModal slug={site.slug} onClose={() => setShowPublish(false)} />}
      {showVercel && <VercelDeployModal html={html} title={title} onClose={() => setShowVercel(false)} />}
    </div>
  );
}
