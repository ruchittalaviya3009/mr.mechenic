const express= require('express')
const router=express.Router()
const r=require('../data/1')
const conv=JSON.stringify(r)

const blog_get = async(req,res)=>{
    try {
        const ali=await r.find()
        res.json(ali)
    } catch (error) {
           res.send('Error' +error)
    }
};

const blog_getbyid=async(req,res)=>{
    try {
        const ali=await r.findById(req.params.id)
        res.json(ali)
    } catch (error) {
           res.send('Error' +error)
    }

};

const blog_post=async(req,res)=>{
        const data= new r({
              firstname: req.body.firstname,     
              lastname: req.body.lastname,
        })
        try {
            const a1=await data.save()
            res.json(a1)
            
        } catch (error) {
            res.send('Error' +error)   
        }

};

const blog_put=async(req,res)=>{
    try {
        const ali = await r.findById(req.params.id)
        ali.firstname=req.body.firstname
        const a=await ali.save()
        res.json(a)
    } catch (error) {
        res.send('Error')
        
    }
};

const blog_delete=async(req,res)=>{
    try {
        const ali = await r.findById(req.params.id)
        if(!ali) return res.status(404).send('enter the valid id');
       
          const index= await r.findByIdAndDelete(req.params.id)
          res.send(index)

    } catch (error) {
        res.send('Error')
    }
};

module.exports={
    blog_get,
    blog_getbyid,
    blog_post,
    blog_put,
    blog_delete
}