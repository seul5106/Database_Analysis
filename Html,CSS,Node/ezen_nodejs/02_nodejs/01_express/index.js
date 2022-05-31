var express = require("express");
var app = express();


app.get("/", function(req, res){
    res.send("Hello World");
})

app.get("/second", function(req, res){
    res.send("Second Page");
})

var server = app.listen(port, function(){
    console.log("Express server", port);
})