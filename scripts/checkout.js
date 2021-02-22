module.exports = function(){
  var express = require('express');
  var router = express.Router();

  // GET route for checkout page
  router.get('/', function(req, res) {
    var context = {};
    context.scripts = [];

    var mysql = req.app.get('mysql');
    res.render('checkout', context);

  });

  // POST route for checking out albums
  router.post('/', function(req, res, next) {
    // if album is not checked, move to next route
    if (!req.body.album_checkout) {
      next('route');
    }
    else {
      // otherwise checkout the album
      console.log(req.body);

      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Patrons_Albums (Album_ID, Patron_ID) VALUES (?,?)";
      var inserts = [req.body.Item_ID, req.body.Patron_ID];

      sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
        if(error) {
          console.log(JSON.stringify(error));
          res.write(JSON.stringify(error));
          res.end();
        } else {
          res.redirect('/checkout');
        }
      });
    }
  });


  // POST route for checking out books
  router.post('/', function(req, res, next) {
    // if book is not checked, move to next route
    if (!req.body.book_checkout) {
      next('route');
    }
    else {
      // otherwise checkout the book
      console.log(req.body);

      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Patrons_Books (Book_ID, Patron_ID) VALUES (?, ?)";
      var inserts = [req.body.Item_ID, req.body.Patron_ID];

      sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
        if(error) {
          console.log(JSON.stringify(error));
          res.write(JSON.stringify(error));
          res.end();
        } else {
          res.redirect('/checkout');
        }
      });
    }
  });

  // POST route for checking out movies
  router.post('/', function(req, res) {
    // if movie is not checked, move to next route
    if (!req.body.movie_checkout) {
      console.log('Neither item selected.');
    }
    else {
      // otherwise checkout the movie
      console.log(req.body);

      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Patrons_Movies (Movie_ID, Patron_ID) VALUES (?,?)";
      var inserts = [req.body.Item_ID, req.body.Patron_ID];

      sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
        if(error) {
          console.log(JSON.stringify(error));
          res.write(JSON.stringify(error));
          res.end();
        } else {
          res.redirect('/checkout');
        }
      });
    }
  });


  return router;

}();
