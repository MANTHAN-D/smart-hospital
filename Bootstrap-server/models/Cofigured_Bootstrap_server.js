var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15000/bootstrap_server');

var scbsPkIncrementor = require('mongoose-auto-increment');
scbsPkIncrementor.initialize(connection);


var Cofigured_Bootstrap_Schema = new mongoose.Schema({
  object_id: {type : Number,required : true, unique : true},
  // device_id: {type : Number},
  priority: {type : Number},
  manufacturer: {type : String,required : true},
  model: {type : String,required : true},
  firmware: {type : String,required : true},
  serial: {type : Number,required : true,unique : true},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Cofigured_Bootstrap_Schema.plugin(scbsPkIncrementor.plugin, {model:'Cofigured_Bootstrap_server',field : 'object_id'});
module.exports = mongoose.model('Cofigured_Bootstrap_server', Cofigured_Bootstrap_Schema);