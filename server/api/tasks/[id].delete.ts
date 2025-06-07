import { eq } from 'drizzle-orm'
import { tasksTable } from '~/server/database/schema'

export default eventHandler(async (event) => {
	const db = event.context.db
	const { id } = getRouterParams(event)

	const deletedTask = await db.delete(tasksTable).where(eq(tasksTable.id, Number(id))).returning()

	console.log('deletedTask', deletedTask)

	if (deletedTask.length === 0) {
		throw createError({
			statusCode: 404,
			message: 'Task non trovato',
		})
	}
	return deletedTask
})
