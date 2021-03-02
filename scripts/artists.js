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


  // GET route for artists page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = [];

    var mysql = req.app.get('mysql');
    getArtists(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('artists', context);
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


  // POST route for artists
  router.post('/', function(req, res) {
    console.log(req.body);
    console.log('Params:');
    console.log(req.params);

    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Artists (First_name, Last_name) VALUES (?, ?)";
    var inserts = [req.body.First_name, req.body.Last_name];

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


  return router;

}();
