var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var app = express();

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "203980Kj",
  database: "FriendFinder_DB"
});

connection.connect(function(err) { 
    if (err) throw err;
    console.log("Connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

    app.get("/api/friends", function(req, response) {
        connection.query("SELECT * FROM people", function (err, res) {  
            console.log(res);
            response.json(res);
        })
    });

    app.post("/api/new", function(req, res) {
        var newFriend = req.body;
        newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

        console.log(newFriend);

        connection.query("INSERT INTO people SET ?", { name:newFriend.name, photo:newFriend.photo, firstQuestion: newFriend.firstQuestion, secondQuestion: newFried.secondQuestion, thirdQuestion: newFriend.thirdQuestion, fourthQuestion: newFriend.fourthQuestion, fifthQuestion: newFriend.fifthQuestion, sixthQuestion: newFriend.sixthQuestion, seventhQuestion: newFriend.seventhQuestion, eighthQuestion: newFriend.eighthQuestion, ninthQuestion: newFriend.ninthQuestion, tenthQuestion: newFriend.tenthQuestion}, function (err, res) { });
        res.json(newFriend);
    });