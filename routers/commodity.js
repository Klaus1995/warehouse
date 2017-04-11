var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


//保存或者修改商品信息
function saveCommodity(body,res){
	model.findOne({'user':body.user},function(error,doc){
		if(!body.modify){
			doc.information.basicInformation.commodity.push({
				name : body.commodityName,
				specification : body.commoditySpecification,
				unit : body.commodityUnit
			});
		}else {
			doc.information.basicInformation.commodity[body.index] = {
				name : body.commodityName,
				specification : body.commoditySpecification,
				unit : body.commodityUnit
			}
		};
		doc.save(function(err,doc){
			if(err){
				console.log(err);
			};
			res.send(doc.information.basicInformation);
		});
	});
}


//删除商品信息
function delCommodity(body){
	model.findOne({'user':body.user},function(error,doc){
		doc.information.basicInformation.commodity.splice(body.delIndex,1);
		doc.save();
	});
}


router.post('/saveCommodity',function(req,res){
	saveCommodity(req.body,res);
});
router.post('/delCommodity',function(req,res){
	delCommodity(req.body);
});


module.exports = router;