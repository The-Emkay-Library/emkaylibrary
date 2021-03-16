module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getPatronsAlbums = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT Patrons.Patron_ID, Albums.Album_ID, Patrons.First_name, Patrons.Last_name, Albums.Title FROM Patrons JOIN Patrons_Albums ON (Patrons.Patron_ID = Patrons_Albums.Patron_ID) JOIN Albums ON (Albums.Album_ID = Patrons_Albums.Album_ID);", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.albums = results;
      console.log(context);
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
    console.log("hello");
    var callbackCount = 0;
    var context = {};
    context.scripts = ['returnAlbum.js'];

    var mysql = req.app.get('mysql');
    getPatronsAlbums(res, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('patrons_albums', context);
      }
    }
  });

  // DELETE functionality for Patrons_Albums
  router.delete('/:patron_id/:album_id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Patrons_Albums WHERE Patron_ID = ? AND Album_ID = ?;";
    var inserts = [req.params.patron_id, req.params.album_id];

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
