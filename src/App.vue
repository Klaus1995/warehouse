<template>
    <div>
        <div class="topbar">
            <div class="user" v-show="!!$store.state.user">
                <Icon type="person"></Icon>
                {{$store.state.user}} | 
                <a @click="logout">退出</a>
            </div>
        </div>
        <Row type="flex" class="row">
            <Col span="4" class="menu-left">
                <Menu theme="dark" width="auto" @on-select="routerTo" active-name="/Login" accordion>
                    <Menu-item name="/Login">
                        <Icon type="home"></Icon>
                        登录
                    </Menu-item>
                    <Submenu name="basicInformation">
                        <template slot="title">
                            <Icon type="android-document"></Icon>
                            基本信息
                        </template>
                        <Menu-item name="/Commodity">
                            <Icon type="android-cart"></Icon>
                            商品信息
                        </Menu-item>
                        <Menu-item name="/Client">
                            <Icon type="person-stalker"></Icon>
                            客户信息
                        </Menu-item>
                        <Menu-item name="/Supplier">
                            <Icon type="person-stalker"></Icon>
                            供应商信息
                        </Menu-item>
                    </Submenu>
                    <Submenu name="inventoryManagement">
                        <template slot="title">
                            <Icon type="cube"></Icon>
                            仓库管理
                        </template>
                        <Menu-item name="/Enter">
                            <Icon type="log-in"></Icon>
                            入库
                        </Menu-item>
                        <Menu-item name="/Out">
                            <Icon type="log-out"></Icon>
                            出库
                        </Menu-item>
                    </Submenu>
                    <Submenu name="informationQuery">
                        <template slot="title">
                            <Icon type="search"></Icon>
                            信息查询
                        </template>
                        <Menu-item name="/Inventory">
                            <Icon type="android-list"></Icon>
                            库存信息查询
                        </Menu-item>
                    </Submenu>
                    <Submenu name="userManagement">
                        <template slot="title">
                            <Icon type="person"></Icon>
                            用户管理
                        </template>
                        <Menu-item name="/Register">
                            <Icon type="person-add"></Icon>
                            注册
                        </Menu-item>
                        <Menu-item name="/ModifyPassword">
                            <Icon type="edit"></Icon>
                            修改密码
                        </Menu-item>
                        <Menu-item name="/DeleteUser">
                            <Icon type="android-delete"></Icon>
                            删除用户
                        </Menu-item>
                    </Submenu>
                    <Menu-item name="/About">
                        <Icon type="bug"></Icon>
                        关于
                    </Menu-item>
                </Menu>
            </Col>
            <Col span="20" class="content">
                <router-view></router-view>
            </Col>
        </Row>
    </div>
</template>

<script type="text/javascript">
    let vm = {
        methods:{
            routerTo:function(name){
                if(this.$store.state.user||name==='/Login'||name==='/Register'){
                    this.$router.push(name);
                }else{
                    this.$Message.error('请先登录');
                }
            },
            logout:function(){
                this.$store.commit('clearAll');
                this.$router.push('/');
            }
        }
    };
    export default vm
</script>

<style scoped>
    .row{
        min-height: 700px;
        background: #464c5b;
    }
    .menu-left{
        background: #464c5b;
    }
    .content-top{
        height: 60px;
        line-height: 60px;
        background: #fff;
        color: #333;
        vertical-align: middle;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        padding-left: 50px;
    }
    .content{
        background: #fff;
    }
    .topbar{
        background: #464c5b;
        position: relative;
        height: 50px;
        overflow: hidden;
    }
    .user{
        float: right;
        margin-right: 30px;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
</style>