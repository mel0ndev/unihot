<template>
	<v-app id="app">

		<v-navigation-drawer
		v-model="drawer"
		app
		color="#282828"
		>
	<v-list-item class="itemlist">
				<v-list-item-content class="content">
					<v-list-item-title class="title">
							Dashboard
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-navigation-drawer>
	<v-app-bar
		app
		class="appBarClass"
		dark>

		<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

	<div class="d-flex align-center">
		<v-img class="logo"
		src="./assets/flame.png"
		height="75"
		width="75">
		</v-img>
		<span>
			<h1 class="unihot"> Unihot </h1>
		</span>
			<span class="UnihotSubtitle"> <h4> The hottest coins on Uniswap </h4> </span>
	
	</div>

	<v-spacer></v-spacer>

	
	</v-app-bar>

		<v-main> 


			<div class="extraSettings"> 


				<ExtraSettings @changeDenom="logDenomChange" @changeLookBack="logLookBackChange"> </ExtraSettings>
				<!-- COMPONENT GOES HERE -->

			</div>

		<div class="table-wrapper">
		
		<Table> </Table>

		</div>

		</v-main>

	</v-app>
</template>


<script>

import Table from "./components/Table.vue";
import ExtraSettings from "./components/ExtraSettings.vue"; 


export default {

	components: {
		Table, 
		ExtraSettings,
	},


	data: () => ({ drawer: false }),


	methods: {
		logDenomChange(e) {
		console.log(e); 
		},

		logLookBackChange(e) {
			console.log(e); 
		}
	}




}

</script>



<style>

#app {
	background-color: #0d0d0d;
	font-family: Roboto monospace, sans-serif;
}

.title {
	color: white;
}

.logo {
	padding: 10px;
	margin: 10px;
}

.unihot {
	font-family: Roboto Mono, sans-serif;
	font-size: 40px;
	display:  inline-block;
	background-image: linear-gradient(45deg, #FF6B8E, #6BFFDC);
	background-size: 100%;
	background-repeat: repeat;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent; 
	-moz-background-clip: text;
	-moz-text-fill-color: transparent;
}

.UnihotSubtitle {
	margin: 10px;
	padding-left: 10px;
	padding-top: 15px;
	color: rgba(255, 255, 255, 0.5);
}


.extraSettings {
	padding: 50px;
}

.table-wrapper {
	padding: 25px;
}


</style>