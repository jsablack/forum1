var express = require('express'),
    router = express.Router(),
    Thread = require('../models/Thread');
    Post = require('../models/Post');

router.get('/', function (req, res) {
    Thread.find(function(err, threads) {
        var sThreads = threads.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });
        res.render('threads', {
            isLoggedIn: req.session.isLoggedIn,
            title: "forum1",
            threads: sThreads
        });
    });
});

router.get('/new', function (req, res) {
    res.render('newThread', {
        isLoggedIn: req.session.isLoggedIn,
        title: "forum1: new thread",
    });
});

router.post('/new', function (req, res) {
    var newThread = {
        title: req.body.title,
        size: 1,
        timestamp: Date.now()
    }
    Thread.create(newThread, function (err, thread) {
        var newPost = {
            username: req.session.username,
            content: req.body.content,
            timestamp: thread.timestamp,
            threadId: thread.id
        }
        Post.create(newPost, function (err2, post) {
            res.redirect('/');
        });
    });
});

module.exports = router;