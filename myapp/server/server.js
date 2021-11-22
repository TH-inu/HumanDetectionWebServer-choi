const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// db 연결
const conn = require('../conf/db.js');
conn.connect();

// 보안 허용
app.use(cors());

// 서버 열기
const port =process.env.PORT || 5001;   // port num 3001
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

// localhost:3000/api
var pre_id = -1;
var first_show = true;
app.use(bodyParser.json());
app.use('/api', (req, res)=> {
    res.writeHead(200, { 
        "Content-Type"  : "text/event-stream",
        "Cache-Control" : "no-cache",
        "Connection": "keep-alive"
    })
    var sql = 'select id, section, csi_data from ploting_data where section=2 order by id desc limit 20';
    setInterval(() => {
        conn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(err);
            } else {
                // console.log('rows: ', rows);
                // console.log('fields', fields);

                // res.set({
                //     "Content-Type"  : "text/event-stream",
                //     "Cache-Control" : "no-cache",
                //     Connection: "keep-alive",

                //     "Access-Control-Allow-Otrigin": "*",
                //     "Access-Control-Aloow-Headers":
                //         "Origin, X-Requested-With, Content-Type, Accept"
                // });
                // res.setHeader("Content-Type","text/event-stream");
                // res.setHeader("Cache-Control","no-cache");
                // res.setHeader("Access-Control-Allow-Otrigin","*");
                // countdown(res,10);
                var id = rows[0]['id'];
                console.log(id);
                // if (first_show == true) {
                //     res.json({csiData: rows});  // TH를 react로 전송
                // }
                if (pre_id == id) {
                    // setInterval(() => {
                    //     res.write(`data: ${JSON.stringify(rows)}\n\n`);
                    //     console.log("${JSON.stringify(getData())");
                    // }, 2000);
                    // console.log('rows: ', rows);
                    console.log("send data");
                    res.write(`data: ${JSON.stringify(rows)}\n\n`);
                    // res.json({csiData: rows});  // TH를 react로 전송
                }
                pre_id = id;
                // res.json({csiData: rows});  // TH를 react로 전송
            }
        }, 10*1000);
    });
    req.on('close', (err) => {
        clearInterval(eventInterval);
        res.end();
    });
    // var csiData = [{id:37, section:1, csi_data:[112, 15, 0, 0, 0, 0, 8, 10, 13, 15, 16, 18, 19, 19, 18, 17, 16, 15, 13, 10, 9, 7, 9, 11, 13, 16, 18, 20, 21, 22, 22, 20, 0, 17, 15, 13, 11, 10, 9, 10, 12, 13, 15, 16, 17, 17, 16, 16, 15, 15, 13, 12, 12, 12, 13, 15, 17, 18, 18, 0, 0, 0, 0], predict:4, total_predict:4},
    // {id:38, section:2, csi_data:[18, 14, 0, 0, 0, 0, 12, 14, 16, 17, 18, 18, 19, 18, 18, 16, 17, 17, 15, 15, 15, 15, 15, 16, 16, 17, 18, 18, 21, 23, 25, 25, 0, 24, 21, 20, 18, 14, 12, 12, 13, 17, 21, 25, 27, 29, 30, 31, 30, 27, 23, 17, 14, 11, 9, 12, 16, 19, 20, 0, 0, 0, 0], predict:4, total_predict:4},
    // {id:39, section:3, csi_data:[18, 14, 0, 0, 0, 0, 8, 10, 11, 12, 14, 16, 16, 17, 16, 13, 13, 12, 12, 12, 13, 14, 17, 16, 16, 15, 13, 12, 10, 8, 8, 10, 0, 13, 13, 15, 16, 17, 17, 16, 15, 15, 14, 13, 13, 15, 15, 20, 21, 20, 23, 23, 22, 20, 19, 18, 18, 18, 18, 0, 0, 0, 0], predict:4, total_predict:4},
    // {id:40, section:1, csi_data:[112, 15, 0, 0, 0, 0, 8, 10, 13, 15, 16, 18, 19, 19, 18, 17, 16, 15, 13, 10, 9, 7, 9, 11, 13, 16, 18, 20, 21, 22, 22, 20, 0, 17, 15, 13, 11, 10, 9, 10, 12, 13, 15, 16, 17, 17, 16, 16, 15, 15, 13, 12, 12, 12, 13, 15, 17, 18, 18, 0, 0, 0, 0], predict:4, total_predict:4},
    // {id:41, section:2, csi_data:[18, 14, 0, 0, 0, 0, 12, 14, 16, 17, 18, 18, 19, 18, 18, 16, 17, 17, 15, 15, 15, 15, 15, 16, 16, 17, 18, 18, 21, 23, 25, 25, 0, 24, 21, 20, 18, 14, 12, 12, 13, 17, 21, 25, 27, 29, 30, 31, 30, 27, 23, 17, 14, 11, 9, 12, 16, 19, 20, 0, 0, 0, 0], predict:4, total_predict:4},
    // {id:42, section:3, csi_data:[18, 14, 0, 0, 0, 0, 8, 10, 11, 12, 14, 16, 16, 17, 16, 13, 13, 12, 12, 12, 13, 14, 17, 16, 16, 15, 13, 12, 10, 8, 8, 10, 0, 13, 13, 15, 16, 17, 17, 16, 15, 15, 14, 13, 13, 15, 15, 20, 21, 20, 23, 23, 22, 20, 19, 18, 18, 18, 18, 0, 0, 0, 0], predict:4, total_predict:4}]


    // conn.query(sql, (err, rows, fields) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         // console.log('rows: ', rows);
    //         // console.log('fields', fields);

    //         // res.set({
    //         //     "Content-Type"  : "text/event-stream",
    //         //     "Cache-Control" : "no-cache",
    //         //     Connection: "keep-alive",

    //         //     "Access-Control-Allow-Otrigin": "*",
    //         //     "Access-Control-Aloow-Headers":
    //         //         "Origin, X-Requested-With, Content-Type, Accept"
    //         // });
    //         // res.setHeader("Content-Type","text/event-stream");
    //         // res.setHeader("Cache-Control","no-cache");
    //         // res.setHeader("Access-Control-Allow-Otrigin","*");
    //         // countdown(res,10);
    //         var id = rows[0]['id'];
    //         console.log(id);
    //         // if (first_show == true) {
    //         //     res.json({csiData: rows});  // TH를 react로 전송
    //         // }
    //         if (pre_id != id) {
    //             // setInterval(() => {
    //             //     res.write(`data: ${JSON.stringify(rows)}\n\n`);
    //             //     console.log("${JSON.stringify(getData())");
    //             // }, 2000);
    //             // console.log('rows: ', rows);
    //             console.log("send data");
    //             // res.write(`data: ${JSON.stringify(rows)}\n\n`);
    //             // res.json({csiData: rows});  // TH를 react로 전송
    //         }
    //         pre_id = id;
    //         res.json({csiData: rows});  // TH를 react로 전송
    //     } 
    // })           
});