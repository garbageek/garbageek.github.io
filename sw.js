/** An empty service worker! */
// self.addEventListener('fetch', function (event) {
// });

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    showInstallPromotion();
});

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('mycmdline').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/avatar.png',
                '/custom.css'
            ]);
        })
    );
});
