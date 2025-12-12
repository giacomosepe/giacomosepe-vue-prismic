import { repositoryName, apiEndpoint } from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	app: {
		head: {
			title: "Prismic + Nuxt Minimal Starter",
			htmlAttrs: { lang: "en" },
			charset: "utf-8",
			meta: [
				{ name: "description", content: "Default site description" },
				// Open Graph
				{ property: "og:type", content: "website" },
				{ property: "og:site_name", content: "Your Name" },
				// Twitter
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:site", content: "@yourhandle" },
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},

	css: ["~/assets/css/main.css"],

	modules: ["@nuxt/eslint", "@nuxtjs/i18n", "@nuxtjs/prismic"],

	runtimeConfig: {
		public: {
			gtmId: process.env.NUXT_PUBLIC_GTM_ID || " ",
		},
	},

	i18n: {
		locales: [
			{
				code: "en",
				iso: "en-US",
				name: "English",
			},
			{
				code: "it",
				iso: "it-IT",
				name: "Italiano",
			},
		],
		defaultLocale: "en",
		strategy: "prefix_except_default",
		detectBrowserLanguage: false,
	},

	prismic: {
		endpoint: apiEndpoint || `https://${repositoryName}.prismic.io/api/v2`,
		preview: "/api/preview",
		clientConfig: {
			routes: [
				{
					type: "page",
					path: "/:uid",
					lang: "en-us",
				},
				{
					type: "page",
					path: "/it/:uid",
					lang: "it-it",
				},
				{
					type: "home",
					path: "/",
					lang: "en-us",
				},
				{
					type: "home",
					path: "/it",
					lang: "it-it",
				},
			],
		},
	},

	compatibilityDate: "2025-07-16",
});
