import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'

export const tasksTable = pgTable('tasks', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	done: boolean('done').default(false).notNull(),
})

export type Task = InferSelectModel<typeof tasksTable>

export const insertTaskSchema = createInsertSchema(tasksTable, {
	title: baseSchema =>
		baseSchema
			.min(4, { message: 'Il titolo deve essere lungo almeno 4 caratteri' })
			.max(50, { message: 'Il titolo non può superare i 50 caratteri' }),
})

// Creiamo lo schema base e poi lo modifichiamo
export const updateTaskSchema = createUpdateSchema(tasksTable).refine(
	data => 'done' in data,
	{
		message: 'Il campo done è obbligatorio',
		path: ['done'],
	},
)

const task = {
	done: '',
}
const parsed = updateTaskSchema.safeParse(task)

if (parsed.success) {
	console.log('Valido!')
} else {
	console.log('Non valido!', parsed)
	parsed.error.issues.forEach((issue) => {
		console.log(issue.message)
	})
}

/* check safeParse */
// const task = {
// 	done: true,
// 	title: '',
// }

// const parsed = insertTaskSchema.safeParse(task)

// if (parsed.success) {
// 	console.log('Valido!')
// } else {
// 	console.log('Non valido!')
// 	parsed.error.issues.forEach((issue) => {
// 		console.log(issue.message)
// 	})
// }
