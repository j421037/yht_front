<template>
    <div class="receivebill-wappe">
        <el-dialog
		  	title="收款"
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
		    	<el-form-item label="收款金额" :label-width="formLabelWidth" prop="amountfor">
		    		<el-input  v-model.trim="Form.amountfor" placeholder="请输入收款金额"></el-input>
		    	</el-form-item>
		    	<el-form-item label="优惠金额" :label-width="formLabelWidth" prop="discount">
		    		<el-input  v-model.trim="Form.discount" placeholder="请输入收款金额"></el-input>
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
		   		<el-button @click="Close">取 消</el-button>
			    <el-button type="primary" @click.native="submitForm">提 交</el-button>
			</span>
		</el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formLabelWidth: '120px',
            Form: {
				id: "",
                rid: "",
                customer_name: "",
                project_name: "",
                amountfor: "",
                date: "",
                remark: "",
				discount: 0
            },
            Rules: {
				pid: [
					{required: true, message: '请选择项目',trigger: 'blur'}
				],
				date: [
					{required: true, message: '请选择收款日期', trigger: 'blur'}
				],
				amountfor: [
					{required: true, message: '请录入金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
				discount: [
					{required: true, message: '请录入优惠，如无优惠请默认0', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				]
			},
        }
    },
    methods: {
        /**关闭**/
		Close() {
			this.$store.dispatch('AlterTableConfig', {ReceivebillVisible: false});
		},

		Open() {
			this.Form.customer_name = this.row.customer_name;
			this.Form.project_name = this.row.project_name;
			this.Form.rid = this.row.id;

			if (this.BillData.update) {
				this.Form.id = this.BillData.CurrentRow.id;
				this.Form.amountfor = this.BillData.CurrentRow.amountfor;
				this.Form.date = this.BillData.CurrentRow.date;
				this.Form.remark = this.BillData.CurrentRow.remark;
				this.Form.discount = this.BillData.CurrentRow.discount;
			}
		},
        submitForm() {
			this.$refs['Form'].validate((valid) => {
				if (valid) {
					let action = 'AddReceivebill';

					if (this.BillData.update) {
						action = 'UpdateReceivebill';
					}

					this.$store.dispatch(action, this.Form).then(() => {
						let response = this.$store.state.user.AddReceivebill;

						if (response.status == 'success') {
							this.$notify.success('操作成功');
							this.Form.amountfor = "";
							this.Form.remark = "";
							this.Form.discount = 0;
							this.$store.dispatch('SetReceiveBillList', {update: false,CurrentRow:{}});
							this.$store.dispatch('GetReceiveBillList',{rid:this.Form.rid});
							this.$refs['Form'].resetFields();
                            //更新当前行项目的信息
                            this.$store.dispatch('UpdateARSumCurrentRow',this.row.id);
						}
						else {
							this.$notify.error('操作失败!' + response.errmsg);
						}

						this.Close();
 					});
				}
			});
		},

		/**数字验证规则**/
		onlyNumber(rule, value, callback) {
			let patt = /^[0-9\.\-]+$/;

			if (!patt.test(value)) {
				callback(new Error('金额必须是数字'));
			} else {
				callback();
			}
		},
    },
    computed: {
        visible: function() {
            return this.$store.state.user.ARTableConfig.ReceivebillVisible;
		},
		row: function() {
			return this.$store.state.user.ARSumCurrentRow;
		},
		BillData: function() {
			return this.$store.state.user.ReceiveBillList;
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
<style lang="stylus" rel="stylesheet/stylus" scoped>
.form-item-names
	font-size: 12px;
	color: red;
</style>



