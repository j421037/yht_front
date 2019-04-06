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
					<span class="form-item-names">{{Form.name}}</span>
		    	</el-form-item>
		    	<el-form-item label="项目名称" :label-width="formLabelWidth" >
					<span class="form-item-names">{{Form.project}}</span>
		    	</el-form-item>
                <el-form-item label="标签" :label-width="formLabelWidth" >
                    <el-tag type="success">{{row.tag}}</el-tag>
                </el-form-item>
		    	<el-form-item label="退货金额" :label-width="formLabelWidth" prop="refund">
		    		<el-input  v-model.trim="Form.refund" placeholder="请输入退款金额"></el-input>
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
                name: "",
                project: "",
                refund: "",
                date: "",
                remark: "",
                pid: "",
				cust_id: "",
            },
            Rules: {
				pid: [
					{required: true, message: '请选择项目',trigger: 'blur'}
				],
				date: [
					{required: true, message: '请选择退货日期', trigger: 'blur'}
				],
				refund: [
					{required: true, message: '请录入金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
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
			this.Form.name = this.row.name;
			this.Form.project = this.row.project;
			this.Form.cust_id = this.row.cust_id;
			this.Form.pid = this.row.pid;

			if (this.RefundData.update) {
				this.Form.id = this.RefundData.CurrentRow.id;
				this.Form.refund = this.RefundData.CurrentRow.refund;
				this.Form.date = this.RefundData.CurrentRow.date;
				this.Form.remark = this.RefundData.CurrentRow.remark;
			}
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
                            
                            this.Form.refund = "";
                            this.Form.remark = "";

                            this.$store.dispatch('GetRefundList',{pid:this.Form.pid});
                            this.$store.dispatch('SetRefundList', {update: false, CurrentRow:{}});
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
