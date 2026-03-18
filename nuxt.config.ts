// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vercel/analytics'],

  // 全域 CSS
  css: ['~/assets/css/main.css'],

  // SEO 全域 Head 設定
  app: {
    head: {
      title: '股東會紀念品查詢 - 找到最划算的股東小禮物',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '查詢台股股東會紀念品、最後買進日、零股資格，輕鬆掌握每一份小禮物！' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap' }
      ]
    }
  }
})
