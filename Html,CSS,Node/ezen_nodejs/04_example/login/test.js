var express = require('express');
var app = express();
var path = require('path');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));



app.get("/html", function(req, res){
    res.render("index8")
})

var port = 3000;
app.listen(port, function() {
    console.log("서버 시작")
})