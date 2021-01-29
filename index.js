/*
 * Name:          Kat Kime
 * Date:          January 28, 2021
 * Description:   A JS file to handle all of the get/post requests recieved on
 *                the index page.
*/


/*
 * Setting up Express
*/

var express = require('express');
var app = express();

// Setting the port
app.set('port', 3000);


// Setting up a simple hello world statement to test environment
app.get('/', function(req, res) {
  res.send('Hello world!');
});

// Adding a listener
app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') +
 '; press Ctrl-C to terminate.')
})
