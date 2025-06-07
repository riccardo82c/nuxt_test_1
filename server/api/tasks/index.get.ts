export default defineEventHandler(async (event) => {
	console.log('server get task')
	const db = event.context.db

	const tasks = await db.query.tasksTable.findMany({
		orderBy: (tasks, { asc }) => [asc(tasks.id)],
	})

	// Aggiungo una pausa di 3 secondi per test
	// await new Promise(resolve => setTimeout(resolve, 3000))

	return tasks
})
