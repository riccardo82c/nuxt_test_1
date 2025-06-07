import { tasksTable } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
	const db = event.context.db

	const body = await readBody(event)

	if (
		!body.title
		|| typeof body.title !== 'string'
		|| body.title.trim() === ''
	) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Il titolo è obbligatorio e non può essere vuoto',
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
	}
	catch (error) {
		console.log(error)

		throw createError({
			statusCode: 500,
			statusMessage: 'Impossibile creare il task nel database',
		})
	}
})
