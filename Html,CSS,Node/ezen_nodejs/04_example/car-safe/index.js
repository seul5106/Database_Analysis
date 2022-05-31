var express = require("express");
var app = express();

var path = require("path");
var session = require("express-session");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "eewrwerwe",
    resave: false,
    saveUninitialized: true,
  })
);

const apiRouter = require('./routes/main')
app.use('/', apiRouter)

const checkerRouter = require('./routes/checker')
app.use('/checker', checkerRouter)

const managerRouter = require('./routes/manager')
app.use('/manager', managerRouter)

var port = 8080;
app.listen(port, function () {
  console.log("웹 서버 시작", port);
});
