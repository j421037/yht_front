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
                    <el-select v-model="Form.category">
                        <el-option v-for="(item,key) in categorys" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌" prop="brand">
                    <el-select v-model="Form.brand">
                        <el-option v-for="(item,key) in brands" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格版本" prop="version">
                    <el-select
                        v-model="Form.version"
                    >
                        <el-option-group
                            v-for="(i,ik) in PriceVersions"
                            :key="ik"
                            :label="i.label"
                        >
                            <el-option
                                v-for="(item,k) in i.items"
                                :key="k"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="调价金额/折扣" prop="discount">
                    <el-input v-model="Form.discount" placeholder="请输入调价的金额或者折扣"></el-input>
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
                    version: "",
                    discount: "",
                    category: "",
                    brand: ""
                },
                Rules: {
                    version: [
                        {required: true,trigger: 'blur',message: '请选择价格版本'}
                    ],
                    discount: [
                        {required: true,trigger: 'blur',message: '请输入调价金额'}
                    ],
                    category: [
                        {required: true,trigger: "blur", message: "请选择产品"}
                    ],
                    brand: [
                        {required: true, trigger: "blur", message: "请选择品牌"}
                    ]
                },
                submiting: false,
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
            },

            /**
             * 提交
             * **/
            submit() {}
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
            brands: function() {
                let data = [],
                    row = [],
                    rows = this.$store.state.user.ProductCategoryList;

                rows.forEach((item) => {
                    if (item.id == this.Form.category)
                        row = item.children;
                });

                row.forEach((item) => {
                    data.push({label:item.name,value:item.id,mapping: item.fields.mapping});
                });

                return data;
            },
            PriceVersions: function() {
                return [
                    {
                        label:"2019年1月",
                        items:[{label: "2019.1.2",value: 1},{label: "2019.1.3",value: 2}]
                    },
                    {
                        label: "2019年2月",
                        items: [{label: "2019.2.3",value: 3},{label: "2019.2.13",value: 4}]
                    },
                    {
                        label: "2019年5月",
                        items: [{label: "2019.5.23",value: 6},{label: "2019.5.28",value: 7}]
                    },
                ];
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
