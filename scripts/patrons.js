module.exports = function(){
  var express = require('express');
  var router = express.Router();

  var getPatrons = function(res, mysql, context, complete) {
    mysql.pool.query("SELECT * FROM Patrons;", function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      }
      context.patrons = results;
      complete();
    })

  }
  
  // GET route for patrons page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.scripts = ['deletePatron.js'];

    var mysql = req.app.get('mysql');
    getPatrons(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('patrons', context);
      }
    }
  });

  // DELETE functionality for patrons page
  router.delete('/:id', function (req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Patrons WHERE Patron_ID = ?;";
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
