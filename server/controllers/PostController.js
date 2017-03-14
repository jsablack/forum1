var express = require('express'),
    router = express.Router(),
    Post = require(../models/Post);

router.get('/', function(req, res){
    if(req.session.isLoggedIn) {
        Post.find(function(err, posts){
        res.render('/', {
            isLoggedIn: req.session.isLoggedIn,
            postArray: posts},
    })else{
        res.redirect('')
    })
    };
});

router.post('/', function(req, res){
    if (req.session.isLoggedIn){
    var newPost = new Post({
        user: req.session.name,
        timestamp: Date.now(),
        content: req.body.content
    }
    Post.create(newPost, function(err){
        isLoggedIn: req.session.isLoggedIn,
        res.redirect('/');
    });
    })else{
        res.redirect('/');
    };
});

router.patch('/:id', function(req, res){
    var id      = req.params.id;
    var newInfo = req.body;
    Post.findById(id, function(err, post){
        post.user    = req.session.name;
        post.content = newInfo.content;
        timestamp: Date.now();

        post.save();

        res.send("Success");
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    Post.findById(id, function(err, movie){
        post.remove();
        res.send("Success");
    });
});

module.exports = router;


