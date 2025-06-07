<script lang="ts" setup>
const { data: tasks } = await useFetch('/api/tasks')
console.log(tasks.value)
</script>

<template>
	<div>
		<h1>Tasks list</h1>
		<article
			v-for="task in tasks"
			:key="task.id"
		>
			{{ task.title }}
		</article>
	</div>
</template>
