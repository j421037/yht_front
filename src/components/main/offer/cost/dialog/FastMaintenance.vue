<template>
    <div class="fastMaintenance-wallpaper">
        <el-dialog
            title="一键调价"
            :visible.sync="visible"
            @open="handleOpen"
            :before-close="handleClose"
            width="30%"
        >
            <div style="display: flex;justify-content: center;margin-bottom: 15px;"><span>产品分类: {{category}}</span><span v-if="table" style="margin-left:15px;">品牌: {{table.name}}</span></div>
            <el-form :model="Form" ref="form" :rules="Rules" label-width="120px">
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
        props: {
            category: {
                type: String
            },
            table: {
                type: Object
            }
        },
        data() {
            return {
                Form: {
                    version: "",
                    discount: ""
                },
                Rules: {
                    version: [
                        {required: true,trigger: 'blur',message: '请选择价格版本'}
                    ],
                    discount: [
                        {required: true,trigger: 'blur',message: '请输入调价金额'}
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
