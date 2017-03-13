var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	user: String,
	time: String,
	content: String
});

var postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;