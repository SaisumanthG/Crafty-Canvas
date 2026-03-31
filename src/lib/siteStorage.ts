import { v4 } from './utils';

export interface SitePage {
  name: string;
  components: any[];
}

export interface Website {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  components_json: string;
  pages_json: string; // JSON array of SitePage[]
  global_styles_json: string;
  is_published: boolean;
  published_html: string;
  published_at: string;
  created_date: string;
  updated_date: string;
}

const DB_NAME = 'webcraft_db';
const DB_VERSION = 1;
const STORE_NAME = 'sites';

// In-memory cache for sync reads
let memoryCache: Website[] | null = null;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadAllFromDB(): Promise<Website[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

async function saveToDB(site: Website): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(site);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch { /* fail silently */ }
}

async function deleteFromDB(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch { /* fail silently */ }
}

// Migrate from localStorage on first load
async function migrateFromLocalStorage(): Promise<void> {
  const raw = localStorage.getItem('webcraft_sites');
  if (!raw) return;
  try {
    const sites: Website[] = JSON.parse(raw);
    for (const site of sites) {
      if (!site.pages_json) site.pages_json = '[]';
      await saveToDB(site);
    }
    localStorage.removeItem('webcraft_sites');
  } catch { /* ignore */ }
}

// Initialize cache
let initPromise: Promise<void> | null = null;
export function initStorage(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      await migrateFromLocalStorage();
      memoryCache = await loadAllFromDB();
    })();
  }
  return initPromise;
}

function getCache(): Website[] {
  return memoryCache || [];
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

export function serializePages(pages: SitePage[]): string {
  return JSON.stringify(pages);
}

export function deserializePages(json: string): SitePage[] {
  try { return JSON.parse(json) || []; } catch { return []; }
}

export function getAllSites(): Website[] {
  return getCache().sort((a, b) => new Date(b.updated_date).getTime() - new Date(a.updated_date).getTime());
}

export function getSiteById(id: string): Website | undefined {
  return getCache().find(s => s.id === id);
}

export function createSite(data: Partial<Website>): Website {
  const now = new Date().toISOString();
  const site: Website = {
    id: v4(),
    title: data.title || 'Untitled Site',
    slug: generateSlug(data.title || 'untitled'),
    description: data.description || '',
    category: data.category || 'saas',
    components_json: data.components_json || '[]',
    pages_json: data.pages_json || '[]',
    global_styles_json: data.global_styles_json || '{}',
    is_published: false,
    published_html: '',
    published_at: '',
    created_date: now,
    updated_date: now,
  };
  const cache = getCache();
  cache.push(site);
  memoryCache = cache;
  saveToDB(site);
  return site;
}

export function updateSite(id: string, data: Partial<Website>): Website | null {
  const cache = getCache();
  const idx = cache.findIndex(s => s.id === id);
  if (idx === -1) return null;
  cache[idx] = { ...cache[idx], ...data, updated_date: new Date().toISOString() };
  if (data.title && !data.slug) cache[idx].slug = generateSlug(data.title);
  memoryCache = cache;
  saveToDB(cache[idx]);
  return cache[idx];
}

export function deleteSite(id: string): boolean {
  const cache = getCache();
  const filtered = cache.filter(s => s.id !== id);
  if (filtered.length === cache.length) return false;
  memoryCache = filtered;
  deleteFromDB(id);
  return true;
}

export function publishSite(id: string, html: string): Website | null {
  return updateSite(id, {
    is_published: true,
    published_html: html,
    published_at: new Date().toISOString(),
  });
}
