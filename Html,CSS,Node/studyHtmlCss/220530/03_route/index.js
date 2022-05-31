const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const main = require('./routes/main')
app.use("/", main);

const login = require('./routes/login')
app.use("/login", login)



const port = 3000;
app.listen(port, () => {
    console.log('server start')
});

