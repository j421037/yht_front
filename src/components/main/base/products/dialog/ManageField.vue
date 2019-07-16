<template>
    <div class="dialog-management-field">
        <el-dialog
            title="字段管理"
            :visible.sync="visible"
            width="45%"
            :before-close="handleClose"
            @open="handleOpen"
        >
            <el-alert type="error" v-if="errmsg" :title="errmsg" style="margin-bottom: 8px;"></el-alert>
            <el-alert :closable="false" type="info" >
                <p style="font-weight:bold">
                    <span>分类：</span>
                    <em>{{category}}</em>
                </p>
                <p style="font-weight:bold">
                    <span>品牌：</span>
                    <em>{{brand}}</em>
                </p>
                <p style="font-weight:bold">
                    <span>排序：</span>
                    <em v-if="CurrentSort">按 {{CurrentSort.orderBy}} 的 {{CurrentSort.sort}} 进行排序</em>
                    <em v-else>无</em>
                </p>
            </el-alert>
            <el-table
                :data="fields"
                border
                style="margin-top:8px;"
                height="250px"
                :default-sort="{prop:'index', order: 'ascending'}"
            >
                <el-table-column label="#" prop="index" sortable></el-table-column>
                <el-table-column label="字段名" prop="field"></el-table-column>
                <el-table-column label="显示名" prop="description"></el-table-column>
                <el-table-column label="类型">
                    <el-table-column label="键" >
                        <template slot-scope="scope">
                            {{findTypeName(scope.row.type)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="值" prop="type"></el-table-column>
                </el-table-column>
                <el-table-column label="属性">
                    <template slot-scope="scope">
                        <span v-if="scope.row.default == true">系统生成</span>
                        <span v-else>手动添加</span>
                    </template>
                </el-table-column>
                <el-table-column label="表头排序" width="150">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" :disabled="scope.row.index < 1" @click.native="changeFieldIndex(scope.row, 'up')">上移</el-button>
                        <el-button type="info" size="mini" :disabled="fieldLength - 1 == scope.row.index" @click.native="changeFieldIndex(scope.row, 'down')">下移</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="200">
                    <template slot-scope="scope">
                        <template v-if="!scope.row.default">
                            <el-button type="text" @click.native="EidtField(scope.row)">修改</el-button>
                            <el-button type="text" @click.native="DeleteField(scope.row)" :disabled="CFieldString == scope.row.field">删除</el-button>
                            <el-button type="text" v-if="scope.row.type == 'select'" @click.native="ListHandleOpen(scope.row.field)">列表项</el-button>
                            <el-button type="text" v-if="scope.row.type == 'select'" @click.native="allocation(scope.row.field)">分配</el-button>
                        </template>
                    </template>
                </el-table-column>

            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="SortDialogVisible = true">列表排序</el-button>
                <el-button type="primary" @click="OpenAppendForm">添加字段</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :title="AppendFieldTitle"
            :visible.sync="AppendFieldVisible"
            width="30%"
            :before-close="handleAppendFieldClose"
        >
            <el-form
                :model="AppendFieldForm"
                :rules="AppendFieldRules"
                label-width="80px"
                ref="AppendFieldForm"
            >
                <el-form-item label="字段名称" prop="field">
                    <el-input v-model="AppendFieldForm.field" placeholder="字段名，只能是字母、数字、下划线" />
                </el-form-item>
                <el-form-item label="显示名称" prop="description">
                    <el-input v-model="AppendFieldForm.description" placeholder="产品的属性名称" />
                </el-form-item>
                <el-form-item label="类型名称" prop="type">
                    <el-select v-model="AppendFieldForm.type">
                        <el-option v-for="(item , key) in fieldTypes" :key="key" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
            <transition name="el-zoom-in-top">
                <el-alert :type="response.status" v-if="response.show">{{response.msg}}</el-alert>
            </transition>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="submit" :loading="AppentSubmiting">提  交</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="列表项设置"
            :visible.sync="ListVisible"
            width="35%"
            :before-close="ListHandleClose"
        >
            <div class="list-items_container">
                <el-alert type="success">名称和值可以一样</el-alert>
                <el-form class="list-items_form" :model="ListForm" ref="ListForm" :inline="true" :rules="ListFormRules" style="margin-top:5px;">
                    <el-form-item label="名称" prop="key">
                        <el-input v-model="ListForm.key" placeholder="请输入名称" />
                    </el-form-item>
                    <el-form-item label="值" prop="value">
                        <el-input v-model="ListForm.value" placeholder="请输入值" />
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" :loading="ListFormBtnLoding" type="primary" @click.native="AppendListItem">提交</el-button>
                    </el-form-item>
                </el-form>

                <el-table :data="ListItems" border height="250">
                    <el-table-column type="index" :index="ListTableIndexMethod" width="50"></el-table-column>
                    <el-table-column label="名称" prop="key"></el-table-column>
                    <el-table-column label="值" prop="value"></el-table-column>
                    <el-table-column label="其他">
                        <template slot-scope="scope">
                            <el-button type="text" :disabled="CurrentListItemId == scope.row.id" @click.native="DeleteListItem(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <transition name="el-zoom-in-top">
                    <p style="text-align: center" v-show="ListResponse.show">{{ListResponse.msg}}</p>
                </transition>
            </div>
        </el-dialog>
        <el-dialog
            title="排序设置"
            :visible.sync="SortDialogVisible"
            width="30%"
        >
            <el-form :model="SortForm" ref="SortForm" label-width="80px" :rules="SortFormRules">
                <el-form-item label="字段" prop="field">
                    <el-select v-model="SortForm.field">
                        <el-option v-for="(item ,key ) in fields" :key="key" :label="item.description" :value="item.field" />
                    </el-select>
                </el-form-item>
                <el-form-item label="排序方式">
                   <el-select v-model="SortForm.sort">
                       <el-option v-for="(item,key) in SortMethod" :key="key" :label="item.label" :value="item.value"></el-option>
                   </el-select>
                </el-form-item>
            </el-form>
            <el-alert type="warning" :closable="false">正序：例如1-9， 倒叙： 9-1 反着来</el-alert>
            <transition name="el-zoom-in">
                <el-alert v-show="SortResponse.show" :type="SortResponse.status" style="margin-top: 5px;">{{SortResponse.msg}}</el-alert>
            </transition>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="SortFormSubmit" :loading="SortSubmiting">保 存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="字段分配"
            :visible.sync="FieldAllocationDialogVisible"
            width="30%"
            >
            <el-form :model="AllocationForm" ref="AllocationForm" :rules="AllocationRules">
                <el-form-item label="分配到: ">
                    <el-select v-model="AllocationForm.targetTableId">
                        <el-option v-for="(item, key) in tables" v-if="item.id != tableId" :label="item.name" :value="item.id" :key="item.key" />
                    </el-select>
                </el-form-item>
            </el-form>
            <el-alert v-if="AllocationResponse.show" :type="AllocationResponse.status" :closable="false">{{AllocationResponse.msg}}</el-alert>
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click.native="AllocationFormSubmit" :loading="AllocationSubmiting">分 配</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'manageField',
        props: {
            category: {
                type: String,
                default: null
            },
            brand: {
                type: String,
                default: null
            },
            tableId: {
                type: Number,
                default: 0
            },
            tables: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                errmsg: null,
                response: {show: false},
                AppendFieldVisible: false,
                AppendFieldForm: {
                    id: null,
                    field: null,
                    description: null,
                    oldField:null,
                    type: null,
                },
                AppendFieldRules: {
                    field: [
                        {required: true,trigger: "blur", message: "字段名必须填写"},
                        {validator: this.onlyEnAndNum, trigger: "blur"}
                    ],
                    description: [
                        {required: true,trigger: "blur", message: "显示名必须填写"}
                    ],
                    type: [
                        {required: true, trigger: "blur", message: "请选择字段类型"}
                    ]
                },
                AppentSubmiting: false,
                update: false,
                defaultForm: {},
                CFieldString: 0,
                ListVisible:false,
                ListForm:{
                    key: null,
                    value: null,
                    field: null,
                    tableId: null
                },
                ListFormRules: {
                    key:[
                        {required: true, trigger: "blur", message:"请输入名称"}
                    ],
                    value:[
                        {required: true, trigger: "blur", message:"请输入值"}
                    ],
                },
                ListFormBtnLoding: false,
                ListResponse: {
                    show:false,
                    msg: null
                },
                ListItems: [],
                CurrentListItemId: null,
                SortForm:{
                    field: null,
                    sort: "asc",
                },
                SortFormRules:{
                    field: [
                        {required: true, trigger:"blur", message:"请选择字段"}
                    ]
                },
                SortDialogVisible: false,
                SortMethod: [{label:"正序",value:"asc"},{label:"倒叙",value:"desc"}],
                SortSubmiting: false,
                SortResponse: {
                    show: false,
                    status: "success",
                    msg: null,
                },
                FieldAllocationDialogVisible:false,
                AllocationSubmiting: false,
                AllocationForm:{
                    targetTableId: null,
                    sourceField: null
                },
                AllocationRules: {
                    tableId:[
                        {required: true, trigger: "blur", message:"请选择要分配的目标"}
                    ]
                },
                AllocationResponse: {
                    status: "success",
                    show: false,
                    msg: null
                }
            }
        },
        computed: {
            AppendFieldTitle: function () {
                if (this.update)
                    return "修改字段";
                return "添加字段";
            },
            CurrentSort: function() {
                let f = this.fields.find(it => {return it.field == this.table.orderby;});
                let s = this.SortMethod.find(it => {return it.value == this.table.sort;});
                if (f && s)
                    return {orderBy:f.description,sort:s.label};
                return null;
            },
            visible: function () {
                return this.$store.state.user.DialogVisible.managementField;
            },
            table: function() {
                let row = this.$store.state.user.SinglePriceTable;
                console.log(row)
                if (row.length > 0) {
                    this.SortForm.field = row[0].orderby;
                    this.SortForm.sort = row[0].sort;
                    return row[0];
                }

                return {};
            },
            fields: function() {
                if (typeof(this.table.field) != "undefined")
                    return this.table.field;
                return [];
            },
            fieldLength: function () {
                return this.fields.length;
            },
            fieldTypes: function () {
                return this.$store.state.user.ProductTableFieldType;
            },
        },
        created() {
            this.defaultForm = Object.assign({},this.AppendFieldForm);
        },
        methods: {
            ListTableIndexMethod(index) {
                return ++index;
            },
            ListHandleClose() {
                this.ListVisible = false;
            },
            ListHandleOpen(field) {
                this.ListVisible = true;
                this.ListForm.field = field;
                this.LoadListItem(field);
            },
            LoadListItem(field) {
                this.ListItems = [];
                this.$store.dispatch("LoadProductTableSelectItem", {tableId: this.tableId,field:field}).then(response => {
                    if (response.status == "success")
                        this.ListItems = response.data;
                })
            },
            AppendListItem() {
                this.$refs["ListForm"].validate(valid => {
                    if (!valid)
                        return false;

                    this.ListFormBtnLoding = true;

                    this.$store.dispatch("AppendProductTableSelectItem", this.ListForm).then(response => {
                        if (response.status =="success") {
                            this.ListResponse.msg = "操作成功"
                            this.LoadListItem(this.ListForm.field);
                            this.$refs["ListForm"].resetFields();
                        }
                        else {
                            this.ListResponse.msg = response.errmsg;
                        }

                        this.ListResponse.show = true;
                        this.ListFormBtnLoding = false;
                        setTimeout(() => {
                            this.ListResponse.show = false;
                        }, 1500);
                    });
                });
            },
            DeleteListItem(id) {
                this.CurrentListItemId = id;

                this.$store.dispatch("DeleteProductTableSelectItem", {id:id}).then(response => {
                    this.CurrentListItemId = null;
                    console.log(response)
                    if (response.status == "success") {
                        this.ListResponse.msg = "操作成功"
                        this.LoadListItem(this.ListForm.field);
                    }
                    else {
                        this.ListResponse.msg = response.errmsg;
                    }

                    setTimeout(() => {
                        this.ListResponse.show = false;
                    }, 1500);
                });
            },
            findTypeName(value) {
                if (this.fieldTypes.length > 0) {
                    let item = this.fieldTypes.find(it => {return it.value == value;});

                    if (typeof(item) != "undefined")
                        return item.label;
                }

                return null;
            },
            handleClose() {
                this.$store.dispatch("DialogVisible",{managementField: false});
            },
            handleOpen() {
                if (this.tableId < 0) {
                    this.errmsg = "参数不完整";
                    return false;
                }
                else {
                    this.errmsg = null;
                }
                this.ListForm.tableId = this.AppendFieldForm.id = this.tableId;
                this.LoadPriceSingleTable(this.tableId);
            },
            EidtField(row) {
                this.update = true;
                this.AppendFieldVisible = true;
                this.AppendFieldForm.field = this.AppendFieldForm.oldField = row.field;
                this.AppendFieldForm.description = row.description;
                this.AppendFieldForm.type = row.type;
            },
            changeFieldIndex(row, direction) {
                let form = {tableId: this.tableId, field: row.field, direction:direction};
                this.$store.dispatch("ChangeFieldIndex",form).then(response => {
                    console.log(response)
                    if (response.status == "success") {
                        this.LoadPriceSingleTable(this.tableId);
                    }
                })
            },
            DeleteField(row) {
                this.CFieldString = row.field;

                this.$store.dispatch("DeleteTableField", {id:this.tableId, field:row.field}).then(response => {
                    console.log(response)
                    if (response.status == "success") {
                        this.response.status = "success";
                        this.response.msg = "操作成功";
                        this.LoadPriceSingleTable();
                    }
                    else {
                        this.response.status = "error";
                        this.response.msg = response.errmsg;
                    }
                    this.response.show = true;
                    setTimeout(() => {
                        this.response.show = false;
                    }, 1500);
                });

                this.CFieldString = null;
            },
            handleAppendFieldClose() {
                this.update = false;
                this.AppendFieldVisible = false;
                // this.AppendFieldForm = JSON.parse(JSON.stringify(this.defaultForm));
                // this.AppendFieldForm.id = this.tableId;
            },
            LoadPriceSingleTable() {
                this.$store.dispatch("LoadSinglePriceTable", {id: this.tableId});
            },
            submit() {
                this.$refs["AppendFieldForm"].validate(valid => {

                   if (!valid)
                       return false;

                   this.submiting = true;

                   let action = "AppendTableField";

                   if (this.update) {
                       action = "ModifyTableField";
                   }

                   this.$store.dispatch(action, this.AppendFieldForm).then(response => {
                       console.log(response);
                       if (response.status == "success") {
                           this.response.status = "success";
                           this.response.msg = "操作成功";
                           this.$refs["AppendFieldForm"].resetFields();
                           this.LoadPriceSingleTable();
                       }
                       else {
                           this.response.status = "error";
                           this.response.msg = response.errmsg;
                       }

                       this.response.show = true;

                       setTimeout(() => {
                           this.response.show = false;
                           this.AppendFieldVisible = false;
                       }, 1000);
                   });
                });
            },
            OpenAppendForm() {
                this.AppendFieldVisible = true;
                this.AppendFieldForm = JSON.parse(JSON.stringify(this.defaultForm));
                this.AppendFieldForm.id = this.tableId;
            },
            SortFormSubmit() {
                this.$refs["SortForm"].validate(valid => {
                   if (!valid)
                       return false;
                   let data = Object.assign({},this.SortForm);
                   data.table_id = this.tableId;

                   this.$store.dispatch("ProductTableSort",data).then(response =>{
                       if (response.status == "success") {
                           this.SortResponse.status = "success";
                           this.SortResponse.msg = "操作成功";
                           this.LoadPriceSingleTable();
                       }
                       else {
                           this.SortResponse.status = "error";
                           this.SortResponse.msg = response.errmsg;
                       }

                       this.SortResponse.show = true;
                       setTimeout(() => {
                          this.SortResponse.show = false;
                          this.SortDialogVisible = false;
                       }, 1500);
                   });
                });
            },
            allocation(field) {
                this.FieldAllocationDialogVisible = true;
                this.AllocationForm.sourceField = field;
            },
            AllocationFormSubmit() {
                this.$refs["AllocationForm"].validate(valid => {
                    if (!valid)
                        return false;

                    this.AllocationSubmiting = true;

                    let form = Object.assign({},this.AllocationForm);
                    form.sourceTableId = this.tableId;

                    this.$store.dispatch("AllcationField", form).then(response => {
                        console.log(response)
                        if (response.status == "success") {
                            this.AllocationResponse.status = "success";
                            this.AllocationResponse.msg = "操作成功";
                        }
                        else {
                            this.AllocationResponse.status = "error";
                            this.AllocationResponse.msg = response.errmsg;
                        }

                        this.AllocationResponse.show  = true;
                        this.AllocationSubmiting = false;
                        setTimeout(() => {
                            this.AllocationResponse.show = false;
                            this.FieldAllocationDialogVisible = false;
                        },1500);
                    });
                })
            },

            onlyEnAndNum(rule, value, callback) {
                if (/^[A-Za-z][A-Za-z0-9_]*$/.test(value)) {
                    callback();
                }
                else {
                    callback(new Error("字段名必须是字母开头,然后只能包含字母数字下划线"));
                }
            },

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./managerField.styl"
</style>
