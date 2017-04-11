# 仓库管理系统
## 前言
本项目是用vue、node和mongoDB实现的一个仓库管理系统，算是自己学习的一个实践。
用了四五天写了出来，写的比较赶，有很多不完善的地方，暂定为1.0.0版本，日后我会持续更新完善。
因为没有服务器的原因所以没有展示页面，以后我会考虑去租个服务器买个域名把这个项目部署到上面。
## 功能介绍
* 用户的注册、登录
* 基本信息（商品、供应商、客户）的录入、修改、删除
* 商品出入库的录入、修改、删除
* 库存的查询
* 密码修改、用户删除
* 所有的功能都是基于数据库的
## 所用技术栈
* vue.js  2.0
* vue-cli
* vuex
* vue-router
* axios
* node.js
* express
* body-parser
* mongoDB
* mongoose
## 使用方法
默认已经安装node、mongoDB并且已经配置好。
在项目根目录下打开命令行。

	npm install

	npm run dev
成功启动vue-cli，可在本地8080端口查看页面。
重新开一个命令行。

	node app
成功启动服务端，并连接数据库。
然后在页面进行相应操作，可在数据库查看结果。

---
如果想要生成直接用于服务器的静态文件，要进行以下操作。

	npm run build
这时会在根目录生成一个静态文件夹dist。
如果想使用的话需要对根目录app.js进行一点小修改。

	app.use(express.static('dist'));
加上这一句表示使用dist文件夹里的资源作为静态资源。
同时把访问首页的路径修改一下。
删除掉这一句。

	app.get('/',function(req,res){
		res.redirect('http://localhost:8080');
	});
加上这一句表示把dist中的index.html作为首页。

	app.get('/',function(req,res){
		res.sendFile('./dist/index.html');
	});

这时候就修改完毕了，直接命令行运行

	node app
就可以直接访问本地3000端口查看了。
## 未来更新内容
* 因为写的急，所以基本没写css样式，界面非常丑，打算最近学一下iView写一下UI。
* 目前出入库操作会对库存进行相应的修改，但是是在服务器上进行相应的判断和计算，打算移到客户端以减少服务器的压力。同时，出入库信息的修改和删除不会对库存造成影响，介于使用需求，可能会同时修改库存（本人觉得不太应该修改）。
* 代码有很多地方优化不足，有重复代码以及没必要的复杂逻辑判断，未来会进行相应优化，可能会提出一些公用的方法库。
* 未来会更新数据的排序（按照不同的内容）以及查询功能，并进行相应的优化
* 暂时想到这么多，再有想法会再加上。同时如果有时间的话我会在博客发一篇详细教程来帮助和我一样初学的小伙伴。