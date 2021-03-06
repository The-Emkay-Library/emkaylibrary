module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getPatronsMovies = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT Patrons.Patron_ID, Movies.Movie_ID, Patrons.First_name, Patrons.Last_name, Movies.Title FROM Patrons JOIN Patrons_Movies ON (Patrons.Patron_ID = Patrons_Movies.Patron_ID) JOIN Movies ON (Movies.Movie_ID = Patrons_Movies.Movie_ID);", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.movies = results;
      complete();
    })

  }

  var getAlbum = function(res, mysql, context, id, complete) {
    var sql = 'SELECT Movie_ID, Patron_ID FROM Patrons_Movies WHERE Movie_ID = ?;';
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

  // GET route for movies page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = ['returnMovie.js'];

    var mysql = req.app.get('mysql');
    getPatronsMovies(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('patrons_movies', context);
      }
    }
  });


  // DELETE functionality for Patrons_Movies
  router.delete('/:patron_id/:movie_id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Patrons_Movies WHERE Patron_ID = ? AND Movie_ID = ?;";
    var inserts = [req.params.patron_id, req.params.movie_id];

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
