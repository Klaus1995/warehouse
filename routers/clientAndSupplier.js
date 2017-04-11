var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


//保存或者修改客户/供应商信息
function saveClient(body,res){
	model.findOne({'user':body.user},function(error,doc){
		let client = doc.information.basicInformation.client;
		let supplier = doc.information.basicInformation.supplier;
		if(!body.supplier&&!body.modify){
			client.push({
				company:body.company,
				person:body.person,
				address:body.address,
				city:body.city,
				area:body.area,
				postcode:body.postcode,
				telphone:body.telphone,
				fax:body.fax,
				homepage:body.homepage
			});
		}else if(body.supplier&&!body.modify){
			supplier.push({
				company:body.company,
				person:body.person,
				address:body.address,
				city:body.city,
				area:body.area,
				postcode:body.postcode,
				telphone:body.telphone,
				fax:body.fax,
				homepage:body.homepage
			});
		}else if(!body.supplier&&body.modify){
			client[body.index] = {
				company:body.company,
				person:body.person,
				address:body.address,
				city:body.city,
				area:body.area,
				postcode:body.postcode,
				telphone:body.telphone,
				fax:body.fax,
				homepage:body.homepage
			}
		}else if(body.supplier&&body.modify){
			supplier[body.index] = {
				company:body.company,
				person:body.person,
				address:body.address,
				city:body.city,
				area:body.area,
				postcode:body.postcode,
				telphone:body.telphone,
				fax:body.fax,
				homepage:body.homepage
			}
		};
		doc.save(function(err,doc){
			if(err){console.log(err)};
			res.send(doc.information.basicInformation);
		});
	});
}


//删除供应商/客户信息
function delClient(body){
	model.findOne({'user':body.user},function(error,doc){
		let position = '';
		if(body.delType==='client'){
			position = doc.information.basicInformation.client;
		}else if(body.delType==='supplier'){
			position = doc.information.basicInformation.supplier;
		}
		position.splice(body.delIndex,1);
		doc.save();
	});
}


router.post('/saveClient',function(req,res){
	saveClient(req.body,res);
});
router.post('/delClient',function(req,res){
	delClient(req.body);
});


module.exports = router;