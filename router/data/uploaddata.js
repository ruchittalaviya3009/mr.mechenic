const { Buffer } = require('buffer');
const mongoose = require('mongoose');
const sch=mongoose.Schema
const imageSchema = new sch({
    servicename:{
        type:String
    },
    img:
    {
        type: Array   
    }
}, {timestamp:true});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('uploaddata', imageSchema);