const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// db 연결
// const conn = require('../conf/db.js');
// conn.connect();

// 보안 허용
app.use(cors());

// 서버 열기
const port =process.env.PORT || 3001;   // port num 3001
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

// localhost:3000/api
app.use(bodyParser.json());
app.use('/api', (req, res)=> { 
    res.json({username:'TH'});  // TH를 react로 전송
});