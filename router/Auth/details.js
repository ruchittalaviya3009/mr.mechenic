const tdetails=require('../data/titledetailes')
const mongoose = require('mongoose')


const detail = (req, res) => {
       let service  = new tdetails({
        service_details_id : req.body.service_details_id,
        information : req.body.information,
      });
       service.save();
      res.status(200).json("details Added successfully!");
    }
  

module.exports={detail}