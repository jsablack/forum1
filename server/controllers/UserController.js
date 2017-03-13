var express = require('express'),
	router = express.Router(),
	User = require('../models/UserModel'),
	bcrypt = require('bcryptjs');

router.get('/', function (req, res) {
	res.render('home', {});
});

router.post('/login', function (req, res) {
	User.findOne({username: req.body.username}, function (err, user) {
		if (user) {
			bcrypt.compare(req.body.password, user.password, function (err, match) {
				if (match === true) {
					req.session.username = user.username;
					req.session.userId = user.id;
					req.session.isLoggedIn = true;
					res.render('home', {});
				} else {
					res.render('home', {message: 'username/password not found'});
				}
			});
		} else {
			res.render('home', {message: 'username/password not found'});
		}
	});
});

router.get('/register', function (req, res, next) {
	res.render('register', {isLoggedIn: req.session.isLoggedIn});
});

router.post('/register', function (req, res, next) {
	User.findOne({username: req.body.username}, function (err, user) {
		if (user === null) {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(req.body.password, salt, function (err, hash) {
					var userDbEntry = {
						username: req.body.username,
						password: hash
					};
					User.create(userDbEntry, function (err, user) {
						if (user) {
							req.session.username = user.username;
							req.session.userId = user.id;
							req.session.isLoggedIn = true;
							res.redirect('/');
						} else {
							res.render('register', {message: "error"});
						}
					});
				});
			});
		} else {
			res.render('register', {message: 'username taken'});
		}
	});
});

router.get('/logout', function (req, res) {
	req.session.destroy(function (err) {
		res.redirect('/');
	});
});

module.exports = router;