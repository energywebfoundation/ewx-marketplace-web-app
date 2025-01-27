import { join, resolve } from 'path';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: '.',
  base: './',
  publicDir: '../../resources/web',
  build: {
    outDir: '../../out/vite/web/ui',
    sourcemap: true,
    rollupOptions: {
      external: ['keytar', 'fs/promises', 'fs', 'child_process', 'stream', /node:/],
    },
  },
  server: {
    port: 4000,
    fs: {
      allow: [searchForWorkspaceRoot(join(process.cwd(), '..', '..'))],
    },
  },
  preview: {
    port: 4001,
  },
  resolve: {
    alias: {
      '@main': resolve('../main'),
      '@ewf/components': resolve('../renderer/src/components'),
      '@ewf/styles': resolve('../renderer/src/styles'),
      '@ewf/stores': resolve('../renderer/src/stores'),
      '@ewf/utils': resolve('../renderer/src/utils'),
      '@ewf/assets': resolve('../renderer/src/assets'),
      '@ewf/pages': resolve('../renderer/src/pages'),
      '@ewf/lib': resolve('../renderer/src/lib'),
      '@ewf/main': resolve('../renderer/src/main'),
      '@ewf/types': resolve('../types'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        'assets/ewx-logo.png',
        'assets/ewx-logo-512.png',
        'assets/ewx-logo-256.png',
        'assets/screenshot-desktop.png',
        'assets/screenshot-mobile.png',
      ],
      registerType: 'prompt',
      manifest: {
        name: 'EnergyWeb Marketplace',
        short_name: 'EWX Marketplace',
        description:
          'The EWX Marketplace, a decentralized desktop application (dApp), serves as a comprehensive gateway to the dynamic EWX ecosystem. Our platform is designed to facilitate seamless interactions within the EWX.',
        theme_color: '#262429',
        background_color: '#262429',
        display: 'standalone',
        icons: [
          {
            src: '/assets/ewx-logo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/assets/ewx-logo-256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        screenshots: [
          {
            src: '/assets/screenshot-desktop.png',
            sizes: '1440x852',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/assets/screenshot-mobile.png',
            sizes: '755x755',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
});
