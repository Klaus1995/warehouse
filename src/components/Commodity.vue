<template>
	<div>
		<Menu theme="dark" mode="horizontal" active-name="modify" class="nav" @on-select="chooseMenu">
			<Menu-item name="add">添加商品信息</Menu-item>
            <Menu-item name="modify">查看商品列表</Menu-item>
        </Menu>


		<Row type="flex" justify="center" class="content" v-if="menu==='add'">
			<Col span="12">
				<Form ref="commodityForm" :model="commodityForm" :rules="commodityRules" :label-width="100">
		        	<Form-item label="商品名称" prop="name">
		        		<Input type="text" v-model="commodityForm.name"></Input>
		        	</Form-item>
		        	<Form-item label="商品规格" prop="specification">
		        		<Input type="text" v-model="commodityForm.specification"></Input>
		        	</Form-item>
		        	<Form-item label="商品单位" prop="unit">
		        		<Input type="text" v-model="commodityForm.unit"></Input>
		        	</Form-item>
		        	<Form-item>
		        		<Button @click="save('commodityForm')">保存</Button>
						<Button @click="cancel(commodityForm)">取消</Button>
		        	</Form-item>
				</Form>
			</Col>
		</Row>


		<Row type="flex" justify="center" class="content" v-show="menu==='modify'">
			<Col span="20">
				<Table highlight-row border :context="self" :columns="columns" :data="$store.state.basicInformation.commodity"></Table>
			</Col>
		</Row>

		<Modal v-model="confirmModifyFlag" @on-cancel="cancel(modifyForm)">
	        <p slot="header" style="color:#3399ff;text-align:center">
	            <Icon type="edit"></Icon>
	            <span>修改信息</span>
	        </p>
	        <div style="text-align:center">
	            <Form ref="modifyForm" :model="modifyForm" :rules="commodityRules" :label-width="100">
		        	<Form-item label="商品名称" prop="name">
		        		<Input type="text" v-model="modifyForm.name"></Input>
		        	</Form-item>
		        	<Form-item label="商品规格" prop="specification">
		        		<Input type="text" v-model="modifyForm.specification"></Input>
		        	</Form-item>
		        	<Form-item label="商品单位" prop="unit">
		        		<Input type="text" v-model="modifyForm.unit"></Input>
		        	</Form-item>
				</Form>
	        </div>
	        <div slot="footer">
	            <Button type="info" size="large" long @click="modifyCommodity(index)">修改</Button>
	        </div>
	    </Modal>


		<Modal v-model="confirmDelFlag" width="360" @on-cancel="cancel">
	        <p slot="header" style="color:#f60;text-align:center">
	            <Icon type="information-circled"></Icon>
	            <span>删除确认</span>
	        </p>
	        <div style="text-align:center">
	            <p>删除是不可逆的</p>
	            <p>是否继续删除？</p>
	        </div>
	        <div slot="footer">
	            <Button type="error" size="large" long @click="del(index)">删除</Button>
	        </div>
	    </Modal>
	</div>
</template>

<script type="text/javascript">
	let vm = {
		data:function(){
			return {
				self:this,
				menu:'modify',
				confirmDelFlag:false,
				confirmModifyFlag:false,
				modify:false,
				index:-1,
				commodityForm:{
					name:'',
					specification:'',
					unit:''
				},
				modifyForm:{
					name:'',
					specification:'',
					unit:''
				},
				commodityRules:{
					name:[
						{required:true,message:'请填写商品名称',trigger:'blur'}
					],
					specification:[
						{required:true,message:'请填写商品规格',trigger:'blur'}
					],
					unit:[
						{required:true,message:'请填写商品单位',trigger:'blur'}
					]
				},
				columns:[
					{
						type:'index',
						width:50,
						align:'center'
					},
					{
						title:'商品名称',
						key:'name'
					},
					{
						title:'商品规格',
						key:'specification'
					},
					{
						title:'商品单位',
						key:'unit'
					},
					{
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="confirmModify(${index})">修改</i-button> <i-button type="error" size="small" @click="confirmDel(${index})">删除</i-button>`;
                        }
                    }
				]
			}
		},
		methods:{
			chooseMenu:function(name){
				this.menu = name;
				this.cancel(this.commodityForm);
			},
			save:function(formStr){
				let vm = this;
				let form;
				if(!this.modify){
                    form = this.commodityForm;
                }else{
                    form = this.modifyForm;
                }
				this.$refs[formStr].validate(function(valid){
					if(valid){
						vm.$http.post('/api/saveCommodity',{
							user:vm.$store.state.user,
							commodity:form,
							index:vm.index,
							modify:vm.modify
						})
						.then(function(res){
							if(res.data.flag){
								vm.$Message.success('商品信息保存成功');
								vm.$store.state.basicInformation = res.data.information;
							}else{
								vm.$Message.error('商品信息保存失败');
							}
							vm.cancel(form);
						});
					}else{
						vm.$Message.error('请填写完整信息');
					}
				});
			},
			cancel:function(form){
				this.$Clear(form);
				this.index = -1;
				this.modify = false;
			},
			confirmModify:function(index){
				this.confirmModifyFlag = true;
				this.index = index;
				this.modify = true;
				this.modifyForm = this.$Copy({},this.$store.state.basicInformation.commodity[index]);
				delete this.modifyForm._id;
			},
			modifyCommodity:function(){
				this.save('modifyForm');
				this.confirmModifyFlag = false;
			},
			confirmDel:function(index){
				this.confirmDelFlag = true;
				this.index = index;
			},
			del:function(){
				let vm = this;
				this.$store.state.basicInformation.commodity.splice(this.index,1);
				this.$http.post('/api/delCommodity',{
					user:this.$store.state.user,
					delIndex:this.index
				})
				.then(function(res){
					if(res.data.flag){
						vm.$Message.success('删除成功');
					}
				})
				this.cancel();
				this.confirmDelFlag = false;
			}
		},
		created:function(){
			if(this.$store.state.user===''){
				this.$router.push('/');
			}
		}
	};
	export default vm
</script>

<style scoped>
	.nav{
		position: relative;
		top: -10px;
	}
	.content{
		margin-top: 50px; 
	}
</style>