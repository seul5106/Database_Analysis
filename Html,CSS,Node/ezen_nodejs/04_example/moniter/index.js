var express = require("express");
var app = express();

var path = require("path");

app.set("views", path.join(__dirname, "views"));    //현재 폴더 + views 라는 폴더를 view의 기본 경로로 지정
app.set("view engine", "ejs");                      //  view engine을 ejs를 사용

app.use(express.json());                            //json 형식을 사용
app.use(express.urlencoded({ extended: false }));   //url 확장을 안 시키기 위해

var main = require("./routes/main");
app.use("/", main);       //localhost:3000 -> main.js를 사용한다

// app.use("/board", board); --> 추가를 하면 localhost:3000/board 요청이 들어오면 board를 사용을 한다
                                 
var port = 3000;
app.listen(port, function () {                          //웹서버를 시작을 할거다. 근데 port 번호는 port라는 변수를 지정할거다.
  console.log("웹 서버 시작", port);
});