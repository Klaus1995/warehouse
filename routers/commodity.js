var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


//保存或者修改商品信息
function saveCommodity(body,res){
	model.findOne({'user':body.user},function(error,doc){
		if(!body.modify){
			doc.information.basicInformation.commodity.push({
				name : body.commodity.name,
				specification : body.commodity.specification,
				unit : body.commodity.unit
			});
		}else {
			doc.information.basicInformation.commodity[body.index] = {
				name : body.commodity.name,
				specification : body.commodity.specification,
				unit : body.commodity.unit
			}
		};
		doc.save(function(err,doc){
			if(err){
				console.log(err);
				res.send({flag:false});
			};
			res.send({flag:true,information:doc.information.basicInformation});
		});
	});
}


//删除商品信息
function delCommodity(body,res){
	model.findOne({'user':body.user},function(error,doc){
		doc.information.basicInformation.commodity.splice(body.delIndex,1);
		doc.save(function(){
			res.send({flag:true});
		});
	});
}


router.post('/saveCommodity',function(req,res){
	saveCommodity(req.body,res);
});
router.post('/delCommodity',function(req,res){
	delCommodity(req.body,res);
});


module.exports = router;