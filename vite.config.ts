import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


import dns from 'node:dns'
import path from "node:path"
import { VitePWA } from 'vite-plugin-pwa';

dns.setDefaultResultOrder('verbatim')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // atualiza automaticamente
      includeAssets: ['ios/192.png', 'robots.txt', 'ios/192.png'],
      manifest: {
        name: 'MEDx',
        short_name: 'MEDx',
        description: 'Carteira digital MEDx',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/ios/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/ios/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
  
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    open: true,
    allowedHosts: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*', 
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      overlay: true,
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  base: '/',
})