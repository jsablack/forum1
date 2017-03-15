var express = require('express'),
    router = express.Router(),
    Post = require('../models/Post'),
    Thread = require('../models/Thread');

// router.get('/:id', function (req, res) {
//     Post.find({threadId: req.params.id}, function (err, posts) {
//         res.posts
//     }
// );

// router.get('/', function(req, res){
//     if(req.session.isLoggedIn) {
//         Post.find(function(err, posts){
//         res.render('/', {
//             isLoggedIn: req.session.isLoggedIn,
//             postArray: posts},
//     })else{
//         res.redirect('')
//     })
//     };
// });

router.post('/:id', function (req, res) {
    var newPost = {
        username: req.session.username,
        userId: req.session.userId,
        timestamp: Date.now(),
        content: req.body.content,
        threadId: req.params.id
    }
    Post.create(newPost, function (err, post) {
        Thread.findById(req.params.id, function (err2, thread) {
            if (err2) {
                res.send(err2);
            } else {
                thread.size += 1;
                thread.timestamp = post.timestamp;
                thread.save(function (err3) {
                    res.redirect('/');
                })
            };
        });
    });
});

router.patch('/', function (req, res) {
    Post.findById(req.body.id, function (err, post) {
        post.content = req.body.content;
        post.save();
        res.send("post updated");
    });
});

router.delete('/', function (req, res) {
    Post.findById(req.body.id, function (err, post) {
        post.remove();
        res.send("post deleted");
    });
});

// router.patch('/:id', function(req, res){
//     var id      = req.params.id;
//     var newInfo = req.body;
//     Post.findById(id, function(err, post){
//         post.user    = req.session.name;
//         post.content = newInfo.content;
//         timestamp: Date.now();

//         post.save();

//         res.send("Success");
//     });
// });

// router.delete('/:id', function(req, res){
//     var id = req.params.id;
//     Post.findById(id, function(err, movie){
//         post.remove();
//         res.send("Success");
//     });
// });

module.exports = router;