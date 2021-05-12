const express = require('express');
const app = express();
// const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = require('../ru')
const cors=require('cors')
require("dotenv").config();
const path=require('path')
const authroute = require('../route/auth')
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')

const io = socketio(server, {
   cors: {
     origin: "*",
   },
 });
const {adduser,removeuser,getuser,getusersinroom} = require('../Auth/users')


router.use(cors())
app.use(authroute);

mongoose.connect("mongodb://localhost/ruchit", {useNewUrlParser:true}, { useUnifiedTopology: true } )
const con=mongoose.connection;
con.on('open',(req,res)=>{
console.log("connect");
});

const { chat } = require('../data/chat')

// io.on("connection", socket => {

//    socket.on("Input Chat Message", msg => {
 
//      connect.then(db => {
//        try {
//            let chat = new Chat({ message: msg.chatMessage, sender:msg.userID, type: msg.type })
 
//            chat.save((err, doc) => {
//              if(err) return res.json({ success: false, err })
 
//              Chat.find({ "_id": doc._id })
//              .populate("sender")
//              .exec((err, doc)=> {
 
//                  return io.emit("Output Chat Message", doc);
//              })
//            })
//        } catch (error) {
//          console.error(error);
//        }
//      })
//     })
 
//  })
 

io.on('connection',(socket) => {
   console.log('we have new connction')
   chat.find({},function(err,doc){
     if(err) throw err;
     socket.emit('load old msg',doc)
   })
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
        var chatdata = new chat({
          msg:message,
          room:user.room
        })
        chatdata.save(function(err){
          io.to(user.room).emit('message' , { user : user.name , text : message})
          io.to(user.room).emit('roomdata' , { room : user.room , users : getusersinroom(user.room)})
        })
      cb();
   })

   socket.on('disconnecct',() => {
      const user = removeuser(socket.id)

      if(user) {
         io.to(user.room).emit('message' , { user:'admin' ,text: `${user.name} has left`})
      }
   })
})


// if (!config.get('PrivateKey')) {
//    console.error('FATAL ERROR: PrivateKey is not defined.');
//    process.exit(1);
// }

// Require static assets from public folder
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/profile', express.static('public/upload'));
app.use('/service', express.static('public/serviceimage'));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'upload'));

app.use(express.static(path.join(__dirname, "public")));
app.use('/', express.static('upload/images'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('Authuploads/', express.static('Authuploads'));

// const rurouter = require('../ru')
app.use('/ru',authroute)
app.listen(3000,()=>{
   console.log("server listen on 3000 port")
});
