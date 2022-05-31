const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
    //res.send("첫페이지연결완료");
    res.render("03")
})

router.get('/second', (req, res)=>{
    //res.send("두번째페이지연결완료")
    res.render("04")
});



module.exports = router;

