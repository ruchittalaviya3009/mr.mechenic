const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const {Schema} = require('mongoose');
const search=mongoose.Schema

const service =new search({ 
    service_name:{
          type:String
      },
      dataimg:{
        type: String
    },
    price:{
        type:Number
    },
 
}, {timestamp:true}) 

module.exports = mongoose.model('servicedata',service)

