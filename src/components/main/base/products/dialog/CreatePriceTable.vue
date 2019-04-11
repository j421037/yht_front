<template>
    <div class="create-price-dialog">
        <el-dialog
            title="创建价格表"
            :visible.sync="Visible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form ref="form" :model="Form" :rules="Rules" label-width="120px" class="create-price-dialog_form">
                <section>
                    <p class="title">基础信息</p>
                </section>
                <el-form-item prop="category" label="产品分类">
                    <el-select v-model="Form.category" placeholder="请选择分类" @change="handleChange">
                        <el-option v-for="(item, k) in CategoryList" :key="k" :label="item.name" :value="item.id" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="brand" label="选择品牌">
                    <el-select v-model="Form.brand" placeholder="请选择品牌">
                        <el-option v-for="(item,k ) in BrandList" :key = "k" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格计算方式" prop="method">
                    <el-select v-model="Form.method">
                        <el-option v-for="(item,k) in Methods" :label="item.name" :value="item.id" :key="k"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据表名称" prop="table">
                    <el-input v-model="Form.table" placeholder="表名称">
                        <template slot="prepend">{{prefix}}</template>
                    </el-input>
                </el-form-item>
                <section>
                    <p class="title">产品属性</p>
                </section>
                <div
                    class="horizontal-item"
                    v-for="(item,k) in Form.attribute"
                >
                    <el-form-item
                        label="描述"
                        label-width="80px"
                        :rules="{required: true,trigger:'blur',message: '请输入描述'}"
                    >
                        <el-input v-model="item.description"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="字段名"
                        label-width="100px"
                        :rules="{required: true,trigger:'blur',message: '请输入字段名'}"
                    >
                        <el-input v-model="item.field"></el-input>
                    </el-form-item>
                    <el-button type="info" @click.native="removeAttribute(item)" style="width: 32px;height: 32px;margin-left: 10px;display: flex;justify-content: center" icon="el-icon-delete" title="删除"></el-button>
                </div>
                <p style="text-align: center">
                    <el-button type="success" size="mini" @click.native="addAttribute">增加属性</el-button>
                </p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click.native="submit" :loading="submiting">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CreatePriceTable",
        props: {
            CurrentCategoryId: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                Form: {
                    category: "",
                    brand: "",
                    attribute: [{
                        description: "",
                        field: "",
                        key: new Date(),
                    }],
                    method: "",
                    table: ""
                },
                Rules: {
                    category: [
                        {required: true,trigger: 'blur', message: "请选择一个分类"}
                    ],
                    brand: [
                        {required: true,trigger: 'blur', message: "请选择一个品牌"}
                    ],
                    method: [
                        {required: true,trigger: 'blur', message: "请选择计算方式"}
                    ],
                    table: [
                        {required: true, trigger: 'blur', message: "请输入表名称"}
                    ]
                },
                submiting: false,
                prefix: "P_",
            }
        },
        methods: {
            handleClose() {
                this.$store.dispatch('SetBaseProductConfig',{field: 'Category.CreatePriceDialog.visible',value: false});
            },
            addAttribute() {
                this.Form.attribute.push({description: "",field:"",key:new Date()});
            },
            removeAttribute(obj) {
                this.Form.attribute.some((item,index) => {
                    if (item.key == obj.key)
                    {
                        this.Form.attribute.splice(index, 1);
                        return true;
                    }
                });
            },
            LoadPriceTable(id) {
                this.$store.dispatch("LoadProductPriceTable",{category:id});
            },
            handleChange(val) {
                this.CategoryList.some((item) => {
                    if (item.id == val)
                        this.prefix = "P_"+item.abbr.toUpperCase()+"_";
                });
            },
            submit() {
                this.$refs["form"].validate((valid) => {
                   if (valid)
                   {
                       this.submiting = true;
                       this.$store.dispatch("ProductCreatePriceTable", this.Form).then(() => {
                           let response = this.$store.state.user.ProductCreatePriceTable;

                           if (response.status == "success")
                           {
                               this.$notify.success("操作成功");
                               this.LoadPriceTable();
                               this.handleClose();
                               this.$refs["form"].resetFields();
                               this.LoadPriceTable(this.CurrentCategoryId);
                           }
                           else {
                               this.$notify.error("操作失败,"+response.errmsg);
                           }
                           this.submiting = false;
                       });
                   }
                });
            },
        },
        computed: {
            Visible: function() {
                return this.$store.state.user.BaseProduct.Category.CreatePriceDialog.visible;
            },
            BrandList: function() {
                return this.$store.state.user.brandList;
            },
            CategoryList: function() {
                return this.$store.state.user.ProductCategoryList;
            },
            Methods: function() {
                return [{name: "面价打折",id:0},{name: "吨价下浮",id:1}];
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.create-price-dialog_form
    section
        .title
            font-size: 14px;
            font-weight: 480;
            maring-bottom: 3px;
    .horizontal-item
        display :flex;
        justify-content: center;
</style>
