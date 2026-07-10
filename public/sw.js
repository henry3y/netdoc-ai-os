const CACHE_NAME = "netdoc-ai-os-v2";
// Derive the base path from this script's own location so caching works
// whether the app is hosted at the domain root or under a subpath
// (e.g. GitHub Pages project sites: username.github.io/repo-name/).
const SCOPE = new URL(self.registration ? self.registration.scope : self.location.href).pathname;
const SHELL_ASSETS = [SCOPE, `${SCOPE}manifest.json`.replace(/\/{2,}/g, "/")];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for navigation, cache-first fallback for offline resilience.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(SCOPE)))
  );
});
