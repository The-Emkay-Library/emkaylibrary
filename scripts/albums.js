module.exports = function(){
  var express = require('express');
  var router = express.Router();

  // GET route for albums page
  router.get('/', function(req, res) {
    var context = {};
    context.scripts = [];

    var mysql = req.app.get('mysql');
    res.render('albums', context);

  });

  // POST route for albums
  router.post('/', function(req, res) {
    console.log(req.body);

    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Albums (Artist_ID, Title) VALUES (?, ?)";
    var inserts = [req.body.Artist_ID, req.body.Title];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/albums');
      }
    })
  });


  return router;

}();
