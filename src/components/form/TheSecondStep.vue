<template>
	<div class="xs12">
		<v-form>
			<v-container>
				<v-row>
					<v-col cols="12" md="4">
						<v-text-field
							v-model="firstName"
							:rules="nameRules"
							type="text"
							label="Имя"
							required
						></v-text-field>
					</v-col>

					<v-col cols="12" md="4">
						<v-text-field
							v-model="lastName"
							:rules="nameRules"
							type="text"
							label="Фамилия"
							required
						></v-text-field>
					</v-col>

					<v-col cols="12" md="4">
						<v-text-field
							v-model="patronymic"
							:rules="nameRules"
							type="text"
							label="Отчество"
							required
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" md="12">
						<v-text-field
							v-model="email"
							:rules="emailRules"
							label="E-mail"
							type="email"
							required
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" md="12">

						<v-text-field
							pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
							type="time"
							label="time">
						</v-text-field>
					</v-col>
				</v-row>


			</v-container>
		</v-form>
	</div>
</template>

<script>
import MaskedInput from 'vue-masked-input'
export default {

	name: 'form-second-step',
	components: {
		MaskedInput
	},
	data: function () {
		return {

			firstName: '',
			lastName: '',
			patronymic: '',
			email: '',
			phone: '',
			// rules
			nameRules: [
				v => !!v || 'Заполните поле',
			],
			emailRules: [
				v => !!v || 'Заполните email',
				v => /.+@.+\..+/.test(v) || 'Email не корректен',
			],

		}
	},
	methods: {
		handlePhoneInput() {

		}
	}
}
</script>

<style>
</style>
