'use strict';

const express = require('express');
var os = require('os');
var mysql = require('mysql');
const fs = require('fs');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const password = fs.readFileSync("/etc/foo/password");
var networkInterfaces = os.networkInterfaces();
var con = mysql.createConnection({
                  host: process.env.ip_address || "localhost",
                  user: "root",
                  password: password || "test123"
});



// App
const app = express();
app.get('/', (req, res) => {
  console.log(con)
  con.connect(function(err) {
    if (err) throw err;
   con.query("SELECT * FROM testDB.Persons", function (err, result, fields) {
                                                                       if (err) throw err;
                                                                       console.log(result);
                                                                       res.send(result)
                                                                     });


  });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);