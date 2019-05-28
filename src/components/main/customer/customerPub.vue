<template>
    <div class="public-customer">
        <el-table
            :data="customers"
            v-loading="loading"
            border
            strip
            height="80%"
        >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="客户" prop="name"></el-table-column>
            <el-table-column label="地区">
                <template slot-scope="scope">
                    <span>{{scope.row.province}}</span>&nbsp;
                    <span>{{scope.row.city}}</span>&nbsp;
                    <span>{{scope.row.area}}</span>
                </template>
            </el-table-column>
            <el-table-column label="需求" width="280">
                <template slot-scope="scope">
                    <el-popover
                        placement="top-start"
                        title="需求"
                        width="200"
                        trigger="hover"
                        :content="scope.row.demand">
                        <a href="javascript:void(0)" slot="reference" v-if="scope.row.demand">{{scope.row.demand.substring(0,20)}}...</a>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="time"></el-table-column>
            <el-table-column label="领取次数" prop="recount"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click.native="receiveCustomer(scope.row)">领取</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :total="total" :handle="query" :refresh="manual"></pagination>
    </div>
</template>
<script type="text/javascript">

    export default {

        data() {
            return {
                total: 0,
                loading: false,
                btnDisable: false,
                manual: 0,
            }
        },

        methods: {
            /**获取数据**/
            query(param) {
                this.loading = true;
                this.$store.dispatch('getCustomer', param)
                    .then(() => {
                        this.loading = false;
                    });
            },
            /**领取一个客户**/
            receiveCustomer(row) {
                this.btnDisable = true;
                this.$confirm('认领客户 <' + row.name + '>', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.receive(row.id);

                }).catch(() => {
                    this.btnDisable = false;
                });
            },
            receive(id) {
                this.$store.dispatch('receiveCustomer', {id: id}).then(() => {

                    if (this.$store.state.user.receiveStatus.status == 'success') {
                        this.$notify.success({title: '操作成功', message: '请到 <我的客户> 中查看信息'});
                        ++this.manual;
                    } else {
                        this.$notify.error({title: '操作失败', message: this.$store.state.user.receiveStatus.error});
                    }

                    this.btnDisable = false;
                });
            }
        },

        computed: {
            customers: function () {
                let res = this.$store.state.user.customerList;
                if (res.total)
                    this.total = res.total;
                return res.data;
            },
        },
        components: {
            "pagination": () => import("./pagination.vue")
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
    .public-customer
        height: 100%;
        width: 100%;
        position: relative;
</style>
