module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getPatronsBooks = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT Patrons.Patron_ID, Books.Book_ID, Patrons.First_name, Patrons.Last_name, Books.Title FROM Patrons JOIN Patrons_Books ON (Patrons.Patron_ID = Patrons_Books.Patron_ID) JOIN Books ON (Books.Book_ID = Patrons_Books.Book_ID);", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.books = results;
      complete();
    })

  }

  var getBook = function(res, mysql, context, id, complete) {
    var sql = 'SELECT Book_ID, Patron_ID FROM Patrons_Books WHERE Book_ID = ?;';
    var inserts = [id];

    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }

      context.books = results[0];
      complete();
    })

  }

  // GET route for books page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = [];

    var mysql = req.app.get('mysql');
    getPatronsBooks(res, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('patrons_books', context);
      }
    }
  });



  return router;

}();
