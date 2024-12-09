// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001', // Target the Flask server
        changeOrigin: true, // Adjust the origin header to match the target
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix for compatibility
        configure: (proxy) => {
          // Optional: Add debugging logs for proxy requests
          proxy.on('proxyReq', (proxyReq) => {
            console.log('Proxying request to Flask:', proxyReq.path);
          });
        },
      },
    },
  },
});
