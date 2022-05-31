var express = require("express");
var app = express();
var path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    res.render('index');
})

app.get("/ajax", function(req, res){
    var name = req.query.name;
    console.log(name);
    res.json({
        title : name,
        html : "123456789"
    })
})

app.get("/ajax_get", function(req, res){
    var name = req.query.name;
    var phone = req.query.phone;
    var division = req.query.division;
    console.log(name, phone, division);
    res.send("ajax_get success");
})

app.post("/ajax_post", function(req, res){
    var name = req.body.name;
    var phone = req.body.phone;
    var division = req.body.division;
    console.log(name, phone, division);
    res.send("ajax_post success");
})

app.get("/ajax_getJSON", function(req, res){
    var name = req.query.name;
    var phone = req.query.phone;
    var division = req.query.division;
    console.log(name, phone, division);
    res.json({
        message : "ajax_getJSON success"
    });
})

var port = 3000;
app.listen(port, function () {
  console.log("웹 서버 시작", port);
});







