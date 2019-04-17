<template>
    <div class="surface-wallpaper">
        <el-alert
            :title="table.notice"
            type="error"
            style="margin-bottom:10px"
            :closable="false"
        >
        </el-alert>
        <el-table
            :data="PriceData"
            border
            stripe
            highlight-current-row
        >
                <el-table-column v-for="(item, k) in TableColumns" :key="k" :label="item.label" :prop="item.value" ></el-table-column>
        </el-table>
    </div>
</template>

<script>
    // :default-sort="{prop:TableColumns[0].value}"
    export default {
        name: "SurfacePrice",
        props: {
            table: {

            }
        },
        data() {
            return {

            }
        },
        created() {
            this.$store.dispatch("ProductSurfacePriceList",{id:this.table.id});

        },
        methods: {

        },
        computed: {
            PriceData: function () {
                let rows = [],data = this.$store.state.user.ProductSurfacePriceList.rows;

                data.forEach((item) => {
                    if (item.id == this.table.id)
                    {
                        rows = item.row;
                    }
                });

                return rows;
            },
            TableColumns: function() {
                let data = this.$store.state.user.ProductSurfacePriceList.column;

                if (data.length > 0)
                {
                    let field = [];
                    data.some((item) => {
                       if (item.id == this.table.id)
                       {
                           field = item.field;
                           return true;
                       }
                    });

                    return field;
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
