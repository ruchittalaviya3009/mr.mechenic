var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var getalldata = new Schema({
    serviceid:{type:Schema.ObjectId ,ref:"servicedata"},
    servicename:{type:Schema.Types.String,ref:"servicedata"},
    servicetype:{type: Schema.Types.String, ref:"subtitledata" },   
    dataimg:{ data: Schema.Types.Array , ref:"subtitledata" },
    time:{type:Schema.Types.String,ref:"titledetailes"},
    price:{type:Schema.Types.Number,ref:"titledetailes"},
    information:{type:Schema.Types.Array,ref:"titledetailes"}
}, { timestamps: true });

module.exports = mongoose.model("alldata", getalldata);