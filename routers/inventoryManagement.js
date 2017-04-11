var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


function save(body,res){
	model.findOne({'user':body.user},function(error,doc){
		let enterInventory = doc.information.inventoryManagement.enterInventory;
		let outInventory = doc.information.inventoryManagement.outInventory;
		let inventory = doc.information.inventoryInformation;
		let status;
		body.price = Number(body.price);
		body.quantity = Number(body.quantity);
		if(!body.out&&!body.modify){
			enterInventory.push({
				company:body.company,
				person:body.person,
				telphone:body.telphone,
				name:body.name,
				specification:body.specification,
				unit:body.unit,
				price:body.price,
				quantity:body.quantity,
				date:body.date
			});
			status = 0;
			if(inventory.length===0){
				inventory.push({
					name:body.name,
					specification:body.specification,
					unit:body.unit,
					number:body.quantity
				});
			}else {
				let flag = false;
				for(let i=0; i<inventory.length; i++){
					if(inventory[i].name===body.name){
						inventory[i].number += body.quantity;
						flag = true;
						break;
					};
				};
				if(!flag){
					inventory.push({
						name:body.name,
						specification:body.specification,
						unit:body.unit,
						number:body.quantity
					});
				};
			};
		}else if (body.out&&!body.modify) {
			if(inventory.length===0){
				status = 1;
			}else {
				let flag = false;
				for(let i=0; i<inventory.length; i++){
					if(inventory[i].name===body.name){
						if(inventory[i].number>body.quantity){
							outInventory.push({
								company:body.company,
								person:body.person,
								telphone:body.telphone,
								name:body.name,
								specification:body.specification,
								unit:body.unit,
								price:body.price,
								quantity:body.quantity,
								date:body.date
							});
							inventory[i].number -= body.quantity;
							flag = true;
							status = 3;
							break;
						}else if (inventory[i].number===body.quantity) {
							outInventory.push({
								company:body.company,
								person:body.person,
								telphone:body.telphone,
								name:body.name,
								specification:body.specification,
								unit:body.unit,
								price:body.price,
								quantity:body.quantity,
								date:body.date
							});
							inventory.splice(i,1);
							flag = true;
							status = 3;
							break;
						}else if(inventory[i].number<body.quantity){
							flag = true;
							status = 2;
							break;
						}
					};
				};
				if(!flag){
					status = 1;
				};
			};
		}else if (!body.out&&body.modify) {
			enterInventory[body.index] = {
				company:body.company,
				person:body.person,
				telphone:body.telphone,
				name:body.name,
				specification:body.specification,
				unit:body.unit,
				price:body.price,
				quantity:body.quantity,
				date:body.date
			};
			status = 4;
		}else if (body.out&&body.modify) {
			outInventory[body.index] = {
				company:body.company,
				person:body.person,
				telphone:body.telphone,
				name:body.name,
				specification:body.specification,
				unit:body.unit,
				price:body.price,
				quantity:body.quantity,
				date:body.date
			};
			status = 5;
		};
		doc.save(function(err,doc){
			if(err){console.log(err)};
			res.send({status:status,information:doc.information});
		});		
	});
}


function del(body){
	model.findOne({'user':body.user},function(error,doc){
		let position = '';
		if(body.delType==='enter'){
			position = doc.information.inventoryManagement.enterInventory;
		}else if(body.delType==='out'){
			position = doc.information.inventoryManagement.outInventory;
		}
		position.splice(body.delIndex,1);
		doc.save();
	});
}


router.post('/saveEnterInventory',function(req,res){
	save(req.body,res);
});
router.post('/del',function(req,res){
	del(req.body);
});


module.exports = router;