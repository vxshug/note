export default defineNuxtConfig({
  ssr: true,
  extends: '@nuxt-themes/docus',
  devtools: { enabled: true },
  modules: [
    // Remove it if you don't use Plausible analytics
    // https://github.com/nuxt-modules/plausible
    '@nuxtjs/plausible'
  ]
})
