var mysql = require('mysql');
require('dotenv').config();

var username = process.env.USERNAME;
var pwd = process.env.PWD;
var db = process.env.DB;

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_stewkata',
  password        : '5335',
  database        : 'cs340_stewkata'
});
module.exports.pool = pool;
