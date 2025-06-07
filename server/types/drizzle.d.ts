import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import type * as schema from '~/server/database/schema'

type DbClient = PostgresJsDatabase<typeof schema>

declare module 'h3' {
	interface H3EventContext {
		db: DbClient
	}
}
