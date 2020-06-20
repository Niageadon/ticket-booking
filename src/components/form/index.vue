<template>
	<v-layout wrap class="form xs12 pa-4 justify-center">
		<v-card class="xs12 pa-2">
			<TheFirstStep v-model="firstStep"/>
		</v-card>
	</v-layout>
</template>

<script>

import TheFirstStep from './TheFirstStep/index'

export default {
	name: 'calculate-form',
	components: {
		TheFirstStep
	},
	data: function () {
		return {
			firstStep: {

			}
		}
	}
}
</script>

<style>
</style>
