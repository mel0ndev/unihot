<template>
	<v-container class="table-border">

		<template>
			<v-data-table
			:headers="headers"
			:items="coins"
			:items-per-page="15"
			:key="coins.rvol"
			search
			sort-by="rvol"
			sort-desc
			dark
			class="tableMain"
			>

			<template v-slot:item.rvol="{item}">
				<div :class="rvolClass(item)">
				{{item.rvol}}
			</div>
			</template>
		</v-data-table>
					
				
			
			</template>




	</v-container>
</template>

<script>
import axios from 'axios';
import {eventBus} from "../main.js"; 


	export default {

	name: 'Table',

	data() {
		return {
			
				headers: [
				{ text: 'Symbol', align: 'start', value: 'symbol' },
				{ text: 'Name', value: 'name'},
				{ text: 'Current Price', value: 'price'}, 
				{ text: 'Token Volume', value: 'tokenVolume'},
				{ text: 'Volume USD', value: 'USDvolume'},
				{ text: 'RVOL', value: 'rvol', sortable: true}
				],
				coins: [{
				}],
				denomination: '', 
				lookBack: '', 
				lookBackInput: 7,
		}
	},

  methods: {
		rvolClass(item) {
			if (item.rvol >= 1.0 && item.rvol < 2.0 ) {
				return 'green1';
			}

			if (item.rvol >= 2.0 && item.rvol < 3.0) {
				return 'green2';
			}
			if (item.rvol >= 3.0 && item.rvol < 4.0) {
				return 'green3';
			}
			if (item.rvol >= 4.0) {
				return 'green4';
			}
		}


  },

created() {

eventBus.$on('changeDenom', (denominationEvent) => {
	this.denomination = denominationEvent; 
	//console.log(this.denomination);
}), 

eventBus.$on('changeLookBack', (lookBackEvent) => {
	this.lookBack = lookBackEvent;
	console.log(this.lookBack); 
})



// MOVE DATA TO METHOD, CALL METHOD ON CREATED, THEN CAN REUSE CODE ON EVENT SUBMIT 
eventBus.$on('lookBackInput', (lookBackInputEvent) => {
	this.lookBackInput = lookBackInputEvent;
	console.log(this.lookBackInput); 
})
 


//get current date from uniswap, couldn't find a better way, sorry for load times
axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', 
{
	query: `
	{
tokenDayDatas(first: 1, orderBy: date, orderDirection:desc) {
  date
	}
}

	`
}).then((resp) => {

	const date = resp.data.data.tokenDayDatas[0].date; 




//get token ids
axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', 
	{
			query: `
	{
			tokenDayDatas(first: 250, orderBy: date, orderDirection:desc, 
				where:{ volumeUSD_gt: 250000, 
				date_gte: ${date}}) {
				volumeUSD
				date
					token {
						id
		}
	}
}
`
	}).then((res) => {


		var data = res.data.data.tokenDayDatas;  
		//console.log(this.coins);
		var tokenIdArray = [];

		//get token IDs
		for (var i = 0; i < data.length; i++) {
			var tokenID = data[i].token.id;
			
			tokenIdArray.push(tokenID);

		}


			//query graph with token id loop
			for (var j = 0; j < tokenIdArray.length; j++) {
				var tokenID_2 = tokenIdArray[j];
				


				//day data for tokens
				const main = async () => {
					const result = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
					{
						query: `
							{
								token(id: "${tokenID_2}") {
									name
									symbol
									tokenDayData(first: ${this.lookBackInput}, orderBy: date, orderDirection:desc) {
										date
										volumeUSD
										volume
										priceUSD
								  }
								}
							}

						`
					});


					//data for front end
					const coinSymbol = result.data.data.token.symbol;
					const coinName = result.data.data.token.name;
					const coinData = result.data.data.token.tokenDayData;

					let vol; 
					let coinVolume = 0; 


					//loop through coin volume data
					for(var k = 0; k < coinData.length; k++) {
						vol = coinData[k].volumeUSD
						coinVolume += Number(vol); 
					}
					

					//coin data for display 						
					//this.coins.currentPrice = coinData[0].priceUSD; 
					const coinCurrentPrice = "$" + Number(coinData[0].priceUSD).toLocaleString();


					//this.coins.volume = coinData[0].volume;
					const coinTokenVolume = Number(coinData[0].volume).toFixed(3) + " " + coinSymbol; 


				//this.coins.volumeUSD = coinData[0].volumeUSD; 
					const coinVol = coinData[0].volumeUSD;
					const coinVolumeUSD = "$" + Number(coinData[0].volumeUSD).toLocaleString();



					const denominator = coinVolume / 7;
					const Rvol = (Number(coinVol) / denominator).toFixed(4);
					const coinRvol = Number(Rvol);



					//add data to array

					this.coins.push({
						symbol: coinSymbol,
						name: coinName,
						price: coinCurrentPrice,
						tokenVolume: coinTokenVolume,
						USDvolume: coinVolumeUSD,
						rvol: coinRvol, 
					});

				}

				//add if statement to determine whether day or hourly data gets loaded
				main();

			}

		});
		
   });

	console.log(this.coins.splice(0, 1));

		}, 

	}







</script>


<style scoped>


.upperCard {
	padding-bottom: 0px;
}

.customSearch {
	font-size: 12px;
}


.table-border {
	border-radius: 0.5em;
	padding: 0px;
	color:  rgba(	255, 107, 142, 50);

	box-shadow: 0 0 2.5em 0 currentColor;
}

.tableMain {
	padding-top: 0px !important; 
}

.green1 {
	color: #8eff6b;
}

.green2 {
	color: #67ff38;
}

.green3 {
	color: #54ff1f;
}

.green4 {
	color: green;
}

</style>
