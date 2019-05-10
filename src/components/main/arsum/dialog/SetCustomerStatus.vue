<template>
    <div class="change-customer-status">
        <el-dialog
		  title="客户状态"
		  :visible.sync="visible"
		  :before-close="Close"
          @open="Open"
		  width="30%"
		>
			<el-form :model="form" :rules="FormRules" ref="Form">
				<el-form-item label="客户名称" prop="name" :label-width="formLabelWidth">
					<span class="form-item-names">{{row.customer_name}}</span>
				</el-form-item>
				<el-form-item label="客户状态" prop="status" :label-width="formLabelWidth" >
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
    props: {

    },
    data() {
        return {
            formLabelWidth: '120px',
            form: {
                id: "",
                status: ""
            },
            FormRules: {
                id: [
                    {require: true, message: '请选择客户'}
                ],
				status: [
					{required: true, trigger: 'blur', message: '请选择客户状态'}
				]
			},
        };
    },
    computed: {
        visible: function() {
            return this.$store.state.user.ARTableConfig.ChangeCustVisible;
        },
        FormField: function() {

			return  this.$store.state.user.FIELDS;
		},
         row: function() {
			return this.$store.state.user.ARSumCurrentRow;
		},
    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        Close() {
            this.$store.dispatch('AlterTableConfig', {ChangeCustVisible: false});
        },
        Open() {
            this.form.id = this.row.id;
            let n = Number(this.row.status);

            if (n > 0) {
                this.form.status = n;
            }
        },
        submitForm() {

            this.$refs['Form'].validate((valid) => {

                if (valid) {
                    this.$store.dispatch('UpdateCustStatus', this.form).then(() => {
                        let response = this.$store.state.user.CustStatus;

                        if (response.status == 'success') {
                            this.$notify.success('操作成功');
                            this.form.id = "";
                            this.form.status = "";
                            this.$refs['Form'].resetFields();
                            this.$store.dispatch('ARSum', this.$store.state.user.filterQuery);
                        }
                        else {
                            this.$notify.error('操作失败');
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
