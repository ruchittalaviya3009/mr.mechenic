const tdetails=require('../data/title')
const mongoose = require('mongoose')


const tdetail = (req, res) => {
       let service  = new tdetails({
        service_details_id : req.body.service_details_id,
        information : {
          i1:req.body.information.i1,
          i2:req.body.information.i2,
          i3:req.body.information.i3
        },
      //   information1 : {
      //    i2:req.body.i2,
      //  },
        information1 : { 
            i1:req.body.information.i1,
            i2:req.body.information.i2,
            i3:req.body.information.i3}
      });
       service.save().then(service => {
        res.send("details Added successfully!");
    }, (e) => {
        res.status(400).send(e);
    })
  }
  

module.exports={tdetail}