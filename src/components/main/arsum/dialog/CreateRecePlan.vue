<template>
    <div class="receplan-wapper">
        <el-dialog
            title="收款计划"
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
		    	<el-form-item label="收款计划" :label-width="formLabelWidth" prop="content">
		    		<el-input type="textarea" :rows="3"  v-model.trim="Form.content" placeholder="请输入计划内容"></el-input>
		    	</el-form-item>

		    	<el-form-item label="周期" :label-width="formLabelWidth" prop="date">
					<el-date-picker
				      	v-model="Form.date"
				      	type="week"
					    format="yyyy 第 WW 周"
					    placeholder="选择周"
                        :picker-options="{firstDayOfWeek: 1}"

				    >
				    </el-date-picker>
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
                rid: "",
                content: "",
                date: ""
            },
            Rules: {
				pid: [
					{required: true, message: '请选择项目',trigger: 'blur'}
				],
				date: [
					{required: true, message: '请选择收款日期', trigger: 'blur'}
				],
				content: [
					{required: true, message: '请输入计划内容', trigger: 'blur'},
				]
			},

        };
    },
    computed: {
        visible: function() {
            return this.$store.state.user.ARTableConfig.RecePlanVisible;
        },
        row: function() {
			return this.$store.state.user.ARSumCurrentRow;
		},
		RecePlanData: function() {
			return this.$store.state.user.RecePlanList;
		}
    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        Open() {
            this.Form.customer_name = this.row.customer_name;
			this.Form.project_name = this.row.project_name;
			this.Form.rid = this.row.id;

			if (this.RecePlanData.update) {
				this.Form.id = this.RecePlanData.CurrentRow.id;
				this.Form.content = this.RecePlanData.CurrentRow.content;
			}
        },
        Close() {
            this.$store.dispatch('AlterTableConfig', {RecePlanVisible: false});
        },
        submitForm() {
            this.$refs['Form'].validate((valid) => {
                if (valid) {

                    let action = 'AddReceivablePlan';

                    if (this.RecePlanData.update) {
                        action = 'updateReceivablePlan';
                    }

                    this.$store.dispatch(action, this.Form).then(() => {
                        let response = this.$store.state.user.AddReceivablePlan;
                        console.log(response);
                        if (response.status == 'success') {
                            this.$notify.success('操作成功');
                            this.Form.content = "";
                            this.$refs['Form'].resetFields();
                            this.$store.dispatch('SetRecePlanList', {update: false, CurrentRow: {}});
                            this.$store.dispatch('GetRecePlanList', {rid:this.Form.rid});
                            this.Close();
                        }
                        else {
                            this.$notify.error('操作失败!'+ response.errmsg);
                        }
                    });
                }
            })
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
