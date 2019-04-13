<template>
    <div class="surface-wallpaper">
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
                type: Object
            }
        },
        data() {
            return {
                a: []
            }
        },
        created() {
            this.$store.dispatch("ProductSurfacePriceList",{id:this.table.id});
        },
        methods: {

        },
        computed: {
            PriceData: function () {
                let data = this.$store.state.user.ProductSurfacePriceList.rows;

                if (data.length > 0)
                {
                    let rows = [];
                    data.some((item) => {
                        if (item.id == this.table.id)
                        {
                            rows = item.row;
                            return true;
                        }
                    });
                    return rows;
                }
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
