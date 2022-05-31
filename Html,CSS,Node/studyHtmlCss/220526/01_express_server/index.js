const express = require('express');
const app = express();
const mysql = require('mysql2');


app.set("views", __dirname + "/views");

/**
 * view engine으로 ejs를 사용한다.
 */
app.set('view engine', 'ejs');  

/**
 * json이라는 데이터의 타입이 존재, 이 json형식을 사용하겠다
 */
app.use(express.json());

/**
 * urlencoded를 확장하지 않겠다.
 */
app.use(express.urlencoded({ extended: false }))

const connection = mysql.createConnection({
    host: "darkpreist.iptime.org",
    port: 3306,
    user: "ticket",
    password: "1234",
    database: "test"
})

/**
 * @req 요청
 * @res 응답
 */
app.get("/", (req,res) => {
    res.render("index.ejs")
});

//get형식은 query에서 호출
app.get("/second", (req,res) => {
    console.log(req.query)
    if(!(req.query.id == "1234" && req.query.pass == "1234")){
        res.redirect("/");
    }
    res.render("second.ejs")
});

//post형식은 body에서 호출
app.post("/third", (req,res) => {
    connection.query(
        "select * from sales limit 10",
        (err, result)=>{
            if(err){
                console.log(err);
                res.redirect("/");
            }else{
                console.log(result);
                res.render("third.ejs", {
                    sales:result
                });
            }
        }
    )
});

//


let server = app.listen(3000, ()=>{
    console.log("server start")
})

/**
 * function func_1(매개변수){  //함수생성
 *  실행할 코드
 * }
 */

/**
 *  func_1(매개인자)    //함수호출
 */

// json 데이터의 형태
// let json = {key1:value1, key2:value2, ...}
// json.key1 ->value1

/*
    DB에 있는 데이터를 mysql2를 통해서 데이터를 받아오면
    json의 형태의 데이터를 출력을 해준다.
    데이터의 개수가 10개 출력 --> [{json1},{json2},{json3}...]
    []는 데이터의 타입이 리스트라는 타입
    let List1 = [5,7,1,3]
    5를 출력하려면 --> List1[0]
*/