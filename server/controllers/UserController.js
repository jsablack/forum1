var express = require('express'),
    router = express.Router(),
    User = require('../models/User'),
    bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {
    res.redirect('/');
});

router.post('/login', function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (user) {
            bcrypt.compare(
                req.body.password,
                user.password,
                function (err, match) {
                    if (match === true) {
                        req.session.username = user.username;
                        req.session.userId = user.id;
                        req.session.isLoggedIn = true;
                        res.redirect('/');
                    } else {
                        res.render('threads', {
                            isLoggedIn: req.session.isLoggedIn,
                            title: "forum1",
                            message: "user not found"
                        });
                    }
                }
            );
        } else {
            res.render('threads', {
                isLoggedIn: req.session.isLoggedIn,
                title: "forum1",
                message: "user not found"
            });
        }
    });
});

router.get('/register', function (req, res, next) {
    res.render('register', {
        isLoggedIn: req.session.isLoggedIn,
        title: "forum1: register"
    });
});

router.post('/register', function (req, res, next) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (user === null) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    var newUser = {
                        username: req.body.username,
                        password: hash
                    };
                    User.create(newUser, function (err, user) {
                        if (user) {
                            req.session.username = user.username;
                            req.session.userId = user.id;
                            req.session.isLoggedIn = true;
                            res.redirect('/');
                        } else {
                            res.render('register', {
                                isLoggedIn: req.session.isLoggedIn,
                                title: "forum1: register",
                                message: "error"
                            });
                        }
                    });
                });
            });
        } else {
            res.render('register', {
                isLoggedIn: req.session.isLoggedIn,
                title: "forum1: register",
                message: "username taken"
            });
        }
    });
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

router.get('/registerlogout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/user/register');
    })
});

module.exports = router;