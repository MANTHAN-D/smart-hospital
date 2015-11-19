var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15005/client');

var cfbsPkIncrementor = require('mongoose-auto-increment');
cfbsPkIncrementor.initialize(connection);

var Factory_Bootstrap_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true, unique : true},
  server_uri: {type : String,required : true},
  device_id: {type : Number},
  manufacturer: {type : String,required : true},
  model: {type : String,required : true},
  firmware: {type : String,required : true},
  serial: {type : Number,required : true,unique : true},
  created_at : {type : Date,required : true}
});

Factory_Bootstrap_Schema.plugin(cfbsPkIncrementor.plugin, {model:'Factory_Bootstrap',field : 'object_id'});

module.exports = mongoose.model('Factory_Bootstrap', Factory_Bootstrap_Schema);