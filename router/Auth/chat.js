const mongoose = require('mongoose');
const chat = require('../data/chat');
const chat = mongoose.model('chats')

const home = (app,io) => {
    app.get("/api" , async(req,res) =>{
        const chatlist = await chat.find()
        .sort({date : -1})
        .limit(4);
        return res.json({chats:chatlist}); 
    })

    io.of("/").on("connect" , async socket=>{
        console.log("connected");
 
        socket.on("typing" , async msg =>{
            console.log(msg);
            socket.broadcast.emit("typing",{msg :msg.name});
        });

        try {
            socket.on("msg" , async msg => {
                 
            const chatlist = await chat.find()
            .sort({ date : -1})
            .limit(4);
            io.emit("msg" , { chats : chatlist })

            const chat = new chat({
                username : msg.name,
                message : msg.msg
            });
            await chat.save();
        
            const chats = await chat.find()
            .sort({ date : -1})
            .limit(4);
            io.emit("msg" , { chats : chats });
        
            }
         )}catch (err) {
            console.error(err.message);
        }
    })
}

module.exports = {home}