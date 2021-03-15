/*
 * Name:          Kat Kime
 * Date:          January 28, 2021
 * Description:   A JS file to handle all of the get/post requests recieved on
 *                the index page.
*/


/*
 * Setting up Express, Handlebars, BodyParser & MySQL
*/
// Allowing to keep password secret
require('dotenv').config();

var express = require('express');
var mysql = require('./scripts/dbcon.js');

var app = express();
var exphbs = require('express-handlebars');
var hbs = exphbs.create({defaultLayout: 'main'});
var router = express.Router();

// Registering hbs.engine with Express app
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Setting the port
app.set('port', 8765);

// Setting up SQL
app.set('mysql', mysql);

// Query parser
var bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Setting up a folder for static files
app.use('/static', express.static('public'));

// Setting up the views
app.use('/albums', require('./scripts/albums.js'));
app.use('/artists', require('./scripts/artists.js'));
app.use('/books', require('./scripts/books.js'));
app.use('/checkout', require('./scripts/checkout.js'));
app.use('/movies', require('./scripts/movies.js'));
app.use('/patrons', require('./scripts/patrons.js'));
app.use('/', express.static('public'));

app.get('/', function(req, res) {
  context = {};
  res.render('home', context);
})

app.get('/patrons_books', function(req, res) {
  context = {};
  res.render('patrons_books', context);
});

app.get('/patrons_movies', function(req, res) {
  context = {};
  res.render('patrons_movies', context);
});

app.get('/patrons_albums', function(req, res) {
  context = {};
  res.render('patrons_albums', context);
});

/*
 * Handling Errors
 */

app.use(function(request, response) {
  response.type('text/plain');
  response.status(404);
  response.send('404 - Not Found');
});

app.use(function(err, request, response, next) {
  console.error(err.stack);
  response.type('text/plain');
  response.status(500);
  response.send('500 - Server Error');
});

// Adding a listener
app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') +
 '; press Ctrl-C to terminate.')
})
