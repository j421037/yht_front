<template>
    <div class="history-wallpaper">
        <el-dialog
            title="调价历史"
            :visible.sync="visible"
            :before-close="handleClose"
            width="40%"
            class="cost-price-history_dialog"
        >
            <el-form :model="Form" label-width="80px" inline>
                <el-form-item label="产品分类">
                    <el-select v-model="Form.category"></el-select>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-select v-model="Form.product_brand"></el-select>
                </el-form-item>
            </el-form>
            <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top" icon="el-icon-more" color="rgb(11, 189, 135)">
                    <el-card>
                        <div>
                            <section>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/12 20:46</p>
                            </section>
                            <section>
                                <el-button>查看价格</el-button>
                                <el-button>浏览价格表</el-button>
                            </section>
                        </div>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/3 20:46</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/2 20:46</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/2 20:46</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Form: {
                    category: "",
                    product_brand: ""
                }
            }
        },
        methods: {
            /**
             * 关闭事件
             * **/
            handleClose() {
                this.$store.dispatch("SetBaseProductConfig",{field: "Price.History.visible",value: false});
            },
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.History.visible;
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
