var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    username: String,
    timestamp: Number,
    thread: Number,
    content: String
});

module.exports = mongoose.model('PostSchema', PostSchema);