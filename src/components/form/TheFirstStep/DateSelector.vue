<template>
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
				hint="YYY/MM/DD format"
				v-model="date" label="Выберите даты проживания" prepend-icon="event"></v-text-field>
		</template>

		<v-date-picker
			v-model="date"
			@input="menu1 = false"
			range
			hint="MM/DD/YYYY format"
			:allowed-dates="allowedDates"
		>
		</v-date-picker>
	</v-menu>
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
			// rules
			dateRules: [v => v?.length === 2 || 'Выберите начальную и конечную даты'],
		}
	},
	watch: {
		date(v) {
			if(v?.length === 2) {
				const dates = [...v];
				dates.sort((a, b) => +a - b);
				this.$emit('change', {
					to: this.$moment(dates[1]).format('YYYY-MM-DD'),
					from: this.$moment(dates[0]).format('YYYY-MM-DD')
				})
			}
		}
	},
	methods: {
		allowedDates(val) {
			const period = ['2020-05-15', '2020-09-16'];
			return this.$moment(val).isBetween(...period)
		}
	},
}
</script>
