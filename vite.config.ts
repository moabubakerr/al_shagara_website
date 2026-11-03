import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Bind to IPv4 explicitly: on Windows "localhost" can resolve to IPv6 (::1) only,
  // which some browsers/proxies never reach.
  server: { host: '127.0.0.1', port: 5173 },
  preview: { host: '127.0.0.1', port: 4173 },
});
