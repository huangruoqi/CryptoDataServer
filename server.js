const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


const MONGO_URL = 'mongodb+srv://huang:12345@cluster0.zpnru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const getPrices = require('./getPrices');

mongoose.connect(MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
var partID = 0;
const setPartID = () => {
	const s1 = fs.readFileSync(path.join(__dirname, 'partID.txt'));
	partID = parseInt(s1);
	const s2 = "" + (partID + 1);
	fs.writeFileSync(path.join(__dirname, 'partID.txt'), s2);
}

var timeID = 0;
var savedDate = 'no';
let db = mongoose.connection;

let Bitcoin = require('./schema/Bitcoin');
let Ethereum = require('./schema/Ethereum');
let EthereumClassic = require('./schema/EthereumClassic');
let Dogecoin = require('./schema/Dogecoin');
let Litecoin = require('./schema/Litecoin');
let BitcoinSV = require('./schema/BitcoinSV');
let BitcoinCash = require('./schema/BitcoinCash');


const savePrices = async () => {
	const prices = await getPrices();
	
	const tempDate = prices.BTC.quote.USD.last_updated.substring(0, 10)
	if (savedDate === 'no') {
		savedDate = tempDate;
	} else if (savedDate !== tempDate) {
			savedDate = tempDate;
			timeID = 0;
			partID = 0;
			fs.writeFileSync(path.join(__dirname, 'partID.txt'), "1");
	}
	saveOne(Ethereum, 				prices.ETH.quote, 	timeID, savedDate);
	saveOne(EthereumClassic, 	prices.ETC.quote, 	timeID, savedDate);
	saveOne(Dogecoin, 				prices.DOGE.quote, 	timeID, savedDate);
	saveOne(Litecoin, 				prices.LTC.quote, 	timeID, savedDate);
	saveOne(BitcoinSV, 				prices.BSV.quote, 	timeID, savedDate);
	saveOne(BitcoinCash, 			prices.BCH.quote, 	timeID, savedDate);
	saveOne(Bitcoin, 					prices.BTC.quote, 	timeID, savedDate);

	timeID++;
}

const saveOne = (CoinType, quote, timeID, savedDate) => {
	let price = new CoinType();
	price.quote = quote;
	price.date = savedDate;
	price.time_id = timeID;
	price.part_id = partID;
	
	price.save((err) => {
		if (err) {
			console.log(err);
			return;
		}
		else {
			console.log(`${price.date}: price ${price.time_id} saved.`)
		}
	})
}

db.once('open', () => {
	console.log("connected to mongodb...")
	setPartID();
	console.log('Part: ' + partID);
	savePrices();
	setInterval(savePrices, 300000);
})









