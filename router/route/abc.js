const express = require('express');
const app = express();
const uploaddata = require('../data/uploaddata');
const path = require('path');


const image= (req, res) => {
var obj = {
img: {
data: path.join(__dirname + 'upload/' +__filename),
}
}
uploaddata.create(obj, (err) => {
if(err) {
res.status(400).send("Something went wrong!");
}

const file = req.file;
console.log("Type :: ", file);
let result = []
// Loop through all the uploaded images and display them on frontend
for (let index = 0, len = file.length; index < len; ++index) {
result.push (`auth/upload/${file[index].filename}`);
}
console.log(result);
res.send(result);
//res.send(req.file);
});
}
module.exports={image}