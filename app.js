const express= require('express');
const app=express();
const mongoose=require('mongoose');
const r=require('./router/data/1')
const datab=require('../crudjs/router/data/1')
const authroute=require('../crudjs/router/route/server')
require("dotenv").config();


app.use(express.json())

 
mongoose.connect("mongodb://localhost/ruchit", {useNewUrlParser:true} )
const con=mongoose.connection;
con.on('open',(req,res)=>{
    console.log("connect");
});

app.use(express.json())

const rurouter=require('../crudjs/router/ru')
app.use('/ru',rurouter)
/*
app.listen(3000,()=>{
   console.log("server listen on 3000 port")
});*/