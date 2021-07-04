const mongoose = require('mongoose');

// User Schema
const DOGESchema = mongoose.Schema({
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
		},
		part_id: {
			type: Number,
			required: true
		}
});

module.exports = mongoose.model('dogecoin', DOGESchema);