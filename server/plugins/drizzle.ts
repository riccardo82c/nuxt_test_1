import { db } from '~/server/database/client'

export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook('request', (event) => {
		event.context.db = db
	})
})
