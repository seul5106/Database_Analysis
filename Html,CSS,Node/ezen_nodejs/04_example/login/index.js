var express = require('express');
var app = express();
var mysql = require("mysql2");
var session = require("express-session");

var connection = mysql.createConnection({
    host : "localhost",     //본인 pc  , 127.0.0.1
    port : 3306,
    user : "root",
    password : "1234",
    database : "nodejs"
})

var path = require('path');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret : "snajflwbjfdsbhad",
        resave : false,
        saveUninitialized: true,
        maxAge : 300000
    })
)

app.get("/", function(req, res){
    if(!req.session.login){
        res.render("login");
    }else{
        res.redirect("/main");
    }
})


app.get("/test", function(req, res){
    res.send("로그인 실패");
})

app.post("/login", function(req, res){
    var id = req.body.id;
    var password = req.body.password;
    console.log(id, password);
    connection.query(
        `select * from user_list where post_id = ? and password = ?`,
        [id, password],
        function(err, result){
            if(err){
                console.log(err);
                res.send(err)
            }else{
                if(result.length > 0){             //.length
                    /*
                        result = [{"post_id" : xxxx, "password": xxxxx, "name" : xxxx}]
                        result[0] = {"post_id" : xxxx, "password": xxxxx, "name" : xxxx}
                        req.session = {cookie : {xxxxxxxxxxxxxxxx}}
                        req.session.login = result[0]
                        req.session = {cookie : {xxxxxxxxxxxxxxxx},
                                       login : {"post_id" : xxxx, "password": xxxxx, "name" : xxxx}
                                    }
                        req.session = {{},{}}
                        req.session.login = {"post_id" : xxxx, "password": xxxxx, "name" : moon}
                        req.session.login.name => moon
                    */
                    req.session.login = result[0];
                    res.redirect("/main")
                }else{
                    res.redirect("/test");
                }
            }
        }
    )
})

app.get("/main", function(req, res){
    if(!req.session.login){
        res.redirect("/")
    }else{    
        res.render("main", {
            name : req.session.login.name
        })
    }
})

app.get("/signup", function(req, res){
    res.render("signup");
})

app.post("/signup", function(req, res){
    var id = req.body.id;
    var password = req.body.password;
    var name = req.body.name;
    connection.query(
        `select * from user_list where post_id = ?`,
        [id],
        function(err, result){
            if(err){
                console.log(err);
                res.send(err)
            }else{
                if(result.length > 0){
                    res.send("ID가 존재합니다")
                }else{
                    connection.query(
                        `insert into user_list values (?,?,?)`,
                        [id, password, name],
                        function(err2, result2){
                            if(err2){
                                console.log(err2);
                                res.send(err2)
                            }else{
                                res.redirect("/")
                            }
                        }
                    )
                }
            }
        }
    )
})

app.get("/update", function(req, res){
    if(!req.session.login){
        res.redirect("/")
    }else{
        res.render("update", {
            id : req.session.login.post_id,
            password : req.session.login.password,
            name : req.session.login.name
        });
    }
})

app.post("/update", function(req, res){
    var id = req.session.login.post_id;
    var password = req.body.password;
    var name = req.body.name;
    console.log(id, password, name);
    connection.query(
        `update user_list set password = ?, name = ? where post_id = ?`,
        [password, name, id],
        function(err, result){
            if(err){
                console.log(err);
                res.send(err)
            }else{
                req.session.login.password = password;
                req.session.login.name = name;
                res.redirect("/");
            }
        }
    )

})

app.get("/delete", function(req, res){
    var id = req.session.login.post_id;
    connection.query(
        `delete from user_list where post_id = ?`,
        [id],
        function(err, result){
            if(err){
                console.log(err)
                res.send(err)
            }else{
                req.session.destroy(function(){
                    console.log(req.session);
                    res.redirect("/")
                });

                req.session = null;
                console.log(req.session);
                res.redirect("/")

            }
        }
    )
})

app.get("/logout", function(req, res){
    req.session.destroy(function(){
        console.log(req.session);
        res.redirect("/")
    });
})

app.get("/check_id", function(req, res){
    var post_id = req.query.id;
    connection.query(
        `select * from user_list where post_id =?`,
        [post_id],
        function(err, result){
            if(err){
                console.log(err)
                res.send("9")
            }else{
                if(result.length > 0){
                    res.send("1")
                }else{
                    res.send("0")
                }
            }
        }
    )
})

var board = require("./routes/board");
app.use("/board", board);   // localhost:3000/board/xxx

var port = 3000;
app.listen(port, function() {
    console.log("서버 시작")
})

/*
    var a = [1,2,3,4,5,6,7,8,9];
    console.log(a[2])  --> 3
    var json = {
        "name" : "moon",
        "post_id" : "test1",
        "password" : "1234"    
    }
    console.log(json.name)  -->  moon
    console.lg(json["name"])  --> moon

    var sql = [
        {
            name : moon,
            password : 1234,
            post_id : test1
        },
        {
            name : moon,
            password : 1234,
            post_id : test2
        },
        {
            name : moon,
            password : 1234,
            post_id : test3
        }
    ]
    console.log(sql[0].post_id)   --> test1

    if(result){

    }
    변수 -> 지역 변수 / 전역 변수
    전역 -> 전체
    지역 -> 한 부분

    localhost:3000/login -- >  app.use(static ...) public폴더 지정  --> ejs 파일에서 상대경로 src 속성에 default 폴더를 지정

    <img src ="이미지 경로">
*/