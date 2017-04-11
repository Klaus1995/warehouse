<template>
    <div>
        <h1>主页</h1>
        <p>用户：{{$store.state.user}}</p>
        <label for="user">用户：</label>
        <input type="text" id="user" v-model="user">
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password">
        <button @click="login">登录</button>
        <p>{{message}}</p>
        <p>注册</p>
        <label for="newUser">用户：</label>
        <input type="text" id="newUser" v-model="newUser">
        <label for="newPassword">密码：</label>
        <input type="password" id="newPassword" v-model="newPassword">
        <button @click="register">注册</button>
    </div>
</template>

<script type="text/javascript">
    var vm = {
        name:'Home',
        data:function(){
            return {
                user:'',
                password:'',
                message:'',
                newUser:'',
                newPassword:''
            }
        },
        methods:{
            login:function(){
                let vm = this;
                this.$http.post('/api/login',{user:this.user,password:this.password})
                .then(function(res){
                    if(res.data.flag){
                        vm.message = '登陆成功！欢迎'+res.data.user;
                        setTimeout(function(){
                            vm.message = '';
                        },1000);
                        vm.$store.state.user = res.data.user;
                        vm.$store.state.inventoryInformation = res.data.information.inventoryInformation;
                        vm.$store.state.inventoryManagement = res.data.information.inventoryManagement;
                        vm.$store.state.basicInformation = res.data.information.basicInformation;
                    }else if(!res.data.flag&&!res.data.err){
                        vm.message = '登录失败,密码错误';
                        setTimeout(function(){
                            vm.message = '';
                        },1000);
                    }else {
                        vm.message = '登录失败,用户不存在';
                        setTimeout(function(){
                            vm.message = '';
                        },1000);
                    };
                });
            },
            register:function(){
                let vm = this;
                this.$http.post('/api/register',{user:this.newUser,password:this.newPassword})
                .then(function(res){
                    vm.message = res.data;
                    setTimeout(function(){
                        vm.message = '';
                    },1000);
                });
            }
        }
    };
    export default vm
</script>