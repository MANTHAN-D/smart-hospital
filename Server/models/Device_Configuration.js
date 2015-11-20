var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15001/server');

var dcPkIncrementor = require('mongoose-auto-increment');
dcPkIncrementor.initialize(connection);

var Device_Configuration_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true, unique : true},
  device_id: {type : Number,required : true},
  parameter_name: {type : String,required : true},
  frequency: {type : Number,required : true},
  disable: {type : Number,required : true},
  safe_value: {type : Number,required : true},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Device_Configuration_Schema.plugin(dcPkIncrementor.plugin, {model:'Device_Configuration',field : 'object_id'});

module.exports = mongoose.model('Device_Configuration', Device_Configuration_Schema);