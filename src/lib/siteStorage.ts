import { v4 } from './utils';

export interface Website {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  components_json: string;
  global_styles_json: string;
  is_published: boolean;
  published_html: string;
  published_at: string;
  created_date: string;
  updated_date: string;
}

const STORAGE_KEY = 'webcraft_sites';

function getAll(): Website[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function saveAll(sites: Website[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
}

export function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'untitled';
}

export function serializeComponents(components: any[]): string {
  return JSON.stringify(components);
}

export function deserializeComponents(json: string): any[] {
  try { return JSON.parse(json) || []; } catch { return []; }
}

export function getAllSites(): Website[] {
  return getAll().sort((a, b) => new Date(b.updated_date).getTime() - new Date(a.updated_date).getTime());
}

export function getSiteById(id: string): Website | undefined {
  return getAll().find(s => s.id === id);
}

export function createSite(data: Partial<Website>): Website {
  const sites = getAll();
  const now = new Date().toISOString();
  const site: Website = {
    id: v4(),
    title: data.title || 'Untitled Site',
    slug: generateSlug(data.title || 'untitled'),
    description: data.description || '',
    category: data.category || 'saas',
    components_json: data.components_json || '[]',
    global_styles_json: data.global_styles_json || '{}',
    is_published: false,
    published_html: '',
    published_at: '',
    created_date: now,
    updated_date: now,
  };
  sites.push(site);
  saveAll(sites);
  return site;
}

export function updateSite(id: string, data: Partial<Website>): Website | null {
  const sites = getAll();
  const idx = sites.findIndex(s => s.id === id);
  if (idx === -1) return null;
  sites[idx] = { ...sites[idx], ...data, updated_date: new Date().toISOString() };
  if (data.title && !data.slug) sites[idx].slug = generateSlug(data.title);
  saveAll(sites);
  return sites[idx];
}

export function deleteSite(id: string): boolean {
  const sites = getAll();
  const filtered = sites.filter(s => s.id !== id);
  if (filtered.length === sites.length) return false;
  saveAll(filtered);
  return true;
}

export function publishSite(id: string, html: string): Website | null {
  return updateSite(id, {
    is_published: true,
    published_html: html,
    published_at: new Date().toISOString(),
  });
}
