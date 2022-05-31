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
    res.render("index")
})

app.get("/ajax", function(req, res){
    var name = req.query.name;
    var phone = req.query.phone;
    var division = req.query.division;
    console.log(name, phone, division);
    res.json({
        name : name,
        html : phone + "<br>" + division
    })
})

app.post("/ajax", function(req, res){
    var message = req.body.message;
    console.log(message);
    res.json({
        message : "나도 코로나 너무 싫다."
    })
})

app.get("/ajax_get", function(req, res){
    var name = req.query.name;
    var phone = req.query.phone;
    var division = req.query.division;
    console.log(name, phone, division);
    // res.send(name + phone + " division : " + division)
})

app.post("/ajax_post", function(req, res){
    var name = req.body.name;
    console.log(name);
    res.send("name : "+ name);
})

app.get("/ajax_getJSON", function(req, res){
    var post_id = req.query.post_id;
    console.log(post_id);
    connection.query(
        `select * from user_list where post_id = ?`,
        [post_id],
        function(err, result){
            if(err){
                console.log(err)
                res.json({
                    state : "error",
                    messgae : err
                })
            }else{
                if(result.length > 0){
                    res.json({
                        state : "중복",
                        message : "아이디가 존재 합니다"
                    })
                }else{
                    res.json({
                        state : "사용 가능",
                        message : "이 아이디는 사용이 가능합니다."
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