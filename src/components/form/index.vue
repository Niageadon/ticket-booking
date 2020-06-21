<template>
	<v-layout wrap class="xs12 pa-4 justify-center">
		<v-card class="form xs12">
			<TheFirstStep v-if="isFirstStepActive" v-model="firstStep"/>
			<TheSecondStep v-else v-model="secondStep"/>
			<v-divider></v-divider>
			<v-row class="justify-center ma-3">
				<span>Цена: {{price}}</span>
			</v-row>
			<v-card-actions>
				<v-row class="justify-space-around">
					<v-btn
						:disabled="!isFirstStepValid"
						@click="isFirstStepActive = !isFirstStepActive"
					>
						<v-icon>{{isFirstStepActive? 'keyboard_arrow_right': 'keyboard_arrow_left'}}</v-icon>
					</v-btn>
					<v-btn @click="submit" :disabled="isFormValid">
						Отправить форму
					</v-btn>
				</v-row>
			</v-card-actions>

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
		TheSecondStep,
	},
	data: function () {
		return {
			isFirstStepActive: true,
			firstStep: null,
			secondStep: null,
		}
	},
	computed: {
		isFormValid() {
			return this.isFirstStepValid && this.secondStep?.isFormValid
		},
		isFirstStepValid() {
			return this.firstStep?.isFormValid
		},
		price() {
			return this.firstStep?.price || 0
		}
	},
	methods: {
		async submit() {
			try {
				const response = await fetch('js-api/vouchers', {
					method: 'POST',
					body: JSON.stringify({...this.firstStep, ...this.secondStep}), // данные могут быть 'строкой' или {объектом}!
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const json = await response.json();
				console.log('Успех:', JSON.stringify(json));
			} catch (error) {
				console.error('Ошибка:', error);
			}
		}
	}
}
</script>

<style>
</style>
