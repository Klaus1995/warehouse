<template>
	<div>
		<h1>用户管理</h1>
		<p>用户：{{$store.state.user}}</p>
		<button @click="chooseModifyPassword">修改密码</button>
		<button @click="chooseDelUser">删除用户</button>


		<form v-show="modifyPasswordFlag">
			<label for="oldPassword">旧密码</label>
			<input type="password" id="oldPassword" v-model="oldPassword"><br>
			<label for="newPassword">新密码</label>
			<input type="password" id="newPassword" v-model="newPassword"><br>
			<label for="confirmPassword">确认新密码</label>
			<input type="password" id="confirmPassword" v-model="confirmPassword"><br>
			<button @click="submitNewPassword">提交</button>
			<button @click="cancel">取消</button>
			<p>{{message}}</p>
		</form>

		<form v-show="delUserFlag">
			<label for="password">密码</label>
			<input type="password" id="password" v-model="password"><br>
			<button @click="delUser">删除此用户</button>
			<p>{{message}}</p>
		</form>
	</div>
</template>

<script type="text/javascript">
	var vm = {
		data:function(){
			return {
				modifyPasswordFlag:false,
				delUserFlag:false,
				password:'',
				oldPassword:'',
				newPassword:'',
				confirmPassword:'',
				message:''
			};
		},
		methods:{
			chooseModifyPassword:function(){
				if(this.$store.state.user===''){alert('请先登录');return;};
				this.modifyPasswordFlag = !this.modifyPasswordFlag;
				this.delUserFlag = false;
			},
			chooseDelUser:function(){
				if(this.$store.state.user===''){alert('请先登录');return;};
				this.delUserFlag = !this.delUserFlag;
				this.modifyPasswordFlag = false;
			},
			submitNewPassword:function(){
				let vm = this;
				if(this.oldPassword&&this.newPassword&&this.confirmPassword){
					if(this.newPassword===this.confirmPassword){
						this.$http.post('/api/modifyPassword',{
							user:this.$store.state.user,
							oldPassword:this.oldPassword,
							newPassword:this.newPassword
						})
						.then(function(res){
							vm.message = res.data;
							setTimeout(function(){
								vm.message = '';
							},1000);
							vm.oldPassword = '';
							vm.newPassword = '';
							vm.confirmPassword = '';
						});
					}else {
						alert('请确认两次填写的新密码内容相同');
					}
				}else {
					alert('请将信息填写完整');
				};
			},
			cancel:function(){
				this.modifyPasswordFlag = false;
				this.oldPassword = '';
				this.newPassword = '';
				this.confirmPassword = '';
			},
			delUser:function(){
				if(!this.password){alert('请输入密码');return;};
				let vm = this;
				let con1,con2;
				con1 = confirm('确定删除该用户吗？（信息全部丢失不可逆）');
				if(con1){con2 = confirm('请再次确认，一旦删除无法恢复');};
				if(con1&&con2){
					this.$http.post('/api/delUser',{
						user:this.$store.state.user,
						password:this.password
					})
					.then(function(res){
						vm.message = res.data;
						if(res.data==='删除成功'){
							vm.$store.commit('clearAll');
						};
						vm.password = '';
						setTimeout(function(){
							vm.delUserFlag = false;
							vm.message = '';
						},1000);
					});
				};
			}
		}
	};
	export default vm
</script>