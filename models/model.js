var mongoose = require('mongoose');


var schema = new mongoose.Schema({
	flag : Boolean,
	user : {type : String, required : true, unique : true},
	password : {type : String, required : true},
	information : {
		basicInformation:{
			commodity:[
				{
					name : String,
					specification : String,
					unit : String
				}
			],
			client:[
				{
					company : String,
					person : String,
					address : String,
					city : String,
					area : String,
					postcode : String,
					telphone : String,
					fax : String,
					homepage : String
				}
			],
			supplier:[
				{
					company : String,
					person : String,
					address : String,
					city : String,
					area : String,
					postcode : String,
					telphone : String,
					fax : String,
					homepage : String
				}
			]
		},
		inventoryManagement : {
			enterInventory : [
				{
					company : String,
					person : String,
					telphone : String,
					name : String,
					specification : String,
					unit : String,
					price : Number,
					quantity : Number,
					date : String
				}
			],
			outInventory : [
				{
					company : String,
					person : String,
					telphone : String,
					name : String,
					specification : String,
					unit : String,
					price : Number,
					quantity : Number,
					date : String
				}
			]
		},
		inventoryInformation : [
			{
				name : String,
				specification : String,
				unit : String,
				number: Number
			}
		]
	}
});


module.exports = mongoose.model('test',schema);