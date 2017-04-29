var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var api = express.Router();

var scores = [];
var finalScores = [];

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.text());
api.use(bodyParser.json({ type: "application/vnd.api+json" }));

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

api.get("/friends", function(req, response) {
    connection.query("SELECT * FROM people", function (err, res) {
        response.json(res);
    })
});

api.get("/results", function(req, response) {
    connection.query("SELECT * FROM people", function (err, res) {
        var me = res.slice(-1).pop();
        for (var i = 0; i < res.length - 1; i++) {
            scores[i] = {
                q1: Math.abs(res[i].q1 - me.q1),
                q2: Math.abs(res[i].q2 - me.q2),
                q3: Math.abs(res[i].q3 - me.q3),
                q4: Math.abs(res[i].q4 - me.q4),
                q5: Math.abs(res[i].q5 - me.q5),
                q6: Math.abs(res[i].q6 - me.q6),
                q7: Math.abs(res[i].q7 - me.q7),
                q8: Math.abs(res[i].q8 - me.q8),
                q9: Math.abs(res[i].q9 - me.q9),
                q10: Math.abs(res[i].q10 - me.q10)
             }
             chickenNugget = scores[i].q1 + scores[i].q2 + scores[i].q3 + scores[i].q4 + scores[i].q5 + scores[i].q6 - scores[i].q7 + scores[i].q8 + scores[i].q9 + scores[i].q10;
             finalScores.push(chickenNugget);
        }
        var index = finalScores.indexOf(Math.min.apply(Math, finalScores));
        response.json(res[index]);
    })
})

api.post("/new", function(req, res) {
    var newFriend = req.body;
    console.log(newFriend);

    connection.query("INSERT INTO people SET ?", { name:newFriend.name, photo:newFriend.photo, q1: newFriend.q1, q2: newFriend.q2, q3: newFriend.q3, q4: newFriend.q4, q5: newFriend.q5, q6: newFriend.q6, q7: newFriend.q7, q8: newFriend.q8, q9: newFriend.q9, q10: newFriend.q10}, function (err, res) { });
    res.json(newFriend);
});

module.exports = api;