const mongoose = require('mongoose')
const sch=mongoose.Schema

const deta =new sch({
    serviceid:{
        type:mongoose.Schema.Types.ObjectId ,ref:'servicedata'
    },
    information:
        { type: Array }   
}, {timestamp:true}) 

const servicedetails = mongoose.model('arraydetailes',deta)
module.exports = servicedetails;