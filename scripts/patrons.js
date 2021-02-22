module.exports = function(){
  var express = require('express');
  var router = express.Router();

  // GET route for patrons page
  router.get('/', function(req, res) {
    var context = {};
    context.scripts = [];

    var mysql = req.app.get('mysql');
    res.render('patrons', context);

  });

  // POST route for patrons
  router.post('/', function(req, res) {
    console.log(req.body);

    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Patrons (First_name, Last_name, Email_address) VALUES (?,?,?)";
    var inserts = [req.body.First_name, req.body.Last_name, req.body.Email_address];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if(error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/patrons');
      }
    })
  });


  return router;

}();
