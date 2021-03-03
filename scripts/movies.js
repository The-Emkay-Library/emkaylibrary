module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getMovies = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT * FROM Movies;", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.movies = results;
      complete();
    })

  }
  
  // GET route for movies page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = ['deleteMovie.js'];

    var mysql = req.app.get('mysql');
    getMovies(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('movies', context);
      }
    }
  });

  // POST route for movies
  router.post('/', function(req, res) {
    console.log(req.body);

    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Movies (Artist_ID, Title) VALUES (?, ?);";
    var inserts = [req.body.First_name, req.body.Last_name];
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


  return router;

}();
