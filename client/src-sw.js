const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Route resgister for style, script, and worker requests
registerRoute(
  // Validate if the request destination is an allowed value
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  // Use the Stale-While-Revalidate strategy for caching and fetching
  new StaleWhileRevalidate({
    // Set a name for the cache
   cacheName: 'asset-cache', 
   plugins: [
  // Add a plugin to ensure only certain response statuses are cached
      new CacheableResponsePlugin({
  // Only cache responses with a status code of 0 or 200  
        statuses: [0, 200], 
      }),
    ],
  })
);