<template>
	<div class="cost-wallpaper">
        <transition name="el-fade-in-linear">
            <div class="btn-tool" v-show="category.length > 0">
                <div class="btn-tool_category">
                    <el-radio-group v-model="CurrentCategory" style="margin-bottom: 30px;" @change="CategoryChange">
                        <el-radio-button v-for="(item, k) in category" :key="k"  :label="item.id">{{item.name}}</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="btn-tool_action" >
                        <el-button-group >
                            <el-button type="info" :disabled="btnDisable" @click.native="OpenMakeOffer">开始报价</el-button>
                            <el-button type="info" :disabled="btnDisable" @click.native="OpenPriceDialog" v-if="authorize">面价维护</el-button>
                            <el-button type="info" :disabled="btnDisable" @click.native="OpenFastPriceDialog" v-if="authorize">一键调价</el-button>
                            <el-button type="info" :disabled="btnDisable" @click.native="OpenHistory">调价历史</el-button>
                        </el-button-group>

                </div>
            </div>
        </transition>
        <div v-for="(it,ik) in category" :key="ik">
            <keep-alive>
                <el-tabs :tab-position="tabName" lazy  v-if="refreshVisible && it.id == CurrentCategory" @tab-click="tabClick">
                    <el-tab-pane v-for="(item, k) in it.children" :key="k" :label="item.name">
                        <transition name="el-fade-in-linear">
                            <v-surface :table="item"></v-surface>
                        </transition>
                    </el-tab-pane>
                </el-tabs>
            </keep-alive>
        </div>
        <v-maintenance></v-maintenance>
        <v-fast-maintenance></v-fast-maintenance>
        <v-makeoffer></v-makeoffer>
        <v-history></v-history>
	</div>
</template>

<script type="text/javascript">
export default {
	data() {
	    return {
            CurrentCategory: 0,
            CurrentTabId: 0,
            LoadedCategory: [],
            LoadTab: [],
            refreshVisible: true,
            btnDisable: true,
            tabName: ""
        };
    },
    created() {
        this.$store.dispatch("LoadProductCategory").then(() => {
            this.btnDisable = false;
        });
        this.$store.dispatch("LoadCostRole");
    },
    methods: {
	    /**
         * 切换分类事件
         *
         * @param id category id
         * **/
        CategoryChange(id) {
            this.CurrentCategory = id;
            this.btnDisable = true;

            this.$nextTick(() => {
                this.refreshVisible = true;
                this.btnDisable = false;
            });
        },

        /**
         * 切换价格表
         *
         * **/
        tabClick(val) {
            // this.TableList.forEach((item) => {
            //     if (item.name == val.label) {
            //         this.CurrentTabId = item.id;
            //         this.LoadTab[item.id] = true; //价格表已经加载
            //     }
            // });
        },

        /**
         * 面价维护
         * **/
        OpenPriceDialog() {
            this.$store.dispatch("SetBaseProductConfig",{field: "Price.PriceMaintenance.visible",value: true});
        },

        /**
         * 一键调价
         * **/
        OpenFastPriceDialog() {
            this.$store.dispatch("SetBaseProductConfig",{field: "Price.FastPriceMaintenance.visible",value: true});
        },

        /**
         * 开始报价
         * **/
        OpenMakeOffer() {
            this.$store.dispatch("SetBaseProductConfig",{field: "Price.MakeOffer.visible",value: true});
        },
        /**
         * 调价历史
         * **/
        OpenHistory() {
            this.$store.dispatch("SetBaseProductConfig",{field: "Price.History.visible",value: true});
        },
    },
    computed: {
	    category: function() {
            let data = this.$store.state.user.ProductCategoryList;

            if (data.length > 0)
            {
                this.CurrentCategory = data[0].id;
            }

            return data;
        },
        users: function() {
            return this.$store.state.user.CostRole.users;
        },
        authorize: function () {
            return this.$store.state.user.CostRole.authorize;
        }
    },
    components: {
	    "v-surface": () => import('./cost/tab/SurfacePrice'),
        "v-ton" : () => import('./cost/tab/TonPrice'),
        "v-maintenance": () => import("./cost/dialog/Maintenance"),
        "v-fast-maintenance": () => import("./cost/dialog/FastMaintenance"),
        "v-makeoffer": () => import("./cost/dialog/MakeOffer"),
        "v-history": () => import("./cost/dialog/History")
    }
}	
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .btn-tool
        width: 100%;
        display: flex;
        justify-content: space-between;
        .btn-tool_action
            padding-right: 15px;
    .cost-price-history_dialog
       .el-dialog
            height: 60% !important;
            overflow: hidden;
            position: relative;
            .el-dialog__body
                height: calc(100% - 54px );
                overflow-y: auto;
</style>
