import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // when it's hit anything with "/api" it will hit 5000 port not else.
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    port: 3000,
      open: true,
  }})
