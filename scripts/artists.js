module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getArtists = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT * FROM Artists;", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.artists = results;
      complete();
    })

  }

  var getArtist = function(res, mysql, context, id, complete) {
    var sql = 'SELECT Artist_ID, First_name, Last_name FROM Artists WHERE Artist_ID = ?;';
    var inserts = [id];

    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }

      context.artist = results[0];
      complete();
    })

  }

  // POST route for artists
  router.post('/', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Artists (First_name, Last_name) VALUES (?, ?)";
    var inserts = [req.body.First_name, req.body.Last_name];

    console.log(req.body);
    console.log(req.body.First_name + ' ' + req.body.Last_name);

    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));

        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/artists');
      }
    })
  });


  // PUT route for updating artists
  router.put('/:id', function(req, res) {

    var mysql = req.app.get('mysql');
    var sql = 'UPDATE Artists SET First_Name = ?, Last_name = ? WHERE Artist_ID = ?;';
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



  // GET route for artists page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = ['deleteArtist.js'];

    var mysql = req.app.get('mysql');
    getArtists(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('artists', context);
      }
    }
  });

  // Rendering the UPDATE page for artists
  router.get('/:id', function(req, res) {
    var callbackCount = 0;
    var context = {};

    context.scripts = ['updateArtist.js'];

    var mysql = req.app.get('mysql');
    getArtist(res, mysql, context, req.params.id, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('update-artists', context);
      }
    }
  });


  // DELETE functionality for artists page
  router.delete('/:id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Artists WHERE Artist_ID = ?;";
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


  return router;

}();
