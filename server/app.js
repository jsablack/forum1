require('dotenv').config();

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

app.use('/user', require('./controllers/UserController'));
app.use('/thread', require('./controllers/ThreadController'));
app.use('/post', require('./controllers/PostController'));
app.use('/', require('./controllers/HomeController'))

server.listen(process.env.PORT || 5000);
// function () {
//     console.log('server is listening on port 3000');
// });