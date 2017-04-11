<template>
	<div>
		<h1>库存管理</h1>
		<p>用户：{{$store.state.user}}</p>
		<div @click="chooseMainMenu">
			<button id="enter">入库</button>
			<button id="out">出库</button>
		</div>
		<div @click="chooseSecondaryMenu">
			<button id="add">增加{{mainMuneInfo}}信息</button>
			<button id="modify">修改{{mainMuneInfo}}信息</button>
		</div>
		<form v-show="(mainMenu==='enter'||mainMenu==='out')&&secondaryMenu==='add'">
			<label for="company">公司名称</label>
			<select id="company" v-model="selectedSupplier">
				<option v-for="item in selectedList" :value="{company:item.company,person:item.person,telphone:item.telphone}" :id="item.company">{{item.company}}</option>
			</select><br>
			<label for="person">联系人</label>
			<input type="text" id="person" v-model="inventoryManagement.person"><br>
			<label for="telphone">联系电话</label>
			<input type="text" id="telphone" v-model="inventoryManagement.telphone"><br>
			<label for="name">货物名称</label>
			<select id="name" v-model="selectedCommodity">
				<option v-for="item in $store.state.basicInformation.commodity" :value="{name:item.name,specification:item.specification,unit:item.unit}">{{item.name}}</option>
			</select><br>
			<label for="specification">货物规格</label>
			<input type="text" id="specification" v-model="inventoryManagement.specification"><br>
			<label for="unit">货物单位</label>
			<input type="text" id="unit" v-model="inventoryManagement.unit"><br>
			<label for="price">{{mainMuneInfo}}价格</label>
			<input type="number" min="0" id="price" v-model="inventoryManagement.price"><br>
			<label for="quantity">{{mainMuneInfo}}数量</label>
			<input type="number" min="0" id="quantity" v-model="inventoryManagement.quantity"><br>
			<label for="date">{{mainMuneInfo}}日期</label>
			<input type="date" id="date" v-model="inventoryManagement.date"><br>
			<button @click="save">保存</button>
			<button @click="cancel">取消</button>
		</form>
		<div v-show="mainMenu==='enter'&&secondaryMenu==='modify'">
			<table>
				<tr>
					<td>序号</td>
					<td>公司名称</td>
					<td>联系人</td>
					<td>联系电话</td>
					<td>货物名称</td>
					<td>货物规格</td>
					<td>货物单位</td>
					<td>价格</td>
					<td>数量</td>
					<td>日期</td>
					<td>修改</td>
					<td>删除</td>
				</tr>
				<tr v-for="(item,index) in $store.state.inventoryManagement.enterInventory">
					<td>{{index+1}}</td>
					<td>{{item.company}}</td>
					<td>{{item.person}}</td>
					<td>{{item.telphone}}</td>
					<td>{{item.name}}</td>
					<td>{{item.specification}}</td>
					<td>{{item.unit}}</td>
					<td>{{item.price}}</td>
					<td>{{item.quantity}}</td>
					<td>{{item.date}}</td>
					<td><button @click="modify(index)">修改</button></td>
					<td><button @click="del(index)">删除</button></td>
				</tr>
			</table>
			<p>{{message}}</p>
		</div>
		<div v-show="mainMenu==='out'&&secondaryMenu==='modify'">
			<table>
				<tr>
					<td>序号</td>
					<td>公司名称</td>
					<td>联系人</td>
					<td>联系电话</td>
					<td>货物名称</td>
					<td>货物规格</td>
					<td>货物单位</td>
					<td>价格</td>
					<td>数量</td>
					<td>日期</td>
					<td>修改</td>
					<td>删除</td>
				</tr>
				<tr v-for="(item,index) in $store.state.inventoryManagement.outInventory">
					<td>{{index+1}}</td>
					<td>{{item.company}}</td>
					<td>{{item.person}}</td>
					<td>{{item.telphone}}</td>
					<td>{{item.name}}</td>
					<td>{{item.specification}}</td>
					<td>{{item.unit}}</td>
					<td>{{item.price}}</td>
					<td>{{item.quantity}}</td>
					<td>{{item.date}}</td>
					<td><button @click="modify(index)">修改</button></td>
					<td><button @click="del(index)">删除</button></td>
				</tr>
			</table>
		</div>
		<p>{{message}}</p>
	</div>
</template>

<script type="text/javascript">
	var vm = {
		data:function(){
			return {
				mainMenu:'enter',
				mainMuneInfo:'入库',				
				secondaryMenu:'',
				message:'',
				inventoryManagement:{
					company : '',
					person : '',
					telphone : '',
					name : '',
					specification : '',
					unit : '',
					price : '',
					quantity : '',
					date : '',
					modify:false,
					out:false,
					index:-1
				},
				selectedList:[],
				selectedSupplier:{
					company : '',
					person : '',
					telphone : ''
				},
				selectedCommodity:{
					name : '',
					specification : '',
					unit : ''
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
					if(this.mainMenu === 'enter'){
						this.selectedList = this.$store.state.basicInformation.supplier;
					}else if(this.mainMenu === 'out'){
						this.selectedList = this.$store.state.basicInformation.client;
					};
				}
			},
			//选择二级菜单
			chooseSecondaryMenu:function(event){
				if(event.target.tagName==='BUTTON'){
					if(this.$store.state.user===''){alert('请先登录');return;};
					this.cancel();
					this.secondaryMenu = event.target.id;
					if(this.mainMenu === 'enter'){
						this.selectedList = this.$store.state.basicInformation.supplier;
					}else if(this.mainMenu === 'out'){
						this.selectedList = this.$store.state.basicInformation.client;
					};
				}
			},
			save:function(){
				let vm = this;
				if(this.mainMenu==='out'){
					this.inventoryManagement.out = true;
				};
				if(
					this.inventoryManagement.company&&
					this.inventoryManagement.person&&
					this.inventoryManagement.telphone&&
					this.inventoryManagement.name&&
					this.inventoryManagement.specification&&
					this.inventoryManagement.unit&&
					this.inventoryManagement.price&&
					this.inventoryManagement.quantity&&
					this.inventoryManagement.date
					){
					this.$http.post('/api/saveEnterInventory',{
						user:this.$store.state.user,
						company:this.inventoryManagement.company,
						person:this.inventoryManagement.person,
						telphone:this.inventoryManagement.telphone,
						name:this.inventoryManagement.name,
						specification:this.inventoryManagement.specification,
						unit:this.inventoryManagement.unit,
						price:this.inventoryManagement.price,
						quantity:this.inventoryManagement.quantity,
						date:this.inventoryManagement.date,
						modify:this.inventoryManagement.modify,
						out:this.inventoryManagement.out,
						index:this.inventoryManagement.index
					}).then(function(res){
						switch(res.data.status)
						{
						case 0:	
							vm.message = '入库成功';
							break;
						case 1:	
							vm.message = '出库失败，仓库不存在此类货物';
							break;
						case 2:	
							vm.message = '出库失败，库存不足';
							break;
						case 3:	
							vm.message = '出库成功';
							break;
						case 4:	
							vm.message = '入库信息修改成功';
							break;
						case 5:	
							vm.message = '出库信息修改成功';
							break;
						};
						setTimeout(function(){
							vm.message = '';
						},1000);
						vm.$store.state.inventoryManagement = res.data.information.inventoryManagement;
						vm.$store.state.inventoryInformation = res.data.information.inventoryInformation;
						vm.inventoryManagement.company = '';
						vm.inventoryManagement.name = '';
						vm.inventoryManagement.price = '';
						vm.inventoryManagement.quantity = '';
						vm.inventoryManagement.date = '';
					});
					this.inventoryManagement.modify = false;
					this.inventoryManagement.index = -1;
				}else {
					alert('请输入完整信息');
				}
			},
			cancel:function(){
				this.secondaryMenu = '';
				this.message = '';
				this.selectedList = [];
				this.selectedSupplier = {
					company : '',
					person : '',
					telphone : ''
				};
				this.selectedCommodity = {
					name : '',
					specification : '',
					unit : ''
				};
				this.inventoryManagement.company = '';
				this.inventoryManagement.person = '';
				this.inventoryManagement.telphone = '';
				this.inventoryManagement.name = '';
				this.inventoryManagement.specification = '';
				this.inventoryManagement.unit = '';
				this.inventoryManagement.price = '';
				this.inventoryManagement.quantity = '';
				this.inventoryManagement.date = '';
				this.inventoryManagement.modify = false;
				this.inventoryManagement.out = false;
				this.inventoryManagement.index = -1;
			},
			modify:function(index){
				let store = '';
				this.secondaryMenu = 'add';
				if(this.mainMenu==='enter'){
					store = this.$store.state.inventoryManagement.enterInventory;
				}else {
					store = this.$store.state.inventoryManagement.outInventory;
				};
				this.selectedSupplier = {
					company:store[index].company,
					person:store[index].person,
					telphone:store[index].telphone
				};	
				this.selectedCommodity = {
					name:store[index].name,
					specification:store[index].specification,
					unit:store[index].unit
				}	
				this.inventoryManagement.price = store[index].price;
				this.inventoryManagement.quantity = store[index].quantity;
				this.inventoryManagement.date = store[index].date;
				this.inventoryManagement.modify = true;
				this.inventoryManagement.index = index;		
			},
			del:function(index){
				let con = confirm('确定要删除此条信息吗？');
				let store = '';
				if(this.mainMenu==='enter'){
					store = this.$store.state.inventoryManagement.enterInventory;
				}else {
					store = this.$store.state.inventoryManagement.outInventory;
				};
				if(con){
					store.splice(index,1);
					this.$http.post('/api/del',{
						user:this.$store.state.user,
						delType:this.mainMenu,
						delIndex:index
					});
				};
			}
		},
		watch:{
			selectedSupplier:function(newVal){
				if(newVal){
					this.inventoryManagement.company = this.selectedSupplier.company;
					this.inventoryManagement.person = this.selectedSupplier.person;
					this.inventoryManagement.telphone = this.selectedSupplier.telphone;
				}
			},
			selectedCommodity:function(newVal){
				if(newVal){
					this.inventoryManagement.name = this.selectedCommodity.name;
					this.inventoryManagement.specification = this.selectedCommodity.specification;
					this.inventoryManagement.unit = this.selectedCommodity.unit;
				}
			}
		}
	};
	export default vm
</script>