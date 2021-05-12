const mongoose = require('mongoose')
const sch=mongoose.Schema

const paymentschema =new sch({
       name:{
           type: String,
           required:true
       },
       email:{
        type: String,
        required:true
       },
       amount:{
        type: String,
        required:true
       },
       paymentid:{
        type: String
       },
       status:{
           data:String
       }
}, {timestamp:true}) 

const payment = mongoose.model('paymentdata',paymentschema)
module.exports=payment;