const CACHE_NAME = 'bcn-latina-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/img/logo.png',
  '/img/icon-192x192.png',
  '/img/icon-512x512.png',
  '/img/maskable-icon.png',
  'https://stream.zeno.fm/2kd6wvz7zxhvv'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
