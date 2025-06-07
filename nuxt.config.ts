// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/eslint'],
	devtools: { enabled: true },
	css: ['@picocss/pico'],
	compatibilityDate: '2025-04-27',
	nitro: {
		experimental: {
			tasks: true,
		},
	},

	eslint: {
		config: {
			stylistic: {
				semi: false,
				quotes: 'single',
				commaDangle: 'always-multiline',
				indent: 'tab',
			},
		},
	},
})
