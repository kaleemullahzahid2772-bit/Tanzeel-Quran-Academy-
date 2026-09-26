const CACHE_NAME = "tanzeel-admin-v1";
const ADMIN_ASSETS = [
  "/admin-manifest.json",
  "/admin-icon-192.png",
  "/admin-icon-512.png"
];

// Install: Cache essential admin PWA assets only
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ADMIN_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up any old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: STRICTLY scoped to /admin routes and admin assets only
// NEVER intercepts or caches public website traffic
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Safety check: Only handle requests within /admin scope or admin icons
  const isAdminPath = url.pathname.startsWith("/admin");
  const isAdminAsset = ADMIN_ASSETS.includes(url.pathname);

  if (!isAdminPath && !isAdminAsset) {
    // Let the browser handle public website requests normally without interception
    return;
  }

  // Network-first strategy for admin pages to ensure real-time registrations data
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful GET responses for admin assets
        if (
          event.request.method === "GET" &&
          networkResponse.status === 200 &&
          isAdminAsset
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // Offline fallback from cache if network is unavailable
        const cached = await caches.match(event.request);
        if (cached) return cached;
        return new Response("Offline - Please check your internet connection.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      })
  );
});

// Notification Click Handler: Focus admin dashboard when tapped
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = (event.notification.data && event.notification.data.url) || "/admin/dashboard";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes("/admin") && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Receive notification trigger from app via postMessage
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, options } = event.data;
    event.waitUntil(self.registration.showNotification(title, options));
  }
});
