var express = require('express'),
    router = express.Router(),
    Thread = require('../models/Thread');

router.get('/new', function (req, res) {
    if (req.session.isLoggedIn) {
        res.render('newThread', {
            isLoggedIn: req.session.isLoggedIn,
            title: "forum1: new thread"
        });
    } else {
        res.redirect('/')
    }
});

router.post('/new', function (req, res) {
    var newThread = {
        title: req.body.threadtitle,
        posts: [req.body.FIRSTPOSTID],
        timestamp: Date.now(),
        size: 1
    }
    Thread.create(newThread, function (err) {
        res.redirect('/');
    });
});

module.exports = router;