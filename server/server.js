const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB холболт
mongoose.connect('mongodb://localhost:27017/superapp');

// Real-time Chat (Socket.io)
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
  console.log('Хэрэглэгч чатанд холбогдлоо:', socket.id);
  
  socket.on('send_message', (data) => {
    // Групп болон хувийн чат руу мессеж илгээх
    io.emit('receive_message', data);
  });
});

server.listen(5000, () => console.log("Сервер 5000 порт дээр аслаа"));