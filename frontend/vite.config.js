import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      // /config lives one level above /frontend (shared with /backend) —
      // allow the dev server to read clinic.config.json from there.
      allow: ['..'],
    },
  },
});
