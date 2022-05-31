var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql2");

var connection = mysql.createConnection({
    host : 'localhost', //127.0.0.1
    port : 3306,
    user : "root", 
    password : "1234",
    database : "test"
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    var _id = req.xxxx;
    var _password = req.xxx;
    var time = moment().xxxxx;
})