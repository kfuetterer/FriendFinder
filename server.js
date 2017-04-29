var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = module.exports = express();
var PORT = 3000;

app.use('/', require('./app/routing/htmlRoutes'));
app.use('/api', require('./app/routing/apiRoutes'));

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});