
const CACHE_NAME = 'nashe-bloom-v1';

const APP_FILES = [
  '/Nashe-Bloom/',
  '/Nashe-Bloom/index.html',
  '/Nashe-Bloom/manifest.webmanifest',
  '/Nashe-Bloom/colibri-transparente-192.png',
  '/Nashe-Bloom/colibri-transparente-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response =>
        response || caches.match('/Nashe-Bloom/')
      )
    )
  );
});

