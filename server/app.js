var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    session = require('express-session'),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    Thread = require('./models/Thread'),
    Post = require('./models/Post');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(session({
    secret: 'secret salt',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./db/db');

var UserCont = require('./controllers/UserController');
var ThreadCont = require('./controllers/ThreadController');

app.get('/', function (req, res) {
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

app.get('/new', function (req, res) {
    res.render('newThread', {
        isLoggedIn: req.session.isLoggedIn,
        title: "forum1: new thread",
    });
});

app.post('/new', function (req, res) {
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

app.use('/user', UserCont);
app.use('/thread', ThreadCont);

server.listen(3000, function () {
    console.log('server is listening on port 3000');
});