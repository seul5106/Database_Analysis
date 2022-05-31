var express = require("express");
var router = express.Router();
var mysql = require("mysql2");

var connection = mysql.createConnection({
    host : "localhost", //127.0.0.1
    port : 3306,
    user : "root", 
    password : "1234",
    database : "test"
});

router.get("/", function(req, res, next){
    res.render("login")
})

router.post("/login", function(req, res, next){
    var post_id = req.body.post_id;
    var password = req.body.password;
    console.log(post_id, password);
    connection.query(
        `select * from user_list where post_id = ? and password =?`,
        [post_id, password],
        function(err, result){
            if(err){
                console.log(err);
                res.send("SQL login connection Error")
            }else{
                if(result.length > 0){
                    if(result[0].linkcode == 0){
                        res.render("manager")
                    }else{
                        res.send("linkcode 1 login");
                    }
                }else{
                    res.send("Not data")
                }
            }
        }
    )
})

router.get("/signup", function(req, res, next){
    res.render("signup")
})

router.post("/signup_2", function(req, res, next){
    var post_id = req.body.post_id;
    var password = req.body.password;
    var name = req.body.name;
    var division = req.body.division;
    var linkcode = req.body.linkcode;
    console.log(post_id, password, name, division, linkcode);
    connection.query(
        `select * from user_list where post_id = ?`,
        [post_id],
        function(err, result){
            if(err){
                console.log(err);
                res.send("SQL connent Error")
            }else{
                if(result.length > 0){
                    res.send("이미 존재하는 아이디")
                }else{
                    connection.query(
                        `insert into user_list (post_id, password, name, 
                            division, linkcode) values (?, ?, ?, ?, ?)`,
                        [post_id, password, name, division, linkcode],
                        function(err2, result2){
                            if(err2){
                                console.log(err2);
                                res.send("SQL insert Error");
                            }else{
                                res.redirect("/");
                            }
                        }
                    )
                }
            }
        }
    )
})

module.exports = router;



