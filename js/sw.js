var cacheName = 'kebabtv';
var filesToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/skin/css/main.css',
  '/public'
];

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request, {ignoreSearch:true}).then(response => {
      return response || fetch(e.request);
    })
  );
});