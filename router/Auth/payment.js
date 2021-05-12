const stripe = require('stripe')("sk_test_51IfMJBSHGvNtdk3QLJAdg9jAJKRAusukiNuyPV1VWdD8rBaZA1UM6mNzdzahKXSFq1GMUrhy3V6H6ofOFZprv4HC00x6Ccg8Pa")
const uuid = require('uuid')
const paymentdata = require('../data/paymentdata')

/*
const payment = (req , res) => {
    const {product ,token } = req.body
    console.log("product",product );
    console.log("prize",product.prize );
    const idem_key = uuid();

    return stripe.customers.create({
        email : token.email,
        source : token.id
    }).then(customer => {
        stripe.charges.create({
            amount : product.prize ,
            currency : "INR",
            customer : customer.id,
            receipt_email : token.email,
            description : `purchase of product.name`,
            shipping : {
                name : token.card.name,
                address : {
                    country : token.card.address_country
                }
            } 
        },{idem_key})
    })
    .then(result => req.status(200).json(result))
    .catch(err => console.log(err))
}*/

// send by khushal 
const payment = (req , res) => {
    const {name,email,amount,id } = req.body
    try {
        const pay = stripe.paymentIntents.create({
            name,
            email,
            amount,
            currency : 'INR',
            description: 'Mr.mechenic company',
            payment_method: id,
            confirm :true
        })
        console.log("payment" ,pay);
        res.json({
            message:"payment successfull"
        })
        pay.save()
    } catch (error) {
        console.log("Error",error);
        res.json({
            message:"payment method"
        })
    }

}

module.exports = {payment}