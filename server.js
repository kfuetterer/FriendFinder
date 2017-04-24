var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var app = express();
var PORT = 3000;

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
    res.sendFile(path.join(__dirname, "/app/routing/apiRoutes.js"));
    res.sendFile(path.join(__dirname, "/app/routing/htmlRoutes.js"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});