const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server, {
   cors: {
     origin: "*",
   },
 });
 const {adduser,removeuser,getuser,getusersinroom} = require('../Auth/users')

 const realtime = (req,res) =>{
    io.on('connection',(socket) => {
        console.log('we have new connsectiion')
        
        socket.on('join',({name,room},cb) => {
           const { error , user } = adduser({ id : socket.id , name ,room })
            if(error) {
               return cb(error)
            }
            socket.emit('message',{user:'admin',text :`${user.name}, Welcome to the room ${user.room}` });
            socket.broadcast.to(user.room).emit('message', { user : 'admin' , text : `${user.name}, has joined !` })
     
            socket.join(user.room);
     
            io.to(user.room).emit('roomdata' , { room:user.room ,users : getusersinroom(user.room)})
     
            cb();
        })
     
        socket.on('sendmessage', (message ,cb) => {
           const user = getuser(socket.id);
             
           io.to(user.room).emit('message' , { user : user.name , text : message})
           io.to(user.room).emit('roomdata' , { room : user.room , users : getusersinroom(user.room)})
     
           cb();
        })
     
        socket.on('disconnecct',() => {
           const user = removeuser(socket.id)
     
           if(user) {
              io.to(user.room).emit('message' , { user:'admin' ,text: `${user.name} has left`})
           }
        })
     })
 }

 module.exports = {realtime}