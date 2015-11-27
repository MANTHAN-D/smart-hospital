var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15001/server');

var notirecPkIncrementor = require('mongoose-auto-increment');
notirecPkIncrementor.initialize(connection);


var Notification_Records_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true,unique:true},
  room_no : {type : Number,required : true},
  device_id: {type : Number,required : true},
  patient_name: {type : String,required : true},
  parameter_name: {type : String,required : true},
  value: {type : Number,required : true},
  safe_value: {type : Number,required : true},
  priority: {type : Number},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Notification_Records_Schema.plugin(notirecPkIncrementor.plugin, {model:'Notification_Records',field : 'object_id'});
module.exports = mongoose.model('Notification_Records', Notification_Records_Schema);