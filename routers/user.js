var express = require('express');
var router = express.Router();
var model = require('../models/model.js');


function modifyPassword(body,res){
	model.findOne({'user':body.user},function(error,doc){
		if(error){console.log('error:'+error)};
		if(doc){
			if(doc.password===body.oldPassword){
				doc.password = body.newPassword;
				doc.save(function(){
					res.send('密码修改成功');
				});
			}else {
				res.send('旧密码错误');
			}
		}else{
			res.send('用户不存在');
		};
	});
}


function delUser(body,res){
	model.findOne({'user':body.user},function(error,doc){
		if(error){console.log('error:'+error)};
		if(doc.password===body.password){
			model.remove({'user':body.user},function(err){
				if(err){console.log(err)};
			});
			res.send('删除成功');
		}else {
			res.send('密码错误，删除失败');
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