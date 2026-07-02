/* 로랑 9피드 가이드 — 오프라인 캐시 */
const CACHE = 'nuadi-9feed-v25';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './edu-2.jpg',
  './edu-3.jpg',
  './edu-5.jpg',
  './edu-6.jpg',
  './edu-8.jpg',
  './edu-12.jpg',
  './edu-13.jpg',
  './edu-15.jpg',
  './edu-16.jpg',
  './edu-17.jpg',
  './edu-18.jpg',
  './edu-19.jpg',
  './edu-21.jpg',
  './edu-22.jpg',
  './edu-23.jpg',
  './edu-25.jpg',
  './edu-27.jpg',
  './edu-28.jpg',
  './edu-29.jpg',
  './edu-30.jpg',
  './edu-31.jpg',
  './edu-32.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
