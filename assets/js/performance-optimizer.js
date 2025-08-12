/**
 * Performance Optimizer for Music Page
 * Implements various performance optimizations to improve page load and navigation speed
 */

class PerformanceOptimizer {
  constructor() {
    this.isMusicPage = window.location.pathname.includes("/music/");
    this.preloadedResources = new Set();
    this.init();
  }

  init() {
    if (this.isMusicPage) {
      this.optimizeMusicPage();
    }

    // Always optimize navigation
    this.optimizeNavigation();
    this.setupPerformanceMonitoring();

    // Register service worker for caching
    this.registerServiceWorker();
  }

  optimizeMusicPage() {
    // Preload critical resources
    this.preloadCriticalResources();

    // Optimize thumbnail loading
    this.optimizeThumbnailLoading();

    // Implement connection-aware loading
    this.connectionAwareLoading();
  }

  preloadCriticalResources() {
    // Preload next likely page resources
    const nextPages = ["/about/", "/publications/", "/cv/", "/repositories/"];

    nextPages.forEach((page) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = page;
      document.head.appendChild(link);
    });

    // Preload critical fonts and CSS
    const criticalResources = ["/assets/css/bootstrap.min.css", "/assets/css/main.css", "/assets/js/bootstrap.bundle.min.js"];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource;
      link.as = resource.includes(".css") ? "style" : "script";
      document.head.appendChild(link);
    });
  }

  optimizeThumbnailLoading() {
    // Implement smarter thumbnail loading strategy
    if ("IntersectionObserver" in window) {
      const thumbnailObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const thumbnail = entry.target;
              // Preload high-quality thumbnail when in viewport
              if (thumbnail.src.includes("mqdefault.jpg")) {
                const highQualitySrc = thumbnail.src.replace("mqdefault.jpg", "hqdefault.jpg");
                thumbnail.src = highQualitySrc;
              }
            }
          });
        },
        {
          rootMargin: "100px 0px", // Start loading 100px before entering viewport
          threshold: 0.1,
        }
      );

      // Observe all thumbnails
      document.querySelectorAll(".video-thumbnail").forEach((thumbnail) => {
        thumbnailObserver.observe(thumbnail);
      });
    }
  }

  connectionAwareLoading() {
    // Adjust loading strategy based on connection quality
    if ("connection" in navigator) {
      const connection = navigator.connection;

      if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
        // Reduce initial batch size for slow connections
        this.adjustBatchSize(3);
      } else if (connection.effectiveType === "3g") {
        this.adjustBatchSize(4);
      } else {
        this.adjustBatchSize(6);
      }
    }
  }

  adjustBatchSize(size) {
    // Adjust the initial batch size for video loading
    const containers = document.querySelectorAll(".videos-container");
    containers.forEach((container) => {
      const initialContainer = container.querySelector('[id$="-initial"]');
      if (initialContainer) {
        const videos = initialContainer.querySelectorAll(".col");
        videos.forEach((video, index) => {
          if (index >= size) {
            video.style.display = "none";
          }
        });
      }
    });
  }

  optimizeNavigation() {
    // Preload navigation links on hover
    document.addEventListener("mouseover", (e) => {
      const link = e.target.closest("a");
      if (link && link.href && !this.preloadedResources.has(link.href)) {
        this.preloadPage(link.href);
        this.preloadedResources.add(link.href);
      }
    });

    // Implement instant navigation for internal links
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        // Add loading indicator
        this.showNavigationLoading();

        // Prefetch the page content
        this.prefetchPage(link.href);
      }
    });
  }

  preloadPage(url) {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    document.head.appendChild(link);
  }

  prefetchPage(url) {
    // Implement more aggressive prefetching for better navigation performance
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        // Store the HTML for instant navigation
        this.cachePage(url, html);
      })
      .catch((error) => {
        console.log("Prefetch failed:", error);
      });
  }

  cachePage(url, html) {
    // Simple in-memory cache for prefetched pages
    if (!this.pageCache) {
      this.pageCache = new Map();
    }
    this.pageCache.set(url, html);
  }

  showNavigationLoading() {
    // Add a subtle loading indicator
    if (!document.getElementById("nav-loading")) {
      const loading = document.createElement("div");
      loading.id = "nav-loading";
      loading.innerHTML = '<div class="loading-spinner"></div>';
      loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: #007bff;
        z-index: 9999;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      `;

      const spinner = loading.querySelector(".loading-spinner");
      spinner.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, #fff, transparent);
        animation: loading 1s infinite;
      `;

      document.body.appendChild(loading);

      // Animate the loading bar
      setTimeout(() => {
        loading.style.transform = "translateX(0)";
      }, 10);
    }
  }

  setupPerformanceMonitoring() {
    // Monitor and log performance metrics
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0];
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;

          console.log(`Page Load Time: ${loadTime}ms`);
          console.log(`DOM Content Loaded: ${domContentLoaded}ms`);

          // Send to analytics if available
          if (typeof gtag !== "undefined") {
            gtag("event", "timing_complete", {
              name: "load",
              value: Math.round(loadTime),
            });
          }
        }, 0);
      });
    }
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/assets/js/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);

          // Preload important pages in background
          if (registration.sync) {
            registration.sync.register("preload-pages");
          }
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }
}

// Initialize performance optimizer when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new PerformanceOptimizer();
  });
} else {
  new PerformanceOptimizer();
}

// Add CSS for loading animations
const style = document.createElement("style");
style.textContent = `
  @keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .loading-spinner {
    animation: loading 1s infinite;
  }
  
  /* Optimize transitions for better performance */
  * {
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
  }
  
  /* Reduce repaints during animations */
  .card, .video-container, .spotify-embed-container {
    will-change: transform;
  }
`;
document.head.appendChild(style);
