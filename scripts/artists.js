module.exports = function(){
  var express = require('express');
  var router = express.Router();

  
  // GET route for artists page
  router.get('/',function(req,res,next){
    var context = {};
    
    context.scripts = [];

    var mysql = req.app.get('mysql');

    mysql.pool.query('SELECT * FROM Artists', function(err, rows, fields){
    if(err){
        next(err);
        return;
    }

    row_data = {};
    row_data.artists = [];
    for (row in rows) {
        artist = {};

        artist.id      = rows[row].id;
        artist.fname    = rows[row].fname;
        artist.lname    = rows[row].lname;

        row_data.artists.push(workout);
    }

    context.results = JSON.stringify(rows);
    context.data = row_data;

    res.render('artists', context);
    });
});


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
