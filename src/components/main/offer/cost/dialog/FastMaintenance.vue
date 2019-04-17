<template>
    <div class="fastMaintenance-wallpaper">
        <el-dialog
            title="一键调价"
            :visible.sync="visible"
            @open="handleOpen"
            :before-close="handleClose"
            width="30%"
        >

            <el-form :model="Form" ref="form" :rules="Rules" label-width="120px">
                <el-form-item label="产品分类" prop="category">
                    <el-select v-model="Form.category" @change="handleCategoryChange">
                        <el-option v-for="(item,key) in categorys" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌" prop="product_brand">
                    <el-select v-model="Form.product_brand" @change="handleBrandChange">
                        <el-option v-for="(item,key) in product_brands" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格版本" prop="version_id">
                    <el-select
                        v-model="Form.version_id"
                        :loading="remoteLoading"
                    >
                        <el-option
                            v-for="(i,ik) in PriceVersions"
                            :key="ik"
                            :label="i.label"
                            :value="i.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新版本号" prop="new_version" :rules="[{validator: validateVersion, trigger: 'blur'},{required:true,trigger:'blur',message:'请输入版本号'}]">
                    <el-input v-model="Form.new_version" placeholder="请输入新的版本号"></el-input>
                </el-form-item>
                <el-form-item label="操作" prop="operate">
                    <el-select v-model="Form.operate">
                        <el-option v-for="(item,key) in operates" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="值" prop="discount">
                    <el-input v-model="Form.discount" placeholder="请输入调价的金额或者折扣幅度,整数">
                        <template slot="append" v-if="mode == 1">元</template>
                        <template slot="append" v-if="mode == 0">百分点</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="Form.remark" placeholder="请输入调价的信息"></el-input>
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
        data() {

            return {
                Form: {
                    version_id: "",
                    discount: "",
                    category: "",
                    product_brand: "",
                    operate: 1,
                    new_version: "",
                    remark: ""
                },
                Rules: {
                    version_id: [
                        {required: true,trigger: 'blur',message: '请选择价格版本'}
                    ],
                    discount: [
                        {required: true,trigger: 'blur',message: '请输入调价幅度'}
                    ],
                    category: [
                        {required: true,trigger: "blur", message: "请选择产品"}
                    ],
                    product_brand: [
                        {required: true, trigger: "blur", message: "请选择品牌"}
                    ],
                    operate: [
                        {required: true, trigger: "blur", message: "请选择调整的方向"}
                    ],
                    remark: [
                        {required: true, trigger: "blur", message: "请输入调价信息"}
                    ],
                },
                submiting: false,
                remoteLoading: false,
                mode: 0,
            }
        },
        methods: {
            /**
             * 打开事件
             * **/
            handleOpen() {

            },

            /**
             * 关闭事件
             * **/
            handleClose() {
                this.$store.dispatch("SetBaseProductConfig",{field: "Price.FastPriceMaintenance.visible",value: false});
                this.$refs["form"].resetFields();
            },
            /**
             * 产品切换
             * **/
            handleCategoryChange() {
                this.Form.product_brand = "";
            },
            /**
             * 品牌切换
             * **/
            handleBrandChange(val) {
                this.remoteLoading = true;
                this.$store.dispatch("ProductPriceVersion",{product_brand:val}).then(() => {
                    this.remoteLoading = false;
                });
                this.product_brands.forEach((item) => {
                    if (item.value == val)
                        this.mode = item.mode;
                });
            },
            /**
             * 提交
             * **/
            submit() {
                this.$refs["form"].validate((valid) => {
                    if (valid)
                    {
                        this.submiting = true;
                        this.$store.dispatch("ProductPriceFastUpdate", this.Form).then(() => {
                            let response = this.$store.state.user.ProductPriceFastUpdate;

                            if (response.status == "success")
                            {
                                this.$notify.success("操作成功");
                                this.$store.dispatch("ProductSurfacePriceList",{id:this.Form.product_brand});
                            }
                            else {
                                this.$notify.error("操作失败,请检查");
                            }
                            this.submiting = false;
                        });
                    }
                });
            },
            validateVersion (rule, value, callback) {
                if (/^[A-Za-z0-9_\.]*$/.test(value))
                    callback();
                else
                    callback(new Error("只允许输入字母、数字、破折号（ - ）以及下划线（ _ ）"));
            },
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.FastPriceMaintenance.visible;
            },
            categorys: function() {
                let data = [], rows = this.$store.state.user.ProductCategoryList;
                rows.forEach((item) => {
                    data.push({label:item.name,value:item.id});
                });

                return data;

            },
            product_brands: function() {
                let data = [],
                    row = [],
                    rows = this.$store.state.user.ProductCategoryList;

                rows.forEach((item) => {
                    if (item.id == this.Form.category)
                        row = item.children;
                });

                row.forEach((item) => {
                    data.push({label:item.name,value:item.id,mapping: item.fields.mapping,mode:item.method});
                });

                return data;
            },
            PriceVersions: function() {
                let list = this.$store.state.user.ProductPriceVersion, rows = [];

                list.forEach((item) => {
                    if (item.product_brand == this.Form.product_brand)
                    {
                        rows = item.rows;
                    }
                });
                return rows;
            },
            operates: function() {
                return [{label:"上浮",value:1},{label:"下跌",value:0}];
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
