var express = require("express");
var app = express();
require('dotenv').config();                         //보안적인 이유로 사용한다. github 같은 오픈소스 공개를 하게될때 .env 파일을 업로드 하지 않으면 정보를 확인 할수 없다
var moment = require("moment");
require("moment-timezone");

var path = require("path");
var session = require("express-session");

app.set("views", path.join(__dirname, "views"));    //현재 폴더 + views 라는 폴더를 view의 기본 경로로 지정
app.set("view engine", "ejs");                      //  view engine을 ejs를 사용

app.use(express.json());                            //json 형식을 사용
app.use(express.urlencoded({ extended: false }));   //url 확장을 안 시키기 위해
app.use(express.static(path.join(__dirname, "public")));  //ejs 파일내에서 link를 사용할 때 기본 경로로 지정

app.use(                                            //session을 정의한다. 옵션을 지정해준다.
  session({
      secret : process.env.session_secret,
      resave : false,
      saveUninitialized : true,
      maxAge : 3600000,
  })
)



var login = require("./routes/login_");
app.use("/", login);                                    //기본 url(localhost:3000/)로 접속을 하면 login.js를 적용

var main = require("./routes/main");
app.use("/board", main);                                //localhost:3000/board/ 로 접속을 하면 main.js를 적용


var port = 3000;
app.listen(port, function () {                          //웹서버를 시작을 할거다. 근데 port 번호는 port라는 변수를 지정할거다.
  console.log("웹 서버 시작", port, moment().format('HHmmss'));
});







