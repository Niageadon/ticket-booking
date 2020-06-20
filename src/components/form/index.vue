<template>
	<v-layout wrap class="form xs12 pa-4 justify-center">
		<v-card class="xs12 pa-2">
			<TheFirstStep v-if="!isFirstStepActive" v-model="firstStep"/>
			<TheSecondStep v-else/>

			<v-row class="justify-center">
				<v-btn
					:disabled="!firstStep"
					@click="isFirstStepActive = !isFirstStepActive"
				>
					<v-icon>{{isFirstStepActive? 'keyboard_arrow_right': 'keyboard_arrow_left'}}</v-icon>
				</v-btn>
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
			isFirstStepActive: true,
			firstStep: null
		}
	}
}
</script>

<style>
</style>
