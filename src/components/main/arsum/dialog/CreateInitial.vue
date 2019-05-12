<template>
    <div class="create-initial-wapper" >
        <el-dialog
            title="期初余额"
            :visible.sync="visible"
            :before-close="InitialClose"
            @open="InitialOpen"
            width="30%"
        >
            <el-form :model="Form" :rules="Rules" style="width: 100%" ref="Form">
                <el-form-item label="客户名称" :label-width="formLabelWidth" >
                    <span class="form-item-names">{{Form.customer_name}}</span>
                </el-form-item>
                <el-form-item label="项目名称" :label-width="formLabelWidth" >
                    <span class="form-item-names">{{Form.project_name}}</span>
                </el-form-item>
                <el-form-item label="销售类型" :label-width="formLabelWidth" prop="type">
                    <el-select v-model="Form.type">
                        <el-option v-for="(i,k) in Types" :key="k" :label="i.label" :value="i.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应收款金额" :label-width="formLabelWidth" prop="amountfor">
                    <el-input  v-model.trim="Form.amountfor" placeholder="请输入应收款金额"></el-input>
                </el-form-item>

                <el-form-item label="业务日期" :label-width="formLabelWidth" prop="date">
                    <el-date-picker
                        v-model="Form.date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        style="width: 100%"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                    <el-input  v-model.trim="Form.remark" placeholder="备注内容"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
	   			<el-button @click="InitialClose">取 消</el-button>
		    	<el-button type="primary" @click="submitForm">提 交</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Form: {
                    rid: "",
                    date: "",
                    type: 0,
                    remark: "",
                    customer_name: "",
                    project_name: "",
                    amountfor: 0
                },
                Rules: {
                    type: [
                        {required: true, message: '请选择类型',trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '请选择收款日期', trigger: 'blur'}
                    ],
                    amountfor: [
                        {required: true, message: '请录入金额', trigger: 'blur'},
                        {validator: this.onlyNumber, trigger: 'blur'}
                    ],
                },
                Types: [{label:"终端",value:0},{label:"同行",value:1}],
                formLabelWidth: "120px",
                defaultObj: {},
            }
        },
        created() {
            this.defaultObj = JSON.parse(JSON.stringify(this.Form));
        },
        methods: {
            InitialClose() {
                this.$store.dispatch("SetInitialList", {CurrentRow: this.row, update: false}).then(() => {
                    this.$store.dispatch('AlterTableConfig', {InitialVisible: false});
                    this.Form = Object.assign({},this.defaultObj);
                });
            },
            InitialOpen() {
                //如果是更新
                // if (this.SaleData.update == true) {
                //     let row = this.SaleData.CurrentRow;
                //     this.Form = Object.assign({},row);
                //     this.Form.project_name = this.row.project_name;
                //     this.Form.customer_name = this.row.customer_name;
                // }
                // else {
                //     //新增
                //     for (let i in this.Form) {
                //         if (typeof(this.row[i]) != 'undefined') {
                //             //this.Form[i] = this.row[i];
                //             this.Form = Object.assign({},this.row);
                //         }
                //     }
                // }

                for (let i in this.Form) {
                    if (typeof(this.row[i]) != 'undefined') {
                        this.Form[i] = this.row[i];
                    }
                }
                this.Form.rid = this.row.id;
                console.log(this.Form);
            },
            submitForm() {},
            onlyNumber(rule, value, callback) {
                let patt = /^[0-9\.\-]+$/;

                if (!patt.test(value)) {
                    callback(new Error('金额必须是数字'));
                } else {
                    callback();
                }
            },
        },
        computed:{
            visible: function () {
                return this.$store.state.user.ARTableConfig.InitialVisible;
            },
            row: function() {
                return this.$store.state.user.ARSumCurrentRow;
            },

            pickerOptions: function () {
                let row = this.$store.state.user.ARSumCurrentRow;
                if (row) {
                    return {
                        disabledDate(time) {
                            return time.getTime() > Date.now() && time.getTime() || time.getTime() <= row.payment_start_date * 1000;
                        },
                        shortcuts:
                            [{

                                text: '今天',
                                onClick(picker) {
                                    picker.$emit('pick', new Date());
                                }
                            },
                                {
                                    text: '昨天',
                                    onClick(picker) {
                                        const date = new Date();
                                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                                        picker.$emit('pick', date);
                                    }
                                },
                                {
                                    text: '一周前',
                                    onClick(picker) {
                                        const date = new Date();
                                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                        picker.$emit('pick', date);
                                    }
                                }]
                    };
                }
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
    .form-item-names
        font-size: 12px;
        color: red;
    .errmsg
        margin: 15px 0px 0px 0px;
        text-align: center;
        font-size: 12px;
        color: red;
</style>

