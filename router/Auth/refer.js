const nodemailer = require('nodemailer'); 

const refer =(req,res)=>{
    const {email} =req.body;
           const data={
             from:'Mr.mrchrnic@gmail.com',
             to:email,
             subject:'Invite your freiend  link',
             html:`<p>Your friend invite you to <a href='#'>join</a> the Mr.mechenic</p>`
         }
          let mailTransporter = nodemailer.createTransport({ 
              service: 'gmail',
              auth: { 
                  user: 'mrmechenic59@gmail.com', 
                  pass: 'mr.mechenic@2021'
              } 
          })
          mailTransporter.sendMail(data, function(err) { 
                      if(err) { 
                          res.send('Error Occurs'); 
                      } else { 
                          res.send('Email sent successfully'); 
                      } 
                  });
         }

module.exports ={
    refer
}