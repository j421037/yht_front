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
                    :data="brand"
                    border
                >
                    <el-table-column prop="name" label="品牌名称"></el-table-column>
                    <el-table-column prop="id" label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" >禁用</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="attribute" label="产品属性">
                        <el-table-column prop="" label="属性1"></el-table-column>
                        <el-table-column prop="" label="属性2"></el-table-column>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <createcategory-dialog></createcategory-dialog>
        <createprice-dialog></createprice-dialog>
    </div>
</template>

<script>
    import CreateCategoryDialog from './dialog/CreateCategory';
    import CreatePriceDialog from './dialog/CreatePriceTable';
    export default {
        data() {
            return {
                CurrentCid: 0,
            };
        },
        created() {
            this.$store.dispatch("brandList");
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
                this.CurrentCid = row.id;
            },
            OpenCreateCategoryDialog() {
                this.$store.dispatch('SetBaseProductConfig',{field: 'Category.CreateCategoryDialog.visible',value: true});
            },
            OpenCreatePriceDialog() {
                this.$store.dispatch('SetBaseProductConfig',{field: 'Category.CreatePriceDialog.visible',value: true});
            }
        },
        computed: {
            category: function() {
                let data = [{name: "钢管产品",id:1},{name:"阀门产品",id:2},{name:"其他产品",id:3}];
                this.CurrentCid = data[0].id;

                return data;
            },
            brands: function() {
                return [{name:"泰丰桥",id:1,cid:1},{name:"一通",id:2,cid:1},{name: "TVT",id:3,cid:2},{name:"迈克",id:4,cid:2}];
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
