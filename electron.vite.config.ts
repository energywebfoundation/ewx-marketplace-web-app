import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@ewf/types': resolve('src/types'),
        '@main': resolve('src/main'),
      },
    },
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    server: {
      port: 8888,
    },
    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@ewf/components': resolve('src/renderer/src/components'),
        '@ewf/styles': resolve('src/renderer/src/styles'),
        '@ewf/stores': resolve('src/renderer/src/stores'),
        '@ewf/utils': resolve('src/renderer/src/utils'),
        '@ewf/assets': resolve('src/renderer/src/assets'),
        '@ewf/pages': resolve('src/renderer/src/pages'),
        '@ewf/lib': resolve('src/renderer/src/lib'),
        '@ewf/types': resolve('src/types'),
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [react()],
  },
});
