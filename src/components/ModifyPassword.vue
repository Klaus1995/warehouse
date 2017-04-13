<template>
	<div class="center">        
        <Row type="flex" justify="center">
            <Col span="8">
               <Form ref="passwordForm" :model="passwordForm" :rules="passwordRules" :label-width="80">
                    <Form-item prop="password" label="原密码">
                        <Input type="password" v-model="passwordForm.password"></Input>
                    </Form-item>
                    <Form-item prop="newPassword1" label="新密码">
                        <Input type="password" v-model="passwordForm.newPassword1"></Input>
                    </Form-item>
                    <Form-item prop="newPassword2" label="确认密码">
                        <Input type="password" v-model="passwordForm.newPassword2"></Input>
                    </Form-item>
                    <Form-item>
                        <Row type="flex" justify="center">
                            <Col span="8">
                                <Button @click="modify('passwordForm')" type="primary" long>更改密码</Button>
                            </Col>
                        </Row>
                    </Form-item>
                </Form> 
            </Col>
        </Row>
	</div>
</template>

<script type="text/javascript">
	let vm = {
		data:function(){
            return {
                passwordForm:{
                    password:'',
                    newPassword1:'',
                    newPassword2:''                      
                },
                passwordRules:{
                    password:[
                        {required:true,message:'请填写原密码',trigger:'blur'}
                    ],
                    newPassword1:[
                        {required:true,message:'请填写新密码',trigger:'blur'}
                    ],
                    newPassword2:[
                        {required:true,message:'请再次填写新密码',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
        	modify:function(formStr){
				let vm = this;
				this.$refs[formStr].validate(function(valid){
					if(valid){
						if(vm.passwordForm.newPassword1===vm.passwordForm.newPassword2){
							vm.$http.post('/api/modifyPassword',{
								user:vm.$store.state.user,
								oldPassword:vm.passwordForm.password,
								newPassword:vm.passwordForm.newPassword1
							})
							.then(function(res){
								if(res.data.flag){
									vm.$Message.success('密码修改成功');
								}else{
									vm.$Message.error('旧密码错误');
								}
								vm.$Clear(vm.passwordForm);
							});
						}else{
							vm.$Message.error('新密码两次填写不相同');
						}
					}else{
						vm.$Message.error('请填写完整信息');
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