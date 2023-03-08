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
        name: 'LinkExtractor',
        short_name: 'LinkExtractor',
        start_url: '.',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#3b82f6',
        description: 'Paste some text to extract a list of clickable links.',
      },
    }),
  ],
});
