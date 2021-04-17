const express= require('express')
const router=express.Router()
const r=require('./data/1')
const datab=require('../router/data/1')
const controller = require('./controller/controller')

router.get("/",controller.blog_get);
router.get("/:id",controller.blog_getbyid);
router.post('/',controller.blog_post);
router.put("/:id",controller.blog_put);
router.delete('/:id',controller.blog_delete);
module.exports=router;