const serviceda=require('../data/servicedata')
const subtitle = require('../data/subtitledata')
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
        _id: new mongoose.Types.ObjectId(),
        service_name:req.body.service_name,
        dataimg:result,
        price:req.body.price
      });
      
    let package = new subtitle({
        _id: new mongoose.Types.ObjectId(),
        service_id: event._id,
        servicetype:req.body.servicetype,
    });
       event.save((err) => {
        if(err) {
          if( err.errors ) {
            if( err.errors.service_name ) {
              res.json({ success: false, message: err.errors.service_name.message });
            }
          }
          else {
            res.json({ success: false, message: 'Could not save Event. Error: ', err });
          }
        }      
         else {
            package.save();
          }
        });
   }
  

module.exports={register}