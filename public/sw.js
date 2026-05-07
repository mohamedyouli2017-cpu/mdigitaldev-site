/**
 * MDigitalDev Service Worker v2
 * ─────────────────────────────────────────────────────────────────
 * Strategy:
 *   • Navigation (HTML pages)  → network-first, fallback to cached "/"
 *   • /_next/ chunks/static    → network-only (content-hashed in prod,
 *                                 stable names in dev — never cache stale)
 *   • Other static assets      → cache-first (icons, manifest, images)
 *
 * IMPORTANT: Bump CACHE version on every deploy so the activate handler
 * deletes the previous cache and clients pick up fresh assets.
 */

const CACHE = "mdigitaldev-v2";

const PRECACHE = [
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

/* ── Activate: remove ALL previous caches ── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── Fetch ── */
self.addEventListener("fetch", (event) => {
  const { request } = event;

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

  // Next.js chunks & static assets → always network (content-hashed in prod,
  // but stable names in dev — caching them causes hydration mismatches)
  if (url.pathname.startsWith("/_next/")) {
    event.respondWith(fetch(request));
    return;
  }

  // Everything else (icons, manifest, images) → cache-first
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok && url.origin === self.location.origin) {
            caches.open(CACHE).then((c) => c.put(request, response.clone()));
          }
          return response;
        })
    )
  );
});
