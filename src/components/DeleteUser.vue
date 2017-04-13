<template>
	<div class="center">        
        <Row type="flex" justify="center">
            <Col span="8">
               <Form ref="passwordForm" :model="passwordForm" :rules="passwordRules" :label-width="80">
                    <Form-item prop="password" label="密码">
                        <Input type="password" v-model="passwordForm.password"></Input>
                    </Form-item>
                    <Form-item>
                        <Row type="flex" justify="center">
                            <Col span="8">
                                <Button @click="confirmDel('passwordForm')" type="error" long>删除当前用户</Button>
                            </Col>
                        </Row>
                    </Form-item>
                </Form> 
            </Col>
        </Row>


        <Modal v-model="delFlag" width="360" @on-cancel="passwordForm.password=''">
	        <p slot="header" style="color:#f60;text-align:center">
	            <Icon type="information-circled"></Icon>
	            <span>删除确认</span>
	        </p>
	        <div style="text-align:center">
	            <p>删除是不可逆的</p>
	            <p>当前用户所有的数据都会被删除</p>	            
	            <p>是否继续删除？</p>
	        </div>
	        <div slot="footer">
	            <Button type="error" size="large" long @click="del">删除</Button>
	        </div>
	    </Modal>
	</div>
</template>

<script type="text/javascript">
	let vm = {
		data:function(){
            return {
            	delFlag:false,
                passwordForm:{
                    password:''
                },
                passwordRules:{
                    password:[
                        {required:true,message:'请填写原密码',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
        	confirmDel:function(formStr){
        		let vm = this;
				this.$refs[formStr].validate(function(valid){
					if(valid){
						vm.delFlag = true;
					}else{
						vm.$Message.error('请填写当前账号的密码');
					}
				});
        	},
        	del:function(){
        		let vm = this;
				this.$http.post('/api/delUser',{
					user:this.$store.state.user,
					password:this.passwordForm.password
				})
				.then(function(res){
					if(res.data.flag){
						vm.$Message.success('用户删除成功');
						vm.$store.commit('clearAll');
						vm.$router.push('/');
					}else{
						vm.$Message.error('删除失败，密码错误');
						vm.delFlag = false;
						vm.$Clear(vm.passwordForm);
					}
				});
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
    .center{
        position: relative;
        top: 150px;
    }
</style>