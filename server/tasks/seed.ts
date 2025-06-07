import { db } from '~/server/database/client'
import { tasksTable } from '~/server/database/schema'

export default defineTask({
	meta: {
		name: 'db:seed',
		description: 'Popola il database con dati iniziali',
	},
	async run() {
		console.log('🌱 Eseguo il seed del database...')

		const initialTasks = [
			{
				title: 'Imparare Nuxt e Drizzle',
				done: true,
			},
			{
				title: 'Comprare il latte',
				done: false,
			},
			{
				title: 'Lanciare il task di seed',
			},
		]

		await db.insert(tasksTable).values(initialTasks)

		console.log('✅ Seed completato!')
		return { result: 'success' }
	},
})
