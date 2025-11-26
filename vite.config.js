import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Blu-and-Claudes-Side-Scroller-Adventure/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser']
        }
      }
    }
  },
  server: {
    port: 8080
  }
});
