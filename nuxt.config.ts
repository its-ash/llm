export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2026-08-29',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  experimental: { payloadExtraction: false },
  nitro: { experimental: { wasm: false } },
  features: { inlineStyles: false },
  app: {
    baseURL: '/llm/',
    head: {
      title: 'LLM Learning Hub',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Interactive learning hub for Large Language Model concepts — from tokenization to inference.' }
      ],
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/llm/favicon.svg' }
      ]
    }
  }
});