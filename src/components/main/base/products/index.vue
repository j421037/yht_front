<template>
    <div class="base-products-wallpaper">
        <div class="products-box">
            <div class="products-box_category">
                <!--<el-table-->
                    <!--:data="category"-->
                    <!--:row-style="CategoryRowStyle"-->
                    <!--@row-click="CategoryRowClick"-->
                    <!--border-->
                <!--&gt;-->
                    <!--<el-table-column prop="name" label="产品分类"></el-table-column>-->
                <!--</el-table>-->
                <div class="category_header">
                    <el-button type="text" @click.native="OpenCreateCategoryDialog">新增分类</el-button>
                    <el-button type="text">编辑分类</el-button>
                    <el-button type="text">删除分类</el-button>
                    <el-button type="text" @click.native="OpenCreatePriceDialog">创建价格表</el-button>
                </div>
                <div class="category_list">
                    <div class="category-item"
                         v-for="(item,k) in category"
                         :key="k"
                         :class="{'category-item-active': item.id == CurrentCid}"
                         @click="CategoryRowClick(item)"
                    >
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="products-box_brand">
                <el-table
                    :data="TableList"
                    border
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="品牌名称"></el-table-column>
                    <el-table-column prop="method_l" label="计算方式">

                    </el-table-column>
                    <el-table-column prop="table" label="对应的数据表"></el-table-column>
                    <el-table-column prop="description" label="字段信息"></el-table-column>
                </el-table>
                <p>
                    <el-button type="info" :disabled="DelBtnDisable" :loading="DelBtnLoading" @click.native="RemoveTables">删除</el-button>
                </p>
            </div>
        </div>
        <createcategory-dialog></createcategory-dialog>
        <createprice-dialog :CurrentCategoryId="CurrentCid"></createprice-dialog>
    </div>
</template>

<script>
    import CreateCategoryDialog from './dialog/CreateCategory';
    import CreatePriceDialog from './dialog/CreatePriceTable';
    export default {
        data() {
            return {
                CurrentCid: 0,
                DelBtnDisable: true,
                DelBtnLoading: false,
                TableIds: []
            };
        },
        created() {
            this.$store.dispatch("brandList");
            this.$store.dispatch("LoadProductCategory");
        },
        methods: {
            CategoryRowStyle: function({row, rowIndex}) {
                let style = {cursor:'pointer'};

                if (row.id == this.CurrentCid)
                {
                    style.background = "#f0f9eb";
                }

                return style;
            },
            CategoryRowClick(row)
            {
                if (this.CurrentCid != row.id)
                {
                    this.CurrentCid = row.id;
                    this.LoadProductPriceTable(row.id);
                }
            },
            OpenCreateCategoryDialog() {
                this.$store.dispatch('SetBaseProductConfig',{field: 'Category.CreateCategoryDialog.visible',value: true});
            },
            OpenCreatePriceDialog() {
                this.$store.dispatch('SetBaseProductConfig',{field: 'Category.CreatePriceDialog.visible',value: true});
            },

            /**读取当前分类下的价格表**/
            LoadProductPriceTable(id) {
                this.$store.dispatch("LoadProductPriceTable",{category:id});
            },

            /**删除价格表**/
            RemoveTables() {
                if (this.TableIds.length < 1)
                    return false;

                this.DelBtnLoading = true;

                this.$store.dispatch("DeleteProductPriceTable",{id:this.TableIds})
                    .then(() => {
                        let response = this.$store.state.user.DeleteProductPriceTable;

                        if (response.status == "success")
                        {
                            this.$notify.success("删除成功");
                            this.LoadProductPriceTable(this.CurrentCid);
                        }
                        else {
                            this.$notify.error("删除失败,"+response.errmsg);
                        }
                        this.DelBtnLoading = false;
                });
            },

            /**价格表checkbox 事件**/
            handleSelectionChange(rows) {
                this.TableIds = [];
                rows.forEach((item) => {
                    this.TableIds.push(item.id);
                });

                if (this.TableIds.length > 0)
                {
                    this.DelBtnDisable = false;
                }
                else {
                    this.DelBtnDisable = true;
                }
            }
        },
        computed: {
            category: function() {
                let data = this.$store.state.user.ProductCategoryList;

                if (data.length > 0)
                {
                    this.CurrentCid = data[0].id;
                    this.LoadProductPriceTable(data[0].id);
                }

                return data;
            },
            TableList: function() {
                //return [{name:"泰丰桥",id:1,cid:1},{name:"一通",id:2,cid:1},{name: "TVT",id:3,cid:2},{name:"迈克",id:4,cid:2}];
                return this.$store.state.user.ProductPriceTableList;
            },
            brand: function() {
                let data = [];
                this.brands.forEach((item) => {
                    if (item.cid == this.CurrentCid)
                        data.push(item);
                });

                return data;
            },

        },
        components: {
            'createcategory-dialog': CreateCategoryDialog,
            'createprice-dialog': CreatePriceDialog
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.base-products-wallpaper
    width: 100%;
    height: 100%;
    padding: 15px;
    .products-box
        position: relative;
        width: 100%;
        display: flex;
        .products-box_category
            flex-basis: 280px;
            margin-right: 20px;
            .category_header
                background: #ECF0F9;
                display: flex;
                justify-content: center;
                padding: 0 5px;
            .category_list
                border: 1px solid #dedee0;
                color: #131313;
                width: 100%;
                .category-item
                    cursor: pointer;
                    justify-content center;
                    height: 35px;
                    display : flex;
                    align-items: center;
                    user-select: none;
                .category-item-active
                    background: #f0f9eb;
        .products-box_brand
            flex: 1;
</style>
