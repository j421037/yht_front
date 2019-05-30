<!--main 项目管理组件-->
<template>
    <div class="projectManagementBox">
        <div class="top fx">
            <el-button type="primary" @click="showDialog('Project')">
                +
                添加项目
            </el-button>
            <div class="fast-query">
                <el-input
                    placeholder="快速查询你需要的内容"
                    v-model="form[0].value"
                    class="input-with-select"
                >
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click.native="querySearch(form[0].value)"
                    ></el-button>
                </el-input>
            </div>
            <div class="fx1"></div>
            <div class="buttons" v-if="cusTypes[0]" hidden>
                <el-radio-group v-model="curCustomMode">
                    <el-radio-button
                        v-for="item in cusTypes"
                        :key="item.id"
                        :label="item.id"
                    >{{item.name}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="tableWrap">
            <el-table
                :data="tableData"
                ref="singleTable"
                :max-height="tableHeight"
                border
                style="width: 100%"
                :expand-row-keys="expandkeys"
                row-key="id"
                @cell-click="onProjectsCellClick"
                v-if="expandRefresh"
            >
                <el-table-column prop="id" fixed="left" label="展开" width="50">
                    <template slot-scope="scope">
                        <i class="el-icon-arrow-right el-icon-arrow-rotate-leave" :class="{'el-icon-arrow-rotate-active': expandkeys.indexOf(scope.row.id) > -1}"></i>
                    </template>
                </el-table-column>
                <el-table-column type="expand"  v-show="false" width="-1">
                    <template slot-scope="props">
                        <div class="projectInfo" v-if="props.row.projectInfoLoaded">
                            <div class="proTop">
                                <table style="width:100%;">
                                    <tr>
                                        <td style="width:100px;"></td>
                                        <td>项目全称：</td>
                                        <td>{{props.row.projectInfo.name}}</td>
                                        <td style="width:100px;"></td>
                                        <td>品牌库：</td>
                                        <td>
                                            <a v-if="props.row.projectInfo.brand" :href="$appConst.BACKEND_DOMAIN_VIEW_URL+'?id='+props.row.projectInfo.brand+'&token='+$store.state.user.token" target="_blank">点击查看</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:100px;"></td>
                                        <td>项目类型：</td>
                                        <td>{{props.row.projectInfo.type}}</td>
                                        <td style="width:100px;"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="width:100px;"></td>
                                        <td>项目地址：</td>
                                        <td>{{props.row.projectInfo.addr}}</td>
                                        <td style="width:100px;"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="width:100px;"></td>
                                        <td>开工日期：</td>
                                        <td>{{props.row.projectInfo.start_at}}</td>
                                        <td style="width:100px;"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="width:100px;"></td>
                                        <td>完工日期：</td>
                                        <td>{{props.row.projectInfo.finish_at}}</td>
                                        <td style="width:100px;"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td style="width:100px;"></td>
                                        <td>备注：</td>
                                        <td>{{props.row.projectInfo.remark}}</td>
                                        <td style="width:100px;"></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="proBot" v-if="props.row.customer[0]">
                                <el-table
                                    :data="props.row.customer"
                                    ref="proBotTable"
                                    border
                                    style="width: 100%"
                                >
                                    <el-table-column prop="type" label="级别" width="100"></el-table-column>
                                    <el-table-column prop="name" label="客户名称"></el-table-column>
                                    <el-table-column prop="work_scope" label="施工范围"></el-table-column>
                                    <el-table-column prop="attached" label="挂靠"></el-table-column>
                                    <el-table-column prop="user_id" label="业务员"></el-table-column>
                                    <el-table-column prop="contract" label="合同">
                                        <template slot-scope="scope">
                                            <a v-if="scope.row.contract" :href="$appConst.BACKEND_DOMAIN_VIEW_URL+'?id='+scope.row.contract+'&token='+$store.state.user.token" target="_blank">点击查看</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="account_period" label="账期"></el-table-column>
                                    <el-table-column prop="tax" label="税率"></el-table-column>
                                    <el-table-column prop="coop" label="合作产品"></el-table-column>
                                    <el-table-column label="跟踪动态">
                                        <template slot-scope="scope">
                                            <el-button
                                                size="mini"
                                                @click="onGzdtClick(scope.row.id,scope.row.user_id)"
                                            >
                                                <div
                                                    style="color:#d27f9b;"
                                                >查看</div>
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="标签">
                                        <template slot-scope="scope">
                                            <el-button
                                                size="mini"
                                                @click="onBqClick(scope.row.id,scope.row.user_id)"
                                            >
                                                <div
                                                    style="color:#d27f9b;"
                                                >查看</div>
                                            </el-button>

                                        </template>
                                    </el-table-column>

                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button
                                                size="mini"
                                                @click="onEditCustomer(scope.row)"
                                            >
                                                <div
                                                    style="color:#d27f9b;"
                                                >编辑</div>
                                            </el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="项目名称" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="onItsProjectsClick(scope.row)">
                            <div style="color:#d27f9b;">{{ scope.row.name }}</div>
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="项目类型"></el-table-column>
                <el-table-column prop="status" label="项目进度"></el-table-column>
                <el-table-column label="品牌">
                    <template slot-scope="scope">
                        <a v-if="scope.row.brand" :href="$appConst.BACKEND_DOMAIN_VIEW_URL+'?id='+scope.row.brand+'&token='+$store.state.user.token" target="_blank">点击查看</a>
                    </template>
                </el-table-column>
                <el-table-column prop="start_at" label="开工日期"></el-table-column>
                <el-table-column prop="finish_at" label="完工日期"></el-table-column>
                <el-table-column prop="remark" label="项目概括"></el-table-column>
            </el-table>
            <div style="margin-top:20px; text-align:center">
                <el-pagination background layout="prev, pager, next" @current-change="onPageChange" :page-size="limit" v-if="totalNumber>limit" :total="totalNumber"></el-pagination>
            </div>

        </div>
        <div class="dongtai">
            <el-dialog title="动态" width="40%" :visible.sync="dialogTableVisible">
                <div style="margin-bottom:10px;">
                    <el-button
                        size="mini"
                        @click="addGzdt()"
                    >
                        <div
                            style="color:#d27f9b;"
                        >添加</div>
                    </el-button>
                </div>
                <el-table :data="gridData" :border="true">
                    <el-table-column property="addtime" label="日期" width="150"></el-table-column>
                    <el-table-column property="content" label="跟踪内容"></el-table-column>
                </el-table>
            </el-dialog>
        </div>

        <div class="addDongtai">
            <el-dialog title="添加动态" width="40%" :visible.sync="dialogVisibleAddDongtai">
                <el-form :model="dongtai">
                    <div class="fx">
                        <div class="txt">
                            跟踪内容：
                        </div>
                        <div class="fx1">
                            <el-input v-model="dongtai.content" placeholder="请输入内容"></el-input>
                        </div>
                    </div>

                    <div class="fx">
                        <div class="txt">
                            日期：
                        </div>
                        <div class="fx1">
                            <el-date-picker
                            v-model="dongtai.addtime"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>

                    <div class="fx">
                        <div class="txt"></div>
                        <div class="fx1">
                            <el-button @click="hideDialog('AddDongtai')">取 消</el-button>
                            <el-button type="primary" @click="submitAddDongtai">确 定</el-button>
                        </div>
                    </div>



                </el-form>
            </el-dialog>
        </div>

        <div class="addPeitaojiqi">
            <el-dialog title="添加配套机器" width="40%" :visible.sync="dialogVisibleAddPeitaojiqi">
                <el-form :model="peitaojiqi">
                    <div class="fx">
                        <div class="txt">
                            机器：
                        </div>
                        <div class="fx1">
                            <el-select size="small" v-model="peitaojiqi.machine" placeholder="请选择" style="display:block">
                                <el-option
                                    v-for="item in machineOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>

                        </div>
                    </div>
                    <div class="fx">
                        <div class="txt">
                            数量：
                        </div>
                        <div class="fx1">
                            <el-input v-model="peitaojiqi.num" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="fx">
                        <div class="txt">
                            备注：
                        </div>
                        <div class="fx1">
                            <el-input v-model="peitaojiqi.remark" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="fx">
                        <div class="txt">
                            日期：
                        </div>
                        <div class="fx1">
                            <el-date-picker
                            v-model="peitaojiqi.addtime"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>

                    <div class="fx">
                        <div class="txt"></div>
                        <div class="fx1">
                            <el-button @click="hideDialog('AddPeitaojiqi')">取 消</el-button>
                            <el-button type="primary" @click="submitAddPeitaojiqi">确 定</el-button>
                        </div>
                    </div>



                </el-form>
            </el-dialog>
        </div>

        <div class="addSongjianjilu">
            <el-dialog title="添加送检记录" width="40%" :visible.sync="dialogVisibleAddSongjianjilu">
                <el-form :model="songjianjilu">
                    <div class="fx">
                        <div class="txt">
                            组：
                        </div>
                        <div class="fx1">
                            <el-input v-model="songjianjilu.groups" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="fx">
                        <div class="txt">
                            数量：
                        </div>
                        <div class="fx1">
                            <el-input v-model="songjianjilu.num" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="fx">
                        <div class="txt">
                            备注：
                        </div>
                        <div class="fx1">
                            <el-input v-model="songjianjilu.remark" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="fx">
                        <div class="txt">
                            日期：
                        </div>
                        <div class="fx1">
                            <el-date-picker
                            v-model="songjianjilu.addtime"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>

                    <div class="fx">
                        <div class="txt"></div>
                        <div class="fx1">
                            <el-button @click="hideDialog('AddSongjianjilu')">取 消</el-button>
                            <el-button type="primary" @click="submitAddSongjianjilu">确 定</el-button>
                        </div>
                    </div>



                </el-form>
            </el-dialog>
        </div>

        <div class="biaoqian">
            <el-dialog title="标签" width="60%" :visible.sync="dialogTableVisibleBq">
                <div style="margin-bottom:10px;">
                    <el-button
                        size="mini"
                        @click="addPtjq()"
                    >
                        <div
                            style="color:#d27f9b;"
                        >添加配套机器</div>
                    </el-button>
                    <el-button
                        size="mini"
                        @click="addSjju()"
                    >
                        <div
                            style="color:#d27f9b;"
                        >添加送检记录</div>
                    </el-button>
                </div>
                <el-table :data="gridDataBqTag" :border="true">
                    <el-table-column property="machine" label="配套机器" width="150"></el-table-column>
                    <el-table-column property="num" label="" width="150"></el-table-column>
                    <el-table-column property="addtime" label="日期" width="150"></el-table-column>
                    <el-table-column property="remark" label="备注"></el-table-column>
                </el-table>
                <el-table :data="gridDataBqRecord" :border="true">
                    <el-table-column property="groups" label="送检记录" width="150"></el-table-column>
                    <el-table-column property="num" label="" width="150"></el-table-column>
                    <el-table-column property="addtime" label="日期" width="150"></el-table-column>
                    <el-table-column property="remark" label="备注"></el-table-column>
                </el-table>
            </el-dialog>
        </div>
        <!-- 添加项目 -->
        <div class="addProject">
            <el-dialog
                title="添加项目"
                width="50%"
                :visible.sync="dialogVisibleProject"
                @open="initProjectData()"
            >
                <div class="wrap" style="padding:0 40px;">
                    <el-form :model="projectF" ref="projectF" label-position="left" label-width="80px" v-if="dialogVisibleProject" >
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

                        <el-form-item label>
                            <el-button @click="hideDialog('Project')">取 消</el-button>
                            <el-button type="primary" @click="submitAddProject">确 定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>

        <!-- 添加客户 -->
        <div class="addCustomer">
            <el-dialog
                title="添加客户"
                width="60%"
                :visible.sync="dialogVisibleCustomer"
            >
                <div class="wrap" style="padding:0 40px;">
                    <el-form
                        label-position="left"
                        label-width="80px"
                        v-if="dialogVisibleCustomer"
                        :model="customer"
                        ref="customerF"
                    >
                        <el-form-item label="客户名称" prop="name" :rules="{required: true,trigger:'blur',message:'请输入客户名称'}">
                            <el-input v-model="customer.name"></el-input>
                        </el-form-item>
                        <div class="line fx">
                            <el-form-item label="客户类型" prop="type" :rules="{required: true,trigger: 'blur',message: '请选择客户类型'}">
                                <el-select v-model="customer.type" placeholder="请选择">
                                    <el-option
                                        v-for="item in cusTypes"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="客户级别">
                                <el-select v-model="customer.level" placeholder="请选择">
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
                            <el-select v-model="customer.attached" placeholder="请选择">
                                <el-option
                                    v-for="item in cusAttached"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="施工范围" prop="work_scope" :rules="{required: true,trigger: 'blur', message: '请选择施工范围'}">
                            <el-select v-model="customer.work_scope" placeholder="请选择">
                                <el-option
                                    v-for="item in workScopeOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <div class="fx line">
                            <!--<el-form-item label="标签">-->
                                <!--<el-input v-model="customer.tags"></el-input>-->
                            <!--</el-form-item>-->
                        </div>
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
                                <el-input v-model="customer.account_period"></el-input>
                            </el-form-item>
                            <el-form-item label="税率">
                                <el-input v-model="customer.tax"></el-input>
                            </el-form-item>
                        </div>

                        <div class="fx line">
                            <el-form-item label="合作产品">
                                <el-input v-model="customer.coop"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="动态跟踪">-->
                                <!--<el-input v-model="customer.track"></el-input>-->
                            <!--</el-form-item>-->
                        </div>

                        <el-form-item label="电话" prop="phone" :rules="{required:true,trigger:'blur',message:'手机号码不能为空'}">
                            <el-input v-model="customer.phone"></el-input>
                        </el-form-item>
                        <el-form-item label>
                            <el-button @click="hideDialog('Customer')">取 消</el-button>
                            <el-button type="primary" @click="submitAddCustomer">确 定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/javascript">
import $ from '../../qing/common.js'
import * as http from '@/util/http.js'
import { regionData } from 'element-china-area-data'
let tableHeight = $(window).height() - 280


let initCustomerData = () => {
    return {

    }
}

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
}


export default {

    data() {
        return {
            machineOptions:[],
            cusAttached:[],
            curBqID:{},
            dongtai:{},
            peitaojiqi:{},
            songjianjilu:{},
            dialogVisibleAddDongtai:false,
            dialogVisibleAddPeitaojiqi:false,
            dialogVisibleAddSongjianjilu:false,
            limit:5,
            totalNumber:0,
            workScopeOptions: [],
            cusLevels: [],
            fileList: [],
            kgrq: '',
            options: regionData,
            projectTypes: [],
            projectStatus: [],
            selectedOptions: [],
            form: [{
                field: "cust_id",
                value: "",
            }],
            curCustomMode: 'all',
            gridData: [],
            gridDataBqTag: [],
            gridDataBqRecord: [],
            tableData: [],
            tableHeight,
            dialogTableVisible: false,
            dialogTableVisibleBq: false,
            dialogVisibleProject: false,
            dialogVisibleCustomer: false,
            cusTypes: [],
            projectDatas: {},
            projectF: initProjectData(),
            //customer: initCustomerData(),
            customer: {},
            querySearchResult: [],
            expandkeys: [],
            expandRefresh: true,
        }
    },
    created() {
        this.getCusTypes()
        this.getProjectTypes()
        this.getProjectStatus()
        this.getAllData(1)
        this.getWorkScopeOptions()
        this.getProjectStatus()
        this.getCusLevels()
        this.getCusAttached()
        this.getMachineOptions()
    },
    computed: {

    },

    methods: {
        onEditCustomer(e){
            $.log(e)
            this.showDialog('Customer')

            e.isEdit = true

            this.customer = e

        },
        submitAddDongtai(){
            let url = 'realcustomer/addTrack'
            let data = this.dongtai
            http.post(url, data).then((res) => {
                if(res.status == 'success'){
                    this.hideDialog('AddDongtai')
                    let id = this.curGzdtID.id
                    let uid = this.curGzdtID.uid
                    this.onGzdtClick(id,uid)
                }
            })
        },
        submitAddPeitaojiqi(){
            let url = 'realcustomer/addTag'
            let data = this.peitaojiqi
            http.post(url, data).then((res) => {
                if(res.status == 'success'){
                    this.hideDialog('AddPeitaojiqi')
                    let id = this.curBqID.id
                    let uid = this.curBqID.uid
                    this.onBqClick(id,uid)
                }
            })
        },
        submitAddSongjianjilu(){
            let url = 'realcustomer/addRecord'
            let data = this.songjianjilu
            http.post(url, data).then((res) => {
                if(res.status == 'success'){
                    this.hideDialog('AddSongjianjilu')
                    let id = this.curBqID.id
                    let uid = this.curBqID.uid
                    this.onBqClick(id,uid)

                }
            })
        },
        addGzdt(id,uid){
            this.dialogVisibleAddDongtai = true
            this.dongtai.cust_id = this.curGzdtID.id
            this.dongtai.user_id = this.curGzdtID.uid
        },
        addPtjq(){
            this.dialogVisibleAddPeitaojiqi = true
            this.peitaojiqi.cust_id = this.curBqID.id
            this.peitaojiqi.user_id = this.curBqID.uid
        },
        addSjju(id,uid){
            this.dialogVisibleAddSongjianjilu = true
            this.songjianjilu.cust_id = this.curBqID.id
            this.songjianjilu.user_id = this.curBqID.uid
        },
        onPageChange(e){
            this.getAllData(e)
        },
        onUploadSuccess(e) {
            this.projectF.brand = e.id
        },
        onUploadSuccessHT(e) {
            this.customer.contract = e.id
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
            $.log(i)
            this.querySearchResult.forEach(item => {
                if (item.name == i.value) {
                    this.customer.pid = item.id;
                }

            })
            console.log(this.customer);
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

        //提交项目信息
        submitAddProject() {
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
                            this.customer.pid = res.id;
                        }

                    })
                }
            });

        },
        submitAddCustomer() {
            let url = 'realcustomer/add'
            if(this.customer.isEdit == true){
                url = 'realcustomer/updateInfo'
                let temCustomer = Object.assign({},this.customer)
                temCustomer.isEdit = false
                this.customer = temCustomer
            }
            let data = Object.assign({}, this.customer)

            this.$refs.customerF.validate(valid => {
               if (valid)
               {
                   http.post(url, data).then((res) => {
                       this.hideDialog('Customer');
                       if (res.status == "success")
                       {
                           this.getAllData(1);
                           this.$message({
                               message: '操作成功',
                               type: 'success',
                               center: true
                           });
                       }
                       else {
                           this.$message({
                               message: '操作失败: '+res.errmsg,
                               type: 'error',
                               center: true
                           });
                       }
                       console.log(data);
                       console.log(res)
                   })
               }
            });

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        hideDialog(k) {
            this['dialogVisible' + k] = false
        },
        showDialog(k) {
            this['dialogVisible' + k] = true
        },
        querySearch(k) {
            let url = "realcustomer/search"
            let data = {
                keyword: k
            }

            http.post(url, data).then(res => {
                this.tableData = res.data
            })
        },
        onGzdtClick(id,uid) {
            let url = "realcustomer/track"
            let data = {
                cust_id: id
            }

            this.curGzdtID = {
                id:id,
                uid:uid
            }

            http.post(url, data).then(res => {
                this.gridData = res.row
                $.log(this.gridData)
                this.dialogTableVisible = true
            })
        },
        onBqClick(id,uid) {
            let url = "realcustomer/tag"
            let data = {
                cust_id: id
            }


            this.curBqID = {
                id:id,
                uid:uid
            }

            http.post(url, data).then(res => {
                this.gridDataBqTag = res.tag
                this.gridDataBqRecord = res.record

                let tempRecord = []

                res.record.forEach((n) => {
                    n.groups = n.groups + '组'
                    tempRecord.push(n)
                })

                this.gridDataBqRecord = tempRecord


                this.dialogTableVisibleBq = true

            })
        },
        getAllData(page) {
            let url = "project/all"
            let data = {
                pagenow: page,
                limit:this.limit
            }

            http.post(url, data).then(res => {
                console.log(res);
                if (typoef(res.row) != "undefined" && res.row.length > 0) {
                    res.row.forEach((n, i) => {
                        n.isExpanded = false
                    })
                    this.tableData = res.row
                    this.totalNumber = res.total
                }

            })
        },
        //获取项目详细信息
        getProjectInfo(pid, row, back) {
            let url = "realcustomer/project"
            let data = {
                pid:pid,
                id:row.id
            }
            http.post(url, data).then(res => {
                row.projectInfo = res.row[0]
                row.customer = res.customer
                row.projectInfoLoaded = true;
                //$.log(res)

                back()
            })
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

        //获取配套机器

        getMachineOptions() {
            let url = 'realcustomer/enum'
            let data = {
                value: '配套机器'
            }

            http.post(url, data).then(res => {
                this.machineOptions = res
                //$.log(res)
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
        initCustomerData() {
            this.customer = initCustomerData()
        },
        initProjectData() {
            this.projectF = initProjectData()
            this.customer = initCustomerData()
        },
        onProjectsCellClick(row, column, cell) {
            if (column.label == "展开")
            {
                let i = this.expandkeys.indexOf(row.id);
                if ( i < 0 )
                    this.onItsProjectsClick(row);
                else
                    this.expandkeys.splice(i,1);
                this.expandRefresh = false;
                this.$nextTick(() => {
                    this.expandRefresh = true;
                });
            }
        },
        onItsProjectsClick(row) {
            let pid = row.id
            row.isExpanded = !row.isExpanded

            if (row.isExpanded) {
                this.getProjectInfo(pid, row, () => {
                    this.$refs.singleTable.toggleRowExpansion(row);
                    this.expandkeys.push(row.id);
                })
            } else {
               this.$refs.singleTable.toggleRowExpansion(row)
                this.expandkeys.push(row.id);
            }
        },
        openTrack() {
            this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', '动态', {
                dangerouslyUseHTMLString: true
            });
        },
        openLabel() {
            this.$alert('这是一段内容', '标签', {
                confirmButtonText: '确定',
            });
        }
    },

    components: {

    }
}
</script>
<style lang="less">
@import "./index.less";
</style>
