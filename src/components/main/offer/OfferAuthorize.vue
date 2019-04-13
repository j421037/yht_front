<template>
    <div class="offer-authorize">
        <el-table
            :data="tableData"
            border
            stripe
        >
            <el-table-column
                type="index"
                :index="indexMethod">
            </el-table-column>
            <el-table-column label="客户名称" prop="customer"></el-table-column>
            <el-table-column label="申请人" prop="proposer"></el-table-column>
            <el-table-column label="申请日期" prop="date"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <template v-if="Number(scope.row.status) == 0">
                        <el-button size="mini" type="success" @click.native="AgreeAuthorize(scope.row)">同意</el-button>
                        <el-button size="mini" type="warning" @click.native="RefuseAuthorize(scope.row)">拒绝</el-button>
                    </template>
                    <template v-if="Number(scope.row.status) == 1"><span style="color:#67c23a;font-weight: bold">已授权</span></template>
                    <template v-if="Number(scope.row.status) == 2"><span style="color:#e6a23c;font-weight: bold">已拒绝</span></template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "OfferAuthorize",
        created() {

        },
        methods: {
            /**
             * 表格索引
             * **/
            indexMethod(index) {
                return index + 1;
            },
            /**
             * 同意授权
             * **/
            AgreeAuthorize(row) {
                this.$confirm("是否同意用户<"+row.proposer+">的报价授权申请 ？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "success"
                }).then(() => {

                }).catch(() => {

                });
            },
            /**
             * 拒绝授权
             * **/
            RefuseAuthorize(row) {
                this.$confirm("是否拒绝用户<"+row.proposer+">的报价授权申请 ？", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "warning"
                }).then(() => {

                }).catch(() => {

                });
            }
        },
        computed: {
            tableData: function() {
                return [
                    {id: 1,customer: "江苏华建",proposer: "陈乔恩",date:"2019-04-01",status: 0},
                    {id: 2,customer: "东京热",proposer: "桥本有菜",date:"2019-03-31", status: 1},
                    {id: 2,customer: "一本道",proposer: "大桥未久",date:"2019-03-31", status: 2},
                ];
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
