var express = require('express');
var router = express.Router();
var moment = require("moment");
var mysql = require("mysql2");

var connection = mysql.createConnection({
    host : "localhost",     //본인 pc  , 127.0.0.1
    port : 3306,
    user : "root",
    password : "1234",
    database : "nodejs"
})

/*
    router -> /board -> "/"get -> 브라우저 url 뭐라고 쳐야될까요? url= localhost:3000/board/
    "/write"get형식 -> url = localhost:3000/board/write
*/

router.get("/", function(req, res){
    if(!req.session.login){
        res.redirect("/")
    }else{
        connection.query(
            `select No, title, name, time from board`,
            function(err, result){
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    console.log(result);
                    res.render("board", {
                        board : result
                    })
                }
            }
        )
    }
})

router.get("/write", function(req, res){
    if(!req.session.login){
        res.redirect("/")
    }else{
        res.render("write")
    }
})

router.post("/write", function(req, res){
    var title = req.body.title;
    var content = req.body.content;
    var id = req.session.login.post_id;
    var name = req.session.login.name;
    var time = moment().format("YYYYMMDDHHmmss")  // 20210720172300 format("YYYY-MM-DD / HH:mm:ss")  2021-07-20 / 17:24:00
    connection.query(
        `insert into board(title, post_id, name, content, time) values(?,?,?,?,?)`,
        [title, id, name, content, time],
        function(err, result){
            if(err){
                console.log(err);
                res.send(err)
            }else{
                res.redirect("/board")
            }
        }
    )
})

router.get("/info", function(req, res){
    if(!req.session.login){
        res.redirect("/")
    }else{
        var No = req.query.No;
        console.log(No);
        connection.query(
            `select * from board where No =?`,
            [No],
            function(err, result){
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    res.render("info", {
                        content : result[0],
                        id : req.session.login.post_id
                    })
                }
            }
        )
    }
})

router.get("/delete", function(req, res){
    var No = req.query.No;
    connection.query(
        `delete from board where No = ?`,
        [No],
        function(err, result){
            if(err){
                console.log(err);
                res.send(err)
            }else{
                res.redirect("/board")
            }
        }
    )
})

module.exports = router;