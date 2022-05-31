var express = require("express");
var app = express();

app.set("views", __dirname+"/views");
app.set("view engine", 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended:false}));

app.use(express.static('public'));

var main = require('./routes/main')();
app.use("/", main);

var server = app.listen(3000, function(){
    console.log("Express routes server");
})