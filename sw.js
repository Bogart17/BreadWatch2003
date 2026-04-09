const CACHE_NAME = 'breadwatch-v2';
const ASSETS = [
  '/BreadWatch2003/',
  '/BreadWatch2003/index.html',
  '/BreadWatch2003/manifest.json',
  '/BreadWatch2003/owner-login.html',
  '/BreadWatch2003/dashboard.html',
  '/BreadWatch2003/admin.html',
  '/BreadWatch2003/sw.js',
  '/BreadWatch2003/icon-192.png',
  '/BreadWatch2003/icon-512.png',
  '/BreadWatch2003/favicon.ico',
  '/BreadWatch2003/favicon-16x16.png',
  '/BreadWatch2003/favicon-32x32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
