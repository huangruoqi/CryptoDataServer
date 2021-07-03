const mongoose = require('mongoose');

// User Schema
const BSVSchema = mongoose.Schema({
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

module.exports = mongoose.model('bitcoinsv', BSVSchema);