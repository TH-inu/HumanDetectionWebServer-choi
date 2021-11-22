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


let pre_id = -1
function getSendData(socket) {
    let sql = 'select * from plot_pred_data where section = 2 order by id desc limit 20';
    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(row);
            let id = row[0]['id'];
            if (pre_id != id) {
                socket.emit("csiData", row);
                console.log("sending Data");
            }
            pre_id = id;
        }
    });
}

// socket 통신
const io = socketio(server);
io.on("connection", (socket) => {
    s = socket;
    console.log(`connect: ${socket.id}`);

    setInterval(getSendData, 2 * 1000, s);
    // setInterval()
    // // mysql events
    // var lastRowID = -1;
    // var mysqlEventWatcher = MySQLEvents(dbLoginInfo);
    // var watcher = mysqlEventWatcher.add(
    //     'test.plot_pred_data',
    //     function (oldRow, newRow, event) {
    //         console.log(oldRow);
    //         console.log(newRow);
    //         console.log(event);
            
    //         if (oldRow === null) {
    //             console.log(oldRow);
    //             console.log('insert');
    //             // var sql = 'select * from plot_pred_data order by id desc limit 1';
    //             // conn.query(sql, (err, row) => {
    //             //     if (err) {
    //             //         console.log(err);
    //             //     } else {
    //             //         // socket.emit("outlierData", row[0]);
    //             //          console.log(row[0]);
    //             //     }
    //             // });

    //             //console.log(newRow.changedColumns); // []
    //         }
    //         if (oldRow !== null && newRow !== null) {
    //             console.log('update');
    //         }
    //     },
    //     'Active'
    // );
});

// const mainPage = require('./routes/mainPage');
app.get('/mainPage', function(req, res) {
    var sql = 'select * from plot_pred_data order by id desc limit 20';
    conn.query(sql, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            // socket.emit("outlierData", row[0]);
            console.log(row[0]);
            res.render('../views/mainPages.ejs', { csi_data: row, port: port });
        }
    });
});
