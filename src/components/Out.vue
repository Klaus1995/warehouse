<template>
    <div>
        <Menu theme="dark" mode="horizontal" active-name="modify" class="nav" @on-select="chooseMenu">
            <Menu-item name="add">添加出库信息</Menu-item>
            <Menu-item name="modify">查看出库信息列表</Menu-item>
        </Menu>


        <Row type="flex" justify="center" class="content" v-if="menu==='add'">
            <Col span="12">
                <Form ref="outForm" :model="outForm" :rules="outRules" :label-width="100">
                    <Form-item label="客户" prop="company">
                        <Select @on-change="selectClient" filterable>
                            <Option v-for="(item,index) in $store.state.basicInformation.client" :value="index" :key="index">{{item.company}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="联系人" prop="person">
                        <Input type="text" v-model="outForm.person" disabled></Input>
                    </Form-item>
                    <Form-item label="联系电话" prop="telphone">
                        <Input type="text" v-model="outForm.telphone" disabled></Input>
                    </Form-item>
                    <Form-item label="商品名称" prop="name">
                        <Select @on-change="selectCommodity" filterable>
                            <Option v-for="(item,index) in $store.state.basicInformation.commodity" :value="index" :key="index">{{item.name}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="商品规格" prop="specification">
                        <Input type="text" v-model="outForm.specification" disabled></Input>
                    </Form-item>
                    <Form-item label="商品单位" prop="unit">
                        <Input type="text" v-model="outForm.unit" disabled></Input>
                    </Form-item>
                    <Form-item label="出库价格" prop="price">
                        <Input-number :min="0" v-model="outForm.price" style="width: 100%"></Input-number>
                    </Form-item>
                    <Form-item label="出库数量" prop="quantity">
                        <Input-number :min="0" v-model="outForm.quantity" style="width: 100%"></Input-number>
                    </Form-item>
                    <Form-item label="出库日期" prop="date">
                        <Date-picker type="date" v-model="outForm.date" style="width: 100%" placement="top"></Date-picker>
                    </Form-item>
                    <Form-item>
                        <Button @click="save('outForm')">保存</Button>
                        <Button @click="cancel(outForm)">取消</Button>
                    </Form-item>
                </Form>
            </Col>
        </Row>


        <Row type="flex" justify="center" class="content" v-show="menu==='modify'">
            <Col span="22">
                <Table highlight-row border :context="self" :columns="columns" :data="$store.state.inventoryManagement.outInventory"></Table>
            </Col>
        </Row>

        <Modal v-model="confirmModifyFlag" @on-cancel="cancel(modifyForm)">
            <p slot="header" style="color:#3399ff;text-align:center">
                <Icon type="edit"></Icon>
                <span>修改信息</span>
            </p>
            <div style="text-align:center">
                <Form ref="modifyForm" :model="modifyForm" :rules="outRules" :label-width="100">
                    <Form-item label="客户" prop="company">
                        <Input type="text" v-model="modifyForm.company"></Input>
                    </Form-item>
                    <Form-item label="联系人" prop="person">
                        <Input type="text" v-model="modifyForm.person"></Input>
                    </Form-item>
                    <Form-item label="联系电话" prop="telphone">
                        <Input type="text" v-model="modifyForm.telphone"></Input>
                    </Form-item>
                    <Form-item label="商品名称" prop="name">
                        <Input type="text" v-model="modifyForm.name"></Input>
                    </Form-item>
                    <Form-item label="商品规格" prop="specification">
                        <Input type="text" v-model="modifyForm.specification"></Input>
                    </Form-item>
                    <Form-item label="商品单位" prop="unit">
                        <Input type="text" v-model="modifyForm.unit"></Input>
                    </Form-item>
                    <Form-item label="出库价格" prop="price">
                        <Input-number :min="0" v-model="modifyForm.price" style="width: 100%"></Input-number>
                    </Form-item>
                    <Form-item label="出库数量" prop="quantity">
                        <Input-number :min="0" v-model="modifyForm.quantity" style="width: 100%"></Input-number>
                    </Form-item>
                    <Form-item label="出库日期" prop="date">
                        <Date-picker type="date" v-model="modifyForm.date" style="width: 100%" placement="top"></Date-picker>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="info" size="large" long @click="modifyOut(index)">修改</Button>
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
                outForm:{
                    company:'',
                    person:'',
                    telphone:'',
                    name:'',
                    specification:'',
                    unit:'',
                    price:0,
                    quantity:0,
                    date:new Date()
                },
                modifyForm:{
                    company:'',
                    person:'',
                    telphone:'',
                    name:'',
                    specification:'',
                    unit:'',
                    price:0,
                    quantity:0,
                    date:new Date()
                },
                outRules:{
                    company:[
                        {required:true,message:'请填写客户',trigger:'blur'}
                    ],
                    person:[
                        {required:true,message:'请填写联系人',trigger:'blur'}
                    ],
                    telphone:[
                        {required:true,message:'请填写联系电话',trigger:'blur'}
                    ],
                    name:[
                        {required:true,message:'请填写商品名称',trigger:'blur'}
                    ],
                    specification:[
                        {required:true,message:'请填写商品规格',trigger:'blur'}
                    ],
                    unit:[
                        {required:true,message:'请填写商品单位',trigger:'blur'}
                    ],
                    price:[
                        {required:true,type:'number',message:'请填写出库价格',trigger:'blur'},
                    ],
                    quantity:[
                        {required:true,type:'number',message:'请填写出库数量',trigger:'blur'},
                        {min:0.0000001,type:'number',message:'数量不能为0',trigger:'blur'}
                    ],
                    date:[
                        {required:true,message:'请填写出库时间',trigger:'blur'},
                    ]
                },
                columns:[
                    {
                        type:'index',
                        width:50,
                        align:'center'
                    },
                    {
                        title:'客户',
                        key:'company'
                    },
                    {
                        title:'联系人',
                        key:'person'
                    },
                    {
                        title:'联系电话',
                        key:'telphone'
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
                        title:'出库价格',
                        key:'price'
                    },
                    {
                        title:'出库数量',
                        key:'quantity'
                    },
                    {
                        title:'出库日期',
                        key:'date'
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
                this.cancel(this.outForm);
            },
            selectClient:function(index){
                let form = this.outForm;
                form.company = this.$store.state.basicInformation.client[index].company;
                form.person = this.$store.state.basicInformation.client[index].person;
                form.telphone = this.$store.state.basicInformation.client[index].telphone;
            },
            selectCommodity:function(index){
                let form = this.outForm;
                form.name = this.$store.state.basicInformation.commodity[index].name;
                form.specification = this.$store.state.basicInformation.commodity[index].specification;
                form.unit = this.$store.state.basicInformation.commodity[index].unit;
            },
            save:function(formStr){
                let vm = this;
                let form;
                if(!this.modify){
                    form = this.outForm;
                }else{
                    form = this.modifyForm;
                }
                if(typeof form.date==='object'){
                    form.date = form.date.toDateString();
                }
                this.$refs[formStr].validate(function(valid){
                    if(valid){
                        vm.$http.post('/api/saveOutInventory',{
                            user:vm.$store.state.user,
                            information:form,
                            index:vm.index,
                            modify:vm.modify
                        })
                        .then(function(res){
                        	switch(res.data.status)
							{
							case 0:	
								vm.$Message.success('入库成功');
								break;
							case 1:	
								vm.$Message.error('出库失败，仓库不存在此商品');
								break;
							case 2:	
								vm.$Message.error('出库失败，库存不足');
								break;
							case 3:	
								vm.$Message.success('出库成功');
								break;
							case 4:	
								vm.$Message.success('入库信息修改成功');
								break;
							case 5:	
								vm.$Message.success('出库信息修改成功');
								break;
							}
							vm.$store.state.inventoryManagement = res.data.information.inventoryManagement;
							vm.$store.state.inventoryInformation = res.data.information.inventoryInformation;
							form.price = 0;
							form.quantity = 0;
							form.date = new Date();
                        });
                    }else{
                        vm.$Message.error('请填写完整信息');
                    }
                });
            },
            cancel:function(form){
                this.$Clear(form);
                this.outForm.date = new Date();
                this.index = -1;
                this.modify = false;
            },
            confirmModify:function(index){
                this.confirmModifyFlag = true;
                this.index = index;
                this.modify = true;
                this.modifyForm = this.$Copy({},this.$store.state.inventoryManagement.outInventory[index]);
                delete this.modifyForm._id;
            },
            modifyOut:function(){
                this.save('modifyForm');
                this.confirmModifyFlag = false;
            },
            confirmDel:function(index){
                this.confirmDelFlag = true;
                this.index = index;
            },
            del:function(){
                let vm = this;
                this.$http.post('/api/delOutInventory',{
                    user:this.$store.state.user,
                    delIndex:this.index
                })
                .then(function(res){
                    if(res.data.flag){
                        vm.$Message.success('删除成功');
                        vm.$store.state.inventoryManagement.outInventory.splice(vm.index,1);
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