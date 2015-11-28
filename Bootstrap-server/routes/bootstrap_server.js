var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Cofigured_Bootstrap = require('../models/Cofigured_Bootstrap_server.js');

/* GET all for given resource */
router.get('/',function(req,res,next){	
	 
	Cofigured_Bootstrap.find(function(err,data){
		if(err){
			return next(err);
		}
		else{
			res.json(data);
		}
	});		
});

/* Get Specific Object from specified resource */
router.get('/:objectId',function(req,res,next){

	Cofigured_Bootstrap.find({object_id: req.params.objectId},function(err,data){
		if(err){
			return next(err);
		}
		else{
			res.json(data);
		}
	});	
});

/* POST create */
router.post('/',function(req,res,next){
	
	var device_id = parseInt(req.body['device_id']);
	var priority = parseInt(req.body['priority']);		
	var manufacturer = req.body['manufacturer'];
	var model = req.body['model'];
	var firmware = req.body['firmware'];
	var serial = parseInt(req.body['serial']);
	var created_at = new Date();
	var updated_at = new Date();

	Cofigured_Bootstrap.create({device_id : device_id, priority : priority, manufacturer : manufacturer,
		model: model,firmware : firmware,serial : serial,created_at : created_at,updated_at : updated_at},function(err,post){	
		if(err){
			return next(err);
		}
		else{
			res.json(post);
		}
	});						
});

router.post('/bootstrap',function(req,res,next){
			
	var manufacturer = req.body['manufacturer'];
	var model = req.body['model'];
	var firmware = req.body['firmware'];
	var serial = parseInt(req.body['serial']);
	var created_at = new Date();
	var updated_at = new Date();

	Cofigured_Bootstrap.find({serial: serial},function(err,data){
		if(err){
			return next(err);
		}
		else{
			if(data.length > 0){								
				res.status(200).json({server_uri : 'http://localhost:3001/server/devregister', device_id : data[0].object_id}).send();
			}
			else{
				Cofigured_Bootstrap.create({manufacturer : manufacturer, model: model,firmware : firmware,serial : serial,
					created_at : created_at,updated_at : updated_at},function(err,post){	
					if(err){
						return next(err);
					}
					else{
						res.status(200).json({server_uri : 'http://localhost:3001/server/devregister', device_id : post.object_id});
					}
				});
			}
		}
	});	
});

router.get('/bootstrap/:device_id',function(req,res,next){
			
	var device_id = req.params.device_id;

	Cofigured_Bootstrap.find({object_id: device_id},function(err,data){
		if(err){
			return next(err);
		}
		else{
			if(data.length > 0){
				res.status(200).send(
					{
						server_uri : 'http://localhost:3001/server/devregister',
						manufacturer : data[0].manufacturer,
						model : data[0].model,
						firmware : data[0].firmware,
						serial : data[0].serial
					});
			}
			else{				
				res.status(401).send({status : 'Device is not configured'});				
			}
		}
	});	
});

/* PUT for given id */
router.put('/',function(req,res,next){
	
	var object_id = req.body['object_id'];
	var priority = req.body['priority'];
	var device_id = req.body['device_id'];		
	var manufacturer = req.body['manufacturer'];
	var model = req.body['model'];
	var firmware = req.body['firmware'];
	var serial = req.body['serial'];		
	var updated_at = new Date();

	if(typeof(priority) == 'undefined'){
		Cofigured_Bootstrap.findOneAndUpdate({object_id : object_id},{
			device_id : device_id,manufacturer : manufacturer,
			model: model,firmware : firmware,serial : serial,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{			
				// res.json(data);
				res.json(data);
			}
		});
	}
	else{
		Cofigured_Bootstrap.findOneAndUpdate({object_id : object_id},{
			priority : priority, device_id : device_id,manufacturer : manufacturer,
			model: model,firmware : firmware,serial : serial,updated_at : updated_at},function(err,data){	
			if(err){
				return next(err);
			}
			else{			
				// res.json(data);
				res.json(data);
			}
		});
	}			
});

/* DELETE for given id */
router.delete('/:object_id',function(req,res,next){
	
	var object_id = req.params.object_id;
	
	Cofigured_Bootstrap.findOneAndRemove({object_id : object_id},function(err,data){	
		if(err){
			return next(err);
		}
		else{
			res.json(data);
		}
	});			
	
});

module.exports = router;