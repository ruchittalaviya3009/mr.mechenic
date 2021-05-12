const request = require('request');
const bodyParser = require('body-parser');
const pug = require('pug');
const _ = require('lodash');
const path = require('path');

const {Donor} = require('../data/paydata')
const {initializePayment, verifyPayment} = require('../middleware/paystack')(request);

const index = (req, res) => {
    res.render('index.pug');
};

const pay = (req, res) => {
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;
    
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return res.redirect('/error')
            return;
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    });
};

const callback = (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);        

        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);

        [reference, amount, email, full_name] =  data;
        
        newDonor = {reference, amount, email, full_name}

        const donor = new Donor(newDonor)

        donor.save().then((donor)=>{
            if(!donor){
                return res.redirect('/error');
            }
            res.redirect('/receipt/'+donor._id);
        }).catch((e)=>{
            res.redirect('/error');
        })
    })
};

const receipt = (req, res)=>{
    const id = req.params.id;
    Donor.findById(id).then((donor)=>{
        if(!donor){
            //handle error when the donor is not found
            res.redirect('/error')
        }
        res.render('success.pug',{donor});
    }).catch((e)=>{
        res.redirect('/error')
    })
}

const error = (req, res)=>{
    res.render('error.pug');
}

module.exports = {index,pay,callback,receipt,error}