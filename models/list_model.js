var mongoose = require('mongoose');
mongoose.Promise = Promise;

var mylistSchema = mongoose.Schema({
	_id: String,
	title: String,
	url: String,
	time: Date,
	thumbnailUrl: String,
	description: String,
	userName: String,
	videoId: String,
	userEmail: String
}, {safe:true});

module.exports = mongoose.model('Mylist', mylistSchema);

