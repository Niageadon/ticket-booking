<template>
	<v-col cols="12" lg="6">
		<v-menu
			ref="showMenu"
			v-model="showMenu"
			:close-on-content-click="false"
			transition="scale-transition"
			offset-y
			max-width="290px"
			min-width="290px"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					v-on="on"
					v-bind="attrs"
					:rules="dateRules"
					hint="MM/DD/YYYY format"
					v-model="date" label="Выберите даты проживания" prepend-icon="event"></v-text-field>
			</template>

			<v-date-picker
				v-model="date"
				@input="menu1 = false"
				range
				hint="MM/DD/YYYY format"
			>
			</v-date-picker>
		</v-menu>
	</v-col>
</template>

<script>
export default {
	name: 'first-step-date',
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		label: { type: String, required: true },
		value: { type: [Object, null], required: true },
	},
	data: function() {
		return {
			date: [],
			dateFormatted: '',
			showMenu: false,
			dateRules: [v => v?.length === 2 || 'Выберите начальную и конечную даты'],

		}
	},
	watch: {
		date(v) {
			if(v) {
				const [to, from] = v;
				this.$emit('change', {to, from})
			}
		}
	},
}
</script>

<style>
</style>
