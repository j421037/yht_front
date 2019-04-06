<template>
	<div class="filter-manager-wapper" >
		<el-dialog
		  title="销售应收"
		  :visible.sync="visible"
		  :before-close="SaleOrderClose"
		  @open="OpenSaleOrder"
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
		    	<el-form-item label="是否期初" :label-width="formLabelWidth" v-if="row.has_init" >
		    		<el-switch
					  v-model="Form.is_init"
					  active-color="#13ce66"
					  inactive-color="#ff4949">
					</el-switch>
		    	</el-form-item>
		    	
		  	</el-form>
		  	<p class="errmsg" v-if="error.status">{{error.msg}}</p>
		  	<span slot="footer" class="dialog-footer">
	   			<el-button @click="SaleOrderClose">取 消</el-button>
		    	<el-button type="primary" @click="submitForm">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	
	data() {
		return {
			ShowInit: true,
			formLabelWidth: '120px',
			Form: {
				id: '',
				cust_id: '',
				name: "",
				pid: '',
				project: "",
				date: '',
				is_init: true,
				amountfor: '',
				remark: ''
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
			},

			error: {
				status: false,
				msg: '请选择项目'
			}
		}
	},
	methods: {
		/**关闭**/
		SaleOrderClose() {
			this.$store.dispatch('AlterTableConfig', {SaleOrderVisible: false});
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
		OpenSaleOrder() {
			//如果是更新
			if (this.SaleData.update) {
				let row = this.SaleData.CurrentRow;

				this.Form.id = row.id;
				this.Form.amountfor = row.amountfor;
				this.Form.remark = row.remark;
				this.Form.date = row.date;
				this.Form.is_init = Boolean(row.is_init);
				this.Form.cust_id = this.row.cust_id;
				this.Form.project = this.row.project;
				this.Form.pid = this.row.pid;
				this.Form.name = this.row.name;
			}
			else {
				//新增
				for (let i in this.Form) {
					if (typeof(this.row[i]) != 'undefined') {
						this.Form[i] = this.row[i];
					}
				} 
			}
		},
		submitForm() {
			if (!this.Form.cust_id || !this.Form.pid) {
				this.error.msg = '项目或者客户不能为空！没有项目则请先创建项目';
				this.error.status = true;

				return false;
			}

			this.$refs['Form'].validate((valid) => {
				if (valid) {

					let action = 'AddReceivable';
					
					if (this.SaleData.update) {
						action = 'UpdateReceivable';
					}

					this.Form.is_init = Number(this.Form.is_init);

					this.$store.dispatch(action, this.Form).then(() => {
						let response = this.$store.state.user.AddReceivable;

						if (response.status == 'success') {
							this.$notify.success('操作成功');
							this.Form.amountfor = "";
							this.Form.remark = "";
							this.SaleOrderClose();
							this.$store.dispatch('GetSaleOrderList', {pid: this.Form.pid});
							//清空当前选择的行数据
							this.$store.dispatch('SetSaleOrderList', {CurrentRow:{}, update: false});
							//清空验证状态
							this.$refs['Form'].resetFields();
                            //更新当前行项目的信息
                            this.$store.dispatch('UpdateARSumCurrentRow',this.row.pid);
						} 
						else {
							this.$notify.error('操作失败!' + response.errmsg);
						}
					});
				}
			})
		}
	},
	computed: {
		visible: function() {
			return this.$store.state.user.ARTableConfig.SaleOrderVisible;
		},
		row: function() {
			return this.$store.state.user.ARSumCurrentRow;
		},
		SaleData: function() {
			return this.$store.state.user.SaleOrderList;
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
