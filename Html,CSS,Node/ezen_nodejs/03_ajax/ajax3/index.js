var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql2");

var connection = mysql.createConnection({
    host : 'localhost', //127.0.0.1
    port : 3306,
    user : "root", 
    password : "1234",
    database : "nodejs"
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    res.render("index")
})

app.get("/ajax_get", function(req, res){
    var message = req.query.message;
    console.log(message);
    res.json({
        message : "집에서 나가지 말자"
    })
})

app.get("/get", function(req, res){
    var message = req.query.message;
    var message2 = req.query.message2;
    console.log(message, message2);
    res.send("집에나 붙어있어라");
})

app.post("/post", function(req, res){
    var message = req.body.message;
    console.log(message);
    res.send("잠이나 일찍 자라")
})

app.get("/getJSON", function(req, res){
    var post_id = req.query.post_id;
    var password = req.query.password;
    console.log(post_id, password);
    connection.query(
        `select * from user_list where post_id = ? and password = ?`,
        [post_id, password],
        function(err, result){
            if(err){
                console.log(err);
                res.json({
                    check : "error"
                })
            }else{
                if(result.length > 0){
                    res.json({
                        check : "존재한다"
                    })
                }else{
                    res.json({
                        check : "존재하지 않는다"
                    })
                }
            }
        }
    )
})

var port = 3000;
app.listen(port, function () {
  console.log("웹 서버 시작", port);
});