<template>
    <div class="makeoffer-wallpaper">
        <el-dialog
            title="开始报价"
            :visible.sync="visible"
            @open="handleOpen"
            :before-close="handleClose"
            width="30%"
        >
            <el-form
                :model="Form"
                :rules="Rules"
                label-width="120px"
            >
                <el-form-item label="客户名称" prop="cust_id" :error="AuthorizeMsg">
                    <el-select
                        remote
                        filterable
                        v-model="Form.cust_id"
                        :remote-method="remoteMethod"
                        :loading="RemoteLoading"
                        @change="handleCustSelect"
                    >
                        <el-option
                            v-for="(item,k) in customers"
                            :key="k"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button type="success" size="mini" v-if="AuthorizeMsg">申请授权</el-button>
                </el-form-item>
                <el-form-item label="选择分类" prop="category">
                    <el-select v-model="Form.category" @change="CategoryChange">
                        <el-option
                            v-for="(item,k) in categorys"
                            :key="k"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择品牌" prop="brand">
                    <el-select v-model="Form.brand">
                        <el-option
                            v-for="(item, k) in brands"
                            :key="k"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务人员" prop="offeror">
                    <el-select v-model="Form.offeror">
                        <el-option v-for="(item,key) in offerors" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计算公式" prop="operate">
                    <div style="display: flex;">
                        <el-input :value="'价格'" :disabled="true" placeholder="请输入数字" style="flex:1"></el-input>
                        <el-select v-model="Form.operate" style="margin: 0 5px;flex:1">
                            <el-option v-for="(item, key) in operates" :key="key" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-form-item prop="discount" style="margin: 0;flex:2">
                            <el-input v-model="Form.discount" placeholder="请输入数字"></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="选择规格" prop="products" v-if="visible">
                    <el-tree
                        :data="treeData"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="['0']"
                        @check="handleCheck"
                        >
                    </el-tree>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click.native="submit" :loading="submiting">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "MakeOffer",

        data() {
            return {
                Form: {
                    cust_id: "",
                    products: [],
                    category: "",
                    brand: "",
                    operate: 1,
                    offeror: "",
                    discount: ""
                },
                Rules: {
                    cust_id: [
                        {required: true,trigger: "blur",message: "请选择客户"}
                    ],
                    products: [
                        {required: true,trigger: "blur",message: "请选择产品规格"}
                    ],
                    category: [
                        {required: true,trigger: "blur",message: "请选择分类"}
                    ],
                    brand: [
                        {required: true,trigger: "blur",message: "请选择品牌"}
                    ],
                    operate: [
                        {required: true, trigger: "blur"}
                    ],
                    discount: [
                        {validator: this.validateField,trigger:'blur'}
                    ],
                    offeror: [
                        {required: true,trigger: "blur",message: "请选择服务人员"}
                    ]
                },
                operates: [{label: "x",value:1},{label: "÷",value: 2},{label:"+",value:3},{label:"-",value:4}],
                RemoteLoading: false,
                submiting: false,
                defaultField: {},
                FieldMap: {},
                AuthorizeMsg: ""
            }
        },
        created() {
            /**加载价格分类信息**/
            this.$store.dispatch("MakeOfferParams");
        },
        methods: {
            /**
             * 关闭事件
             * **/
            handleClose() {
                this.$store.dispatch("SetBaseProductConfig",{field: "Price.MakeOffer.visible",value: false});
            },
            /**打开事件**/
            handleOpen() {

            },
            handleCheck(data, checked) {
                this.Form.products.push(eval("("+checked.checkedKeys+")"));
            },
            /**
             * 远程搜索客户
             * **/
            remoteMethod(query) {
                console.log(query)
            },

            /**
             * 提交报价
             * **/
            submit() {
                console.log(this.Form)
            },
            CategoryChange() {
                this.Form.brand = "";
                this.Form.products = [];
            },
            /**
             * 表单字段验证
             * @所有价格相关的字段都只能是数字,整数或者小数
             * **/
            validateField(rule, value, callback) {
                if (/^[1-9]+(\.?\d+){0,1}$/.test(value))
                    callback();
                else
                    callback(new Error("请输入数字"));
            },
            handleCustSelect(val) {
                this.customers.forEach((item) => {
                    if (item.value == val)
                    {
                        if (!item.authorize)
                            this.AuthorizeMsg = "你没有对该客户报价的权限，请申请授权";
                        else
                            this.AuthorizeMsg = "";
                    }

                });
            }
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.MakeOffer.visible;
            },
            customers: function() {
                return [{label:"江苏华建", value: 1,authorize: true},{label: "北京建工",value: 2,authorize:false}];
            },

            /**
             * 产品分类
             * **/
            categorys: function() {
                console.log(this.$store.state.user.MakeOfferParams);
                return this.$store.state.user.MakeOfferParams;
            },

            /**
             * 品牌列表
             * **/
            brands: function() {
                if (this.Form.category)
                {
                    let rows = [];
                    this.categorys.forEach((item) => {
                        if (item.value == this.Form.category)
                            rows = item.childrens;
                    });

                    return rows;
                }
            },
            /**
             * 生成所有产品规格
             * **/
            treeData: function () {
                if (this.brands && this.Form.brand)
                {
                    let products = [], data = [{label:"全部",id:"0",children: []}], fieldMap = {};

                    this.brands.forEach((item) => {
                        if (item.value == this.Form.brand)
                        {
                            products = item.products;
                            fieldMap = item.field_map;
                        }
                    });

                    if (products) {
                        products.forEach((item) => {
                            let t = {label:[],id:"{"};
                            for (let k in item) {
                                t.label.push(fieldMap[k] + "(" + item[k] + ")");
                                t.id += k+":"+item[k]+",";
                            }
                            t.label = t.label.join("、");
                            t.id = t.id.substring(0,t.id.length - 1);
                            t.id += "}";

                            data[0].children.push(t);
                        });

                        if (data[0].children.length > 0)
                            return data;
                        else
                            return [];
                    }
                }
            },

            /**
             * 报价人
             * **/
            offerors: function() {
                return [{label: "桥本有菜",value: 1},{label:"铃木佐佐希",value: 2},{label: "陈乔恩",value: 3},{label:"王丽坤",value:4}];
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
