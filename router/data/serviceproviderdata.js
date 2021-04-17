const mongoose = require('mongoose')
const serviceprovider=mongoose.Schema

const serviceschema =new serviceprovider({
       firmname:{
           type: String,
           required:true
       },
       ownername:{
        type: String,
        required:true
       },
       email:{
        type: String,
        required:true
       },
       servicetype:{
        type: String,
        required:true
       },
       password:{
        type: String,
        required:true,
        min:8
       },
       confirmpass:{
        type: String,
        required:true,
       },
       resetlink:{
           data:String,
           default:''
       }
}, {timestamp:true}) 

const serprovider = mongoose.model('serviceprovider',serviceschema)
module.exports=serprovider;
