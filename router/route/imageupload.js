var express = require("express");
var path = require("path");
var multer = require("multer");
const app = express();
const uploaddata = require("../data/uploaddata");
const fs = require('fs');


app.use('/profile', express.static('public/upload'));


exports.getimage=(req, res) => {
	uploaddata.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('image', { items: items });
		}
	});
};


exports.imageuploade = (req, res) => {
    try {

                    const files = req.files;
                        console.log("Type :: ", files);
                        let result = []
                        for ( let index = 0, len = files.length; index < len; ++index) {
                                result.push (`http://localhost:3000/profile/${files[index].filename}`);
                            }
                            console.log("Result :: ", result);
                            res.send(result);
                            var obj = new uploaddata({
                                servicename:req.body.servicename,
                                img : result
                            })                               
                            obj.save()
                    } catch(error) {
                        console.log(error);
                    }
}