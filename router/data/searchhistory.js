const mongoose = require('mongoose')
const searchhis=mongoose.Schema


const his=new searchhis({
       servicename:{
        type: String
       },
       img:{
            data:Buffer
       }
}, {timestamp:true}) 

const serhis = mongoose.model('searchhistory',his)
module.exports=serhis;