const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
    //res.send("login first page");
    res.render("05")
})

router.get('/second', (req, res)=>{
    //res.send("login second page");
    res.render("06")
});

module.exports = router;

