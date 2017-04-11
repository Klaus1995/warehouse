var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var model = require('./models/model.js');
var app = new express();


//监听端口
var port = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static('dist'));

//连接数据库
mongoose.connect('mongodb://localhost:27017/mongotest');
var db = mongoose.connection;
//监听数据库错误
db.on('error',function(){console.log('mongodb connection error')});
db.once('open',function(){console.log('mongodb connection sucess')});


//设置路由
// app.get('/',function(req,res){
// 	res.sendFile('./dist/index.html');
// });
app.get('/',function(req,res){
	res.redirect('http://localhost:8080');
});

var login = require('./routers/login.js');
app.use('/api',login);
var commodity = require('./routers/commodity.js');
app.use('/api',commodity);
var clientAndSupplier = require('./routers/clientAndSupplier.js');
app.use('/api',clientAndSupplier);
var user = require('./routers/user.js');
app.use('/api',user);
var inventoryManagement = require('./routers/inventoryManagement.js');
app.use('/api',inventoryManagement);


//开始监听
app.listen(port,function(){console.log('I am listening port '+port)});