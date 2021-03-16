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
    context.scripts = ['returnBook.js'];

    var mysql = req.app.get('mysql');
    getPatronsBooks(res, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('patrons_books', context);
      }
    }
  });

  // DELETE functionality for Patrons_Books
  router.delete('/:patron_id/:book_id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Patrons_Books WHERE Patron_ID = ? AND Book_ID = ?;";
    var inserts = [req.params.patron_id, req.params.book_id];

    sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
      if (error) {
        console.log(error);

        res.write(JSON.stringify(error));
        res.status(400);
        res.end();

      } else {
        res.status(202).end();
      }
    })
  })



  return router;

}();
