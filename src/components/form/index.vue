<template>
	<v-layout wrap class="form xs12 pa-4 justify-center">
		<v-card class="xs12 pa-2">
			<TheFirstStep v-if="!currentStep" v-model="firstStep"/>
			<TheSecondStep v-else/>

			<v-row class="justify-center">
				<v-btn :disabled="!firstStep"></v-btn>
			</v-row>
		</v-card>
	</v-layout>
</template>

<script>

import TheFirstStep from './TheFirstStep/index'
import TheSecondStep from './TheSecondStep'

export default {
	name: 'calculate-form',
	components: {
		TheFirstStep,
		TheSecondStep
	},
	data: function () {
		return {
			currentStep: 0,
			firstStep: null
		}
	}
}
</script>

<style>
</style>
