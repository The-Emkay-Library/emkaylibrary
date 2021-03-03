module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getAlbums = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT * FROM Albums;", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.albums = results;
      complete();
    })

  }
  
  // GET route for albums page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = ['deleteAlbum.js'];

    var mysql = req.app.get('mysql');
    getAlbums(req, mysql, context, complete);
    
    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('albums', context);
      }
    }   
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
