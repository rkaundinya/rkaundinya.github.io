/**
 * Service Worker for Performance Optimization
 * Implements intelligent caching strategies for better navigation performance
 */

const CACHE_NAME = "music-page-v1";
const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";

// Resources to cache immediately
const STATIC_RESOURCES = [
  "/assets/css/bootstrap.min.css",
  "/assets/css/main.css",
  "/assets/js/bootstrap.bundle.min.js",
  "/assets/js/common.js",
  "/assets/js/performance-optimizer.js",
];

// Pages to cache for instant navigation
const PAGES_TO_CACHE = ["/about/", "/publications/", "/cv/", "/repositories/", "/music/", "/news/", "/teaching/"];

// Install event - cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Caching static resources");
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log("Static resources cached");
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service worker activated");
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Handle different types of requests
  if (url.pathname.endsWith(".html") || url.pathname.endsWith("/")) {
    // HTML pages - cache first, then network
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else if (url.pathname.includes("/assets/")) {
    // Static assets - cache first
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.includes("youtube.com") || url.pathname.includes("spotify.com")) {
    // External embeds - network only
    event.respondWith(networkOnly(request));
  } else {
    // Other resources - network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache first strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log("Network request failed:", error);
    return new Response("Network error", { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log("Network request failed, trying cache:", error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response("Not available offline", { status: 503 });
  }
}

// Network only strategy
async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.log("Network request failed:", error);
    return new Response("Network error", { status: 503 });
  }
}

// Background sync for preloading pages
self.addEventListener("sync", (event) => {
  if (event.tag === "preload-pages") {
    event.waitUntil(preloadPages());
  }
});

// Preload important pages in background
async function preloadPages() {
  const cache = await caches.open(DYNAMIC_CACHE);

  for (const page of PAGES_TO_CACHE) {
    try {
      const response = await fetch(page);
      if (response.ok) {
        await cache.put(page, response);
        console.log("Preloaded page:", page);
      }
    } catch (error) {
      console.log("Failed to preload page:", page, error);
    }
  }
}

// Message handling for communication with main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "PRELOAD_PAGE") {
    event.waitUntil(preloadSpecificPage(event.data.url));
  }
});

// Preload a specific page
async function preloadSpecificPage(url) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response);
      console.log("Preloaded specific page:", url);
    }
  } catch (error) {
    console.log("Failed to preload specific page:", url, error);
  }
}
