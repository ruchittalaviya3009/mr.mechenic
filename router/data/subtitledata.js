const mongoose = require('mongoose')
const sch=mongoose.Schema
// const servicedata =require('../data/servicedata')

const userschema =new sch({
  // _id: mongoose.Schema.Types.ObjectId,
    servicetype:{
        type: String,
       },   
       service_id:
       { 
         type : mongoose.Schema.Types.ObjectId,
         ref : 'servicedata'
       //  required:true
       }
}, {timestamp:true}) 

module.exports  = mongoose.model('subtitledata',userschema)