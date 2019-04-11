<template>
	<div class="cost-wallpaper">
        <div class="btn-tool">
            <div class="btn-tool_category">
                <el-radio-group v-model="CurrentCategory" style="margin-bottom: 30px;" @change="CategoryChange">
                    <el-radio-button v-for="(item, k) in category" :key="k"  :label="item.id">{{item.name}}</el-radio-button>
                </el-radio-group>
            </div>
            <div class="btn-tool_action">
                <el-button-group>
                    <el-button type="info" :disabled="btnDisable" @click.native="OpenMakeOffer">开始报价</el-button>
                    <el-button type="info" @click.native="OpenPriceDialog" :disabled="btnDisable">面价维护</el-button>
                    <el-button type="info" :disabled="btnDisable" @click.native="OpenFastPriceDialog">一键调价</el-button>
                </el-button-group>
            </div>
        </div>
        <el-tabs :tab-position="tabName" lazy  v-if="refreshVisible" @tab-click="tabClick">
            <el-tab-pane v-for="(item, k) in TableList" :key="k" :label="item.name">
                <transition name="el-fade-in-linear">
                    <template v-if="item.id == CurrentTabId || LoadTab[item.id]">
                        <keep-alive><v-surface :table="item"></v-surface></keep-alive>
                    </template>
                </transition>
            </el-tab-pane>
        </el-tabs>
        <v-maintenance  :category="categoryName" :table="table"></v-maintenance>
        <v-fast-maintenance :category="categoryName" :table="table"></v-fast-maintenance>
        <v-makeoffer :table="table"></v-makeoffer>
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
            collects: [],
            refreshVisible: true,
            btnDisable: false,
        };
    },
    created() {
        this.$store.dispatch("LoadProductCategory");
    },
    methods: {
	    /**
         * 切换分类事件
         *
         * @param id category id
         * **/
        CategoryChange(id) {
            this.CurrentCategory = id;

            if (this.LoadedCategory.some((item) => {return item == id;}))
            {
                this.refreshVisible = false;
                this.$nextTick(() => {
                   this.refreshVisible = true;
                });
            }
            else {
                this.btnDisable = true;
                this.LoadProductPriceTable(id).then(() => {
                    this.LoadedCategory.push(id);
                    this.refreshVisible = false;
                    this.$nextTick(() => {
                        this.refreshVisible = true;
                    });
                    this.btnDisable = false;
                });
            }
        },

        /**
         * 从某个分类读取价格表信息
         *
         * @param id category id
         * **/
        LoadProductPriceTable(id) {
            return this.$store.dispatch("LoadProductPriceTable",{category:id}).then(() => {
                //this.collects[this.CurrentCategory] = this.$store.state.user.ProductPriceTableList;  这个写法有问题，响应式失效
                this.$set(this.collects,this.CurrentCategory,this.$store.state.user.ProductPriceTableList);//正确的写法, this.$set() 全局方法
            });
        },

        /**
         * 切换价格表
         *
         * **/
        tabClick(val) {
            this.TableList.some((item) => {
                if (item.name == val.label) {
                    this.CurrentTabId = item.id;
                    this.LoadTab[item.id] = true; //价格表已经加载
                }
            });
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
        }

    },
    computed: {
	    category: function() {
            let data = this.$store.state.user.ProductCategoryList;

            if (data.length > 0)
            {
                this.CurrentCategory = data[0].id;
                this.LoadProductPriceTable(data[0].id);
            }

            return data;
        },
        TableList: function() {
	        let data = this.collects[this.CurrentCategory];

	        if (data) {
                this.CurrentTabId = data[0].id;
                data.forEach((item) => {
                   this.LoadTab[item.id] = false;
                });
            }
            return data;
        },
        tabName: function() {
	        if (this.CurrentTabId > 0 && this.TableList)
            {
                let name = "";
                this.TableList.some((item) => {
                    if (this.CurrentTabId == item.id)
                    {
                        name = item.name;
                        return name;
                    }
                });
                return name;
            }
        },
        categoryName: function() {
	        if (this.CurrentCategory > 0 && this.category)
            {
                let category = "";
                this.category.some((item) => {
                    if (item.id == this.CurrentCategory)
                    {
                        category = item.name;
                        return true;
                    }
                });
                return category;
            }
        },
        table: function() {
	        if (this.CurrentTabId > 0 && this.TableList) {
                let row = [];

                this.TableList.forEach((item) => {
                    if (this.CurrentTabId == item.id)
                        row = item;
                });

                return row;
            }
        }
    },
    components: {
	    "v-surface": () => import('./cost/tab/SurfacePrice'),
        "v-ton" : () => import('./cost/tab/TonPrice'),
        "v-maintenance": () => import("./cost/dialog/Maintenance"),
        "v-fast-maintenance": () => import("./cost/dialog/FastMaintenance"),
        "v-makeoffer": () => import("./cost/dialog/MakeOffer")
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
</style>
