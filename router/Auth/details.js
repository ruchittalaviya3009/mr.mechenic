const tdetails=require('../data/titledetailes')
const mongoose = require('mongoose')


const detail = (req, res) => {
       let service  = new tdetails({
        service_details_id : req.body.service_details_id,
        information : {
          i1:req.body.information.i1
        },
      //   information1 : {
      //    i2:req.body.i2,
      //  },
        information1 : { i2:req.body.information1.i2}
      });
       service.save().then(service => {
        res.send("details Added successfully!");
    }, (e) => {
        res.status(400).send(e);
    })
  }
  

module.exports={detail}