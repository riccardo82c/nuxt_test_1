import { insertTaskSchema, tasksTable } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
	const db = event.context.db

	const body = await readBody(event)

	const validation = insertTaskSchema.safeParse(body)

	if (!validation.success) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Input non valido',
			data: validation.error.issues,
		})
	}

	try {
		const [newTask] = await db
			.insert(tasksTable)
			.values({
				title: body.title,
			})
			.returning()

		return newTask
	} catch (error) {
		console.log(error)

		throw createError({
			statusCode: 500,
			statusMessage: 'Impossibile creare il task nel database',
		})
	}
})
