<template>
    <div class="report-tab">
        <el-table
            :data="tableData1"
            border
            style="width: 100%">
            <el-table-column prop="name" label="项目名称" width="250"></el-table-column>
            <el-table-column prop="progress" label="项目进展"></el-table-column>
            <el-table-column prop="payment_days" label="账期(天)"></el-table-column>
            <el-table-column prop="payment_start_date" label="初始化日期"></el-table-column>
            <el-table-column prop="last_payment_date" label="上次回款日期"></el-table-column>
        </el-table>
        <el-table
            :data="tableData2"
            border
            style="width: 100%;margin-top: 15px;">
            <el-table-column prop="statement_date" label="本期应收款日期"></el-table-column>
            <el-table-column prop="cooperation_amountfor" label="合作金额"></el-table-column>
            <el-table-column prop="cooperation_amountfor_back" label="回款金额"></el-table-column>
            <el-table-column prop="discount" label="优惠金额"></el-table-column>
            <el-table-column prop="arrears" label="欠款金额"></el-table-column>
            <el-table-column prop="status" label="当前状态" >
                <template slot-scope="scope">
                    <span v-if="scope.row.status < 0" style="color:red">已逾期{{Math.abs(scope.row.status)}}天</span>
                    <span v-else>正常</span>
                </template>
            </el-table-column>
        </el-table>
        <p>当前计算方式: 在上一次回款的日期后加上账期的天数</p>
        <p style="text-align:center"><el-button type="primary" :disabled="RowData.pid < 0" @click.native="BuildReport(RowData.pid)">导出追款报表</el-button></p>
    </div>
</template>

<script>
    export default {
        name: "Report",
        data() {
            return {

            }
        },
        methods: {
            BuildReport(pid) {
                let url = this.$appConst.BASEURL + "report/arrears/"+ pid + "?token="+this.$store.state.user.token;
                window.open(url);
            }
        },
        created() {

        },
        computed: {
            RowData: function() {
                return this.$store.state.user.ARSumCurrentRow;
            },
            tableData1: function() {
                return [{
                    name: this.RowData.project,
                    progress: this.RowData.isclose,
                    payment_days: this.RowData.payment_days,
                    payment_start_date: new Date(this.RowData.payment_start_date*1000).getFullYear() + '-'+(new Date(this.RowData.payment_start_date*1000).getMonth() +1)+'-'+new Date(this.RowData.payment_start_date*1000).getDate(),
                    last_payment_date: this.RowData.last_payment_date,
                }];
            },
            tableData2: function() {
                return [
                    {
                        statement_date: this.RowData.statement_date,
                        cooperation_amountfor: this.RowData.cooperation_amountfor,
                        cooperation_amountfor_back: this.RowData.cooperation_amountfor_back,
                        arrears: this.RowData.arrears,
                        discount: this.RowData.discount,
                        status: this.RowData.payment_expire
                    }
                ];
            }
        }
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>

</style>
