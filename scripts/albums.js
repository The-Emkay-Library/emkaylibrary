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

  var getAlbum = function(res, mysql, context, id, complete) {
    var sql = 'SELECT Album_ID, Artist_ID, Title FROM Albums WHERE Album_ID = ?;';
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

  // Rendering the UPDATE page for artists
  router.get('/:id', function(req, res) {
    var callbackCount = 0;
    var context = {};

    context.scripts = ['updateAlbums.js'];

    var mysql = req.app.get('mysql');
    getAlbum(res, mysql, context, req.params.id, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('update-albums', context);
      }
    }
  });

  // DELETE functionality for albums page
  router.delete('/:id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Albums WHERE Album_ID = ?;";
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

  // PUT route for updating artists
  router.put('/:id', function(req, res) {

    var mysql = req.app.get('mysql');
    var sql = 'UPDATE Books SET Artist_ID = ?, Title = ? WHERE Book_ID = ?;';
    var inserts = [req.body.First_name, req.body.Last_name, req.params.id];

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
