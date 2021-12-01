import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteImages from 'vite-plugin-vue-images'

export default defineConfig({
  plugins: [
    vue(),
    ViteImages({
      dirs: ['src/assets/images'],
      extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    })
  ]
})
