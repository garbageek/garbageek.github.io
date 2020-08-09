// Service Worker

const CACHE_NAME = "mycmdline"

const PRECACHE_URLS = [
    "/",
    "/css/custom.css",
    "/img/android-chrome-192x192.png",
    "/img/avatar.png",
    "/img/favicon.ico",
    "/manifest.json",
    "custom.js"
];

self.addEventListener('install', function (e) {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(PRECACHE_URLS);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
