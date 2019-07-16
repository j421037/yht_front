<template>
    <div class="makeoffer-wallpaper">
        <el-dialog
            title="开始报价"
            :visible.sync="visible"
            @open="handleOpen"
            :before-close="handleClose"
            width="40%"
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
                    <el-select v-model="Form.version_id" @change="PriceVersuibChange">
                        <el-option v-for="(item, key) in versions" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计算公式" prop="formula_id">
                    <div class="operate" style="display: flex">
                        <el-select v-model="Form.formula_id">
                            <el-option v-for="(item, key) in FormulaOptions" :key="key" :label="item.label" :value="item.value" />
                        </el-select>
                        <div style="margin-left: 5px">
                            <el-button type="success" size="mini" :disabled="!Form.product_brand_id" @click.native="AppendFormulaDialog = true">添加公式</el-button>
                        </div>
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
        <el-dialog
            title="设计公式"
            :visible.sync="AppendFormulaDialog"
            width="40%"
        >
            <div class="AppendFormulaDialog_body">

                <div class="formula-container">
                    <div class="add-param">
                        <el-button size="mini" type="info" @click.native="FormulaAddField('field')">增加操作符或字段</el-button>
                        <el-button size="mini" type="info" :disabled="CanAppendNumeric" @click.native="FormulaAddField('numeric')">增加数值</el-button>
                    </div>
                    <p v-if="refreshStatus">{{AppendFormulaFormTostring}}</p>
                    <p class="errmsg" style="font-size:12px;color:red">{{errmsg}}</p>
                    <el-form :inline="true" class="FormulaForm">
                        <el-form-item v-for="(item, key) in AppendFormulaForm" :key="key">
                            <el-select v-if="item.type == 'field'" v-model="item.value" @change="FormulaFormParamChanged">
                                <el-option v-for="(it,k) in FormmulaParams" :key="k" :label="it.label" :value="it.value" />
                            </el-select>
                            <el-input v-else v-model="item.value" />
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="FormulaClearAll">清 空</el-button>
                <el-button @click="RemoveLast">撤销上一步</el-button>
                <el-button type="primary" @click.native="SaveFormula" >保 存</el-button>
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
                    formula_id: null
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
                    ],
                    formula_id: [
                        {required: true, trigger: "blur", message: "请选择计算公式"}
                    ]
                },
                operates: [{label: "x",value:1},{label: "÷",value: 2},{label:"+",value:3},{label:"-",value:4}],
                RemoteLoading: false,
                submiting: false,
                defaultField: {},
                FieldMap: {},
                AuthorizeMsg: "",
                mode: 0,
                AppendFormulaDialog: false,
                AppendFormulaForm: [],
                errmsg: null,
                refreshStatus: true,
                FormulaAppendSuccessRows: []
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
                this.Form.products = checked.checkedKeys;
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
                        console.log(this.Form)
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
            },
            FormulaAddField(type) {
                this.AppendFormulaForm.push({type: type, value: ""});
            },
            FormulaFormParamChanged() {
                this.errmsg = null;
            },
            FormulaClearAll() {
                this.AppendFormulaForm = [];
                this.errmsg = null;
            },
            RemoveLast() {

                this.AppendFormulaForm.pop();
            },
            PriceVersuibChange(val) {
                this.$store.dispatch("LoadProductsFromVersion", {id:val});
            },
            SaveFormula() {

                let items = [];
                let lastItem = [];
                let bracketStack = 0;
                let params = [];
                let FormmulaParams = this.FormmulaParams;

                this.AppendFormulaForm.forEach(item => {
                    params.push(Object.assign({}, item));
                })

                params.map(item => {
                    let row = FormmulaParams.find(it => {return it.value == item.value;});

                    if (row)
                        item.type = row.type;
                    return item;
                });

                let result = params.every(item => {
                    //括号栈
                    if (item.value == "(") //压入
                        ++bracketStack
                    if (item.value == ")") //弹出
                        --bracketStack;

                    if (Object.getOwnPropertyNames(lastItem).length > 0) {

                        if (lastItem.type == "operator" && item.type == "operator") {
                            this.errmsg = "不能连续使用两个运算符";
                            lastItem = item;
                            return false;
                        }

                        if (lastItem.type == "field" && item.type == "field") {
                            this.errmsg = "不能连续使用两个字段"
                            lastItem = item;
                            return false;
                        }

                        if (lastItem.type == "operator" && item.valud == ")")
                        {
                            this.errmsg = '运算符后面不能接括号 ")"';
                            lastItem = item;
                            return false;
                        }

                        if (lastItem.value == "(" && item.type == "operator") {
                            this.errmsg = "运算符前面不能使用括号";
                            lastItem = item;
                            return false;
                        }

                        if ((lastItem.value == "(" && item.value == ")") ) {
                            this.errmsg = "不能连续使用两个括号";
                            lastItem = item;
                            return false;
                        }

                        if ((lastItem.value == ")" && item.type == "field") ) {
                            this.errmsg = "右括号后不可以连接字段";
                            lastItem = item;
                            return false;
                        }
                    }
                    else {
                        if (item.type == "operator") {
                            this.errmsg = "请检查符号的合法性";
                            lastItem = item;
                            return false;
                        }
                    }

                    if (item.type == "numeric") {
                        //前面不能是字段
                        if (item.value == "") {
                            this.errmsg = "输入框内容不能为空"
                            return false;
                        }

                        if (Object.getOwnPropertyNames(lastItem).length > 0 && (lastItem.type == "field" || lastItem.value == ")")) {
                            this.errmsg = "输入内容之前不能是字段和右括号";
                            return false
                        }


                    }

                    lastItem = item;
                    return true;
                });

                if (bracketStack != 0 && result == true) {
                    this.errmsg = "请检查括号的合法性"
                    result = false;
                }
                console.log(params);
                //公式没有问题
                if (result) {
                    this.$store.dispatch("AppendFormula", {params :params, tableId:this.Form.product_brand_id}).then(response => {

                        console.log(response)
                        if (response.status == "success") {
                            let item = {label: response.formula, value: response.id};
                            this.FormulaAppendSuccessRows.push(item);
                            this.AppendFormulaDialog = false;
                            this.Form.formula_id = response.id;
                        }
                        else {
                            this.errmsg = response.errmsg;
                        }
                    })
                }
            }
        },
        computed: {

            FormulaOptions: function() {
                let options = [];

                let row = this.brands.find(item => {return item.value == this.Form.product_brand_id;});

                if (typeof (row) != "undefined") {
                    if (row.formulas.length > 0)
                        options = row.formulas;
                }


                if (this.FormulaAppendSuccessRows.length > 0) {
                    this.FormulaAppendSuccessRows.forEach(item => {
                       options.unshift(item); //插入元素
                    });
                }

                return options;
            },
            CanAppendNumeric: function() {
                if (this.AppendFormulaForm.length > 0) {
                    let row = this.AppendFormulaForm[this.AppendFormulaForm.length - 1];
                    if (row.type == "numeric")
                        return true
                    return false;
                }

                return false;
            },
            AppendFormulaFormTostring() {
                let tmp = "";

                for (let i in this.AppendFormulaForm) {
                    tmp += " " + this.AppendFormulaForm[i].value;
                }

                return tmp;
            },
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
                console.log(rows)
                return rows;
            },

            /**
             * 生成所有产品规格
             * **/
            treeData: function () {
                let rows = [{label: "全部",id: 0, children: []}];

                let spec = this.$store.state.user.LoadProductsFromVersion;

                spec.forEach(item => {
                   rows[0].children.push({label: item.label, id:item.value, childred:[]});
                });

                return rows;
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
            FormmulaParams: function() {
                if (this.brands.length > 0 && this.Form.product_brand_id) {
                    let row = this.brands.find(it => {return it.value == this.Form.product_brand_id;});
                    return row.formula_param;
                }

                return [];
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "MakeOffer.styl"
</style>
