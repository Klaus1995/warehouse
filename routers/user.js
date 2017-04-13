var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


function modifyPassword(body,res){
	model.findOne({'user':body.user},function(error,doc){
		if(error){console.log('error:'+error)};
		if(doc.password===body.oldPassword){
			doc.password = body.newPassword;
			doc.save(function(){
				res.send({flag:1});
			});
		}else {
			res.send({flag:0});
		}
	});
}


function delUser(body,res){
	model.findOne({'user':body.user},function(error,doc){
		if(error){console.log('error:'+error)};
		if(doc.password===body.password){
			model.remove({'user':body.user},function(err){
				if(err){console.log(err)};
			});
			res.send({flag:1});
		}else {
			res.send({flag:0});
		};
	});
}

router.post('/modifyPassword',function(req,res){
	modifyPassword(req.body,res);
});
router.post('/delUser',function(req,res){
	delUser(req.body,res);
});


module.exports = router;