<script lang="ts" setup>
import { FetchError } from 'ofetch'
import type { Task } from '~/server/database/schema'

const feedbackMessage = ref('')
const messageStatus = ref<'success' | 'error' | null>(null)

const { data: tasks, refresh } = useFetch<Task[]>('/api/tasks', {
	lazy: true, /* lazy a true forza il rendering della pagina anche se il rendering non è terminato */
})

async function toggleDone(task: Task) {
	task.done = !task.done

	try {
		await $fetch(`/api/tasks/${task.id}`, {
			method: 'PATCH',
			body: {
				done: task.done,
			},
		})

		messageStatus.value = 'success'
		feedbackMessage.value = 'Task modificato con successo!'
	} catch (e) {
		task.done = !task.done
		messageStatus.value = 'error'

		if (e instanceof FetchError) {
			const zodIssues = e.data?.data
			if (Array.isArray(zodIssues) && zodIssues.length > 0 && zodIssues[0].message) {
				feedbackMessage.value = zodIssues[0].message
			} else {
				feedbackMessage.value = e.data?.message || 'Si è verificato un errore del server.'
			}
		} else {
			feedbackMessage.value = 'Si è verificato un errore imprevisto.'
		}

		console.error(e)
	}
}

async function deleteTask(taskId: number) {
	if (!confirm('Sei sicuro di voler eliminare questo task?')) {
		return
	}
	try {
		await $fetch(`/api/tasks/${taskId}`, {
			method: 'DELETE',
		})
		messageStatus.value = 'success'
		feedbackMessage.value = 'Task eliminato con successo'

		await refresh()
	} catch (e) {
		if (e instanceof FetchError) {
			const zodIssues = e.data?.message
			console.log('zodIssues', zodIssues)
			if (Array.isArray(zodIssues) && zodIssues.length > 0 && zodIssues[0].message) {
				console.log(1)
				feedbackMessage.value = zodIssues[0].message
			} else {
				console.log(2)
				feedbackMessage.value = e.data?.message || 'Si è verificato un errore del server.'
			}
		} else {
			feedbackMessage.value = 'Si è verificato un errore imprevisto.'
		}

		console.error('Errore durante l\'eliminazione del task:', e)
	}
}
</script>

<template>
	<div>
		<h1>Tasks list</h1>
		<div v-if="tasks">
			<article
				v-for="task in tasks"
				:key="task.id"
				class="task-item"
			>
				<span :class="{ done: task.done }">
					{{ task.title }}
				</span>
				<div class="actions">
					<button
						title="Delete task"
						class="action-button delete-button"
						@click="deleteTask(task.id)"
					>
						<Icon
							name="mdi:delete-outline"
							class="icon-delete"
						/>
					</button>
					<button
						:title="task.done ? 'Mark as not done' : 'Mark as done'"
						class="action-button toggle-button"
						@click="toggleDone(task)"
					>
						<Icon
							:name="task.done ? 'mdi:check-circle' : 'mdi:checkbox-blank-circle-outline'"
							:class="task.done ? 'icon-done' : 'icon-todo'"
						/>
					</button>
				</div>
			</article>
		</div>
		<div
			v-if="feedbackMessage"
			class="feedback-message"
			:class="{
				'success-message': messageStatus === 'success',
				'error-message': messageStatus === 'error',
			}"
		>
			{{ feedbackMessage }}
		</div>
	</div>
</template>

<style scoped>
.task-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0;
	border-bottom: 1px solid #e0e0e0;
}
.done {
	text-decoration: line-through;
	color: #888;
}
.actions {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
.action-button {
	background: none;
	border: none;
	cursor: pointer;
	padding: 0 0.25rem;
	line-height: 1;
}
.icon-done {
	font-size: 1.5rem;
	color: #28a745;
}
.icon-todo {
	font-size: 1.5rem;
	color: #6c757d;
}
.icon-delete {
	font-size: 1.5rem;
	color: #dc3545;
}
</style>
