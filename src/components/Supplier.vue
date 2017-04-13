<template>
    <div>
        <Menu theme="dark" mode="horizontal" active-name="modify" class="nav" @on-select="chooseMenu">
            <Menu-item name="add">添加供应商信息</Menu-item>
            <Menu-item name="modify">查看供应商列表</Menu-item>
        </Menu>


        <Row type="flex" justify="center" class="content" v-if="menu==='add'">
            <Col span="12">
                <Form ref="supplierForm" :model="supplierForm" :rules="supplierRules" :label-width="100">
                    <Form-item label="公司名称" prop="company">
                        <Input type="text" v-model="supplierForm.company"></Input>
                    </Form-item>
                    <Form-item label="联系人" prop="person">
                        <Input type="text" v-model="supplierForm.person"></Input>
                    </Form-item>
                    <Form-item label="联系地址" prop="address">
                        <Input type="text" v-model="supplierForm.address"></Input>
                    </Form-item>
                    <Form-item label="城市名称" prop="city">
                        <Input type="text" v-model="supplierForm.city"></Input>
                    </Form-item>
                    <Form-item label="地区名称" prop="area">
                        <Input type="text" v-model="supplierForm.area"></Input>
                    </Form-item>
                    <Form-item label="邮政编码" prop="postcode">
                        <Input type="text" v-model="supplierForm.postcode"></Input>
                    </Form-item>
                    <Form-item label="联系电话" prop="telphone">
                        <Input type="text" v-model="supplierForm.telphone"></Input>
                    </Form-item>
                    <Form-item label="传真号码" prop="fax">
                        <Input type="text" v-model="supplierForm.fax"></Input>
                    </Form-item>
                    <Form-item label="公司主页" prop="homepage">
                        <Input type="text" v-model="supplierForm.homepage"></Input>
                    </Form-item>
                    <Form-item>
                        <Button @click="save('supplierForm')">保存</Button>
                        <Button @click="cancel(supplierForm)">取消</Button>
                    </Form-item>
                </Form>
            </Col>
        </Row>


        <Row type="flex" justify="center" class="content" v-if="menu==='modify'">
            <Col span="22">
                <Table highlight-row border :context="self" :columns="columns" :data="$store.state.basicInformation.supplier"></Table>
            </Col>
        </Row>

        <Modal v-model="confirmModifyFlag" @on-cancel="cancel(supplierForm)">
            <p slot="header" style="color:#3399ff;text-align:center">
                <Icon type="edit"></Icon>
                <span>修改信息</span>
            </p>
            <div style="text-align:center">
                <Form ref="supplierForm" :model="supplierForm" :rules="supplierRules" :label-width="100">
                    <Form-item label="公司名称" prop="company">
                        <Input type="text" v-model="supplierForm.company"></Input>
                    </Form-item>
                    <Form-item label="联系人" prop="person">
                        <Input type="text" v-model="supplierForm.person"></Input>
                    </Form-item>
                    <Form-item label="联系地址" prop="address">
                        <Input type="text" v-model="supplierForm.address"></Input>
                    </Form-item>
                    <Form-item label="城市名称" prop="city">
                        <Input type="text" v-model="supplierForm.city"></Input>
                    </Form-item>
                    <Form-item label="地区名称" prop="area">
                        <Input type="text" v-model="supplierForm.area"></Input>
                    </Form-item>
                    <Form-item label="邮政编码" prop="postcode">
                        <Input type="text" v-model="supplierForm.postcode"></Input>
                    </Form-item>
                    <Form-item label="联系电话" prop="telphone">
                        <Input type="text" v-model="supplierForm.telphone"></Input>
                    </Form-item>
                    <Form-item label="传真号码" prop="fax">
                        <Input type="text" v-model="supplierForm.fax"></Input>
                    </Form-item>
                    <Form-item label="公司主页" prop="homepage">
                        <Input type="text" v-model="supplierForm.homepage"></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="info" size="large" long @click="modifySupplier(index)">修改</Button>
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
                supplierForm:{
                    company:'',
                    person:'',
                    address:'',
                    city:'',
                    area:'',
                    postcode:'',
                    telphone:'',
                    fax:'',
                    homepage:''
                },
                supplierRules:{
                    company:[
                        {required:true,message:'请填写公司名称',trigger:'blur'}
                    ],
                    person:[
                        {required:true,message:'请填写联系人',trigger:'blur'}
                    ],
                    address:[
                        {required:true,message:'请填写联系地址',trigger:'blur'}
                    ],
                    city:[
                        {required:true,message:'请填写城市名称',trigger:'blur'}
                    ],
                    area:[
                        {required:true,message:'请填写地区名称',trigger:'blur'}
                    ],
                    postcode:[
                        {required:true,message:'请填写邮政编码',trigger:'blur'}
                    ],
                    telphone:[
                        {required:true,message:'请填写联系电话',trigger:'blur'}
                    ],
                    fax:[
                        {required:true,message:'请填写邮政编码',trigger:'blur'}
                    ],
                    homepage:[
                        {required:true,message:'请填写公司主页',trigger:'blur'}
                    ]
                },
                columns:[
                    {
                        type:'index',
                        width:50,
                        align:'center'
                    },
                    {
                        title:'公司名称',
                        key:'company'
                    },
                    {
                        title:'联系人',
                        key:'person'
                    },
                    {
                        title:'公司地址',
                        key:'address'
                    },
                    {
                        title:'城市名称',
                        key:'city'
                    },
                    {
                        title:'地区名称',
                        key:'area'
                    },
                    {
                        title:'邮政编码',
                        key:'postcode'
                    },
                    {
                        title:'联系电话',
                        key:'telphone'
                    },
                    {
                        title:'传真号码',
                        key:'fax'
                    },
                    {
                        title:'公司主页',
                        key:'homepage'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 130,
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
                this.cancel(this.supplierForm);
            },
            save:function(formStr){
                let vm = this;
                this.$refs[formStr].validate(function(valid){
                    if(valid){
                        vm.$http.post('/api/saveSupplier',{
                            user:vm.$store.state.user,
                            information:vm.supplierForm,
                            index:vm.index,
                            modify:vm.modify
                        })
                        .then(function(res){
                            if(res.data.flag){
                                vm.$Message.success('供应商信息保存成功');
                                vm.$store.state.basicInformation = res.data.information;
                                vm.cancel(vm.supplierForm);
                            }else{
                                vm.$Message.error('供应商信息保存失败');
                            }
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
                this.supplierForm = this.$Copy({},this.$store.state.basicInformation.supplier[index]);
                delete this.supplierForm._id;
            },
            modifyClient:function(){
                this.save('supplierForm');
                this.confirmModifyFlag = false;
            },
            confirmDel:function(index){
                this.confirmDelFlag = true;
                this.index = index;
            },
            del:function(){
                let vm = this;
                this.$http.post('/api/delSupplier',{
                    user:this.$store.state.user,
                    delIndex:this.index
                })
                .then(function(res){
                    if(res.data.flag){
                        vm.$Message.success('删除成功');
                        vm.$store.state.basicInformation.supplier.splice(vm.index,1);
                    }else{
                        vm.$Message.error('删除失败');
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