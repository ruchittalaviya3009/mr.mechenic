const router = require('../ru')
const express=require('express')
const User=require('../data/User')
const validate=require('../data/User')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')
const nodemailer = require('nodemailer'); 
const user = require('../data/User');
const { _extend } = require('util')

router.use(express.json())


const register=  async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            confirmpass: req.body.confirmpass
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.confirmpass =await bcrypt.hash(user.confirmpass, salt);
        await user.save();
        res.send(user);
    }
        
};
const login = async (req, res) => {
  
                // First Validate The HTTP Request
                const { error } = validate(req.body);
                if (error) {
                    return res.status(400).send(error.details[0].message);
                }

                if ( await User.findOne( token != "")) {
                    throw 'Username is already login';
                }

                //  Now find the user by their email address
                let user = await User.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(400).send('Incorrect email or user does not exist.');
                }

                // Then validate the Credentials in MongoDB match
                // those provided in the request
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if (!validPassword) {
                    return res.status(400).send('Incorrect  password.');
                }
                const token = jwt.sign({ _id: user._id }, 'PrivateKey');
                res.json({
                    message:"login Successfull!",
                    token
                });
                return User.updateOne({token:token},(err)=>{
                    
                    if(err){
                     res.json({
                         error:"reset password link error" 
                     })
                    }
         })
    }

 const update=(req,res)=>{
    bcrypt.hash(req.body.password, 10,(hashedPass)=>{
    let newupdate={
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPass
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
                            message:'User Updated successfully!'
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
 
const password =(req,res)=>{
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
             html:`<a href='#'><p>Please click on given link to reset your password</a></p>`
         }
          let mailTransporter = nodemailer.createTransport({ 
              service: 'gmail',
              auth: { 
                  user: 'mrmechenic59@gmail.com', 
                  pass: 'mr.mechenic@2021'
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

const resetpassword = (req,res) => {
    const {resetlink , newpass} = req.body;
    if(resetlink){
        jwt.verify(resetlink,'resetpassword123',(err,decodedata)=>{
            if(err){
                return res.json({
                    error:"Incorrect or expired link it is."
                })
            }
            user.findOne({resetlink},(err,user) => {
                if(err || !user){
                    return res.json({
                        error:"User with this link is not exist." 
                    })   
                }
                const obj={
                   password: bcrypt.hash(newpass),
                   resetlink:''
                }
                user = _.extend(user,obj);
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

    const logout = (req,res) => {
        const obj={
            token:''
         }
         user = _extend(user,obj)
         user.save((err,result)=>{
            if(err){
                 res.json({
                    error:"Logout"
                })
            }
    })
}
     
    module.exports={register,login,update,password,resetpassword}