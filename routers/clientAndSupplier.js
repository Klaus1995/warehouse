var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


//保存或者修改客户/供应商信息
//第三个参数为保存类型，客户为true，供应商为false
function save(body,res,type){
	model.findOne({'user':body.user},function(error,doc){
		let client = doc.information.basicInformation.client;
		let supplier = doc.information.basicInformation.supplier;
		let position = type?client:supplier;
		if(!body.modify){
			position.push(body.information);
		}else if(body.modify){
			position[body.index] = body.information;
		};
		doc.save(function(err,doc){
			if(err){
				console.log(err);
				res.send({flag:false});
			}else{
				res.send({flag:true,information:doc.information.basicInformation});
			}
		});
	});
}


//删除供应商/客户信息
//第三个参数为保存类型，客户为true，供应商为false
function del(body,res,type){
	model.findOne({'user':body.user},function(error,doc){
		let client = doc.information.basicInformation.client;
		let supplier = doc.information.basicInformation.supplier;
		let position = type?client:supplier;
		position.splice(body.delIndex,1);
		doc.save(function(err,doc){
			if(err){
				console.log(err);
				res.send({flag:false});
			}else{
				res.send({flag:true});
			}
		});
	});
}


router.post('/saveClient',function(req,res){
	save(req.body,res,true);
});
router.post('/saveSupplier',function(req,res){
	save(req.body,res,false);
});
router.post('/delClient',function(req,res){
	del(req.body,res,true);
});
router.post('/delSupplier',function(req,res){
	del(req.body,res,false);
});


module.exports = router;