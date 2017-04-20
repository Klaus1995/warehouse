<template>
	<div class="center">        
        <Row type="flex" justify="center">
            <Col span="5">
                <h1>注册</h1>
                <Form ref="registerForm" :model="registerForm" :rules="registerRules">
                    <Form-item prop="user">
                        <Input type="text" v-model="registerForm.user" placeholder="账号"></Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="registerForm.password" placeholder="密码"></Input>
                    </Form-item>
                    <Form-item>
                        <Row type="flex" justify="center">
                            <Col span="10">
                                <Button @click="$router.push('/')" long>登录</Button>
                            </Col>
                            <Col span="10" offset="2">
                                <Button @click="register('registerForm')" type="primary" long>注册</Button>
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
                registerForm:{
                    user:'',
                    password:''  
                },
                registerRules:{
                    user:[
                        {required:true,message:'请填写用户名',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'请填写密码',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
        	register:function(form){
        		let vm = this;
                this.$refs[form].validate(function(valid){
                    if(valid){
                        vm.$http.post('/api/register',{
                            user:vm.registerForm.user,
                            password:vm.registerForm.password
                        })
                        .then(function(res){
                            if(res.data.flag){
                                vm.$Message.success('注册成功,请登录');
                            }else{
                                vm.$Message.error('注册失败，用户名已存在');
                            }
                        });  
                    }else{
                        vm.$Message.error('请填写完整信息');
                    }
                });
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
    h1{
        text-align: center;
    }
</style>