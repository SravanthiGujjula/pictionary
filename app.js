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
   
    client.on('newShape', (data)=>{
        console.log(' new shape started');
        client.broadcast.emit('newShape',data);
    })
    client.on('newPoint', (data)=>{
        console.log(' new point added');
        client.broadcast.emit('newPoint',data);
    })
    client.on('undo', (data)=>{
        console.log(data);
        client.broadcast.emit('undo',null);
    })
})

app.use(express.static('public')); 

server.listen(3000,()=>console.log(' hello 3000'));
