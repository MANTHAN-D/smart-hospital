var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:15001/server');

var paPkIncrementor = require('mongoose-auto-increment');
paPkIncrementor.initialize(connection);


var Patient_Schema = new mongoose.Schema({
  patient_id: {type : Number,required : true,unique:true},
  patient_name: {type : String,required : true},
  symptoms: {type : String,required : true},
  created_at : {type : Date,required : true},
  updated_at : {type : Date,required : true}
});

Patient_Schema.plugin(paPkIncrementor.plugin, {model:'Patient',field : 'patient_id'});
module.exports = mongoose.model('Patient', Patient_Schema);