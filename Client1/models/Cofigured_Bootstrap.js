var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15005/client');

var ccbsPkIncrementor = require('mongoose-auto-increment');
ccbsPkIncrementor.initialize(connection);

var Cofigured_Bootstrap_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true, unique : true},
  server_uri: {type : String,required : true},
  priority: {type : Number},
  device_id: {type : Number},
  manufacturer: {type : String,required : true},
  model: {type : String,required : true},
  firmware: {type : String,required : true},
  serial: {type : Number,required : true,unique : true},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Cofigured_Bootstrap_Schema.plugin(ccbsPkIncrementor.plugin, {model:'Cofigured_Bootstrap',field : 'object_id'});

module.exports = mongoose.model('Cofigured_Bootstrap', Cofigured_Bootstrap_Schema);