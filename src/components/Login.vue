<template>
    <div class="center">
        <Row type="flex" justify="center">
            <Col span="5">
               <Form ref="loginForm" :model="loginForm" :rules="loginRules">
                    <Form-item prop="user">
                        <Input type="text" v-model="loginForm.user" placeholder="账号"></Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="loginForm.password" placeholder="密码"></Input>
                    </Form-item>
                    <Form-item>
                        <Row type="flex" justify="center">
                            <Col span="10">
                                <Button @click="$router.push('/Register')" long>注册</Button>
                            </Col>
                            <Col span="10" offset="2">
                                <Button @click="login('loginForm')" type="primary" long>登录</Button>
                            </Col>
                        </Row>
                    </Form-item>
                </Form> 
            </Col>
        </Row>
    </div>
</template>

<script type="text/javascript">
    var vm = {
        data:function(){
            return {
                loginForm:{
                    user:'',
                    password:''  
                },
                loginRules:{
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
            login:function(formStr){
                let vm = this;
                this.$refs[formStr].validate(function(valid){
                    if (valid) {
                        vm.$http.post('/api/login',{
                            user:vm.loginForm.user,
                            password:vm.loginForm.password
                        })
                        .then(function(res){
                            if(res.data.flag){
                                vm.$Message.success('登陆成功！欢迎'+res.data.user);
                                vm.$store.state.user = res.data.user;
                                vm.$store.state.inventoryInformation = res.data.information.inventoryInformation;
                                vm.$store.state.inventoryManagement = res.data.information.inventoryManagement;
                                vm.$store.state.basicInformation = res.data.information.basicInformation;
                                vm.$router.push('/About');
                            }else if(!res.data.flag&&!res.data.err){
                                vm.$Message.error('登录失败,密码错误');
                            }else {
                                vm.$Message.error('登录失败,用户不存在');
                            }
                        });
                    } else {
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
</style>
