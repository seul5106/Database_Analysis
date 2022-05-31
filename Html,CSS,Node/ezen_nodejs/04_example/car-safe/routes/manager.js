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


  router.get("/m_select_menu", function (req, res) {
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      connection.query(
        "SELECT name, division FROM user_list where post_id = ?",
        [req.session.loggedIn.post_id],
        function (err, result, fields) {
          if (err) {
            console.log(err);
          } else {
            res.render("manager/m_select_menu", {
              userlist: result,
              user: req.session.loggedIn,
            });
          }
        }
      );
    }
  });
  
  router.get("/m_check_list", function (req, res) {
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      var sql = "SELECT * FROM car_list";
      connection.query(sql, function (err, rows, fields) {
        if (err) {
          console.log("query is not excuted. select fail...\n" + err);
        } else {
          connection.query(
            "SELECT * FROM user_list where post_id = ?",
            [req.session.loggedIn.post_id],
            function (err, result, fields) {
              if (err) {
                console.log(err);
              } else {
                res.render("manager/m_check_list", {
                  carlist: rows,
                  userlist: result,
                  user: req.session.loggedIn,
                });
              }
            }
          );
        }
      });
    }
  });
  
  router.get("/m_car_list", function (req, res) {
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      var sql = "SELECT * FROM car_list";
      connection.query(sql, function (err, rows, fields) {
        if (err) {
          console.log("query is not excuted. select fail...\n" + err);
        } else {
          connection.query(
            "SELECT * FROM user_list where post_id = ?",
            [req.session.loggedIn.post_id],
            function (err, result, fields) {
              if (err) {
                console.log(err);
              } else {
                res.render("manager/m_car_list", {
                  carlist: rows,
                  userlist: result,
                  user: req.session.loggedIn,
                });
              }
            }
          );
        }
      });
    }
  });
  
  router.get("/m_checklist_detail1/:car_id", function (req, res) {
    const carnum = req.params.car_id;
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      connection.query(
        "SELECT * FROM car_check where car_id = ? order by time desc",
        [carnum],
        function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                res.render("manager/m_checklist_detail1", {
                    carlist: result,
                    carnum: carnum,
                    userlist: req.session.loggedIn,
                });
            }
        }
      );
    }
  });
  
  router.get("/m_car_info/:car_id", function (req, res) {
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      const carnum = req.params.car_id;
      connection.query(
        "SELECT * FROM car_list where car_id = ?",
        [carnum],
        function (err, rows, fields) {
          if (err) {
            console.log("query is not excuted. select fail...\n" + err);
          } else {
            connection.query(
              "SELECT name, division FROM user_list where post_id = ?",
              [req.session.loggedIn.post_id],
              function (err, result, fields) {
                if (err) {
                  console.log(err);
                } else {
                  res.render("manager/m_car_info", {
                    carlist: rows,
                    userlist: result,
                    user: req.session.loggedIn,
                  });
                }
              }
            );
          }
        }
      );
    }
  });
  
  router.get("/m_car_update/:car_id", function (req, res) {
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      const carnum = req.params.car_id;
      connection.query(
        "SELECT * FROM car_list where car_id = ?",
        [carnum],
        function (err, rows, fields) {
          if (err) {
            console.log("query is not excuted. select fail...\n" + err);
          } else {
            res.render("manager/m_car_update", {
              carlist: rows,
              userlist: req.session.loggedIn,
            });
          }
        }
      );
    }
  });
  
  
  router.post("/m_car_update", function (req, res) {
    const car_id = req.body.car_id;
    const car_div = req.body.car_div;
    const car_type = req.body.car_type;
    const car_birth = req.body.car_birth;
    const car_day = req.body.car_day;
    const var_result = req.body.var_result;

    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      connection.query(
        "UPDATE car_list SET car_id = ?, car_div = ?, car_type = ?, car_birth = ?, car_day = ?, car_result = ? where car_id = ?",
        [car_id, car_div, car_type, car_birth, car_day, var_result, car_id],
        function (err, rows, next) {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/manager/m_car_list");
          }
        }
      );
    }
  });
  
  
  router.get("/m_add_car", function (req, res) {
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      var sql = "SELECT * FROM car_list";
      connection.query(sql, function (err, rows, fields) {
        if (err) {
          console.log("query is not excuted. select fail...\n" + err);
        } else {
          res.render("manager/m_add_car", {
            carlist: rows,
            userlist: req.session.loggedIn,
          });
        }
      });
    }
  });
  
  router.post("/m_add_car", function (req, res) {
    const car_id = req.body.car_id;
    const car_div = req.body.car_div;
    const car_type = req.body.car_type;
    const car_birth = req.body.car_birth;
    const car_day = req.body.car_day;
    const var_result = req.body.var_result;
    console.log(car_id, car_div, car_type, car_birth, car_day, var_result);
  
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      connection.query(
        `INSERT INTO car_list (car_id, car_div, car_type, car_birth, car_day, car_result)
                  values (?, ?, ?, ?, ?, ?)`,
        [car_id, car_div, car_type, car_birth, car_day, var_result],
        function (err, result) {
          if (err) {
            console.log("error");
          } else {
            res.redirect("/manager/m_car_list");
          }
        }
      );
    }
  });
  
  router.get("/m_car_info/delete/:num", function (req, res) {
    if (!req.session.loggedIn) {
      res.redirect("/logout");
    } else {
      const carnum = req.params.num;
      connection.query(
        `delete from car_list where car_id = ?`,
        [carnum],
        function (err, result) {
          if (err) {
            console.log(err);
            res.render("error");
          } else {
            res.redirect("/manager/m_car_list");
          }
        }
      );
    }
  });
  
  
module.exports= router;