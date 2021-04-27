const { result } = require('lodash');
const servicedatas = require('../data/servicedata')

const search = (req,res) => {
    var regex=new RegExp(req.body.service_name)
    let service_name = regex;
/*
    if (req.body.service_name) {
        matchObj['service_name'] = req.body.service_name;
    }*/
    servicedatas.aggregate([
            {
                $match: { service_name },
                // $match: { service_name:"car washing" },
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
                res.json({infors:result})
            }
        })
    }
            

module.exports = {search}