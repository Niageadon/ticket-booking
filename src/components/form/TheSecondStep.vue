<template>
	<div class="xs12">
		<v-form>
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
							required
						></v-text-field>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</div>
</template>

<script>

export default {
	name: 'form-second-step',
	data: function () {
		return {
			firstName: '',
			lastName: '',
			patronymic: '',
			email: '',
			// rules
			nameRules: [
				v => !!v || 'Заполните поле',
			],
			emailRules: [
				v => !!v || 'Заполните email',
				v => /.+@.+\..+/.test(v) || 'Email не корректен',
			],

		}
	}
}
</script>

<style>
</style>
