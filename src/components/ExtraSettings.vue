<template>
<v-container class="settingsBorder"> 

	<v-card dark
	align="center"
	justify="center"
	>
		<h3>
			Settings 
		</h3>

		<p @click="settings = !settings"> Show/Hide </p>

		<span v-if="settings">
			<div class="denominatorWrapper"> 
				<v-card flat 
				align="center"
				justify="center"
				>
					<v-card-title> Change Denomination </v-card-title> <v-switch 
						flat
						color="pink" 
						@click="changeDenom"
						:label= "`${denominator}`"
						v-model="changeDenominator"
						> 
					</v-switch>
				</v-card>
			</div>

			<div class="lookBackPeriodWrapper">
				<v-card flat 
				align="center"
				justify="center"
				>
					<v-card-title> Change Period </v-card-title>
					<v-switch 
						flat
						@click="changeLookBack"
						color="pink"
						:label="`${lookBackPeriod}`"
						v-model="changeLookBackPeriod"
						>
						</v-switch>
					<input type="text" v-model="lookBackInput" class="searchBox">
					<v-btn text color="pink" @click="submitLookBackPeriod"> Submit </v-btn>
				</v-card>
			</div>
		</span>
	</v-card>
</v-container>



</template>


<script>
import {eventBus} from "../main.js"; 
	
export default {

name: 'ExtraSettings', 

data() {
	return {
		changeDenominator: false,
		denominator: 'USD',
		lookBackInput: null,
		lookBackPeriod: 'Days',
		changeLookBackPeriod: false, 
		settings: false, 

	}
}, 

methods: {

	changeDenom() {
		if (this.changeDenominator == false) {
			this.denominator = 'USD'
		} else {
			this.denominator = 'ETH'
		}

		eventBus.$emit('changeDenom', this.denominator);
	},

	changeLookBack() {
		if (this.changeLookBackPeriod == false) {
			this.lookBackPeriod = 'Days'
		} else {
			this.lookBackPeriod = 'Hours'
		}

		eventBus.$emit('changeLookBack', this.lookBackPeriod);
	},

	submitLookBackPeriod() {
		eventBus.$emit('lookBackInput', this.lookBackInput);
	},

	showSettings() {
		this.settings = true; 
	}
},



}	


</script>


<style scoped> 

.settingsBorder {
	border-radius: 0.5em;
	padding: 0px;
	color:  rgba( 107, 255, 220, 25);

	box-shadow: 0 0 1em 0 currentColor;
}

.searchBox {
	background-color: white;
}

.denominatorWrapper {
	display: inline-block;
	padding: 50px; 
}

.lookBackPeriodWrapper {
	display: inline-block;
	padding: 50px;
}


</style>