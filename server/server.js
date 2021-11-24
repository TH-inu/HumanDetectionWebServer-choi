const express  = require('express');
const socketio = require('socket.io');
const MySQLEvents = require('mysql-events');
const ejs = require('ejs');
const mysql = require('mysql');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// server listener
const port = 3000;
const server = app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});

// db 접속
const conn = require('../conf/db');
const dbLoginInfo = require('../conf/db_login');
conn.connect();

// 데이터 받아서 Web Page에 넘기는 함수
let pre_id = [-1, -1, -1];
// function getFromDBSendToWeb(socket, section) {
//     let sql = 'select * from HT_plot_pred_data where section = '+section+' order by id desc limit 20';
//     conn.query(sql, (err, row) => {
//         if (err) {
//             console.log(err);
//         } else {
//             let id = row[0]['id'];
//             if (pre_id[section-1] != id) {
//                 console.log(id);
//                 socket.emit("csiData"+section, row);
//                 console.log("sending Data"+section);
//             }
//             pre_id[section-1] = id;
//         }
//     });
// }

function getFromDBSendToWeb(section) {
    let sql = 'select * from HT_plot_pred_data where section = '+section+' order by id desc limit 20';
    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            let id = row[0]['id'];
            if (pre_id[section-1] != id) {
                console.log(id);
                console.log("sending Data"+section);
                res.json(row)
            }
            pre_id[section-1] = id;
        }
    });
}

// socket 통신
const io = socketio(server);
io.on("connection", (socket) => {
    s = socket;
    console.log(`connect: ${socket.id}`);
});

app.get('/mainPage', function(req, res) {
    var sql = 'select * from HT_plot_pred_data where section = 1 order by id desc limit 20';
    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row[0]);
            res.render('../views/mainPages.ejs', { csi_data: row, port: port });
        }
    });
    // res.render('../views/mainPages.ejs', { port: port });
});

app.post('/mainPage/getData', function(req, res) {
    console.log(req.body.section);
    getFromDBSendToWeb(req.body.section);
    // setInterval(getFromDBSendToWeb, 5000, s, 1);  // 2초에 한번 데이터 보내는 함수 실행
    //         setInterval(getFromDBSendToWeb, 5000, s, 2);  // 2초에 한번 데이터 보내는 함수 실행
    //         setInterval(getFromDBSendToWeb, 5000, s, 3);  // 2초에 한번 데이터 보내는 함수 실행
})

// const corsOptions = {
//     origin: 'https://192.168.35.88:3000',
//     credentials: true, 
//   };
  
//   app.use(cors(corsOptions));