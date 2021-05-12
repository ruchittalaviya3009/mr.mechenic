const express=require('express')
const pug = require('pug');
const User=require('../data/User')
const authecon =require('../Auth/Authcontroller')
const servicecon=require('../Auth/serviceauthcontroller')
const searchdata=require('../Auth/mosearch')
const cors=require('cors')
const multer = require('multer');
const router = require('../ru')
const  service  = require('../Auth/newschema')
const imageupload=require('../route/imageupload')
const donemail = require('../Auth/mail') 
const subtitle = require('../Auth/subtitle')
const titledetails=require('../Auth/details')
const getdata=require('../Auth/getalldata')
const alldata = require('../Auth/alldata')
const searching = require('../Auth/searchalldata')
const payment = require('../Auth/payment')
const realtime = require('../Auth/realtime')
const refer = require('../Auth/refer')
const pay = require('../Auth/pay')
const tdata = require('../Auth/title')


router.set('view engine', pug);
router.use(express.json())
router.use(cors())

router.post('/tdata',tdata.tdetail)
// router.get("/", (req, res) => {
//     res.send({ response: "Server is up and running." }).status(200);
//   });
router.post('/refer',refer.refer)
router.post('/realtime',realtime.realtime)  
router.post('/payment',payment.payment)
router.post('/adata',alldata.getdata)
router.get('/alldata',getdata.getdata)
const storage = multer.diskStorage({
    destination: 'public/upload/',
    filename: function (req, file, cb) {
    // console.log("req:::::", req);
    const ext = file.originalname.split('.');
    const fname = ext[0] + "_" + new Date().getTime() + "." + ext[1];
    cb(null , fname);
    }
    })
    
    // store profile and filesize
    
    const up = multer({
    storage: storage,
    limits: {
    fileSize: 1024* 1024 *2
    }
    })
router.post('/darshit',up.array('profile',10),imageupload.imageuploade)

const store = multer.diskStorage({
    destination: 'public/serviceimage/',
    filename: function (req, files, cb) {
    // console.log("req:::::", req);
    const ext = files.originalname.split('.');
    const fname = ext[0] + "_" + new Date().getTime() + "." + ext[1];
    cb(null , fname);
    }
    })
    
    // store profile and filesize
    
    const image1 = multer({
    storage: store,
    limits: {
    fileSize: 1024* 1024 *2
    }
    })
    
router.post('/sservice',image1.array('service',10),service.register)
router.post('/search',searching.search)
router.post('/subtitle',subtitle.subtitiledata)
router.post('/titledata',titledetails.detail)
router.post('/register',authecon.register)
router.post('/login',authecon.login)
router.patch('/update',authecon.update,(req,res)=> 
  [
    req.body.check('firstname')
        .not()
        .isEmpty()
        .withMessage('firstName is required'),
    req.body.check('lastname')
        .not()
        .isEmpty()
        .withMessage('lastName is required'),
    req.body.check('email', 'Email is required')
        .isEmail()
        .exist(req.body.email),  
  ] 
 )

 router.post('/logout',authecon.logout)
router.post('/sendmail',authecon.password)
router.put('/reset-password',authecon.resetpassword)

// payment route
router.post('/paystack/pay',pay.pay)
router.post('/paystack/callback',pay.callback)
router.post('/receipt/:id',pay.receipt)
router.post('/error',pay.error)
router.post('/index',pay.index)

router.get("/search/:servicename",searchdata.searc);

// service provider
router.post('/serviceregister',servicecon.register,(req,res)=>
[
    req.body.check('firmname')
        .not()
        .isEmpty()
        .withMessage('firmName is required'),
    req.body.check('ownername')
        .not()
        .isEmpty()
        .withMessage('ownerName is required'),
    req.body.check('email', 'Email is required')
        .isEmail(),
    req.body.check('servicetype')
        .not()
        .isEmpty()
        .withMessage('servicetype no is required'),    
    req.body.check('password', 'Password is requried')
        .isLength({ min: 6 })
        .custom((val, { req, loc, path }) => {
            if (val !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
 ] 
)
router.post('/servicelogin',servicecon.login)
router.post('/serviceupdate',servicecon.update,(req,res)=>
  [
    req.body.check('firmname')
        .not()
        .isEmpty()
        .withMessage('firmname is required'),
    req.body.check('ownername')
        .not()
        .isEmpty()
        .withMessage('ownername is required'),
    req.body.check('email', 'Email is required')
        .isEmail(),
    req.body.check('servicetype')
        .not()
        .isEmpty()
        .withMessage('servicetype is required'),    
    req.body.check('password', 'Password is requried')
        .isLength({ min: 6 })
        .custom((val, { req, loc, path }) => {
            if (val !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
  ] 
 )
router.post('/serviceforgot-password',servicecon.forgotpassword)
router.put('/servicereset-password',servicecon.resetpassword)

module.exports=router