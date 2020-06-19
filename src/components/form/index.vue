<template>
	<v-card class="form">
		<v-form>
			<v-select
				:items="items"
				filled
				label="Filled style"
			></v-select>
		</v-form>
	</v-card>
</template>

<script>

export default {
	name: 'App',
	data: function () {
		return {
			items: ['boba', '2']
		}
	}
}
</script>

<style>
</style>
