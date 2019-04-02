<template>
    <div class="report-tab">
        <p>项目名称: {{RowData.project}}</p>
        <p>项目进展: 施工中</p>
        <P>项目的账期: {{RowData.payment_days}}天</P>
        <p>上期的付款日期: 2018-12-31</p>
        <p>本期账单日:</p>
        <p>总欠款金额:</p>
        <p>当前的付款状态: <span style="color:red">已过期 3天</span></p>
        <el-button type="primary" :disabled="RowData.pid < 0" @click.native="BuildReport">导出追帐报表</el-button>
    </div>
</template>

<script>
    export default {
        name: "Report",
        props: {
            RowData: {
                type: Object
            }
        },
        data() {
            return {

            }
        },
        methods: {
            BuildReport() {
                //window.open(this.AppCons);
                console.log(this.$appConst.BACKEND_DOMAIN);
            }
        }
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>

</style>
