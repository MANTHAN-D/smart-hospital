var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Factory_Bootstrap = require('../models/Factory_Bootstrap.js');
var Cofigured_Bootstrap = require('../models/Cofigured_Bootstrap.js');
var Reporting_Configuration = require('../models/Reporting_Configuration.js');

var headers = {
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Headers' : 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, X-Requested-With',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'POST, GET, PUT, DELETE, OPTIONS'
};

/* GET all for given resource */
router.get('/:name',function(req,res,next){
	 
	if(req.params.name == "factorybs"){
		Factory_Bootstrap.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "configbs"){
		Cofigured_Bootstrap.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "reportingconfig"){
		Reporting_Configuration.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "execute"){
		Reporting_Configuration.find(function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "discover"){
			res.end();	
	}
	else{
		//do nothing
	}	
});

/* Get Specific Object from specified resource */
router.get('/:name/:objectId',function(req,res,next){
	 
	if(req.params.name == "factorybs"){
		Factory_Bootstrap.find({object_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "configbs"){
		Cofigured_Bootstrap.find({object_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "reportingconfig"){
		Reporting_Configuration.find({object_id: parseInt(req.params.objectId)},function(err,data){
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "readDataValue"){
		Reporting_Configuration.find({parameter_name: req.params.objectId},function(err,data){
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

/* POST create */
router.post('/:name',function(req,res,next){
	 
	if(req.params.name == "factorybs"){
		var server_uri = req.body['server_uri'];
		var device_id = parseInt(req.body['device_id']);
		var manufacturer = req.body['manufacturer'];
		var model = req.body['model'];
		var firmware = req.body['firmware'];
		var serial = parseInt(req.body['serial']);
		var created_at = new Date();

		Factory_Bootstrap.create({server_uri: server_uri, device_id : device_id,manufacturer : manufacturer,
			model: model,firmware : firmware,serial : serial,created_at : created_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});				
	}
	else if(req.params.name == "configbs"){
		
		var server_uri = req.body['server_uri'];
		var priority = parseInt(req.body['priority']);
		var device_id = parseInt(req.body['device_id']);		
		var manufacturer = req.body['manufacturer'];
		var model = req.body['model'];
		var firmware = req.body['firmware'];
		var serial = parseInt(req.body['serial']);
		var created_at = new Date();
		var updated_at = new Date();

		Cofigured_Bootstrap.create({server_uri: server_uri,priority : priority, device_id : device_id,manufacturer : manufacturer,
			model: model,firmware : firmware,serial : serial,created_at : created_at,updated_at : updated_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});		
	}
	else if(req.params.name == "reportingconfig"){
		
		var server_uri = req.body['server_uri'];
		var frequency = parseInt(req.body['frequency']);
		var parameter_name = req.body['parameter_name'];
		var last_value;		
		if(typeof(req.body['last_value']) != undefined)
			last_value = parseFloat(req.body['last_value']);			
		else
			last_value = 0.0;
		var disable = parseInt(req.body['disable']);
		var created_at = new Date();
		var updated_at = new Date();

		Reporting_Configuration.create({server_uri: server_uri,frequency : frequency, parameter_name : parameter_name,
			last_value: last_value,disable : disable,created_at : created_at,updated_at : updated_at},function(err,post){	
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
	 

	if(req.params.name == "factorybs"){
		var object_id = parseInt(req.body['object_id']);
		var server_uri = req.body['server_uri'];
		var device_id = parseInt(req.body['device_id']);
		var manufacturer = req.body['manufacturer'];
		var model = req.body['model'];
		var firmware = req.body['firmware'];
		var serial = parseInt(req.body['serial']);
		var updated_at = new Date();

		Factory_Bootstrap.findOneAndUpdate({object_id : object_id},{
			server_uri: server_uri, device_id : device_id,manufacturer : manufacturer,
			model: model,firmware : firmware,serial : serial,updated_at : updated_at},function(err,post){	
			if(err){
				return next(err);
			}
			else{
				res.json(post);
			}
		});				
	}
	
	else if(req.params.name == "configbs"){
		
		var object_id = parseInt(req.body['object_id']);
		var server_uri = req.body['server_uri'];
		var priority = parseInt(req.body['priority']);
		var device_id = parseInt(req.body['device_id']);		
		var manufacturer = req.body['manufacturer'];
		var model = req.body['model'];
		var firmware = req.body['firmware'];
		var serial = parseInt(req.body['serial']);		
		var updated_at = new Date();

		Cofigured_Bootstrap.findOneAndUpdate({object_id : object_id},{
			server_uri: server_uri,priority : priority, device_id : device_id,manufacturer : manufacturer,
			model: model,firmware : firmware,serial : serial,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}
	else if(req.params.name == "reportingconfig"){
		
		var object_id = parseInt(req.body['object_id']);
		var server_uri = req.body['server_uri'];
		var frequency = parseInt(req.body['frequency']);
		var parameter_name = req.body['parameter_name'];
		var last_value = parseFloat(req.body['last_value']);
		var disable = parseInt(req.body['disable']);
		var updated_at = new Date();

		Reporting_Configuration.findOneAndUpdate({object_id : object_id},{
			server_uri: server_uri,frequency : frequency, parameter_name : parameter_name,
			last_value: last_value,disable : disable,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "updatereportingconfig"){
				
		var server_uri = req.body['server_uri'];
		var parameter_name = req.body['parameter_name'];
		var disable = parseInt(req.body['disable']);
		var updated_at = new Date();

		Reporting_Configuration.findOneAndUpdate({server_uri: server_uri,parameter_name : parameter_name},{
			disable : disable,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "writereportingconfig"){
				
		var server_uri = req.body['server_uri'];
		var parameter_name = req.body['parameter_name'];
		var last_value = parseInt(req.body['last_value']);
		var updated_at = new Date();

		Reporting_Configuration.findOneAndUpdate({server_uri: server_uri,parameter_name : parameter_name},{
			last_value : last_value,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});
	}
	else if(req.params.name == "writeAttribReportingconfig"){
		
		var server_uri = req.body['server_uri'];
		var frequency = parseInt(req.body['frequency']);
		var parameter_name = req.body['parameter_name'];
		var last_value = parseFloat(req.body['last_value']);
		var disable = parseInt(req.body['disable']);
		var updated_at = new Date();

		Reporting_Configuration.findOneAndUpdate({server_uri: server_uri},{
			frequency : frequency, parameter_name : parameter_name,
			last_value: last_value,disable : disable,updated_at : updated_at},function(err,data){	
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
	 

	if(req.params.name == "factorybs"){
		var object_id = parseInt(req.params.object_id);	

		Factory_Bootstrap.findOneAndRemove({object_id : object_id},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});				
	}
	else if(req.params.name == "configbs"){
		
		var object_id = parseInt(req.params.object_id);
		
		Cofigured_Bootstrap.findOneAndRemove({object_id : object_id},function(err,data){	
			if(err){
				return next(err);
			}
			else{
				res.json(data);
			}
		});		
	}
	else if(req.params.name == "reportingconfig"){
		
		var object_id = parseInt(req.params.object_id);
		
		Reporting_Configuration.findOneAndRemove({object_id : object_id},function(err,data){	
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

router.delete('/:name/:parameter_name/:frequency',function(req,res,next){
	if(req.params.name == "reportingconfig"){
		
		var parameter_name = parseInt(req.params.parameter_name);
		var frequency = parseInt(req.params.frequency);
		
		Reporting_Configuration.findOneAndRemove({parameter_name : parameter_name, frequency : frequency},function(err,data){	
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