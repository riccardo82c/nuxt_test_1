import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core'
import type { InferSelectModel } from 'drizzle-orm'

export const tasksTable = pgTable('tasks', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	done: boolean('done').default(false).notNull(),
})

export type Task = InferSelectModel<typeof tasksTable>
