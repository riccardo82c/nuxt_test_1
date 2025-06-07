<script lang="ts" setup>
const router = useRouter()
const title = ref('')

async function createTask() {
	if (!title.value.trim()) {
		alert('Il titolo non può essere vuoto!')
		return
	}

	try {
		const task = await $fetch('/api/tasks', {
			method: 'POST',
			body: {
				title: title.value,
			},
		})

		console.log('Task creato con successo:', task)

		await router.push('/')
	}
	catch (error) {
		console.error('Errore durante la creazione del task:', error)
		alert('Si è verificato un errore durante la creazione del task.')
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
				>
			</div>

			<button
				type="submit"
				class="btn btn-primary"
			>
				Create Task
			</button>
		</form>
	</div>
</template>
