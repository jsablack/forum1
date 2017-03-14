var mongoose = require('mongoose');

var ThreadSchema = new mongoose.Schema({
    title: String,
    posts: Array,
    size: Number,
    timestamp: Number
});

module.exports = mongoose.model('ThreadSchema', ThreadSchema);