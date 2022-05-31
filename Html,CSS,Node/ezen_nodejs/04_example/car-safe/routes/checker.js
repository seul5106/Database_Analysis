const express = require('express')
const router = express.Router()
var mysql = require("mysql2");
const moment = require('moment')

var connection = mysql.createConnection({
    //host: "192.168.0.5",
    host: "localhost",
    port: 3306, // db 포트
    user: "root", // user 이름
    password: "1234", // 비밀번호
    database: "test", // database 이름
  });


  router.get("/car_list", function (req, res) {
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      var sql = "SELECT * FROM car_list";
      connection.query(sql, function (err, rows, fields) {
        if (err) {
          console.log("query is not excuted. select fail...\n" + err);
        } else {
          res.render("checker/car_list", {
            carlist: rows,
            userlist: req.session.loggedIn,
          });
        }
      });
    }
  });

  


router.get("/check_list/:carnum", function (req, res) {
  const carnum = req.params.carnum;
  var car_res;

  connection.query(
    "SELECT * FROM car_list WHERE car_id=?", 
    [carnum], 
    function (err,result) {
      if (err) {
        console.log("error");
      } else {
        console.log(result);
        car_res = result;
      }
    }
  );

  if (!req.session.loggedIn) {
    res.redirect("/logout");
  } else {
    connection.query(
      "SELECT * FROM car_list WHERE car_id=?", 
      [carnum], 
      function (err, rows, fields) {
        if (err) {
          console.log("query is not excuted. select fail...\n" + err);
        } else {
          res.render("checker/check_list", {
            userlist: req.session.loggedIn,
            carinfo: rows,
          });
        }
      }
    );
  }
});


router.post("/confirm", function (req, res) {
  const check1 = req.body.check1;
  const check2 = req.body.check2;
  const check3 = req.body.check3;
  const check4 = req.body.check4;
  const check5 = req.body.check5;
  const car_id = req.body.car_id;
  var check_etc;
  console.log("checketc = ", req.body.checketc);
  if (req.body.checketc == "") {
    check_etc = "N/A";
  } else {
    check_etc = req.body.checketc;
  }
  var check_time = moment().format("YYYYMMDDHHmmss");
  var confirm;

  const checks = check1 + check2 + check3 + check4 + check5;
  console.log(car_id, checks, check_etc, check_time);

  if(checks == "ttttt"){
    confirm = "pass"
  }else{
    confirm = "flase"
  }

  if (!req.session.loggedIn) {
    res.redirect("/logout");
  } else {
    connection.query(
      `update car_list set car_day = ?, car_result = ? where car_id=?`,
      [check_time, confirm, car_id],
      function(err, result){
        if(err){
          console.log(err);
        }else{
          console.log(result);
          connection.query(
            `insert into car_check (car_id, car_check, check_etc, time) values (?,?,?,?)`, 
            [car_id, checks, check_etc, check_time], 
            function (err, rows) {
              if (err) {
                  console.log("query is not excuted. select fail...\n" + err);
              } else {
                  res.redirect("/checker/car_list");
              }
            }
          )
        }
      }
    )
  };
});


  
module.exports= router;