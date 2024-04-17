const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/customer', (req, res) => {
    return res.sendFile(__dirname + '/views/customer.html');
});

app.get('/shop', (req, res) => {
    return res.sendFile(__dirname + '/views/shop.html');
});


const server = app.listen(3000, () => console.log('application listening at http://localhost:3000'));

const io = socket(server);

// เมื่อเกิดเหตุการ connect
io.on('connection', (socket) => {
    console.log('client socket connected');

    socket.on('order', (response) => {
        console.log(response);

        // ส่งข้อมูลที่ได้จาก client ไปให้ client อีกที่หนึ่งที่ระรับอยู่
        io.sockets.emit('shop', response);
    });
});