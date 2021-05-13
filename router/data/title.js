const mongoose = require('mongoose')
const sch = mongoose.Schema

let ruchit = new mongoose.Schema({
    i1: { type: String, required: true},
    i2:{ type: String, required: true},
    i3:{ type: String, required: true}
  });
  
  let ruchit1 = new mongoose.Schema({
    i1: { type: String, required: true},
    i2:{ type: String, required: true},
    i3:{ type: String, required: true}
  });
const deta =new sch({
    service_details_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subtitledata'
    },
    information:{
        type:[ruchit],
    },
    information1:{
        type:[ruchit1] 
    }
     
     
}, {timestamp:true}) 

const servicedetails = mongoose.model('title',deta)
module.exports = servicedetails;