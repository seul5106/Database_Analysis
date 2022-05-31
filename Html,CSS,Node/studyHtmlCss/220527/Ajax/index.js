const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');  

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res)=>{
    res.render('index.ejs')
});

app.get("/ajax", (req, res)=>{
    let _name = req.query.name
    res.json({
        title : "test",
        html : "<p>ajax get</p>"
    })
})


let port = 3000;
app.listen(port, ()=>{
    console.log("server start")
});

