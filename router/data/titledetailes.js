const mongoose = require('mongoose')
const sch=mongoose.Schema

let ruchit = new mongoose.Schema({
    i1: { type: String, required: true},
    i2:{ type: String, required: true},
    i3:{ type: String, required: true}
  });
  
  let ruchit1 = new mongoose.Schema({
    i4: { type: String, required: true},
    i5:{ type: String, required: true},
    i6:{ type: String, required: true}
  });
const deta =new sch({
    service_details_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subtitledata'
    },
    information:{
        type:[ruchit],
        // type:[ruchit1]
    },
    information1:{
        type:[ruchit1] 
    }
     
     
}, {timestamp:true}) 

const servicedetails = mongoose.model('titledetailes',deta)
module.exports = servicedetails;