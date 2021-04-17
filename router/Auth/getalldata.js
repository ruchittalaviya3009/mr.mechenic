const { result } = require('lodash');
const servicedatas = require('../data/servicedata')


const getdata = (req,res) => {
    let matchObj = {};

    if (req.body.service_id) {
        matchObj['service_id'] = mongoose.Types.ObjectId(req.body.service_id);
    }
    servicedatas.aggregate([
            {
                $match: { ...matchObj },
            },
            {
                $lookup: {
                  from: "subtitledatas",
                  localField: "_id",
                  foreignField: "service_id",
                  as: "service_details"
                }
              }, {
                $unwind: "$service_details"
              }, {
                $lookup: {
                  from: "titledetailes",
                  localField: "service_details._id",
                  foreignField: "service_details_id",
                  as: "service_sub_details"
                }
              },
              {
                $project: {
                  _id:0,
                  service_name: 1,
                  dataimg: 1,
                  price: 1,
                  servicetype: "$service_details.servicetype",
                  information: "$service_sub_details.information"
                }
              }
        ]).exec((err,result)=>{
            if(err) {
                res.send(err)
            }
            if(result) {
                res.send(result)
            }
        })
    }

module.exports = {getdata}














































// const service = require('../data/servicedata')
// const mongoose = require('mongoose')
// const { $where } = require('../data/servicedata')


// exports.getalldetails = (req,res)=>{
        
//     let matchobj=[]

//     if(req.body.serviceid){
//         matchobj['serviceid'] = mongoose.Types.ObjectId(req.body.serviceid);
//     }
//         alldata.aggregate([
//                 {
//                     $match: {...matchobj},
//                 },
//                 {
//                     $lookup:{
//                        from: "subtitledata",
//                         localField: "servicetype,dataimage",
//                         foreignField: "serviceid",
//                         as: "subtitle"
//                     }
//                 },
//                 {$unwind:"$subtitle"},
//                 {
//                     $lookup:{
//                         from: "titledetailes",
//                         localField: "time,price",
//                         foreignField: "serviceid,information",
//                         as: "titledetail"
//                     }
//                 },
//                 {$unwind:"$titledetail"},
//                 {
//                     $lookup:{
//                         from: "arraydetails",
//                         localField: "information",
//                         foreignField: "serviceid",
//                         as: "array"
//                     }
//                 },
//                 {$unwind:"$array"},
//                 {
//                     $project:{
//                         serviceid:1,
//                         servicename:1,
//                         servicetype:"$subtitle.servicetype",
//                         dataimage:"$subtitle.dataimage",
//                         time:"$titledetail.time",
//                         price:"$titledetail.price",
//                         information:"$array.information"
//                     }
//                 }    
//             ]) 
// }
//  /*
//         query:[
//             {
//                 $match: {...matchobj},
//             },
//              {
//                 $lookup:{
//                    from: "subtitledata",
//                     localField: "servicetype,dataimage",
//                     foreignField: "serviceid",
//                     as: "subtitle"
//                 }
//             },
//             {$unwind:"$subtitle"},
//             {
//                 $lookup:{
//                     from: "titledetailes",
//                     localField: "time,price",
//                     foreignField: "serviceid,information",
//                     as: "titledetail"
//                 }
//             },
//             {$unwind:"$titledetail"},
//             {
//                 $lookup:{
//                     from: "arraydetails",
//                     localField: "information",
//                     foreignField: "serviceid",
//                     as: "array"
//                 }
//             },
//             {$unwind:"$array"},
//             {
//                 $project:{
//                     serviceid:1,
//                     servicename:1,
//                     servicetype:"$subtitle.servicetype",
//                     dataimage:"$subtitle.dataimage",
//                     time:"$titledetail.time",
//                     price:"$titledetail.price",
//                     information:"$array.information"
//                 }
//             }
//         ]       
//     }
//    }
// })*/