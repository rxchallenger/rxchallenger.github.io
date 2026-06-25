/* Rx Challenger — Service Worker
   Network-first for navigations & assets; cache-first for static assets.
   ========================================================== */

const PRECACHE = 'rx-precache-v1';
const RUNTIME = 'rx-runtime-v1';

const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/assets/css/critical.css',
  '/assets/css/design-system.css',
  '/assets/js/app.js',
  '/manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(PRECACHE).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    }).catch(function () {}).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) {
          return k !== PRECACHE && k !== RUNTIME;
        }).map(function (k) {
          return caches.delete(k);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;

  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(RUNTIME).then(function (cache) { cache.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || caches.match('/offline.html');
        });
      })
    );
    return;
  }

  var url = new URL(req.url);

  if (PRECACHE_URLS.indexOf(url.pathname) !== -1) {
    event.respondWith(
      caches.match(req).then(function (cached) {
        return cached || fetch(req).then(function (res) {
          var copy = res.clone();
          caches.open(PRECACHE).then(function (cache) { cache.put(req, copy); });
          return res;
        });
      })
    );
    return;
  }

  if (req.destination === 'image' || /\.(png|jpg|jpeg|gif|webp|svg|ico)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(function (cached) {
        if (cached) return cached;
        return fetch(req).then(function (res) {
          if (res && res.status === 200 && res.type.startsWith')) {
            var copy = res.clone();
            caches.open(RUNTIME).then(function (cache) { cache.put(req, copy); });
          }
          return res;
        }).catch(function () {
          return new Response('', { status: 204 });
        });
      })
    );
    return;
  }

  if (req.destination === 'style' || req.destination === 'script' || /\.css$|\.js$/.test(url.pathname)) {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(RUNTIME).then(function (cache) { cache.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req);
      })
    );
    return;
  }

  if (url.hostname.indexOf('fonts.googleapis.com') !== -1 || url.hostname.indexOf('fonts.gstatic.com') !== -1) {
    event.respondWith(
      caches.match(req).then(function (cached) {
        if (cached) return cached;
        return fetch(req).then(function (res) {
          if (res && res.status === 200) {
            var copy = res.clone();
            caches.open(RUNTIME).then(function (cache) { cache.put(req, copy); });
          }
          return res;
        }).catch(function () { return caches.match(req); });
      })
    );
    return;
  }

  event.respondWith(
    fetch(req).then(function (res) {
      return res;
    }).catch(function () {
      return caches.match(req);
    })
  );
});
