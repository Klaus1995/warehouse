var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


function login(body,res){
	model.findOne({'user':body.user},function(error,doc){
		if(error){console.log('error:'+error)};
		if(doc&&doc.password===body.password){
			res.send(doc);
		}else if(!doc){
			res.send({flag:false,err:true});
		}else {
			res.send({flag:false});
		};
	});
}


function register(body,res){
	let newUser = new model({
		flag:true,
		user:body.user,
		password:body.password,
	});
	newUser.save(function(error){
		if(error){
			console.log(error);
			res.send({flag:false});
		}else {
			res.send({flag:true});			
		};
	});
}

router.post('/login',function(req,res){
	login(req.body,res);
});
router.post('/register',function(req,res){
	register(req.body,res);
});


module.exports = router;