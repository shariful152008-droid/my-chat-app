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
    socket.on('chat message', (msgData) => {
        io.emit('chat message', msgData);
    });
    socket.on('new post', (postData) => {
        io.emit('new post', postData);
    });
    socket.on('like post', (likeData) => {
        io.emit('like post', likeData);
    });
    socket.on('comment post', (commentData) => {
        io.emit('comment post', commentData);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(সার্ভার সফলভাবে সচল হয়েছে পোর্ট: ${PORT});
});
