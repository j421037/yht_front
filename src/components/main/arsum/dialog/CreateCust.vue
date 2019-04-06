<template>
	<div class="filter-manager-wapper" v-if="visible">
		<el-dialog
		  title="客户"
		  :visible.sync="visible"
		  :before-close="Close"
		  width="30%"
		>
			<el-form :model="form" :rules="FormRules" ref="CreateForm">
				<el-form-item label="客户名称" prop="name" :label-width="formLabelWidth">
					<el-input v-model.trim="form.name"></el-input>
				</el-form-item>
				<el-form-item label="客户类型" prop="type" :label-width="formLabelWidth">
					<el-select v-model="form.type" @change="CustypeChange">
						<el-option
							v-for="(item, key) in custype"
							:label="item.label"
							:value="item.value"
							:key="key"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户状态" prop="status" :label-width="formLabelWidth" v-if="CustypeStatus">
					<el-select v-model="form.status">
						<el-option
							v-for="(item, key) in FormField.F_CMK_CUSTATUS"
							:label="item.label"
							:value="item.value"
							:key="key"
						></el-option>
					</el-select>
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
			formLabelWidth: '100px',
			CustypeStatus: true,
			form: {
				name: "",
				status: "",
				tag: "",
				type: 1
			},
			FormRules: {
				name: [
					{required: true, trigger: 'blur', message: '请输入客户名称'}
				],
				type: [
					{required: true, trigger: 'blur', message: '请选择客户类型'}
				],
				tag: [
					{required: true, trigger: 'blur', message: '请选择客户标签'}
				],
                status:[
                    {required: true, trigger: 'blur', message: '请选择客户状态'}
                ]
			},
			custype: [
				{label: "合作客户", value: 1},
				{label: "目标客户", value: 0}
			],
		}
	},
	methods: {
		/**关闭**/
		Close() {
			this.$store.dispatch('AlterTableConfig', {CreateCustVisible: false});
		},
		submitForm() {
			this.$refs['CreateForm'].validate((valid) => {

				if (!valid) {
					return false;
				} 

				this.$store.dispatch("AddMyCustomer", this.form).then(() => {
					let response = this.$store.state.user.AddMyCustomer;

					if (response.status == 'success') {
						this.Close();
						this.resetForm('CreateForm');
						this.$notify.success('客户添加成功！');
						this.updateTable();
						this.CustypeStatus = true;
					} else {
						this.$notify.error('客户添加失败, '+response.errmsg);
					}
				})
			})
		},
		CustypeChange() {
			this.CustypeStatus = !this.CustypeStatus;
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		updateTable() {
			let filterQuery = this.$store.state.user.filterQuery;

			this.$store.dispatch('ARSum', filterQuery);
		},
	},
	computed: {
		visible: function() {
			return this.$store.state.user.ARTableConfig.CreateCustVisible;
		},
		FormField: function() {
			return  this.$store.state.user.FIELDS;;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
</style>
