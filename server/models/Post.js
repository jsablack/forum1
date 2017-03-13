var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	user: String,
	time: {type: Date, default: Date.now},
	content: String
});

var postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;