import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Civil Share',
        short_name: 'Civil',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // 5MB for large files like vendor bundles
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/1\.rpc\.thirdweb\.com\/0f1e755fd9241c8b0d091a6abf5b019e$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'thirdweb-read-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          {
            urlPattern: ({ request, url }) =>
              request.mode === 'navigate' &&
              !url.pathname.startsWith('/_') &&
              !url.pathname.match(
                /\.(js|css|ts|tsx|png|jpg|jpeg|svg|webp|json)$/
              ),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: /^\/assets\/.*\.(js|css)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /\/ipfs\/.*\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'ipfs-json-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 10,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Optional: raise the warning limit if needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const dirs = id.toString().split('node_modules/')[1].split('/');
            // Handles both scoped and unscoped packages
            return dirs[0].startsWith('@') ? `${dirs[0]}/${dirs[1]}` : dirs[0];
          }
        },
      },
    },
  },
});
