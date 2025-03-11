const CACHE_NAME = 'raigen3-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/autodetect.html',
  '/avatar.html',
  '/manifest.json',
  'https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?auto=format&fit=crop&w=2000&q=80'
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
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});
