import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Nbbang',
        short_name: 'Nbbang',
        description: '빠른 정산, 원클릭 송금',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: 'images/nbbang.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/nbbang.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }
    })
  ]
});