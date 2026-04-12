/**
 * MDigitalDev Service Worker
 * ─────────────────────────────────────────────────────────────────
 * Strategy: Cache-first for static assets, network-first for pages.
 * This satisfies Chrome's PWA installability requirement:
 *   • A registered SW with a fetch event handler must be present
 *     before `beforeinstallprompt` will fire.
 */

const CACHE = "mdigitaldev-v1";

const PRECACHE = [
  "/",
  "/manifest.json",
  "/icon.svg",
];

/* ── Install: pre-cache shell assets ── */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE))
  );
  self.skipWaiting();
});

/* ── Activate: remove old caches ── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── Fetch: network-first for navigation, cache-first for assets ── */
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests on the same origin
  if (request.method !== "GET") return;
  if (!request.url.startsWith(self.location.origin)) return;

  const url = new URL(request.url);

  // Navigation requests → network-first, fall back to cached "/"
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/"))
    );
    return;
  }

  // Static assets → cache-first
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          // Only cache successful same-origin responses
          if (
            response.ok &&
            url.origin === self.location.origin &&
            !url.pathname.startsWith("/_next/webpack-hmr")
          ) {
            const clone = response.clone();
            caches.open(CACHE).then((c) => c.put(request, clone));
          }
          return response;
        })
    )
  );
});
