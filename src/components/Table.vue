<template>
	<v-container class="table-border">


		<div>
			<v-card dark
			align="center"
			justify="center"
			class="upperCard"
			>

				<p class="customSearch" @click="componentShowing = !componentShowing"> Click to expand custom search parameters  </p>

					<div v-if="componentShowing"> The component goes here
					</div>

			</v-card>
			</div>

		<template>
			<v-data-table
			:headers="headers"
			:items="coins"
			:items-per-page="15"
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
				componentShowing: false, 
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
			tokenDayDatas(first: 100, orderBy: date, orderDirection:desc, 
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
				

				const main = async () => {
					const result = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
					{
						query: `
							{
								token(id: "${tokenID_2}") {
									name
									symbol
									tokenDayData(first: 7, orderBy: date, orderDirection:desc) {
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
					const coinTokenVolume = Number(coinData[0].volume).toFixed(3) + " " +coinSymbol; 


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


				main();

			}


	});
		


			//we now have token ids to pass to whatever I need to pass it to
			//now need a new query and loop through for each coin in balls array 
   
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

	box-shadow: 0 0 3em 0 currentColor;
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
