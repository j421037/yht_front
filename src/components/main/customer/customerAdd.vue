<template>
    <div class="wapper">
        <div class="content-box">

            <div class="tool">
                <el-button type="success" @click.native="openDialog" icon="el-icon-plus">添加客户</el-button>
            </div>
            <!--<div class="search">-->
                <!--<el-form :model="query" class="demo-form-inline">-->
                    <!--<el-form-item label="发布状态">-->
                        <!--<el-select v-model="query.isPublic" placeholder="请选择">-->
                            <!--<el-option-->
                                <!--v-for="item in isPublicOptions"-->
                                <!--:key="item.value"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="验收状态">-->
                        <!--<el-select v-model="query.received" placeholder="请选择">-->
                            <!--<el-option-->
                                <!--v-for="item in receivedOptions"-->
                                <!--:key="item.value"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="领取人　">-->
                        <!--<el-select v-model="query.user" placeholder="请选择">-->
                            <!--<el-option-->
                                <!--v-for="item in users"-->
                                <!--:key="item.value"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="添加日期">-->
                        <!--<el-date-picker-->
                            <!--v-model="query.date"-->
                            <!--type="daterange"-->
                            <!--range-separator="至"-->
                            <!--start-placeholder="开始日期"-->
                            <!--end-placeholder="结束日期">-->
                        <!--</el-date-picker>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item>-->
                        <!--<el-button type="primary" @click="onSearch" icon="el-icon-search" :loading="searching">立即查询-->
                        <!--</el-button>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->


            <!--</div>-->
            <div class="table-tool">
                <el-radio-group v-model="CustomerType" @change="CustomerChange">
                    <el-radio-button v-for="(item, key) in CustomerOption" :key="key" :label="item.label"></el-radio-button>
                </el-radio-group>
                <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                    <template>
                        <!-- `checked` 为 true 或 false -->
                        <div>
                            <el-checkbox v-model="tableColumn.id">序号</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.name">客户名称</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.phone">联系方式</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.wechat">微信</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.qq">QQ</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.brand_name">咨询品牌</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.province">地区</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.project_name">项目名称</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.description">备注</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.publish">状态</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.user">领取人</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.accept">验收</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.created">创建日期</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.receive_date">领取日期</el-checkbox>
                        </div>
                        <div>
                            <el-checkbox v-model="tableColumn.accept_date">验收日期</el-checkbox>
                        </div>
                    </template>
                    <el-button slot="reference" icon="">显示/隐藏列</el-button>
                </el-popover>

            </div>
            <el-table

                :data="tableData"
                height="500"
                v-loading="tableLoading"
                style="max-width: 100%;">
                <el-table-column
                    type="index"
                >
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.name"
                    prop="name"
                    width="180"
                    label="客户名称">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.phone"
                    prop="phone"
                    width="120"
                    label="联系方式">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.wechat"
                    prop="wechat"
                    width="120"
                    label="微信">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.qq"
                    prop="qq"
                    width="120"
                    label="QQ">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.brand_name"
                    prop="brand_name"
                    label="咨询品牌">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.province"
                    prop="province"
                    width="200"
                    label="地区"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.province != null">{{scope.row.province.region_name}} </span>
                        <span v-if="scope.row.city != null">{{scope.row.city.region_name}}</span>
                        <span v-if="scope.row.area != null">{{scope.row.area.region_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.project_name"
                    prop="project_name"
                    label="项目名称">
                </el-table-column>

                <el-table-column
                    v-if="tableColumn.publish"
                    prop="publish"
                    label="状态">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.publish == '0' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.publish == '0' ? '未发布' : '已发布'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.user"
                    prop="user"
                    label="领取人">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.accept"
                    prop="accept"
                    label="验收">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.accept == '0' ? 'primary' : 'danger'"
                            disable-transitions>{{scope.row.accept == '0' ? '未验收' : '已验收'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.created"
                    prop="created"
                    width="180"
                    label="创建日期">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.receive_date"
                    prop="receive_date"
                    width="180"
                    label="领取日期">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.accept_date"
                    prop="accept_date"
                    width="180"
                    label="验收日期">
                </el-table-column>
                <el-table-column
                    v-if="tableColumn.description"
                    prop="description"
                    label="备注"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-popover
                            v-if="scope.row.description != null"
                            placement="left"
                            title="备注"
                            width="150"
                            trigger="hover"
                            :content="scope.row.description">
                            <el-button slot="reference" type="text">{{scope.row.description.substring(0,15)+'...'}}
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    width="220"
                    label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark"
                                    :content="scope.row.user == null ? '编辑' : '被领取的客户不允许再次编辑'" placement="top">
                            <el-button
                                size="mini"
                                type="primary"
                                :disabled="scope.row.user == null ? false : true"
                                @click="handleEdit(scope.row)"
                            ><i class="el-icon-edit-outline"></i>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="发布" placement="top">
                            <el-button
                                size="mini"
                                type="success"
                                :disabled="scope.row.publish === 1 ? true : false"
                                @click="handlePublish(scope.row)">
                                <i class="iconfont icon-fabu1" style="font-size: 12px"></i>
                            </el-button>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <el-button
                                size="mini"
                                type="danger"
                                :disabled="scope.row.user != null"
                                @click="handleDelete(scope.row)"
                            ><i class="el-icon-delete"></i>
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pageNation">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNow"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    background
                    layout="total, sizes, prev, pager, next"
                    :total="pageTotal"
                    style="text-align: center"
                >
                </el-pagination>
            </div>
        </div>

        <el-dialog title="添加客户" :visible.sync="showDialog" center @close="DialogClose">
            <el-form ref="form" status-icon :model="form" :rules="rules" class="el-form" label-width="80px">
                <el-form-item label="客户名称" prop="name">
                    <el-input v-model.trim="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model.trim="form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="产品意向">
                    <el-input v-model.trim="form.demand" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="微信号码">
                    <el-input v-model.trim="form.wechat" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ号码">
                    <el-input v-model.trim="form.qq" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="咨询品牌">
                    <el-select v-model.trim="form.brand_id" placeholder="请选择品牌" :style="{width: '100%'}">
                        <!-- <el-option label="泰丰侨" value="shanghai"></el-option>
                        <el-option label="劳动银河" value="beijing"></el-option> -->
                        <el-option v-for="(item, key) in brandList" :label="item.name" :value="item.id"
                                   :key="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所在地域">
                    <el-cascader
                        :options="regions"
                        @active-item-change="handleItemChange"
                        @change="handleChange"
                        @blur="handleBlur"
                        :props="props"
                        v-model="selectedOptions"
                        change-on-select
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model.trim="form.project_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注信息">
                    <el-input type="textarea" v-model.trim="form.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
                    <el-button @click="resetForm('form')">重 置</el-button>
                </el-form-item>
            </el-form>
            <!-- </div> -->
        </el-dialog>
        <el-dialog title="提示" :visible.sync="showPulishDialog" center class="publish-dialog">
            <div class="publish-content">
                <el-form label-width="80px">
                    <el-form-item label="客户名称">
                        {{publish.name}}
                    </el-form-item>
                    <el-form-item label="发布类型">
                        <el-select v-model="publish.type" placeholder="请选择发布类型">
                            <el-option
                                v-for="item in publishOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="foot" style="text-align: center;">
                        <el-button type="success" @click="submitPublish">立即发布</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import * as http from '@/util/http.js'
    export default {
        data() {
            return {
                showDialog: false,
                tableLoading: true,
                showPulishDialog: false,
                pageSize: 5, //默认显示一页的条数
                pageNow: 1, //默认的页数
                query: {
                    date: '',
                    isPublic: 0,
                    received: 0,
                    user: 0,
                    offset: 0,
                    limit: 5,
                    status: 0
                },
                form: {
                    id: '',
                    name: '',
                    phone: '',
                    demand: '', //意向产品
                    brand_id: '',
                    wechat: '',
                    qq: '',
                    province: '', //省
                    city: '', //市
                    area: '', //区
                    project_name: '',
                    description: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入称呼', trigger: 'blur'},
                        {min: 1, message: '称呼不少于两个字', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '手机号码不能为空', trigger: 'blur'},

                        {
                            validator: (rule, value, callback) => {

                                //先验证手机
                                if (/^1[34578]\d{9}$/.test(value) == false) {

                                    //验证固话
                                    if (/^\d{3,4}\-\d{7,}/.test(value) == false) {
                                        callback(new Error('请输入正确的联系方式'));
                                    } else {
                                        callback();
                                    }

                                } else {

                                    callback();
                                }

                            }, trigger: 'blur'
                        }
                    ]
                },

                props: {
                    value: 'id',
                    // children: 'children'
                },
                selectedOptions: [20, 234, 2331],
                isPublicOptions: [
                    {
                        value: 0,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '已发布'
                    },
                    {
                        value: 2,
                        label: '未发布'
                    }
                ],
                receivedOptions: [
                    {
                        value: 0,
                        label: '全部'
                    },
                    {
                        value: 1,
                        label: '已验收'
                    },
                    {
                        value: 2,
                        label: '未验收'
                    }
                ],
                users: [
                    {
                        value: 0,
                        label: '全部'
                    }
                ],
                tableColumn: {
                    id: true,
                    name: true,
                    phone: true,
                    wechat: false,
                    qq: false,
                    brand_name: true,
                    province: true,
                    project_name: false,
                    description: false,
                    publish: true,
                    user: true,
                    accept: false,
                    created: true,
                    accept_date: false,
                    receive_date: false
                },
                searching: false,
                pageSizes: [5, 10, 20, 50, 100],
                publishOptions: [
                    {
                        value: 0,
                        label: '公开'
                    },
                    {
                        value: 1,
                        label: '部门可见'
                    }
                ],
                publish: {
                    id: 0,
                    name: '',
                    type: 0
                },
                update: false,
                CustomerType: "全部",
                CustomerOption: [{label : "全部",value: 0},{label:"已领取",value: 1},{label: "未领取",value: 2}]
            }
        },
        methods: {
            openDialog() {
                this.showDialog = true;
                this.update = false;
            },
            CustomerChange(val) {
                let item = this.CustomerOption.filter(it => {return it.label == val;});

                this.query.status = item[0].value;
                this.initTable(this.query);
            },
            onSubmit(formName) {

                this.$refs[formName].validate((valid) => {
                    //验证通过则可以提交
                    if (valid) {

                        let method = 'customerCreate'; //创建客户

                        if (this.update) {
                            method = 'customerUpdate'; //修改客户
                        }

                        this.$store.dispatch(method, this.form).then(() => {

                            if (this.$store.state.user.customerCreate.status == 'success') {

                                this.$notify.success({title: '操作成功', message: '操作成功'});

                                this.showDialog = false;

                                this.update = false;

                                this.resetForm(formName);

                                this.initTable(this.query);

                            } else {

                                this.$notify.error({
                                    title: '操作失败',
                                    message: this.$store.state.user.customerCreate.errmsg
                                });
                            }
                        });
                    }
                });
            },
            resetForm(formName) {

                this.$refs[formName].resetFields();

                for (let i in this[formName]) {

                    this[formName][i] = '';
                }
            },
            DialogClose() {
                this.update = false;
                this.form.id = '';
                this.resetForm('form');
            },
            upload() {

            },

            /**
             * @param id => val[0]
             */
            handleItemChange(val) {
                let id = val[0];

                // this.loadCascader(id);
            },

            /**
             * 选择后的回调
             */
            handleChange(val) {
                this.regionValue(val);

                this.loadCascader(val[0]);
            },
            handleBlur(val) {

            },
            regionValue(val) {
                this.form.province = val[0];
                this.form.city = val[1];
                this.form.area = val[2];
            },
            /**
             * 加载列表
             */
            loadCascader(id) {

                return this.$store.dispatch('getRegion', {id: id});
            },

            /**查询表单**/
            onSearch() {
                this.searching = true;
            },
            /**表格初始化**/
            initTable(param) {

                this.tableLoading = true;
                this.$store.dispatch('customerManagerList', param).then(() => {
                    this.tableLoading = false;
                });
            },
            /**handleSizeChange
             * 切换表格记录数的事件
             */
            handleSizeChange(pageSize) {

                this.query.limit = pageSize;
                // console.log(this.query);
                this.initTable(this.query);
            },
            /**handleCurrentChange
             * 当前页面切换的事件
             */
            handleCurrentChange(pageNow) {

                this.query.offset = (pageNow - 1) * this.query.limit;

                this.initTable(this.query);
            },
            /**编辑客户**/
            handleEdit(row) {
                let obj = JSON.parse(JSON.stringify(row));
                obj.province = obj.province.id;
                obj.city = obj.city.id;
                obj.area = obj.area.id;

                for (let i in this.form) {
                    this.form[i] = obj[i];
                }

                this.loadCascader(this.form.province).then(() => {
                    this.selectedOptions = [this.form.province, this.form.city, this.form.area];

                });

                this.update = true;
                this.showDialog = true;

            },

            /**删除客户**/
            handleDelete(row) {
                this.$confirm("删除客户<"+row.name+">？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        const func = async () => {

                            const response = await new Promise((resolve, reject) => {
                                resolve(http.post("customer/delete", {id: row.id} ));
                            });

                            if (response.status == "success") {
                                this.$notify.success("操作成功");
                                this.initTable(this.query);
                            }
                            else {
                                this.$notify.error("操作失败");
                            }
                        }

                        func();
                    })
                    .catch(() => {});
            },
            /**发布客户**/
            handlePublish(row) {

                this.showPulishDialog = true;
                this.publish.id = row.id;
                this.publish.name = row.name;

            },
            /**发布客户 提交**/
            submitPublish() {

                this.$store.dispatch('customerPublish', this.publish).then(() => {

                    if (this.$store.state.user.customerPublish.status == 'success') {
                        this.initTable(this.query);
                        this.$notify.success({title: '操作成功', message: '客户 <' + this.publish.name + '> 发布成功'});
                    } else {
                        this.$notify.error({title: '操作失败', message: this.$store.state.user.customerPublish.error});
                    }

                    this.showPulishDialog = false;
                });
            },
            /**时间戳转日期**/
            parseTimeStamp(times) {
                let date = new Date(parseInt(times) * 1000);

                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            },

        },

        created() {

            this.loadCascader(1).then(() => {
                this.loadCascader(20);
            });

            this.regionValue(this.selectedOptions);

            this.$store.dispatch('brandList');

            this.initTable(this.query);
        },
        computed: {
            regions: function () {
                return this.$store.state.user.region;
            },
            brandList: function () {
                return this.$store.state.user.brandList;
            },
            tableData: function () {
                return this.$store.state.user.customerManagerList.data;
            },
            pageTotal: function () {
                return this.$store.state.user.customerManagerList.total;
            },
        },
        watch: {}
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .wapper
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        overflow-y: auto;
        flex-direction: column;

        &::-webkit-scrollbar
            width: 0px;

        .content-box
            width: 100%;
            position: relative;
            padding: 10px 30px;
            // margin: 30px;

            .tool
                padding: 20px 0px;
                text-align: left !important;

            .table-tool
                padding: 5px 0px;
                text-align: left !important;
                display flex;
                justify-content space-between;
            .search
                // border: 1px solid #ddd;
                // border-radius: 5px;
                // background: #fff;
                // padding: 10px;
                text-align: left !important;
                margin-bottom: 15px;

                .el-form
                    padding: 20px;
                    border-radius: 5px;
                    border: 1px solid #fbfbfb;
                    background: #fff;

                    .el-form-item
                        margin-bottom: 10px;

            .pageNation
                margin-top: 10px;


</style>
