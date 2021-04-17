const User=require('../data/serviceproviderdata')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
const _ =require('lodash')
const nodemailer = require('nodemailer')
const api="key-98cecc82ac8f86a71471bbbfeb53bcac"
const mailgun = require("mailgun-js");
const user = require('../data/serviceproviderdata');
const DOMAIN='sandbox8798548d5b624fd5bfbf60f76145a40c.mailgun.org'
const mg = mailgun({apiKey:api, domain: DOMAIN});

const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10,(err,hashedPass)=>{
        var username=req.body.username
        User.findOne({$or: [{email:username}]})
            .then(user=>{
                 if(user){
                                res.send("service provider was exist! ")
                 }else{
                    let user = new User({
                        firmname:req.body.firmname,
                        ownername:req.body.ownername,
                        email:req.body.email,
                        servicetype:req.body.servicetype,
                        password:hashedPass,
                        confirmpass:hashedPass
                    })
                     user.save()
                       .then(user=> {
                                 res.json({
                                       message:'service provider Added successfully!'
                                      })
                              })
                                .catch(error => {
                                      res.json(error)
                                       })
                                }         
                })
        })
}

 const login =(req,res,next) => {
     var username=req.body.username
     var password=req.body.password

     User.findOne({$or: [{email:username}]})
     .then(user=> {
         if(user){
              bcrypt.compare(password,user.password,function(err,result){
                  if(err){
                      res.json({
                          error: err
                      })
                  }
                  if(result){
                     // let token = jwt.sign({username:user.email},'verysecretValue',{expiresIn:'1h' })
                      res.json({
                            message:"Login successfull",
                      })
                  }else{
                      res.json({
                          message: 'password does not matched!'
                      })
                  }
              })
         }else{
             res.json({
                 message:'No user found!'
            })
    }
 })
}

 const update=(req,res)=>{
    bcrypt.hash(req.body.password, 10,(err,hashedPass)=>{
    let newupdate={
            firmname:req.body.firmname,
            ownername:req.body.owenername,
            email:req.body.email,
            servicetype:req.body.servicetype,
            password:hashedPass,
         };  
    const username=req.body.email 
    const find=User.findOne({$or: [{email:username}]})
             if(find){
                User.updateOne(find,{$set:newupdate},(err,find)=>{
                    if(err){
                        return  res.json({
                            Error:'An error ocured!'
                            })
                    }else{
                        res.json({
                            message:'Data Updated successfully!'
                        })
                    }
                })
        }
         if(!req.body.email|| req.body.email.length<3)
            {
                res.status(400).send('Email should be required and should be greater than 3 ');
                return;
            }
        
    })
}
const forgotpassword =(req,res)=>{
    const {email} =req.body;
     User.findOne({$or: [{email:email}]},(err,User)=>{
         if(err || !User){
          res.json({
              error:"User or email does not exist"
          })
         }

         const token=jwt.sign({email:User.email},'resetpassword123',{expiresIn:'1h' })
         const data={
             from:'Mr.mrchrnic@gmail.com',
             to:email,
             subject:'Reset password link',
             html:`
                <h2>Please click on given link to reset your password</h2>
                <a href='#'click hear ${token}</a>
             `
         }
          let mailTransporter = nodemailer.createTransport({ 
              service: 'gmail',
              auth: { 
                  user: 'ruchittalaviya309@gmail.com', 
                  pass: '5788@Talaviya@309'
              } 
          })
          return User.updateOne({resetlink:token},(err,success)=>{
              if(err){
               res.json({
                   error:"reset password link error" 
               })
              }else{
                  mailTransporter.sendMail(data, function(err) { 
                      if(err) { 
                          res.send('Error Occurs'); 
                      } else { 
                          res.send('Email sent successfully'); 
                      } 
                  });
              }

           })
         
         })      
}

const resetpassword=(req,res)=>{
    const {resetlink , newpass}=req.body;
    if(resetlink){
        jwt.verify(resetlink,'resetpassword123',(err,decodedata)=>{
            if(err){
                return res.json({
                    error:"Incorrect or expired link it is."
                })
            }
            user.findOne({resetlink},(err,user)=>{
                if(err || !user){
                    return res.json({
                        error:"service provider with this link is not exist." 
                    })   
                }
                const obj={
                   password: bcrypt.hash(newpass),
                   resetlink:''
                }
                user=_.extend(user,obj);
                user.save((err,result)=>{
                    if(err){
                         res.json({
                            error:"Reset Password Error."
                        })
                    }else{
                         res.json({
                            error:"Your Password has been change."
                        })
                    }
                })
            })
        })
    }else{
       return res.json({
            error:"Authentication Error!!!" 
        })   
    }
    }

    
     
    module.exports={register,login,update,forgotpassword,resetpassword}