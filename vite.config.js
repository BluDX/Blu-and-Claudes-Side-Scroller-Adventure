import { defineConfig } from 'vite';

export default defineConfig({
  base: '/blu-claude-side-scroller-adventure/',
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
