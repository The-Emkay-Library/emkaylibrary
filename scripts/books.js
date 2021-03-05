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

  var getBook = function(res, mysql, context, id, complete) {
    var sql = 'SELECT Book_ID, Artist_ID, Title FROM Books WHERE Book_ID = ?;';
    var inserts = [id];

    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }

      context.book = results[0];
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

  // Rendering the UPDATE page for artists
  router.get('/:id', function(req, res) {
    var callbackCount = 0;
    var context = {};

    context.scripts = ['updateBooks.js'];

    var mysql = req.app.get('mysql');
    getBook(res, mysql, context, req.params.id, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('update-books', context);
      }
    }
  });

  // DELETE functionality for books page
  router.delete('/:id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Books WHERE Book_ID = ?;";
    var inserts = [req.params.id];

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

  // PUT route for updating artists
  router.put('/:id', function(req, res) {

    var mysql = req.app.get('mysql');
    var sql = 'UPDATE Books SET Artist_ID = ?, Title = ? WHERE Book_ID = ?;';
    var inserts = [req.body.First_name, req.body.Last_name, req.params.id];

    console.log(req.body);
    console.log(req.params.id);

    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {

      if (error) {
        console.log(error);

        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else {
        res.status(200);
        res.end();
      }
    })

  });


  return router;

}();
