var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


//第三个参数为类型  入库为true  出库为false
function save(body,res,type){
	model.findOne({'user':body.user},function(error,doc){
		let enterInventory = doc.information.inventoryManagement.enterInventory;
		let outInventory = doc.information.inventoryManagement.outInventory;
		let inventory = doc.information.inventoryInformation;
		let position = type?enterInventory:outInventory;
		let status;
		body.information.price = Number(body.information.price);
		body.information.quantity = Number(body.information.quantity);
		if(type&&!body.modify){
			position.push(body.information);
			status = 0;
			if(inventory.length===0){
				inventory.push({
					name:body.information.name,
					specification:body.information.specification,
					unit:body.information.unit,
					number:body.information.quantity
				});
			}else{
				let flag = false;
				for(let i=0; i<inventory.length; i++){
					if(inventory[i].name===body.information.name){
						inventory[i].number += body.information.quantity;
						flag = true;
						break;
					}
				}
				if(!flag){
					inventory.push({
						name:body.information.name,
						specification:body.information.specification,
						unit:body.information.unit,
						number:body.information.quantity
					});
				}
			}
		}else if(!type&&!body.modify){
			if(inventory.length===0){
				status = 1;
			}else{
				let flag = false;
				for(let i=0; i<inventory.length; i++){
					if(inventory[i].name===body.information.name){
						if(inventory[i].number>body.information.quantity){
							position.push(body.information);
							inventory[i].number -= body.information.quantity;
							flag = true;
							status = 3;
							break;
						}else if(inventory[i].number===body.quantity) {
							position.push(body.information);
							inventory.splice(i,1);
							flag = true;
							status = 3;
							break;
						}else if(inventory[i].number<body.quantity){
							flag = true;
							status = 2;
							break;
						}
					}
				}
				if(!flag){
					status = 1;
				}
			}
		}else if(type&&body.modify){
			position[body.index] = body.information;
			status = 4;
		}else if(!type&&body.modify){
			position[body.index] = body.information;
			status = 5;
		};
		doc.save(function(err,doc){
			if(err){console.log(err)};
			res.send({status:status,information:doc.information});
		});		
	});
}


function del(body,res,type){
	model.findOne({'user':body.user},function(error,doc){
		let enterInventory = doc.information.inventoryManagement.enterInventory;
		let outInventory = doc.information.inventoryManagement.outInventory;
		let position = type?enterInventory:outInventory;
		position.splice(body.delIndex,1);
		doc.save(function(error,doc){
			if(error){
				console.log(error);
				res.send({flag:false});
			}else{
				res.send({flag:true});
			}
		});
	});
}


router.post('/saveEnterInventory',function(req,res){
	save(req.body,res,true);
});
router.post('/saveOutInventory',function(req,res){
	save(req.body,res,false);
});
router.post('/delEnterInventory',function(req,res){
	del(req.body,res,true);
});
router.post('/delOutInventory',function(req,res){
	del(req.body,res,false);
});


module.exports = router;