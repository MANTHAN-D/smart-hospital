var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15001/server');

var parecPkIncrementor = require('mongoose-auto-increment');
parecPkIncrementor.initialize(connection);


var Patient_Records_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true,unique:true},
  device_id: {type : Number,required : true},
  parameter_name: {type : String,required : true},
  value: {type : Number,required : true},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Patient_Records_Schema.plugin(parecPkIncrementor.plugin, {model:'Patient_Records',field : 'object_id'});
module.exports = mongoose.model('Patient_Records', Patient_Records_Schema);