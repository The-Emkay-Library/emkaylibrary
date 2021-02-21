var mysql = require('mysql');

require('dotenv').config();
var pwd = process.env.PWD;
var username = process.env.USERNAME;
var db = process.env.DB;

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : username,
  password        : pwd,
  database        : db
});
module.exports.pool = pool;
