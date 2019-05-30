<template>
    <div class="mycustomer">
        <el-radio-group v-model="CustomerType" @change="CustomerChange">
            <el-radio-button label="未验收"></el-radio-button>
            <el-radio-button label="已验收"></el-radio-button>
        </el-radio-group>
        <el-table
            :data="customers"
            v-loading="loading"
            border
            strip
            style="margin-top: 15px;"
        >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="客户" prop="name" width="120"></el-table-column>
            <el-table-column label="联系方式">
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="微信" prop="wechat"></el-table-column>
                <el-table-column label="QQ" prop="qq"></el-table-column>
            </el-table-column>
            <el-table-column label="项目名" prop="project_name"></el-table-column>
            <el-table-column label="地区" width="200" v-if="false">
                <template slot-scope="scope">
                    <span>{{scope.row.province}}</span> -
                    <span>{{scope.row.city}}</span> -
                    <span>{{scope.row.area}}</span>
                </template>
            </el-table-column>
            <el-table-column label="需求" width="250">
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
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <template v-if="!scope.row.status">
                        <span v-if="scope.row.accept == 0">
                            <el-tag type="warning">未验收</el-tag>
                        </span>
                            <span v-else>
                            <el-tag type="success">已验收</el-tag>
                        </span>
                    </template>
                    <template v-else>
                        <span>{{scope.row.status}}</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="更新日期" prop="action_date"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <template v-if="scope.row.accept == 0">
                        <el-button-group>
                            <el-button type="success" size="mini" @click.native="accept(scope.row)">验收</el-button>
                            <el-button type="info" size="mini" @click.native="free(scope.row)">释放</el-button>
                        </el-button-group>
                    </template>
                    <template v-if="scope.row.accept == 1 && !scope.row.status">
                        <el-button type="success" size="mini" @click.native="upgrade(scope.row)">升级客户</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <project :visible="pdVisible" :customer="customer" @close="pdVisible = false" @refresh="refresh"></project>
        <pagination :total="total" :handle="query" :refresh="manual"></pagination>
    </div>
</template>
<script type="text/javascript">

    export default {

        data() {
            return {
                CustomerType: "未验收",
                total: 0,
                loading: true,
                pdVisible: false,
                customer: {},
                manual: 0,
            }
        },
        created() {
            // this.query();
        },
        methods: {
            refresh() {
                ++this.manual;
            },
            /**获取数据**/
            query(param) {
                this.loading = true;
                param.accept = this.CustomerType == "未验收" ? 0 : 1;

                this.$store.dispatch('getPersonalCustomer', param)
                    .then(() => {
                        this.loading = false;
                        console.log(this.customers);
                });
            },
            CustomerChange() {
                ++this.manual;
            },
            /**验收客户**/
            accept(item) {

                this.currentClickIndex = 0;

                if (this.mobile == true) {
                    this.$dialog.confirm(
                        {

                            message: '验收客户 <' + item.name + '>, 该客户将纳入你的名下,确定进行该操作 ?'

                        }
                    ).then(() => {

                        this.submitAccept(item);

                    }).catch(() => {


                    });

                } else {

                    this.$confirm('验收客户 <' + item.name + '>, 该客户将纳入你的名下,确定进行该操作 ?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {

                        this.submitAccept(item);

                    }).catch(() => {

                    });
                }
            },
            /**验收客户 提交**/
            submitAccept(item) {

                this.$store.dispatch('acceptCustomer', {id: item.id}).then(() => {

                    if (this.$store.state.user.acceptCustomer.status == 'success') {
                        this.$notify.success({title: '操作成功', message: '客户<' + item.name + '> 已验收'});
                        ++this.manual;
                    } else {
                        this.$notify.error({title: '操作失败', message: this.$store.state.user.acceptCustomer.error});
                    }
                })
            },
            /**释放客户**/
            free(item) {
                this.$prompt('请输入释放理由', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[\w|\u4e00-\u9fa5]{5,}.*$/,
                    inputErrorMessage: '内容不能少于5个字符'
                }).then(({ value }) => {
                    this.submitFree({id:item.id, reason: value, name: item.name});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            /**释放客户 提交**/
            submitFree(item) {
                this.$store.dispatch('freeCustomer', item)
                    .then(() => {
                        if (this.$store.state.user.freeCustomer.status == 'success') {
                            this.$notify.success({title: '操作成功', message: '客户<' + item.name + '>已经释放'});
                        } else {
                            this.$notify.error({title: '操作失败', mesage: this.$store.state.user.freeCustomer.error});
                        }
                    })
            },

            /**初始化客户跟进列表**/
            initComments(id) {
                this.$store.dispatch('getComments', {id: id, offset: 0, limit: 15}).then(() => {
                    this.trackLoading = false;
                });

            },
            /**提交跟进记录**/
            submitFllowForm() {

                if (this.trackComment == '') {

                    return false;
                }

                this.$store.dispatch('appendComments', {
                    content: this.trackComment,
                    'customer_id': this.currentItem.id
                }).then(() => {

                    if (this.$store.state.user.append_comments.status == 'success') {

                        this.$notify.success({title: '操作成功', message: '记录已添加'});
                        this.trackComment = '';
                        this.initComments(this.currentItem.id);

                    } else {

                        this.$notify.error({title: '操作失败', message: this.$store.state.user.append_comments.error});

                    }
                });
            },
            upgrade(row) {
                this.pdVisible = true;
                this.customer = row;
            }
        },

        computed: {

            customers: function() {
                let res = this.$store.state.user.personal_customer_list
                this.total = res.total;
                return res.data;
            },
            comments: function () {
                return this.$store.state.user.comments.data;
            },
            ReceiveNum: function () {
                return this.$store.state.user.personal_customer_list.count;
            },
            AcceptNum: function () {
                return this.$store.state.user.personal_customer_list.accept;
            }
        },
        components: {
            "project": () => import("./createProject.vue"),
            "pagination": () => import("./pagination.vue")
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">

</style>
