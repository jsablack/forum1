var express = require('express'),
    router = express.Router(),
    Thread = require('../models/Thread'),
    Post = require('../models/Post');

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Thread.findById(id, function (err, thread) {
        Post.find({threadId: id}, function (err2, posts) {
            var sPosts = posts.sort(function (a, b) {
                return a.timestamp - b.timestamp;
            });
            res.render('posts', {
                isLoggedIn: req.session.isLoggedIn,
                title: "forum1: " + thread.title,
                threadtitle: thread.title,
                threadId: id,
                posts: sPosts
            });
        });
    });
});

module.exports = router;