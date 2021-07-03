const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://huang:12345@cluster0.zpnru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const getPrices = require('./getPrices');

mongoose.connect(MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
var timeID = 0;
var savedDate = 'no';
let db = mongoose.connection;
const addPrice = async () => {
	const prices = await getPrices();
	const quote = prices.BTC.quote;
	let price = new Bitcoin();
	price.quote = quote;
	price.date = quote.USD.last_updated.substring(0, 10);
	price.time_id = timeID;
	timeID++;
	if (savedDate === 'no') {
		savedDate = price.date;
	} else {
		if (savedDate !== price.date) {
			savedDate = price.date;
			timeID = 0;
		}
	}
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
	addPrice();
	setInterval(addPrice, 300000/10);
})

let Bitcoin = require('./Bitcoin');







