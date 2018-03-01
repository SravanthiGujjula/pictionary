const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
// console.log(socketIo);
// const io = socketIo.


// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname,'app','index.html'));
// })

io.on('connection', (client)=>{
    console.log('New client Joined');
    // client.emit('new-client',)
    client.on('mouseMoved', (data)=>{
        client.broadcast.emit('drawMouse',data);
    })
})

app.use(express.static('public')); 

server.listen(3000,()=>console.log(' hello 3000'));
