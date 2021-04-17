var express = require("express");
var path = require("path");
var multer = require("multer");
const app = express();
const uploddata=require('../data/uploaddata');
const uploaddata = require("../data/uploaddata");


app.use(express.static(path.join(__dirname, "public")));
app.use('/profile', express.static('upload/images'));


exports.up= (req, res) => {

	var obj = new uploaddata({
		img: {
			data: path.join(__dirname + 'upload/' +__filename),
		}
    })
    try {
        const files = req.files;
        console.log("Type :: ", files);
        
        let result = []
        for ( let index = 0, len = files.length; index < len; ++index) {
        result.push (`auth/upload/${files[index].filename}`);
        }
        console.log("Result :: ", result);
        res.send(result);
        //obj.save()
        } catch (error)
        {
        console.log(error);
        res.sendStatus(400);
        }
        }
