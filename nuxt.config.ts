/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3000'
    }
  },
  tailwindcss: {
    configPath: 'tailwind.config.js',
    cssPath: '~/src/assets/css/tailwind.css'
  },
  dir: {
    pages: 'src/pages',
    layouts: 'src/layouts'
  }
})
