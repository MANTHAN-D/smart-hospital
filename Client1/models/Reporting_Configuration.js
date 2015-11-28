var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15005/client');

var crcPkIncrementor = require('mongoose-auto-increment');
crcPkIncrementor.initialize(connection);

var Reporting_Configuration_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true, unique : true},
  server_uri: {type : String,required : true},
  frequency: {type : Number,required : true},
  parameter_name: {type : String,required : true, unique: true},
  last_value: {type : Number},
  disable: {type : Number,required : true},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Reporting_Configuration_Schema.plugin(crcPkIncrementor.plugin, {model:'Reporting_Configuration',field : 'object_id'});

module.exports = mongoose.model('Reporting_Configuration', Reporting_Configuration_Schema);