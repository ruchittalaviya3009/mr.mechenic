const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const path = require('path');
const uploaddata = require('../data/uploaddata');
require('../Auth/upload')
const app = express();
const uploddata=require('../data/uploaddata')
const multer = require('multer');

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './upload');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });

// By default, multer removes file extensions so let's add them back


const upload = multer({
dest:'upload/',
limits: {
    fileSize: 1024*1024 * 2
}
}).single('userphoto');

const getimage= (req, res) => {
	uploaddata.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('imagesPage', { items: items });
		}
	});
};

// Step 8 - the POST handler for processing the uploaded file

const up= (req, res, next) => {

	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: path.join(__dirname + 'public/' +__filename),
			contentType: 'image/png'
		}
	}
	upload(req,res, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.send('/');
		}
	});
};
/*
const up = (req, res,files) => {

  try {
      const files = req.files;
      console.log("Type :: ", files);
      let index, len;
      let result = []
      for (index = 0, len = files.length; index < len; ++index) {
          result.push (`products/upload/${files[index].path}`);
      }
      console.log("Result :: ", result);
      res.send(result);
  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }

}*/

module.exports={up,getimage}