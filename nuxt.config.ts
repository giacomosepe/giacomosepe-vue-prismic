import { repositoryName, apiEndpoint } from './slicemachine.config.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Prismic + Nuxt Minimal Starter',
      htmlAttrs: { lang: 'en' },
      meta: [{ charset: 'utf-8' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/prismic'],

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English'
      },
      {
        code: 'it',
        iso: 'it-IT',
        name: 'Italiano'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  },

  prismic: {
    endpoint: apiEndpoint || `https://${repositoryName}.prismic.io/api/v2`,
    preview: '/api/preview',
    clientConfig: {
      routes: [
        {
          type: 'page',
          path: '/:uid',
          lang: 'en-us'
        },
        {
          type: 'page',
          path: '/it/:uid',
          lang: 'it-it'
        },
        {
          type: 'home',
          path: '/',
          lang: 'en-us'
        },
        {
          type: 'home',
          path: '/it',
          lang: 'it-it'
        },
      ]
    }
  },

  compatibilityDate: '2025-07-16',
})