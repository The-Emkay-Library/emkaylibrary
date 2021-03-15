module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getMovies = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT * FROM Movies JOIN Artists WHERE Artists.Artist_ID = Movies.Artist_ID;", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.movies = results;
      complete();
    })

  }

  var getMovie = function(res, mysql, context, id, complete) {
    var sql = 'SELECT Movie_ID, Artist_ID, Title FROM Movies WHERE Movie_ID = ?;';
    var inserts = [id];

    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }

      context.movie = results[0];
      complete();
    })

  }

  /* Find albums whose title starts with a given string in the req */
   var getMoviesWithNameLike = function(req, res, mysql, context, complete) {

     //sanitize the input as well as include the % character
     var query = "SELECT * FROM Movies WHERE Title LIKE " + mysql.pool.escape(req.params.s + '%');

     mysql.pool.query(query, function(error, results, fields){
           if(error){
               res.write(JSON.stringify(error));
               res.end();
           }
           context.movies = results;
           complete();
       });
   }

   // Allows users to search movies with given string
   router.get('/search/:s', function(req, res){
       var callbackCount = 0;
       var context = {};
       context.scripts = ["deleteMovie.js","searchMovies.js"];

       var mysql = req.app.get('mysql');
       getMoviesWithNameLike(req, res, mysql, context, complete);
       function complete(){
           callbackCount++;
           if(callbackCount >= 1){
               res.render('movies', context);
           }
       }
   });


  // GET route for movies page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = ['deleteMovie.js', 'searchMovies.js'];

    var mysql = req.app.get('mysql');
    getMovies(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('movies', context);
      }
    }
  });

  // Rendering the UPDATE page for artists
  router.get('/:id', function(req, res) {
    var callbackCount = 0;
    var context = {};

    context.scripts = ['updateMovies.js'];

    var mysql = req.app.get('mysql');
    getMovie(res, mysql, context, req.params.id, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        console.log(context);
        res.render('update-movies', context);
      }
    }
  });

  // DELETE functionality for movies page
  router.delete('/:id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Movies WHERE Movie_ID = ?;";
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

  // POST route for movies
  router.post('/', function(req, res) {
    console.log(req.body);

    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Movies (Artist_ID, Title) VALUES (?, ?);";
    var inserts = [req.body.Artist_ID, req.body.Title];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/movies');
      }
    })
  });

  // PUT route for updating artists
  router.put('/:id', function(req, res) {

    var mysql = req.app.get('mysql');
    var sql = 'UPDATE Movies SET Artist_ID = ?, Title = ? WHERE Movie_ID = ?;';
    var inserts = [req.body.Artist_ID, req.body.Title, req.params.id];

    console.log("PUT Request:");
    console.log(req.body);
    console.log(req.params.id);

    console.log(inserts);

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
