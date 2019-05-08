<template>
    <div class="history-wallpaper">
        <el-dialog
            title="调价历史"
            :visible.sync="visible"
            :before-close="handleClose"
            @open="handleOpen"
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
            <el-timeline
                v-for="(item,key) in priceInfo"
                :key="key"
            >
                <el-timeline-item :timestamp="item.date" placement="top" icon="el-icon-more" color="rgb(11, 189, 135)">
                    <el-card>
                        <div>
                            <section>
                                <h4>{{item.category_name}} - {{item.brand_name}}</h4>
                                <p>{{item.remark}}</p>
                            </section>
                            <section>
                                <el-button>查看价格</el-button>
                                <el-button>厂家价格表</el-button>
                            </section>
                        </div>
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
            handleOpen() {
                this.LoadPriceInfo();
            },
            LoadPriceInfo() {
                this.$store.dispatch("LoadPriceInfo",this.Form);
            }
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.History.visible;
            },
            priceInfo: function () {
                return this.$store.state.user.priceInfo;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
