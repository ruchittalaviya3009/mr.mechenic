var express = require("express");
const subtitle = require('../data/subtitledata')
const mongoose = require('mongoose');

const app = express();


app.use('/service', express.static('public/serviceimage'))

const subtitiledata = (req, res) => {
  
      let package = new subtitle({
      //  _id: new mongoose.Types.ObjectId(),
        service_id: req.body.service_id,
        servicetype:req.body.servicetype,
    });

    package.save(function(err) {
      if (err) throw err;
      res.json({ success: true, message: 'subtitle saved'});
  });
 }

 module.exports={subtitiledata}
