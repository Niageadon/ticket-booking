<template>
	<div class="xs12">
		<v-form>
			<span class="ml-4">Количество гостей</span>
			<v-row class="xs12 mx-2 mb-4">
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

			<span class="ml-4">Тип номера</span>
			<v-row class="mx-2">
				<v-select
					:items="roomTypes"
					item-text="label"
					item-value="value"
					v-model="roomType"
					label="Выберите тип номера"
					solo
					class="ma-3"
				></v-select>
			</v-row>

			<DateSelector label="Дата заезда" v-model="date"/>

			<v-row class="ma-3">
				<span>Цена: {{price}}</span>
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
			adultsAmount: 1,
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
		isFormValid() {
			switch (true) {
				case this.adultsAmount * 3 < this.childrenCount: return false;
				case !this.roomType: return false;
				case !(this.date?.to && this.date?.from): return false;
			}
			return true
		},
		price() {
			if(!this.isFormValid) return null

			const getDatesRange = (startDate, endDate) => {
				let dateArray = [];
				let start = this.$moment(startDate);

				while (start <= this.$moment(endDate)) {
					dateArray.push( this.$moment(start).format('YYYY-MM-DD') )
					start = this.$moment(start).add(1, 'days');
				}
				return dateArray;
			}
			const findPeriod = (d) => {
				const key = Object.keys(prices).find((el) => {
					const date = this.$moment(d);
					const year = date.year();

					const period = prices[el];
					/*console.group(date)
					console.log(date.isBetween(
						//this.$moment(`${period?.date_from}.${year}`),
						//this.$moment(`${period?.date_to}.${year}`)
						convertDateFormat(period?.date_from, year),
						convertDateFormat(period?.date_to, year),
					))
					console.log(convertDateFormat(period?.date_from, year))
					console.log(convertDateFormat(period?.date_to, year))
					console.groupEnd()*/
					return date.isBetween(
						//this.$moment(`${period?.date_from}.${year}`),
						//this.$moment(`${period?.date_to}.${year}`)
						convertDateFormat(period?.date_from, year),
						convertDateFormat(period?.date_to, year),
					)
				})
				return prices[key]

				function convertDateFormat(ddmm, yyyy) {
					return yyyy + '-' + ddmm.split('.').reverse().join('-')
				}
			}

			const datesRange = getDatesRange(this.date.from, this.date.to);
			const total = datesRange.reduce((acc, date) => {
				const periodInfo = findPeriod(date);
				const price = parseFloat(periodInfo?.[this.roomType]);
				const childDiscount = periodInfo?.child_discount_perc;
				const childPrice = (this.childrenAmount['under-12'] / childDiscount) * price;
				const adultsPrice = (this.adultsAmount + this.childrenAmount['over-12']) * price;
				return parseFloat(acc + childPrice + adultsPrice)
			}, 0)
			return Math.ceil(total);
		}
	},
	watch: {
		isFormValid(to) {
			to && this.$emit('change', {
				adultsAmount: this.adultsAmount,
				childrenAmount: this.childrenAmount,
				roomType: this.roomType,
				date: this.date,
				price: this.price
			})
		}
	},
	mounted() {
		const a = this.$moment('2020-06-03')
		console.log(a.isBetween('2020-05-15', '2020-10-25'))
	}
}
</script>

<style>
</style>
