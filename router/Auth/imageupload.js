const express = require('express');
const app = express();
const uploaddata = require('../data/uploaddata');
const path = require('path');

exports.image = (req, res) => {
    try {
        const file = req.file;
        console.log("Type :: ", file);
        let result = []
        // Loop through all the uploaded images and display them on frontend
        for (let index = 0, len = file.length; index < len; index++) {
            result.push(`auth/upload/${file[index].filename}`);
        }
    console.log(result);
    res.send(result);        
    } catch (error) {
        console.log(error);
    }
}

 