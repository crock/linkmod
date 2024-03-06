import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'LinkMod',
        short_name: 'LinkMod',
        start_url: '.',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#3b82f6',
        description: 'Paste some text or HTML to extract a list of clickable links.',
        icons: [
          {
            src: '/LinkExtractor-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
