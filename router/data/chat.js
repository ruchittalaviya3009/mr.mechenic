const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type:String,
    },
    room: {
        type: String,
    },
    type : {
        type: String
    },
}, {timestamps: true});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat }