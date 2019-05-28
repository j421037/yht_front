<template>
    <div class="pagination-wallpaper">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNow"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            :total="total"
            style="text-align:center;margin-top:15px;"
        ></el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            handle: {
                type: Function,
                default: () => {

                }
            },
            total: {
                type: Number,
                default: 0,
            },
            refresh: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                pageSize: 10,
                pageNow: 1,
            }
        },
        mounted() {
            this.query();
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.query();
            },
            handleCurrentChange(val) {
                this.pageNow = val;
                this.query();
            },
            query() {
                let param = {limit: this.pageSize,offset: (this.pageNow - 1) * this.pageSize};
                this.handle(param);
            }
        },
        watch: {
            refresh: function() {
                this.pageNow = 1;
                this.query();
            }
        }
    }
</script>
