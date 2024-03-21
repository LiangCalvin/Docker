var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

const mysql = require("mysql2");

var host = 'localhost';
if (process.env.NODE_ENV == 'production'){
    host = 'mysql-server3'
}

// Create the connection to database
const connection = mysql.createConnection({
  host: host,
  user: "root",
  password: "1234",
  database: "travel",
});

app.get("/home", function (req, res, next) {
  connection.query(
    'SELECT * FROM attractions',
    function (err, results, fields) {
        if (err) {
            console.error(err); // Log any errors
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    }
  );
});

app.listen(3333, function () {
  console.log("CORS-enabled web server listening on port 3333");
});