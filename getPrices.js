const fetch = require('node-fetch');
const APIKEY = '6c7286a8-7257-49f3-8b65-df69d1ab322c'
const CMC_URL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,DOGE,ETC,BSV,BCH,LTC&convert=USD`;

const getPrices = async () =>{
	const res = await fetch(CMC_URL, {
		method: 'GET', 
		headers: {
			"X-CMC_PRO_API_KEY": APIKEY,
			"Accept": "application/json",
			"Accept-Encoding": "deflate, gzip",
		}
	})
	const body = await res.json();
	return body.data;
}

module.exports = getPrices;