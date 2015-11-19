var express = require('express');
var router = express.Router();

var Device_Register = require('../models/Device_Register.js');
var Device_Configuration = require('../models/Device_Configuration.js');
var Device_Allocation = require('../models/Device_Allocation.js');
var Patient = require('../models/Patient.js');
var Patient_Records = require('../models/Patient_Records.js');

var headers = {
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Headers' : 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, X-Requested-With',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'POST, GET, PUT, DELETE, OPTIONS'
};

/* GET all for given resource */
router.get('/:name',function(req,res,next){
	
	if(req.params.name == "devregister"){
		Device_Register.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "devconfig"){
		Device_Configuration.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "devallocation"){
		Device_Allocation.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "patient"){
		Patient.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "patient_record"){
		Patient_Records.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}	
	else{
		//do nothing
	}	
});

/* Get Specific Object from specified resource */
router.get('/:name/:objectId',function(req,res,next){	
	
	if(req.params.name == "devregister"){
		Device_Register.find({object_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "devconfig"){
		Device_Configuration.find({object_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "devallocation"){
		Device_Allocation.find({object_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "patient"){
		Patient.find({patient_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "patient_record"){
		Patient_Records.find({object_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "chkdevconfig"){
		Device_Configuration.find({device_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else{
		//do nothing
	}	
});

/* For determining notifications */
router.get('/:name/:deviceId/:safe_value',function(req,res,next){
	if(req.params.name == "chkfornotifications"){		
		Patient_Records.find({device_id: parseInt(req.params.deviceId),value : {$gt: parseFloat(req.params.safe_value)}},
			null,{sort : {created_at : -1}},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
});

/* POST create */
router.post('/:name',function(req,res,next){
	
	if(req.params.name == "devregister"){
		// var object_id = parseInt(req.body['object_id']);
		var device_id = parseInt(req.body['device_id']);
		var device_uri = req.body['device_uri'];
		var manufacturer = req.body['manufacturer'];
		var model = req.body['model'];
		var firmware = req.body['firmware'];
		var serial = parseInt(req.body['serial']);
		var created_at = new Date();
		var updated_at = new Date();

		Device_Register.create({device_id : device_id, device_uri : device_uri, manufacturer : manufacturer,
			model: model,firmware : firmware,serial : serial,created_at : created_at,updated_at : updated_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});				
	}
	else if(req.params.name == "devconfig"){
		
		// var object_id = parseInt(req.body['object_id']);
		var device_id = parseInt(req.body['device_id']);
		var parameter_name = req.body['parameter_name'];
		var frequency = parseInt(req.body['frequency']);
		var disable = parseInt(req.body['disable']);
		var safe_value = parseInt(req.body['safe_value']);		
		var created_at = new Date();
		var updated_at = new Date();

		Device_Configuration.create({device_id : device_id,parameter_name : parameter_name,
			frequency: frequency,disable : disable,safe_value : safe_value,created_at : created_at,updated_at : updated_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});		
	}
	else if(req.params.name == "devallocation"){
		
		// var object_id = parseInt(req.body['object_id']);
		var device_id = parseInt(req.body['device_id']);
		var room_no = parseInt(req.body['room_no']);
		var patient_id = parseInt(req.body['patient_id']);
		var priority = parseInt(req.body['priority']);
		var created_at = new Date();
		var updated_at = new Date();

		Device_Allocation.create({device_id: device_id,room_no : room_no, patient_id : patient_id,
			priority: priority,created_at : created_at,updated_at : updated_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});
	}
	else if(req.params.name == "patient"){
		
		// var patient_id = parseInt(req.body['patient_id']);
		var patient_name = req.body['patient_name'];		
		var symptoms = req.body['symptoms'];
		var created_at = new Date();
		var updated_at = new Date();

		Patient.create({patient_name: patient_name,
			symptoms : symptoms,created_at : created_at,updated_at : updated_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});
	}
	else if(req.params.name == "patient_record"){
		
		var device_id = parseInt(req.body['device_id']);
		var parameter_name = req.body['parameter_name'];
		var value = parseFloat(req.body['value']);		
		var created_at = new Date();
		var updated_at = new Date();

		Patient_Records.create({device_id : device_id,parameter_name : parameter_name,
			value: value,created_at : created_at,updated_at : updated_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});		
	}
	else{
		//do nothing
	}	
});

/* PUT for given id */
router.put('/:name',function(req,res,next){
	
	
	if(req.params.name == "devregister"){
		var object_id = parseInt(req.body['object_id']);
		var device_id = parseInt(req.body['device_id']);
		var device_uri = req.body['device_uri'];
		var manufacturer = req.body['manufacturer'];
		var model = req.body['model'];
		var firmware = req.body['firmware'];
		var serial = parseInt(req.body['serial']);
		var updated_at = new Date();

		Device_Register.findOneAndUpdate({object_id : object_id},{
			device_id : device_id, device_uri : device_uri, manufacturer : manufacturer,
			model: model,firmware : firmware,serial : serial,updated_at : updated_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});				
	}
	
	else if(req.params.name == "devconfig"){
		
		var object_id = parseInt(req.body['object_id']);
		var device_id = parseInt(req.body['device_id']);
		var parameter_name = req.body['parameter_name'];
		var frequency = parseInt(req.body['frequency']);
		var disable = parseInt(req.body['disable']);
		var safe_value = parseInt(req.body['safe_value']);		
		var updated_at = new Date();

		Device_Configuration.findOneAndUpdate({object_id : object_id},{
			device_id : device_id,parameter_name : parameter_name,
			frequency: frequency,disable : disable,safe_value : safe_value,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}
	else if(req.params.name == "devallocation"){
		
		var object_id = parseInt(req.body['object_id']);
		var device_id = parseInt(req.body['device_id']);
		var room_no = parseInt(req.body['room_no']);
		var patient_id = parseInt(req.body['patient_id']);
		var priority = parseInt(req.body['priority']);
		var updated_at = new Date();

		Device_Allocation.findOneAndUpdate({object_id : object_id},{
			device_id: device_id,room_no : room_no, patient_id : patient_id,priority: priority,
			updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "patient"){
		
		var patient_id = parseInt(req.body['patient_id']);
		var patient_name = req.body['patient_name'];		
		var symptoms = req.body['symptoms'];
		var updated_at = new Date();

		Patient.findOneAndUpdate({patient_id : patient_id},{
			patient_name: patient_name,symptoms : symptoms,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "patient_record"){
		
		var object_id = parseInt(req.body['object_id']);
		var device_id = parseInt(req.body['device_id']);
		var parameter_name = req.body['parameter_name'];
		var value = parseFloat(req.body['value']);		
		var updated_at = new Date();

		Patient_Records.findOneAndUpdate({object_id : object_id},{
			device_id : device_id,parameter_name : parameter_name,
			value: value,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}
	else if(req.params.name == "updatedevconfig"){
		
		var device_id = parseInt(req.body['device_id']);		
		var disable = parseInt(req.body['disable']);		
		var updated_at = new Date();

		Device_Configuration.findOneAndUpdate({device_id : device_id},{disable : disable,
			updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}
	else if(req.params.name == "writeTodevconfig"){
		
		var device_id = parseInt(req.body['device_id']);
		var parameter_name = req.body['parameter_name'];
		var frequency = parseInt(req.body['frequency']);		
		var disable = parseInt(req.body['disable']);
		var safe_value = parseInt(req.body['safe_value']);		
		var updated_at = new Date();

		Device_Configuration.findOneAndUpdate({device_id : device_id},{parameter_name: parameter_name, disable : disable,
			frequency: frequency, safe_value: safe_value,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}
	else{
		//do nothing
	}	
});

/* DELETE for given id */
router.delete('/:name/:object_id',function(req,res,next){
	

	if(req.params.name == "devregister"){
		var object_id = req.params.object_id;	

		Device_Register.findOneAndRemove({object_id : object_id},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});				
	}
	else if(req.params.name == "devconfig"){
		
		var object_id = req.params.object_id;
		
		Device_Configuration.findOneAndRemove({object_id : object_id},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}
	else if(req.params.name == "devallocation"){
		
		var object_id = req.params.object_id;
		
		Device_Allocation.findOneAndRemove({object_id : object_id},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "patient"){
		
		var patient_id = req.params.object_id;
		
		Patient.findOneAndRemove({patient_id : patient_id},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "patient_record"){
		
		var object_id = req.params.object_id;
		
		Patient_Records.findOneAndRemove({object_id : object_id},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}	
	else{
		//do nothing
	}	
	
});

router.delete('/:name/:device_id/:parameter_name',function(req,res,next){
	if(req.params.name == "deletedevconfigrecord"){
		
		var device_id = req.params.device_id;
		var parameter_name = req.params.parameter_name;
		
		Device_Configuration.findOneAndRemove({device_id : device_id, parameter_name : parameter_name},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}
});

/* OPTIONS cors */
router.options('/:name',function(req,res,next){

    res.writeHead(200,headers);
    res.end();
});

module.exports = router;