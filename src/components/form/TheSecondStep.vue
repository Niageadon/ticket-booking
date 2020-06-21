<template>
	<div class="xs12">
		<v-form ref="secondStep">
			<v-container>
				<v-row>
					<v-col cols="12" md="4">
						<v-text-field
							v-model="firstName"
							:rules="nameRules"
							label="Имя"
							required
						></v-text-field>
					</v-col>

					<v-col cols="12" md="4">
						<v-text-field
							v-model="lastName"
							:rules="nameRules"
							label="Фамилия"
							required
						></v-text-field>
					</v-col>

					<v-col cols="12" md="4">
						<v-text-field
							v-model="patronymic"
							:rules="nameRules"
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
						<!--Во 2-ой версии vuetify масок не нашел-->
						<vue-tel-input-vuetify
							v-model="phone"
							label="Телефон"
							placeholder="Введите номер"
							:maxLen="10"
							:onlyCountries="['ru']"
							required validCharactersOnly
						>
						</vue-tel-input-vuetify>
					</v-col>
				</v-row>


			</v-container>
		</v-form>
	</div>
</template>

<script>
export default {

	name: 'form-second-step',
	model: {
		prop: 'value',
		event: 'change'
	},
	components: {
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
		handleFormChange() {
			this.$emit('change', {
				firstName: this.firstName,
				lastName: this.lastName,
				patronymic: this.patronymic,
				email: this.email,
				phone: this.phone,
				isFormValid: this.isFormValid
			})
		}
	},
	computed: {
		isFormValid() {
			switch (true) {
				case !this.firstName: return false
				case !this.lastName: return false
				case !this.patronymic: return false
				case !(/.+@.+\..+/.test(this.email)): return false
				case this.phone.length <10: return false
			}
			return true
		}
	},
	watch: {
		firstName() { this.handleFormChange() },
		lastName() { this.handleFormChange() },
		patronymic() { this.handleFormChange() },
		email() { this.handleFormChange() },
		phone() {this.handleFormChange() },
	},
	mounted() {
		console.log(this.$refs)
	}
}
</script>

<style>
</style>
