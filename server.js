const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let campanha = { eventos: [], fichas: [], logs: [] };

io.on('connection', socket => {
  socket.emit('sync', campanha);
  socket.on('updateCampanha', data => {
    campanha = data;
    socket.broadcast.emit('sync', campanha);
  });
});

server.listen(3000, () => console.log('HxH VTT online'));