const express = require('express');
const app = express();
const nodemailer =require('nodemailer')

app.post('/', (req, res, next) => {
const email=req.body;
const data = {
    from: 'ruchittalaviya309@gmail.com',
    to: email,
    subject: 'hello',
    html: `
    <h2>Please click on given link to reset your password</h2>
    <a href='#'click hear</a>
    `
    }
    let mailTransporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'ruchittalaviya309@gmail.com',
    pass: '5788@Talaviya@309'
    }
    })
    
    mailTransporter.sendMail(data, function(err) {
    if (err) {
    console.log('Error Occurs');
    } else {
    console.log('Email sent successfully');
    }
    });
})
    app.listen(3001,()=>{
        console.log("server listen on 3000 port")
     });
 