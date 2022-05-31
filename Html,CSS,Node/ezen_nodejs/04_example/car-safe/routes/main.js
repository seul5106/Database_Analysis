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


router.get("/" ,function(req, res){
  if(!req.session.loggedIn) {
    res.redirect('/logout')
  } else {
    console.log(req.session.loggedIn);
    if (req.session.loggedIn.linkcode == 0) {
      res.render("manager/m_select_menu", {
        userlist: req.session.loggedIn
      });
    } else {
      res.redirect("/checker/car_list");
    }
  }
  
})


router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/signup", function (req, res) {
    res.render("main/signup", { errormessage: null });
  });


router.post("/signup", function (req, res) {
  // console.log(req.body)
  const id = req.body.id;
  const name = req.body.name;
  const password = req.body.password;
  const division = req.body.division;
  const linkcode = req.body.linkcode;
  let sql =  `select post_id from user_list where post_id=?`
  connection.query(sql,[id],
      function (err, users) {
      if (err) {
          res.render("main/signup", {
          errormessage: "오류 발생",
          user: req.session.loggedIn,
          });
      } else if (users.length > 0) {
          res.render("main/signup", {
          errormessage: "이미 존재하는 이메일",
          user: req.session.loggedIn,
          });
      } else {
          console.log(id);
          console.log(password);
          console.log(name);
          console.log(division);
          console.log(linkcode);
          let sql = `insert into user_list (post_id, password, name, division, linkcode) values (?, ?, ?, ?, ?, ?)`
          connection.query(sql,[id, password, name, division, linkcode],
          function (err2, result) {
              if (err2) {
              res.render("main/signup", {
                  errormessage: "생성 오류",
                  user: req.session.loggedIn,
              });
              } else {
              console.log("생성완료");
              res.redirect("/login");
              }
          }
          );
      }
      }
  );
});

router.get("/login", function (req, res) {
    res.render("main/login", { error: false, user: req.session.loggedIn });
  });

router.post("/login", function (req, res) {
    
    var id = req.body.id;
    const password = req.body.password;
    let sql = "select * from user_list WHERE post_id=? and password=?"
    connection.query(sql,[id, password],
      function (err, users) {
        if (err) {
          console.log(err); // 오류
          res.send("error");
        } else if (users.length > 0) {
          req.session.loggedIn = users[0];
          console.log(req.session.loggedIn.password);
          if (users[0].linkcode == 0) {
            res.render("manager/m_select_menu", {
              userlist: req.session.loggedIn,
            });
          } else {
            res.redirect("/checker/car_list");
          }
        } else {
          res.render("main/login", { error: true, user: req.session.loggedIn });
        }
      }
    );
});

//내 정보 확인 
router.get("/info", function(req, res, next){
  console.log("info enter");
  res.render("main/info", {
    userlist: req.session.loggedIn
  });
})

module.exports= router;