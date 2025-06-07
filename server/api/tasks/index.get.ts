export default defineEventHandler(async (event) => {
	const db = event.context.db

	const tasks = await db.query.tasksTable.findMany({
		orderBy: (tasks, { asc }) => [asc(tasks.id)],
	})

	return tasks
})
