// Clear all caches on activation
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Skip waiting on install
self.addEventListener('install', event => {
    self.skipWaiting();
});

// Bypass cache for all fetch requests
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request, {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
    );
});
