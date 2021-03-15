module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getPatronsAlbums = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT * FROM Patrons_Albums;", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.albums = results;
      complete();
    })

  }

  var getAlbum = function(res, mysql, context, id, complete) {
    var sql = 'SELECT Album_ID, Patron_ID FROM Patrons_Albums WHERE Album_ID = ?;';
    var inserts = [id];

    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }

      context.album = results[0];
      complete();
    })

  }

  // GET route for patrons_albums page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = [];

    var mysql = req.app.get('mysql');
    getAlbums(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('patrons_albums', context);
      }
    }
  });



  return router;

}();
