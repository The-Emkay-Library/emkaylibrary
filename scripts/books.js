module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getBooks = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT * FROM Books;", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.books = results;
      complete();
    })

  }
  
  // GET route for books page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = ['deleteBook.js'];

    var mysql = req.app.get('mysql');
    getBooks(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('books', context);
      }
    }
  });

  // POST route for books
  router.post('/', function(req, res) {
    console.log(req.body);

    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Books (Artist_ID, Title) VALUES (?, ?)";
    var inserts = [req.body.Artist_ID, req.body.Title];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/books');
      }
    })
  });


  return router;

}();
