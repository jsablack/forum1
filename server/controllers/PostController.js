var express = require('express'),
	router  = express.Router(),
	Post	= require(../models/Post);

	router.get('/', function(res, req){
		Post.find(function(req, res){
			console.log(post);
			res.render('home', {postArray: posts});
		});
	});

	router.post('/', function(req, res){
		var post = new Post({user = req.body.user,
							time = req.body.time,
							content = req.body.content});
		post.save();
		res.redirect('/');
	});

	router.patch('/:id', function(req, res){
		var id		= req.params.id;
		var newInfo = req.body;
		Post.findById(id, function(err, post){
			post.user	 = newInfo.user;
			post.time	 = newInfo.time;
			post.content = newInfo.content;

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


