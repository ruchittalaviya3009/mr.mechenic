const serviceda=require('../data/servicedata')
const mongoose = require('mongoose')


const register = (req, res) => {
  const files = req.files;
  console.log("Type :: ", files);
  let result
  for ( let index = 0, len = files.length; index < len; ++index) {
    result=`http://localhost:3000/service/${files[index].filename}`;
  }
      console.log("Result :: ", result);
      res.send(result);  
  let event  = new serviceda({
      service_name:req.body.service_name,
      dataimg:result,
      price:req.body.price
    });
    event.save()
      res.status(200).json("Service Added successfully!");
    }
  

module.exports={register}