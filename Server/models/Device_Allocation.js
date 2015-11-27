var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15001/server');

var daPkIncrementor = require('mongoose-auto-increment');
daPkIncrementor.initialize(connection);

var Device_Allocation_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true, unique : true},
  device_id: {type : Number,unique: true,required: true, unique : true},
  room_no: {type : Number,required : true},
  patient_id: {type : Number,required : true},
  priority: {type : Number},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Device_Allocation_Schema.plugin(daPkIncrementor.plugin, {model:'Device_Allocation',field : 'object_id'});
module.exports = mongoose.model('Device_Allocation', Device_Allocation_Schema);