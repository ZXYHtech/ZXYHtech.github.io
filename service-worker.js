const CACHE = 'zya-smart-manual-v1.29.7';
const BASE = new URL('./', self.registration.scope);
const SHELL = [
  '', 'styles.css?v=1.24.0', 'admin.css?v=1.24.0', 'admin-operations.css?v=1.29.7',
  'analytics.css?v=1.24.0', 'review.css?v=1.24.0', 'platform.css?v=1.24.0',
  'themes.css?v=1.24.0', 'tutorial.css?v=1.24.0', 'downloads.css?v=1.24.0',
  'orders.css?v=1.24.0', 'selector.css?v=1.24.0', 'roles.css?v=1.24.0',
  'products.css?v=1.24.0', 'support.css?v=1.24.0', 'checkout.css?v=1.24.0',
  'attenuator.css?v=1.24.0', 'viewer.css?v=1.24.0', 'zye660.css?v=1.24.0',
  'hybrid.css?v=1.29.1', 'web-serial.css?v=1.24.0', 'runtime-config.js?v=1.29.0',
  'web-serial.js?v=1.29.0', 'app.js?v=1.29.7',
  'zya1000-console.html?v=1.29.7', 'zya1000-console.css?v=1.29.1', 'zya1000-console.js?v=1.29.7',
  'assets/products/zye660-cutout-v1.png?v=1.7.5', 'assets/products/zyc100-cutout-v3.png?v=1.16.2',
  'legacy/assets/zya1000-screenshots/zya1000-start-cutout-v1.png',
  'legacy/assets/zya1000-screenshots/zya1000-device-control-cutout-v1.png',
  'legacy/assets/zya1000-screenshots/zya1000-multi-device-sync-cutout-v1.png',
  'legacy/assets/zya1000-screenshots/zya1000-auto-timeline-vars-cutout-v1.png',
  'legacy/assets/zxyh-logo-cutout-v1.png', 'manifest.webmanifest?v=1.24.0', 'icon.svg'
].map(path => new URL(path, BASE).href);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

async function networkFirst(request, fallback) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(request)) || (fallback && await cache.match(fallback)) || Response.error();
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin || !url.href.startsWith(BASE.href)) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request, BASE.href));
    return;
  }
  if (url.pathname.includes('/api/')) {
    const publicCatalogApi=/\/api\/(?:categories|products(?:\/[^/]+)?|tutorials|documents|resources)(?:\/|$)/.test(url.pathname);
    if(publicCatalogApi)event.respondWith(networkFirst(event.request));
    return;
  }
  if (url.pathname.includes('/uploads/')) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
