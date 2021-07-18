'use strict';

const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const users = {
    David: 'room1'
};

app.use(express.static(path.join(__dirname, 'client')));
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: { origin: 'http://localhost:8080' }
});

io.use((socket, next) => {
    console.log(Buffer.from(socket.handshake.headers['x-access-token'], 'base64').toString('utf-8'));
    next();
});

io.on('connection', socket => {
    io.use((socket, next) => {
        console.log(Buffer.from(socket.handshake.headers['x-access-token'], 'base64').toString('utf-8'));
        next();
    });
    socket.on("login", ({name, room}, callback) => {
        users[name] = room;
        socket.join(users[name]);
    })

    socket.on('chat:message', message => {
        io.in(users[message.name]).emit('chat:message', message);
    })
})

app.get('/api/ws', (req, res) => {
})


server.listen(8080, () => console.log(`listening at ${8080}`));
