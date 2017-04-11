<template>
	<div>
		<h1>基本信息</h1>
		<p>用户：{{$store.state.user}}</p>
		<div @click="chooseMainMenu">
			<button id="commodity">商品信息</button>
			<button id="client">客户信息</button>
			<button id="supplier">供应商信息</button>
		</div>
		<div @click="chooseSecondaryMenu">
			<button id="add">添加{{mainMuneInfo}}</button>
			<button id="modify">修改{{mainMuneInfo}}</button>
		</div>
		
		<!-- 商品添加界面 -->
		<form v-show="mainMenu==='commodity'&&secondaryMenu==='add'">
			<label for="commodityName">商品名称</label>
			<input type="text" id="commodityName" v-model="commodityInformation.commodityName"><br>
			<label for="commoditySpecification">商品规格</label>
			<input type="text" id="commoditySpecification" v-model="commodityInformation.commoditySpecification"><br>
			<label for="commodityUnit">商品单位</label>
			<input type="text" id="commodityUnit" v-model="commodityInformation.commodityUnit"><br>
			<button @click="saveCommodity">保存</button>
			<button @click="cancel">取消</button>
			<p>{{message}}</p>
		</form>
		
		<!-- 商品修改界面 -->
		<div v-show="mainMenu==='commodity'&&secondaryMenu==='modify'">
			<table>
				<tr>
					<td>序号</td>
					<td>商品名</td>
					<td>商品规格</td>
					<td>商品单位</td>
					<td>修改</td>
					<td>删除</td>
				</tr>
				<tr v-for="(item,index) in $store.state.basicInformation.commodity">
					<td>{{index+1}}</td>
					<td>{{item.name}}</td>
					<td>{{item.specification}}</td>
					<td>{{item.unit}}</td>
					<td><button @click="modifyCommodity(index)">修改</button></td>
					<td><button @click="delCommodity(index)">删除</button></td>
				</tr>
			</table>
		</div>

		<!-- 供应商/客户添加界面 -->
		<form v-show="(mainMenu==='supplier'||mainMenu==='client')&&secondaryMenu==='add'">
			<label for="company">公司名称</label>
			<input type="text" id="company" v-model="clientInformation.company"><br>
			<label for="person">联系人</label>
			<input type="text" id="person" v-model="clientInformation.person"><br>
			<label for="address">联系地址</label>
			<input type="text" id="address" v-model="clientInformation.address"><br>
			<label for="city">城市名称</label>
			<input type="text" id="city" v-model="clientInformation.city"><br>
			<label for="area">地区名称</label>
			<input type="text" id="area" v-model="clientInformation.area"><br>
			<label for="postcode">邮政编码</label>
			<input type="text" id="postcode" v-model="clientInformation.postcode"><br>
			<label for="telphone">联系电话</label>
			<input type="text" id="telphone" v-model="clientInformation.telphone"><br>
			<label for="fax">传真号码</label>
			<input type="text" id="fax" v-model="clientInformation.fax"><br>
			<label for="homepage">公司主页</label>
			<input type="text" id="homepage" v-model="clientInformation.homepage"><br>
			<button @click="saveClient">保存</button>
			<button @click="cancel">取消</button>
			<p>{{message}}</p>
		</form>

		<!-- 客户修改界面 -->
		<div v-show="mainMenu==='client'&&secondaryMenu==='modify'">
			<table>
				<tr>
					<td>序号</td>
					<td>公司名称</td>
					<td>联系人</td>
					<td>联系地址</td>
					<td>城市名称</td>
					<td>地区名称</td>
					<td>邮政编码</td>
					<td>联系电话</td>
					<td>传真号码</td>
					<td>公司主页</td>
					<td>修改</td>
					<td>删除</td>
				</tr>
				<tr v-for="(item,index) in $store.state.basicInformation.client">
					<td>{{index+1}}</td>
					<td>{{item.company}}</td>
					<td>{{item.person}}</td>
					<td>{{item.address}}</td>
					<td>{{item.city}}</td>
					<td>{{item.area}}</td>
					<td>{{item.postcode}}</td>
					<td>{{item.telphone}}</td>
					<td>{{item.fax}}</td>
					<td>{{item.homepage}}</td>
					<td><button @click="modifyClient(index)">修改</button></td>
					<td><button @click="delClient(index)">删除</button></td>
				</tr>
			</table>
		</div>

		<!-- 供应商修改界面 -->
		<div v-show="mainMenu==='supplier'&&secondaryMenu==='modify'">
			<table>
				<tr>
					<td>序号</td>
					<td>公司名称</td>
					<td>联系人</td>
					<td>联系地址</td>
					<td>城市名称</td>
					<td>地区名称</td>
					<td>邮政编码</td>
					<td>联系电话</td>
					<td>传真号码</td>
					<td>公司主页</td>
					<td>修改</td>
					<td>删除</td>
				</tr>
				<tr v-for="(item,index) in $store.state.basicInformation.supplier">
					<td>{{index+1}}</td>
					<td>{{item.company}}</td>
					<td>{{item.person}}</td>
					<td>{{item.address}}</td>
					<td>{{item.city}}</td>
					<td>{{item.area}}</td>
					<td>{{item.postcode}}</td>
					<td>{{item.telphone}}</td>
					<td>{{item.fax}}</td>
					<td>{{item.homepage}}</td>
					<td><button @click="modifyClient(index)">修改</button></td>
					<td><button @click="delClient(index)">删除</button></td>
				</tr>
			</table>
		</div>

	</div>
</template>

<script type="text/javascript">
	var vm = {
		data:function(){
			return {
				message:'',
				mainMenu:'commodity',
				mainMuneInfo:'商品信息',
				secondaryMenu:'',
				commodityInformation:{
					commodityName:'',
					commoditySpecification:'',
					commodityUnit:'',
					modify:false,
					index:-1
				},
				clientInformation:{
					company : '',
					person : '',
					address : '',
					city : '',
					area : '',
					postcode : '',
					telphone : '',
					fax : '',
					homepage : '',
					modify:false,
					supplier:false,
					index:-1
				}
			};
		},
		methods:{
			//选择一级菜单
			chooseMainMenu:function(event){
				if(event.target.tagName==='BUTTON'){
					if(this.$store.state.user===''){alert('请先登录');return;};
					this.cancel();
					this.mainMuneInfo = event.target.firstChild.nodeValue;
					this.mainMenu = event.target.id;
					this.secondaryMenu = '';
				}
			},
			//选择二级菜单
			chooseSecondaryMenu:function(event){
				if(event.target.tagName==='BUTTON'){
					if(this.$store.state.user===''){alert('请先登录');return;};
					this.cancel();
					this.secondaryMenu = event.target.id;
				}
			},
			//退出添加界面，数据初始化
			cancel:function(){
				this.secondaryMenu = '';
				this.message = '';
				this.commodityInformation.commodityName = '';
				this.commodityInformation.commoditySpecification = '';
				this.commodityInformation.commodityUnit = '';
				this.commodityInformation.modify = false;
				this.commodityInformation.index = -1;
				this.clientInformation.company = '';
				this.clientInformation.person = '';
				this.clientInformation.address = '';
				this.clientInformation.city = '';
				this.clientInformation.area = '';
				this.clientInformation.postcode = '';
				this.clientInformation.telphone = '';
				this.clientInformation.fax = '';
				this.clientInformation.homepage = '';
				this.clientInformation.modify = false;
				this.clientInformation.supplier = false;
				this.clientInformation.index = -1;			
			},
			//保存新商品或者修改商品信息
			saveCommodity:function(){
				let vm = this;
				if(this.commodityInformation.commodityName&&this.commodityInformation.commoditySpecification&&this.commodityInformation.commodityUnit){
					this.$http.post('/api/saveCommodity',{
						user:this.$store.state.user,
						modify:this.commodityInformation.modify,
						index:this.commodityInformation.index,
						commodityName:this.commodityInformation.commodityName,
						commoditySpecification:this.commodityInformation.commoditySpecification,
						commodityUnit:this.commodityInformation.commodityUnit
					}).then(function(res){
						vm.message = '保存成功';
						setTimeout(function(){vm.message = '';},1000);
						vm.$store.state.basicInformation = res.data;
						vm.commodityInformation.commodityName = '';
						vm.commodityInformation.commoditySpecification = '';
						vm.commodityInformation.commodityUnit = '';
					});
					this.commodityInformation.modify = false;
					this.commodityInformation.index = -1;					
				}else {
					alert('请填写完整的信息');
				};
			},
			//修改商品信息，会跳到商品添加界面
			modifyCommodity:function(index){
				this.secondaryMenu = 'add';
				this.commodityInformation.commodityName = this.$store.state.basicInformation.commodity[index].name;
				this.commodityInformation.commoditySpecification = this.$store.state.basicInformation.commodity[index].specification;
				this.commodityInformation.commodityUnit = this.$store.state.basicInformation.commodity[index].unit;
				this.commodityInformation.modify = true;
				this.commodityInformation.index = index;
			},
			//删除商品
			delCommodity:function(index){
				let con = confirm('确定要删除此件商品吗？');
				if(con){
					this.$store.state.basicInformation.commodity.splice(index,1);
					this.$http.post('/api/delCommodity',{
						user:this.$store.state.user,
						delIndex:index
					});
				};
			},
			//保存新供应商/客户或者修改供应商/客户信息
			saveClient:function(){
				let vm = this;
				if (this.mainMenu==='supplier') {
					this.clientInformation.supplier = true;
				};
				if(
					this.clientInformation.company&&
					this.clientInformation.person&&
					this.clientInformation.address&&
					this.clientInformation.city&&
					this.clientInformation.area&&
					this.clientInformation.postcode&&
					this.clientInformation.telphone&&
					this.clientInformation.fax&&
					this.clientInformation.homepage
				){
					this.$http.post('/api/saveClient',{
						user:this.$store.state.user,
						supplier:this.clientInformation.supplier,
						modify:this.clientInformation.modify,
						index:this.clientInformation.index,
						company:this.clientInformation.company,
						person:this.clientInformation.person,
						address:this.clientInformation.address,
						city:this.clientInformation.city,
						area:this.clientInformation.area,
						postcode:this.clientInformation.postcode,
						telphone:this.clientInformation.telphone,
						fax:this.clientInformation.fax,
						homepage:this.clientInformation.homepage
					}).then(function(res){
						vm.message = '保存成功';
						setTimeout(function(){vm.message = '';},1000);
						vm.$store.state.basicInformation = res.data;
						vm.clientInformation.company = '';
						vm.clientInformation.person = '';
						vm.clientInformation.address = '';
						vm.clientInformation.city = '';
						vm.clientInformation.area = '';
						vm.clientInformation.postcode = '';
						vm.clientInformation.telphone = '';
						vm.clientInformation.fax = '';
						vm.clientInformation.homepage = '';
					});
					this.clientInformation.supplier = false;
					this.clientInformation.modify = false;
					this.clientInformation.index = -1;					
				}else {
					alert('请填写完整的信息');
				};
			},
			//修改客户/供应商信息，会跳到客户/供应商添加界面
			modifyClient:function(index){
				let store = '';
				this.secondaryMenu = 'add';
				if(this.mainMenu==='client'){
					store = this.$store.state.basicInformation.client;
				}else {
					store = this.$store.state.basicInformation.supplier;
				};
				this.clientInformation.company = store[index].company;
				this.clientInformation.person = store[index].person;
				this.clientInformation.address = store[index].address;
				this.clientInformation.city = store[index].city;
				this.clientInformation.area = store[index].area;
				this.clientInformation.postcode = store[index].postcode;
				this.clientInformation.telphone = store[index].telphone;
				this.clientInformation.fax = store[index].fax;
				this.clientInformation.homepage = store[index].homepage;
				this.clientInformation.modify = true;
				this.clientInformation.index = index;
			},
			//删除客户/供应商
			delClient:function(index){
				let con = confirm('确定要删除此条信息吗？');
				let store = '';
				if(this.mainMenu==='client'){
					store = this.$store.state.basicInformation.client;
				}else {
					store = this.$store.state.basicInformation.supplier;
				};
				if(con){
					store.splice(index,1);
					this.$http.post('/api/delClient',{
						user:this.$store.state.user,
						delType:this.mainMenu,
						delIndex:index
					});
				};
			},
		}
	};
	export default vm
</script>