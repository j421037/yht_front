<template>
    <div class="refund-dialog-wapper">
        <el-dialog
            title="退货"
		    :visible.sync="visible"
		    :before-close="Close"
		    @open="Open"
		    width="30%"
        >
            <el-form :model="Form" :rules="Rules" style="width: 100%" ref="Form">
		  		<el-form-item label="客户名称" :label-width="formLabelWidth" >
					<span class="form-item-names">{{Form.customer_name}}</span>
		    	</el-form-item>
		    	<el-form-item label="项目名称" :label-width="formLabelWidth" >
					<span class="form-item-names">{{Form.project_name}}</span>
		    	</el-form-item>
                <el-form-item label="退货类型" :label-width="formLabelWidth" prop="type">
                    <el-select v-model="Form.type">
                        <el-option v-for="(i,k) in Types" :key="k" :label="i.label" :value="i.value"></el-option>
                    </el-select>
                </el-form-item>
		    	<el-form-item label="退货金额" :label-width="formLabelWidth" prop="amountfor">
		    		<el-input  v-model.trim="Form.amountfor" placeholder="请输入退款金额"></el-input>
		    	</el-form-item>

		    	<el-form-item label="退货日期" :label-width="formLabelWidth" prop="date">
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
		   		<el-button @click="Close">取 消</el-button>
			    <el-button type="primary" @click.native="submitForm">提 交</el-button>
			</span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            formLabelWidth: '120px',
            Form: {
                id: "",
                customer_name: "",
                project_name: "",
                amountfor: "",
                date: "",
                remark: "",
                rid: "",
                type: 0
            },
            Rules: {
				rid: [
					{required: true, message: '请选择项目',trigger: 'blur'}
				],
				date: [
					{required: true, message: '请选择退货日期', trigger: 'blur'}
				],
				amountfor: [
					{required: true, message: '请录入金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
                type: [
                    {required: true, message: "请选择类型",trigger: "blur"}
                ]
			},
			pickerOptions: {
				disabledDate(time) {
	            	return time.getTime() > Date.now();
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
			},
            Types: [{label:"终端",value:0},{label:"同行",value:1}],
            defaultObj: {}
        };
    },
    computed: {
        visible: function() {
            return this.$store.state.user.ARTableConfig.RefundVisible;
        },
        row: function() {
			return this.$store.state.user.ARSumCurrentRow;
		},
		RefundData: function() {
			return this.$store.state.user.RefundList;
		}
    },
    created() {
        this.defaultObj = JSON.parse(JSON.stringify(this.Form));
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        Close() {
            this.$store.dispatch('AlterTableConfig', {RefundVisible: false});
        },

		Open() {

			if (this.RefundData.update) {
				this.Form = Object.assign({},this.RefundData.CurrentRow);
			}

            this.Form.customer_name = this.row.customer_name;
            this.Form.project_name = this.row.project_name;
            this.Form.rid = this.row.id;
		},
        onlyNumber(rule, value, callback) {
			let patt = /^[0-9\.\-]+$/;

			if (!patt.test(value)) {
				callback(new Error('金额必须是数字'));
			} else {
				callback();
			}
		},
        submitForm() {
            this.$refs['Form'].validate((valid) => {

                if (valid) {
                    let action = 'RefundAdd';

                    if (this.RefundData.update) {
                        action = 'RefundUpdate';
                    }

                    this.$store.dispatch(action, this.Form).then(() => {
                        let response = this.$store.state.user.RefundAdd;

                        if (response.status == 'success') {
                            this.$notify.success('操作成功');
                            this.$refs['Form'].resetFields();

                            this.$store.dispatch('GetRefundList',{rid:this.Form.rid});
                            this.$store.dispatch('SetRefundList', {update: false, CurrentRow:{}});
                            this.Form = Object.assign({}, this.defaultObj);
                        }
                        else {
                            this.$notify.error('操作失败!'+response.errmsg);
                        }

                        this.Close();
                    });
                }
            });
        }
    },
    components: {

    },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.form-item-names
	font-size: 12px;
	color: red;
</style>
