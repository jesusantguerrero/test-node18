import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  rollupOptions: {
    output: {
      minifyInternalExports: false,
    },
    // https://rollupjs.org/guide/en/#big-list-of-options
  },
  base: '/react',
  build: {
    outDir: '../../dist/react'
  },
  test: {
    global: true,
    environment: 'happy-dom'
  }
})
