// Al Tanzeel Quran Academy Service Worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle Notification Click: Focus existing dashboard or open it
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

// Background Web Push Event (Wakes device & displays alert when app/browser is completely CLOSED)
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "🔔 Al Tanzeel Quran Academy", body: event.data.text() };
    }
  }

  const title = data.title || "🔔 New Registration Received!";
  const options = {
    body: data.body || "New student trial registration received.",
    icon: data.icon || "/admin-icon-192.png",
    badge: "/admin-icon-192.png",
    tag: data.tag || `trial-reg-${Date.now()}`,
    vibrate: data.vibrate || [500, 200, 500, 200, 500],
    requireInteraction: true,
    renotify: true,
    data: data.data || { url: "/admin/dashboard" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

