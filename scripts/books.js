module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getBooks = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT * FROM Books JOIN Artists WHERE Artists.Artist_ID = Books.Artist_ID;", function(error, results, fields) {
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

  /* Find albums whose title starts with a given string in the req */
   var getBooksWithNameLike = function(req, res, mysql, context, complete) {

     //sanitize the input as well as include the % character
     var query = "SELECT * FROM Books WHERE Title LIKE " + mysql.pool.escape(req.params.s + '%');

     mysql.pool.query(query, function(error, results, fields){
           if(error){
               res.write(JSON.stringify(error));
               res.end();
           }
           context.books = results;
           complete();
       });
   }

   // Allows users to search books with given string
   router.get('/search/:s', function(req, res){
       var callbackCount = 0;
       var context = {};
       context.scripts = ["deleteBook.js","searchBooks.js"];

       var mysql = req.app.get('mysql');
       getBooksWithNameLike(req, res, mysql, context, complete);
       function complete(){
           callbackCount++;
           if(callbackCount >= 1){
               res.render('books', context);
           }
       }
   });


  // GET route for books page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = ['deleteBook.js', 'searchBooks.js'];

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
    var inserts = [req.body.Artist_ID, req.body.Title, req.params.id];

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
