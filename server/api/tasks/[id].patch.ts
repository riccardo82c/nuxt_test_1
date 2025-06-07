import { eq } from 'drizzle-orm'
import { updateTaskSchema, tasksTable } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
	const db = event.context.db
	const body = await readBody(event)

	const { id } = getRouterParams(event)
	const { done } = await readBody(event)

	const validation = updateTaskSchema.safeParse(body)

	if (!validation.success) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Input non valido',
			data: validation.error.issues,
		})
	}

	const task = await db.update(tasksTable).set({
		done,
	}).where(eq(tasksTable.id, Number(id))).returning()

	return task
})
