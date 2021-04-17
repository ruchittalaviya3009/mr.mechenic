const { isEqualWith } = require('lodash')
const path=require('path')
const mongoose=require('mongoose')
const msd=require('../data/msearchdata')
const his=require('../data/searchhistory')
const service=require('../data/servicedata')

const searc=(req,res)=>{
  var regex=new RegExp(req.params.servicename)
    let serhis= new his({
      servicename:regex,
      img:Buffer.toString()
   })

 service.find({servicename:regex},{_id:0,__v: 0}).limit(3)
  .then((result)=>{
    if(result){
      res.status(200).json(result)
      serhis.save()
    }else{
      res.send("You can search another service ,this service not available") 

    }
  })
}

module.exports= {searc};
