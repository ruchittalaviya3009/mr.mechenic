const mongoose=require('mongoose')

const rschema=new mongoose.Schema({
     firstname:{
         type:String,
         required:true
     },
     lastname:{
         type:String,
         required:true
     }
});

module.exports=mongoose.model('ali',rschema)