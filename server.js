const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ফ্রন্টএন্ড ফাইলগুলো দেখানোর জন্য রুট সেটআপ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// রিয়েল-টাইম কানেকশন এবং ডেটা আদান-প্রদান
io.on('connection', (socket) => {
    console.log('একজন ইউজার নেটওয়ার্কে যুক্ত হয়েছেন');

    // ১. রিয়েল-টাইম চ্যাট মেসেজ হ্যান্ডেলার
    socket.on('chat message', (msgData) => {
        io.emit('chat message', msgData); // সবার কাছে মেসেজ ও টাইম পাঠানো
    });

    // ২. সোশ্যাল মিডিয়া পোস্ট হ্যান্ডেলার
    socket.on('new post', (postData) => {
        io.emit('new post', postData); // নতুন পোস্ট সবার টাইমলাইনে পাঠানো
    });

    // ৩. পোস্টে রিয়েল-টাইম লাইক হ্যান্ডেলার
    socket.on('like post', (likeData) => {
        io.emit('like post', likeData);
    });

    // ৪. পোস্টে রিয়েল-টাইম কমেন্ট হ্যান্ডেলার
    socket.on('comment post', (commentData) => {
        io.emit('comment post', commentData);
    });

    socket.on('disconnect', () => {
        console.log('ইউজার ডিসকানেক্ট হয়েছেন');
    });
});

// রেন্ডার পোর্ট এবং লোকাল হোস্ট পোর্ট ম্যানেজমেন্ট
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(সার্ভার সফলভাবে সচল হয়েছে পোর্ট: ${PORT});
});