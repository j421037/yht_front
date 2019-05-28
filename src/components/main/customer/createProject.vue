<template>
    <div class="customer-upgrade">
        <el-dialog
            title="创建项目"
            :visible.sync="visible"
            :before-close="handleClose"
            @open="handleOpen"
        >
            <el-form
                :model="projectF"
                ref="projectF"
                label-position="left"
                label-width="80px"
            >
                <el-form-item label="项目名称" prop="name" :rules="{required:true,trigger:'blur',message:'请选择项目名称'}">
                    <el-autocomplete
                        class="inline-input"
                        v-model="projectF.name"
                        :fetch-suggestions="querySearchAdd"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
                <div class="fx">
                    <el-form-item label="开工日期">
                        <el-date-picker
                            v-model="projectF.start_at"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin-left:20px;" label="完工日期">
                        <el-date-picker
                            v-model="projectF.finish_at"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </div>

                <el-form-item label="项目地址">
                    <div class="fx">
                        <el-cascader
                            size="small"
                            :options="options"
                            v-model="projectF.addr"
                        ></el-cascader>
                        <el-input
                            style="margin-left:10px;"
                            placeholder="请输入具体地址"
                            v-model="projectF.addr_detail"
                        ></el-input>
                    </div>
                </el-form-item>

                <div class="fx line">
                    <el-form-item label="项目类型">
                        <el-select v-model="projectF.type" placeholder="请选择">
                            <el-option
                                v-for="item in projectTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left:20px;" label="项目状态">
                        <el-select v-model="projectF.status" placeholder="请选择">
                            <el-option
                                v-for="item in projectStatus"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="fx line">
                    <el-form-item label="建筑面积">
                        <el-input placeholder="请输入建筑面积" v-model="projectF.area"></el-input>
                    </el-form-item>
                </div>
                <div class="fx line">
                    <el-form-item label="品牌库">
                        <el-upload
                            class="upload-demo"
                            :action="this.$appConst.BACKEND_DOMAIN+'project/upload'"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="onUploadSuccess"
                            :file-list="fileList"
                            list-type="picture"
                            name="uploadfile"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </div>
                <div class="fx line">
                    <el-form-item class="fx1" label="项目概括">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 5}"
                            placeholder="请输入内容"
                            v-model="projectF.remark"
                        ></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideDialog('Project')">取 消</el-button>
                <el-button type="primary" @click="submitProject">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="创建客户"
            :visible.sync="visible1"
        >
            <el-form
                label-position="left"
                label-width="80px"
                :model="customerF"
                ref="customerF"
            >
                <el-form-item label="客户名称" prop="name" :rules="{required: true,trigger:'blur',message:'请输入客户名称'}">
                    <el-input v-model="customerF.name"></el-input>
                </el-form-item>
                <div class="line fx">
                    <el-form-item label="客户类型" prop="type" :rules="{required: true,trigger: 'blur',message: '请选择客户类型'}">
                        <el-select v-model="customerF.type" placeholder="请选择">
                            <el-option
                                v-for="item in cusTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户级别">
                        <el-select v-model="customerF.level" placeholder="请选择">
                            <el-option
                                v-for="item in cusLevels"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="挂靠">
                    <el-select v-model="customerF.attached" placeholder="请选择">
                        <el-option
                            v-for="item in cusAttached"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="施工范围" prop="work_scope" :rules="{required: true,trigger: 'blur', message: '请选择施工范围'}">
                    <el-select v-model="customerF.work_scope" placeholder="请选择">
                        <el-option
                            v-for="item in workScopeOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="合同">
                    <el-upload
                        class="upload-demo"
                        :action="this.$appConst.BACKEND_DOMAIN+'project/upload'"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="onUploadSuccessHT"
                        :file-list="fileList"
                        list-type="picture"
                        name="uploadfile"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <div class="fx line">
                    <el-form-item label="账期">
                        <el-input v-model="customerF.account_period"></el-input>
                    </el-form-item>
                    <el-form-item label="税率">
                        <el-input v-model="customerF.tax"></el-input>
                    </el-form-item>
                </div>

                <div class="fx line">
                    <el-form-item label="合作产品">
                        <el-input v-model="customerF.coop"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="电话" prop="phone" :rules="{required:true,trigger:'blur',message:'手机号码不能为空'}">
                    <el-input v-model="customerF.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideDialog('Customer')">取 消</el-button>
                <el-button type="primary" @click.native="submitCustomer">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as http from '@/util/http.js'
    import { regionData } from 'element-china-area-data';

    let initProjectData = () => {
        return {
            name: '',
            start_at: '',
            finish_at: '',
            addr: [],
            addr_detail: '',
            type: '',
            status: '',
            area: '',
            brand: '',
            remark: ''
        }
    };

    export default {
        props: {
            visible: {
                type: Boolean,
                defalut: false
            },
            customer: {
                type: Object,
                defalut: {}
            }
        },
        data() {
            return {
                visible1: false,
                projectF: initProjectData(),
                customerF: {
                    pid: 0,
                    name: "",
                    type: "",
                    level: "",
                    attached: "",
                    work_scope: "",
                    account_period: "",
                    tax: "",
                    coop: "",
                    phone: "",
                    contract: "",
                    customer_id: ""
                },
                cusTypes: [],
                cusLevels: [],
                projectTypes: [],
                projectStatus: [],
                workScopeOptions: [],
                cusAttached:[],
                options: regionData,
                fileList: [],
            }
        },
        created() {
            this.getCusTypes();
            this.getCusLevels();
            this.getProjectTypes();
            this.getProjectStatus();
            this.getWorkScopeOptions();
            this.getCusAttached();
        },
        methods: {
            handleOpen() {
                this.customerF.name = this.customer.name;
                this.customerF.phone = this.customer.phone;
                this.customerF.customer_id = this.customer.id;
            },
            handleClose() {
                this.hideDialog('Project');
            },
            hideDialog(dialog) {
                if (dialog == "Project")
                    this.$emit("close");
                if (dialog == "Customer")
                    this.visible1 = false;
            },
            showDialog(dialog) {
                if (dialog == "Customer")
                    this.visible1 = true;
            },
            submitProject() {
                //this.handleClose();
                let url = 'project/add'
                let data = Object.assign({}, this.projectF)

                data.addr = data.addr[2]
                this.$refs.projectF.validate(valid => {
                    if (valid)
                    {
                        http.post(url, data).then((res) => {
                            this.hideDialog('Project')
                            this.showDialog('Customer')

                            if (res.hasOwnProperty("id")) {
                                this.customerF.pid = res.id;
                            }
                            console.log(res)
                        })
                    }
                });
            },
            submitCustomer() {
                this.$refs.customerF.validate( valid => {
                    if (valid) {
                        let url = "customer/public/upgrade";

                        http.post(url,this.customerF).then( res => {
                            if (res.status == "success") {
                                this.$notify.success("操作成功");
                                this.hideDialog("Customer");
                                this.$emit("refresh");
                            }
                            else {
                                this.$notify.error("操作失败");
                            }

                            console.log(res)
                        });
                    }

                });
            },
            //获取客户类型
            getCusTypes() {
                let url = 'realcustomer/enum'
                let data = {
                    value: '客户类型'
                }

                http.post(url, data).then(res => {
                    this.cusTypes = res
                    //$.log(res)
                })
            },
            //获取客户级别

            getCusLevels() {
                let url = 'realcustomer/enum'
                let data = {
                    value: '客户级别'
                }

                http.post(url, data).then(res => {
                    this.cusLevels = res
                    //$.log(res)
                })
            },
            //获取项目类型
            getProjectTypes() {
                let url = 'realcustomer/enum'
                let data = {
                    value: '项目类型'
                }

                http.post(url, data).then(res => {
                    this.projectTypes = res
                    //$.log(res)
                })
            },
            //获取项目状态
            getProjectStatus() {
                let url = 'realcustomer/enum'
                let data = {
                    value: '项目状态'
                }

                http.post(url, data).then(res => {
                    this.projectStatus = res
                })
            },
            //获取施工范围

            getWorkScopeOptions() {
                let url = 'realcustomer/enum'
                let data = {
                    value: '施工范围'
                }

                http.post(url, data).then(res => {
                    this.workScopeOptions = res
                    //$.log(res)
                })
            },
            //获取挂靠信息

            getCusAttached() {
                let url = 'realcustomer/enum'
                let data = {
                    value: '挂靠'
                }

                http.post(url, data).then(res => {
                    this.cusAttached = res
                })
            },
            handlePreview(file, filelsit) {},

            handleRemove(file, filelsit) {},

            onUploadSuccess(e) {
                this.projectF.brand = e.id
            },
            onUploadSuccessHT(e) {
                this.customerF.contract = e.id
            },
            querySearchAdd(queryString, cb) {
                this.projectTips(queryString, res => {
                    let result = []
                    res.row.forEach((n, i) => {
                        let item = {
                            value: n.name
                        }
                        result.push(item)
                    })
                    this.querySearchResult = res.row;
                    cb(result);
                })

            },

            handleSelect(i) {
                this.querySearchResult.forEach(item => {
                    if (item.name == i.value) {
                        this.customer.pid = item.id;
                    }

                })
            },
            //搜索项目提示

            projectTips(k, back) {
                let url = 'project/projectBySearch'
                let data = {
                    keyword: k
                }

                http.post(url, data).then(res => {
                    back(res)
                })
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../projectManagement/index.less"
</style>
