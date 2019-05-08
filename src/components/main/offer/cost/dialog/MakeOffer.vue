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
                ref="form"
            >
                <el-form-item label="客户名称" prop="customer_id" :error="AuthorizeMsg">
                    <el-select
                        remote
                        filterable
                        v-model="Form.customer_id"
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
                <el-form-item label="选择品牌" prop="product_brand_id">
                    <el-select v-model="Form.product_brand_id" @change="BrandChange">
                        <el-option
                            v-for="(item, k) in brands"
                            :key="k"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务人员" prop="serviceor_id">
                    <el-select v-model="Form.serviceor_id">
                        <el-option v-for="(item,key) in users" :key="key" :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格版本" prop="version_id">
                    <el-select v-model="Form.version_id">
                        <el-option v-for="(item, key) in versions" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计算公式" prop="operate">
                    <div style="display: flex;">
                        <el-input :value="'价格'" :disabled="true" placeholder="请输入数字" style="flex:1"></el-input>
                        <el-select v-model="Form.operate" style="margin: 0 5px;flex:1">
                            <el-option v-for="(item, key) in operates" :key="key" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-form-item prop="operate_val" style="margin: 0;flex:2">
                            <el-input v-model="Form.operate_val" placeholder="请输入数字">
                                <template slot="append" v-if="mode == 1">元</template>
                                <template slot="append" v-if="mode == 0">百分点</template>
                            </el-input>
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
                    customer_id: "",
                    products: [],
                    category: "",
                    product_brand_id: "",
                    operate: 1,
                    serviceor_id: "",
                    operate_val: "",
                    version_id: ""
                },
                Rules: {
                    customer_id: [
                        {required: true,trigger: "blur",message: "请选择客户"}
                    ],
                    products: [
                        {required: true,trigger: "blur",message: "请选择产品规格"}
                    ],
                    category: [
                        {required: true,trigger: "blur",message: "请选择分类"}
                    ],
                    product_brand_id: [
                        {required: true,trigger: "blur",message: "请选择品牌"}
                    ],
                    operate: [
                        {required: true, trigger: "blur"}
                    ],
                    operate_val: [
                        {validator: this.validateField,trigger:'blur'}
                    ],
                    serviceor_id: [
                        {required: true,trigger: "blur",message: "请选择服务人员"}
                    ],
                    version_id: [
                        {required: true,trigger:'blur',message: "请选择价格版本"}
                    ]
                },
                operates: [{label: "x",value:1},{label: "÷",value: 2},{label:"+",value:3},{label:"-",value:4}],
                RemoteLoading: false,
                submiting: false,
                defaultField: {},
                FieldMap: {},
                AuthorizeMsg: "",
                mode: 0
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
                if (checked.checkedKeys.length > 0) {
                    let checks = checked.checkedKeys;

                    if (checks[0] == "0")
                        checks.splice(0,1);

                    for (let i in checks)
                    {
                        checks[i] =  eval("("+checks[i]+")");
                    }

                    this.Form.products = checks;
                }
            },
            /**
             * 远程搜索客户
             * **/
            remoteMethod(query) {
                if (query) {
                    this.RemoteLoading = true;
                    this.$store.dispatch("QueryCustomer",{keyword:query}).then(() => {
                        this.RemoteLoading = false;
                    });
                }
            },

            /**
             * 提交报价
             * **/
            submit() {
                this.$refs["form"].validate((valid) => {
                    if (valid)
                    {
                        this.$store.dispatch("CreateOffer",this.Form).then(() => {
                            let response = this.$store.state.user.CreateOffer;

                            if (response.status == "success")
                            {
                                this.$notify.success("创建成功！请到历史报价下载报价文件");
                                this.$refs["form"].resetFields();
                                this.handleClose();
                            }
                            else {
                                this.$notify.error("操作失败,"+response.errmsg);
                            }
                        });
                    }
                });
            },
            CategoryChange() {
                this.Form.product_brand_id = "";
                this.Form.products = [];
            },
            BrandChange(val) {
                this.brands.forEach((item) => {
                    if (val == item.value)
                        this.mode = item.mode;
                });
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
                        // if (!item.authorize)
                        //     this.AuthorizeMsg = "你没有对该客户报价的权限，请申请授权";
                        // else
                        //     this.AuthorizeMsg = "";
                    }
                });
            }
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.MakeOffer.visible;
            },
            customers: function() {
                let customers = this.$store.state.user.QueryCustomer, items = [];
                customers.forEach(item => {
                   items.push({label:item.name,value:item.id});
                });

                return items;
            },

            /**
             * 产品分类
             * **/
            categorys: function() {
                return this.$store.state.user.MakeOfferParams;
            },

            /**
             * 品牌列表
             * **/
            brands: function() {
                let rows = [];

                this.categorys.forEach((item) => {
                    if (item.value == this.Form.category)
                        rows = item.childrens;
                });
                return rows;
            },
            /**
             * 生成所有产品规格
             * **/
            treeData: function () {
                if (this.brands && this.Form.product_brand_id)
                {
                    let products = [], data = [{label:"全部",id:"0",children: []}], fieldMap = {};

                    this.brands.forEach((item) => {
                        if (item.value == this.Form.product_brand_id)
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
            users: function() {
                return this.$store.state.user.CostRole.users;
            },

            /**
             * 价格版本
             * **/
            versions: function() {
                let rows = [];

                this.brands.forEach((item) => {
                    if (item.value == this.Form.product_brand_id)
                        rows = item.versions;
                });
                return rows;
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
