const express = require('express');
import { Server } from 'socket.io';
import { createServer } from 'http';
const server = createServer();

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials:true,
    methods:["POST", "GET"]
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});