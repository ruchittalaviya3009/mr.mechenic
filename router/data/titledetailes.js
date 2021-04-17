const mongoose = require('mongoose')
const sch=mongoose.Schema

const deta =new sch({
    service_details_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subtitledata'
    },
    information:{
           type: String ,
       }
     
     
}, {timestamp:true}) 

const servicedetails = mongoose.model('titledetailes',deta)
module.exports = servicedetails;