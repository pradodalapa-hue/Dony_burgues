const CACHE_NAME = 'jdp-core-DONY_BURGUER_S_MAGNIFICO6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  './icon-192.png',
  './icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => {
        if(k !== CACHE_NAME) return caches.delete(k);
      })
    ))
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => {
        if(e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
