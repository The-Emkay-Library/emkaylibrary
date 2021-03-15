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


  var getPatron = function(res, mysql, context, id, complete) {
    var sql = 'SELECT Patron_ID, First_name, Last_name, Email_address FROM Patrons WHERE Patron_ID = ?;';
    var inserts = [id];

    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }

      context.patron = results[0];
      complete();
    })

  }

  // GET route for patrons page
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};

    var mysql = req.app.get('mysql');
    getPatrons(req, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('patrons', context);
      }
    }
  });

  // Rendering the UPDATE page for patrons
  router.get('/:id', function(req, res) {
    var callbackCount = 0;
    var context = {};

    context.scripts = ['updatePatron.js'];

    var mysql = req.app.get('mysql');
    getPatron(res, mysql, context, req.params.id, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('update-patrons', context);
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

  // PUT route for updating patrons
  router.put('/:id', function(req, res) {

    var mysql = req.app.get('mysql');
    var sql = 'UPDATE Patrons SET First_Name = ?, Last_name = ?, Email_address = ? WHERE Patron_ID = ?;';


    var inserts = [req.body.First_name, req.body.Last_name, req.body.Email_address, req.params.id];

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
