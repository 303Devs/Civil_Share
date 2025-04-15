import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
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
        maximumFileSizeToCacheInBytes: 5000000,
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
        ],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     if (id.includes('thirdweb')) return 'thirdweb';
        //     if (id.includes('react-dom')) return 'react-dom';
        //   }
        // },
      },
    },
  },
});
