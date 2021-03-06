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
let pre_id = [-1, -1, -1, -1];
function getFromDBSendToWeb(res, section) {
    let sql = 'select * from plot_pred_data where section = '+section+' order by id desc limit 20';
    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            // if (row.length == 0) res.json(0);
            let id = row[0].id
            console.log(id);
            if (pre_id[section-1] != id) {
                // console.log(id);
                console.log("sending Data"+section);
                res.json(row)
            }
            else {
                res.json(0);
            }
            pre_id[section-1] = id;
        }
    });
}

// ajax 통신
app.get('/mainPage', function(req, res) {
    pre_id = [-1, -1, -1, -1];
    var sql = 'select * from plot_pred_data where section = 1 order by id desc limit 20';
    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            console.log(row[0]);
            res.render('../views/mainPages.ejs', { csi_data: row, port: port });
        }
    });
});

app.post('/mainPage/getData', function(req, res) {
    console.log("section: ", req.body.section);
    getFromDBSendToWeb(res, req.body.section);
})