const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.route('/').get((req, res) => {
  res.json('Hey there welcome again on dev stack channel');
});

io.on('connection', (socket) => {
  //Socket group
  socket.join('anomyous_group');
  console.log('backend connected');
  socket.on('sendMsg', (msg) => {
    console.log('msg', msg /* { ...msg, type: 'otherMsg' } */);
    /* socket.emit('sendMsgServer', { ...msg, type: 'otherMsg' }); */
    io.to('anomyous_group').emit('sendMsgServer', { ...msg, type: 'otherMsg' });
  });
});

//Prueba de git

httpServer.listen(3000);
