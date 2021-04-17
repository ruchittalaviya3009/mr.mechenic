const { Buffer } = require('buffer');
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const search=mongoose.Schema


const msearch =new search({
      q:{
         type:String
      },
      servicename:{
          type:String
      },
      img:
      {
          data: Buffer
      }
}, {timestamp:true}) 

const user = mongoose.model('msearchdata',msearch)
module.exports=user;