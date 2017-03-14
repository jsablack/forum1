var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    session = require('express-session'),
    hbs = require('hbs'),
    bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(session({
    secret: "secret salt",
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
    res.render('threads', {
        isLoggedIn: req.session.isLoggedIn,
        title: "forum1",
        threads: [{title: "fish"}, {title: "cat"}, {title: "dog"}]
    });
});

app.use('/user', UserCont);
app.use('/thread', ThreadCont);

server.listen(3000, function () {
    console.log('server is listening on port 3000');
});