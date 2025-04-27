const CACHE_NAME = 'bcn-latina-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/img/logo.png',
  '/img/whatsapp-icon.png',
  '/img/instagram-icon.png',
  '/img/facebook-icon.png',
  '/img/tiktok-icon.png',
  '/img/youtube-icon.png',
  '/video/video.mp4'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
