<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FetchError } from 'ofetch'

const router = useRouter()
const title = ref('')

const isLoading = ref(false)
const feedbackMessage = ref('')
const messageStatus = ref<'success' | 'error' | null>(null)

async function createTask() {
	isLoading.value = true
	feedbackMessage.value = ''
	messageStatus.value = null

	try {
		await $fetch('/api/tasks', {
			method: 'POST',
			body: {
				title: title.value,
			},
		})

		messageStatus.value = 'success'
		feedbackMessage.value = 'Task creato con successo! Sarai reindirizzato...'

		setTimeout(() => {
			router.push('/')
		}, 1500)
	} catch (e) {
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
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<div>
		<h1>Create a New Task</h1>
		<form @submit.prevent="createTask">
			<div class="form-group">
				<label for="title">Title</label>
				<input
					id="title"
					v-model="title"
					type="text"
					class="form-control"
					placeholder="Enter title"
					:disabled="isLoading"
				>
			</div>

			<button
				type="submit"
				class="btn btn-primary"
				:disabled="isLoading"
			>
				{{ isLoading ? 'Creating...' : 'Create Task' }}
			</button>
		</form>

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
