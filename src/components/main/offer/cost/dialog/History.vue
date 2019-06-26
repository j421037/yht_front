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
                                <!--<p>{{item.remark}}</p>-->
                                <el-table
                                    :data="item.data"
                                    width="200"
                                    border
                                >
                                    <el-table-column label="运费" prop="freight" />
                                    <el-table-column label="备注" prop="remark" />
                                    <el-table-column label="走势" >
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.change_val">
                                                <span v-if="scope.row.operate">上调</span>
                                                <span v-else>下浮</span>
                                                <span>{{scope.row.change_val}}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </section>
                            <section style="margin-top: 10px;">
                                <el-button type="danger" @click="ViewHistoryPrice(item.id)">查看本次价格</el-button>
                                <el-button type="primary" @click="ViewPriceFile(item.id)">厂家面价表</el-button>
                            </section>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
        <el-dialog
            title="历史价格"
            :visible.sync="historyVisible"

            width="70%"
            class="cost-price-history_dialog"
        >
            <el-alert
                :title="this.$store.state.user.LoadHistoryPrices.notice"
                :closable="false"
                type="warning"
            >

            </el-alert>
            <el-table
                :data="historyTabData"
                border
                height="350"
                style="margin-top: 8px"
            >
                <el-table-column
                    v-for="(item, key) in historyTabColumn"
                    :key="key"
                    :label="item.label"
                    :prop="item.value"
                ></el-table-column>
            </el-table>
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
                },
                historyVisible: false,
                historyLoading: true
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
            },
            ViewPriceFile(id) {
                window.open(this.$appConst.BASEURL+"attr/preview?token="+this.$store.state.user.token+"&id="+id, "newwindow","height=500,width=700");
            },
            ViewHistoryPrice(id) {
                this.historyVisible = true;
                //读取历史数据
                this.historyLoading = true;
                this.$store.dispatch("LoadHistoryPrices", {vid: id}).then(() => this.historyLoading = false);
            }
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.History.visible;
            },
            priceInfo: function () {

                return this.$store.state.user.priceInfo;
            },

            historyTabColumn: function() {
                return this.$store.state.user.LoadHistoryPrices.column;
            },
            historyTabData: function (){
                return this.$store.state.user.LoadHistoryPrices.rows;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
