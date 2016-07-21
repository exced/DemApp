var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drawSchema = new Schema({
    /* path of the img */
	image: {
		type: String,
		required: true
	},
    score: {
        type: Number,
        required: true
    },
    /* id of the user */
    user: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Draw', drawSchema);