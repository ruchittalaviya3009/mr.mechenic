const mongoose = require('mongoose')
const sch=mongoose.Schema

const userschema =new sch({
       firstname:{
           type: String,
           required:true
       },
       lastname:{
        type: String,
        required:true
       },
       email:{
        type: String,
        required:true
       },
       password:{
        type: String,
        minlength:6      
       },
       confirmpass:{
        type: String,
        minlength:6
       },
       token:{
        type: String,
        default:''
       },
       resetlink:{
           data:String,
           default:''
       }
}, {timestamp:true}) 

const user = mongoose.model('User',userschema)
module.exports=user;