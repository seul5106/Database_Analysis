const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');  

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res)=>{
    res.render('index.ejs')
});

app.post("/ajax", (req, res)=>{
    console.log(req.body.message);
    res.json({
        answer: "server request"
    })
});

app.get("/ajax2", (req, res)=>{
    let _name = req.query.name
    res.json({
        title : "test",
        html : "<p>ajax get</p>"
    })
})

app.get("/ajax_get", (req, res)=>{
    console.log(req.query.message)
    res.send("connect");
})

app.get("/ajax_getjson", (req, res)=>{
    res.send({
        answer: "server response"
    })
})

let port = 3000;
app.listen(port, ()=>{
    console.log("server start")
});

