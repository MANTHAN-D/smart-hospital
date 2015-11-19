var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15001/server');

var drPkIncrementor = require('mongoose-auto-increment');
drPkIncrementor.initialize(connection);

var Device_Register_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true, unique : true},
  device_id: {type : Number,unique: true},
  device_uri: {type : String,required : true},
  manufacturer: {type : String,required : true},
  model: {type : String,required : true},
  firmware: {type : String,required : true},
  serial: {type : Number,required : true,unique : true},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Device_Register_Schema.plugin(drPkIncrementor.plugin, {model:'Device_Register',field : 'object_id'});
module.exports = mongoose.model('Device_Register', Device_Register_Schema);