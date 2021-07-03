const mongoose = require('mongoose');

// User Schema
const LTCSchema = mongoose.Schema({
    quote: {
        type: Object,
        required: true
    },
		date: {
			type: String,
			required: true
		},
		time_id: {
			type: Number,
			required: true
		}
});

module.exports = mongoose.model('litecoin', LTCSchema);