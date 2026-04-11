/**
 * Simple in-memory rate limiter.
 *
 * Tracks requests per IP address using a sliding window.
 * Suitable for serverless/edge functions where a single process
 * handles many requests; for multi-instance deployments use
 * a shared store (Redis / Upstash) instead.
 */

interface Entry {
  count:   number;
  resetAt: number;
}

const store = new Map<string, Entry>();

// Prune stale entries every 5 minutes to avoid unbounded growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    store.forEach((entry, key) => {
      if (now > entry.resetAt) store.delete(key);
    });
  }, 300_000);
}

/**
 * @param ip        Client IP address (used as the rate-limit key)
 * @param limit     Max requests allowed in the window (default 5)
 * @param windowMs  Window duration in ms (default 60 s)
 * @returns `{ success, remaining, resetAt }`
 */
export function rateLimit(
  ip:       string,
  limit    = 5,
  windowMs = 60_000,
): { success: boolean; remaining: number; resetAt: number } {
  const now   = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(ip, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
