import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    middlewareMode: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_KEY': JSON.stringify(process.env.VITE_SUPABASE_KEY),
    'import.meta.env.VITE_APP_PASSWORD': JSON.stringify(process.env.VITE_APP_PASSWORD),
  },
})
