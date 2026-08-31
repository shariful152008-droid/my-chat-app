const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ফ্রন্টএন্ড HTML ফাইল সরাসরি রুট ডিরেক্টরি থেকে দেখানো
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// রিয়েল-টাইম কানেকশন এবং ডাটা আদান-প্রদান
io.on('connection', (socket) => {
    // চ্যাট মেসেজ হ্যান্ডেলার
    socket.on('chat message', (msgData) => {
        io.emit('chat message', msgData);
    });

    // সোশ্যাল মিডিয়া পোস্ট হ্যান্ডেলার
    socket.on('new post', (postData) => {
        io.emit('new post', postData);
    });

    // পোস্টে লাইক হ্যান্ডেলার
    socket.on('like post', (likeData) => {
        io.emit('like post', likeData);
    });

    // পোস্টে কমেন্ট হ্যান্ডেলার
    socket.on('comment post', (commentData) => {
        io.emit('comment post', commentData);
    });
});

// রেন্ডার সার্ভার পোর্ট ম্যানেজমেন্ট
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(সার্ভার সফলভাবে সচল হয়েছে পোর্ট: ${PORT});
});