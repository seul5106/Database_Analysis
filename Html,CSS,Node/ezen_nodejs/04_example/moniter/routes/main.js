const express = require('express')
const router = express.Router();
var moment = require("moment");
var mysql = require("mysql2");

var connection = mysql.createConnection({
    host : 'localhost', //127.0.0.1
    port : 3306,
    user : 'root', 
    password : '1234',
    database : 'nodejs'
});


router.get("/", function(req, res, next){       //localhost:3000 --> 요청시
    res.render("index");
})

router.get("/regist", function(req, res, next){     //localhost:3000/regist --> 요청시
    res.render("regist")
})

router.post("/regist" , function(req, res, next){
    var name = req.body.name;
    var address = req.body.address;
    console.log(name, address);
    connection.query(
        `insert into farm(name, address) values (?,?)`,
        [name, address],
        function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                var sql = `create table farm_history_`+name+`(
                    No int auto_increment primary key,
                    farm_no int not null, 
                    name varchar(45) not null, 
                    temp int not null, 
                    hud int not null, 
                    date varchar(16) not null, 
                    time varchar(16) not null
                )`      //farm_history_농장명
                connection.query(
                    sql,
                    function(err2, result2){
                        if(err2){
                            console.log(err2)
                            res.send(err2)
                        }else{
                            res.redirect("/");
                        }
                    }
                )
            }
        }
    )
})

router.get("/search", function(req, res, next){
    res.render("search");
})

router.get("/moniter", function(req, res, next){
    connection.query(
        `select * from farm`,
        function(err, result){
            if(err){
                console.log(err);
                res.json({
                    result : "error"
                });
            }else{
                res.json({
                    result : result
                })
            }
        }
    )
})

router.get("/update", function(req, res, next){
    var no = req.query.no;
    var name = req.query.name;
    var temp = req.query.temp;
    var hud = req.query.hud;
    var date = moment().format("YYYY-MM-DD");
    var time = moment().format("HH:mm:ss");
    console.log(no, temp, hud, date, time);
    connection.query(
        `update farm set temp = ?, hud =?, date =?, time =? where No =?`,
        [temp, hud, date, time, no],
        function(err, result){
            if(err){
                console.log(err);
                res.json({
                    "code" : 9,
                    "message" : err
                })
            }else{
                connection.query(
                    `insert into farm_history_`+name+`(farm_no, name, temp, hud, date, time) values (?, ?, ?, ?, ?, ?)`,
                    [no, name, temp, hud, date, time],
                    function(err2, result2){
                        if(err2){
                            console.log(err2);
                            res.json({
                                "code" : 8,
                                "message" : err2
                            })
                        }else{
                            res.json({
                                "code" : 1,
                                "message" : "success"
                            })
                        }
                    }
                )
            }
        }
    )
})

router.get("/history", function(req, res, next){
    var farm_name = req.query.farm_name;
    connection.query(
        `select * from farm_history_`+farm_name+` order by date desc, time desc`,
        function(err, result){
            if(err){
                console.log(err)
                res.send("error")
            }else{
                res.render("history", {
                    farm_data : result
                });
            }
        }
    )
})

module.exports = router;

