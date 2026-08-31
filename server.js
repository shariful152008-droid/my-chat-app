
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('একজন ইউজার চ্যাটে যুক্ত হয়েছেন');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('ইউজার চলে গেছেন');
    });
});

server.listen(3000, () => {
    console.log('সার্ভার চালু হয়েছে: http://localhost:3000');
});