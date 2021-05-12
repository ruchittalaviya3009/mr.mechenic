const { result } = require('lodash');
const servicedatas = require('../data/servicedata')

exports.getdata = (req,res) => {
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
                  from: "titles",
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
                  information: "$service_sub_details.information",
                  information1: "$service_sub_details.information1"
                }
              }
        ]).exec((err,result)=>{
            if(err) {
                res.send(err)
            }
            if(result) {
                res.json({infos:result})
            }
        })
    }
            

// module.exports = {getda}