var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path'),
	session = require('express-session'),
	bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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

app.use('/', UserCont);

server.listen(3000, function () {
	console.log('server is listening on port 3000');
});