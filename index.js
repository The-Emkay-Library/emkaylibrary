/*
 * Name:          Kat Kime
 * Date:          January 28, 2021
 * Description:   A JS file to handle all of the get/post requests recieved on
 *                the index page.
*/


/*
 * Setting up Express & Handlebars
*/

var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var hbs = exphbs.create({defaultLayout: 'main'});

// Registering hbs.engine with Express app
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Query parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Setting up a folder for static files
app.use(express.static('public'));

// Setting the port
app.set('port', 5891);


// Setting up the views
app.get('/', function(req, res) {
  context = {};
  res.render('home', context);
});

app.get('/artists', function(req, res) {
  context = {};
  res.render('artists', context);
});

app.get('/patrons', function(req, res) {
  context = {};
  res.render('patrons', context);
});

app.get('/albums', function(req, res) {
  context = {};
  res.render('albums', context);
});

app.get('/books', function(req, res) {
  context = {};
  res.render('books', context);
});

app.get('/movies', function(req, res) {
  context = {};
  res.render('movies', context);
});

app.get('/checkout', function(req, res) {
  context = {};
  res.render('checkout', context);
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
