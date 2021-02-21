module.exports = function(){
  var express = require('express');
  var router = express.Router();

  // GET route for movies page
  router.get('/', function(req, res) {
    var context = {};
    context.scripts = [];

    var mysql = req.app.get('mysql');
    res.render('movies', context);

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
