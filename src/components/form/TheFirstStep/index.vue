<template>
	<div class="xs12">
		<v-form>
			<span>Количество гостей</span>
			<v-row class="xs12 mb-4">
				<v-text-field
					v-model="adultsAmount"
					required
					label="Взрослые"
					placeholder="Введите к-во"
					type="number"
					min="0"
					:rules="adultRules"
					class="ma-3 xs12 md3 form_number-input"
				/>
				<v-text-field
					v-model="childrenAmount['over-12']"
					label="Дети от 12"
					min="0"
					placeholder="Введите к-во"
					type="number"
					class="ma-3 xs6 form_number-input"
				/>
				<v-text-field
					v-model="childrenAmount['under-12']"
					:rules="childrenRules"
					label="Дети 5-12"
					placeholder="Введите к-во"
					type="number"
					min="0"
					class="ma-3 xs6 form_number-input"
				/>
				<v-text-field
					v-model="childrenAmount['under-5']"
					:rules="childrenRules"
					hide-details
					label="Дети до 5"
					placeholder="Введите к-во"
					type="number"
					min="0"
					class="ma-3 xs6 form_number-input"
				/>
			</v-row>

			<span>Тип номера</span>
			<v-row>
				<v-select
					:items="roomTypes"
					item-text="label"
					item-value="value"
					v-model="roomType"
					label="Solo field"
					solo
					class="ma-3"
				></v-select>
			</v-row>

			<DateSelector label="Дата заезда" v-model="date"/>

			<v-row>
				<span>Цена:</span>
			</v-row>
		</v-form>
	</div>
</template>

<script>
import roomTypes from './roomTypes'
import DateSelector from './DateSelector'
import prices from '@/assets/prices.json'
export default {
	name: 'form-first-step',
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		form: { type: Object }
	},
	components: {
		DateSelector
	},
	data: function () {
		return {
			adultsAmount: 0,
			childrenAmount: {
				'under-5': 0,
				'under-12': 0,
				'over-12': 0,
			},
			roomType: '',
			date: {
				from: null,
				to: null
			},
			// form rules
			adultRules: [v => ((v * 3) >= this.childrenCount) || 'Не более 3 детей до 12 на взрослого'],
			childrenRules: [v => (v / 3 <= this.adultsAmount) || 'Не более 3 детей до 12 на взрослого']
		}
	},
	computed: {
		roomTypes: () => roomTypes,
		childrenCount() {
			return Object.keys(this.childrenAmount).reduce((sum, key) => {
				return sum + parseFloat(this.childrenAmount[key])
			}, 0)
		},
		isFormValid() {
			switch (true) {
				case this.adultsAmount * 3 < this.childrenCount: return false;
				case !this.roomType: return false;
				case !(this.date?.to && this.date?.from): return false;
			}
			return true
		},
		price() {
			const calcDatePeriod = () => {

			}
			return prices


		}
	},
	watch: {
		isFormValid(to) {
			to && this.$emit('change', {
				adultsAmount: this.adultsAmount,
				childrenAmount: this.childrenAmount,
				roomType: this.roomType,
				date: this.date,
			})
		}
	}
}
</script>

<style>
</style>
