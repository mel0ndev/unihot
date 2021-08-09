<template>
	<v-app id="app">
	<v-app-bar
		app
		class="appBarClass"
		dark>

	<div class="d-flex align-center">
		<v-img class="logo"
		src="./assets/flame.png"
		height="75"
		width="75">
		</v-img>
		<span>
			<h1 class="unihot"> Unihot </h1>
		</span>
		<br>
			<span class="UnihotSubtitle"> <h4> The hottest coins on Uniswap </h4> </span>
	
	</div>

	<v-spacer></v-spacer>

	
	</v-app-bar>


		<v-main> 

		<div class="table-wrapper">
		
		<Table> </Table>

		</div>

		</v-main>

	</v-app>
</template>


<script>

import Table from "./components/Table.vue"; 


export default {

	components: {
		Table, 
	}



}

</script>



<style>

#app {
	background-color: #0d0d0d;
	font-family: Roboto Mono, sans-serif;
}


.logo {
	padding: 10px;
	margin: 10px;
}

.unihot {
	font-family: Roboto Mono, sans-serif;
	font-size: 40px;
	display:  inline-block;
}

.UnihotSubtitle {
	margin: 10px;
	padding-left: 10px;
	padding-top: 15px;
}

.table-wrapper {
	padding: 25px;
}


</style>