export default defineEventHandler(() => {
	/* return array of taasks */
	return [
		{
			id: 1,
			title: 'Learn Nuxt 3',
			done: false,
		},
		{
			id: 2,
			title: 'Learn Vue 3',
			done: true,
		},
	]
})
