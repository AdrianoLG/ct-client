// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    configPath: 'tailwind.config.js',
    cssPath: '~/src/assets/css/tailwind.css'
  },
  dir: {
    pages: 'src/pages',
    layouts: 'src/layouts'
  }
})
