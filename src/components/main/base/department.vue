<template>
	<div class="wapper">
		<div class="content-box">
			<div class="tool">
				<el-button type="success" @click.native="showAddDialog = true" icon="el-icon-plus">添加部门</el-button>
			</div>
			<el-table
				
			    :data="tableData"
			    max-height="350"
			    
			    v-loading="tableLoading"
			    style="max-width: 100%;">
			    <el-table-column
			      prop="id"
			      label="序号">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="部门名称">
			    </el-table-column>
			     <el-table-column
			     	prop="user_name"
			      	label="负责人">
			     >
			     </el-table-column>
                <el-table-column
                    prop="assistants"
                    label="助理"
                >
                    <template slot-scope="scope">
                        <template v-for="(item,key) in scope.row.assistants">
                            <span v-if="key > 0">、</span>
                            <span>{{item.name}}</span>
                        </template>
                    </template>
                </el-table-column>
			    <el-table-column
			      prop=""
			      label="操作">
					<template slot-scope="scope">
				        <el-tooltip class="item" effect="dark" content="编辑" placement="top" >
				    		<el-button
					          size="mini"
					          icon="el-icon-edit"
					          type="success"
					          @click="handleEdit(scope.row)">
					        </el-button>
					    </el-tooltip>
					    <el-tooltip class="item" effect="dark" content="设置成员" placement="top" >
				    		<el-button
					          size="mini"
					          icon="el-icon-setting"
					          type="warning"
					          @click="handleSet(scope.row)">
					        </el-button>
					    </el-tooltip>
					    <el-tooltip class="item" effect="dark" content="设置管理" placement="top" >
				    		<el-button
					          size="mini"
					          type="primary"
					          @click="handleSetManager(scope.row)">
					          <i class="iconfont icon-jingli" style="font-size: 12px;"></i>
					        </el-button>
					    </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="设置助理" placement="top" >
                            <el-button
                                size="mini"
                                type="info"
                                @click="handleSetAssistant(scope.row)">
                                <i class="iconfont icon-jingli" style="font-size: 12px;"></i>
                            </el-button>
                        </el-tooltip>
				    </template>
			    </el-table-column>
			</el-table>
		</div>

		<el-dialog :title="edit == true ? '修改部门' :'添加部门'" :visible.sync="showAddDialog" center @close="edit = false">
			<el-form ref="form" status-icon :model="form" :rules="rules" class="el-form" label-width="80px" >
			  	<el-form-item label="部门名称" prop="name">
			    	<el-input v-model.trim="form.name" auto-complete="off"></el-input>
			  	</el-form-item>
			  	
			  	<el-form-item>
			    	<el-button type="primary" @click="onSubmit('form')" v-if="!edit">立即创建</el-button>
			    	<el-button type="primary" @click="onSubmit('form')" v-else>确定</el-button>
			  	</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog title="设置部门成员" :visible.sync="showSetStaffDialog"  center class="department-dialog">
			<div class="department-dialog-content" >
				<mu-flex class="select-control-row" :key="item.id" v-for="item in staff">
			    	<mu-checkbox :value="item.id" v-model="staffCheckbox" :label="item.name"></mu-checkbox>
			    </mu-flex>
			</div>
			<div class="foot">
				<el-button type="primary" @click="saveStaff">保存</el-button>
			</div>
		</el-dialog>

		<el-dialog title="设置部门管理者" :visible.sync="showSetManagerDialog"  center class="department-dialog">
			<div class="department-dialog-content" >
				<mu-flex class="select-control-row" :key="item.id" v-for="item in departmentStaff">
			    	<mu-radio :value="item.id" v-model="manager" :label="item.name"></mu-radio>
			    </mu-flex>
			</div>
			<div class="foot">
				<el-button type="primary" @click="saveManger">保存</el-button>
			</div>
		</el-dialog>

        <el-dialog title="设置部门助理" :visible.sync="showSetAssistantDialog"  center class="department-dialog">
            <div class="department-dialog-content" >
                <!--<mu-flex class="select-control-row" :key="item.id" v-for="item in departmentStaff">-->
                    <!--<mu-radio :value="item.id" v-model="manager" :label="item.name"></mu-radio>-->
                <!--</mu-flex>-->
                <el-checkbox-group v-model="AssistantLabels">
                    <el-checkbox v-for="(item,key) in departmentStaff" :label="item.name" :disabled="item.name == currentManager" :key="key"></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="foot">
                <el-button type="primary" @click="saveAssistant">保存</el-button>
            </div>
        </el-dialog>

	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			showAddDialog: false,
			showSetStaffDialog: false,
			showSetManagerDialog: false,
            showSetAssistantDialog: false,
			edit: false,
			tableLoading: true,
			form: {
				id: '',
				name: ''
			},
            AssistantLabels: [],
			rules: {
				name: [
					{required: true, trigger: 'blur', message: '名称不能为空'}
				]
			},
			staffCheckbox: [],
			currentDepartmentId: 0,
            currentManager: 0,
			manager: 0,
		}
	},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate( (valid) => {
				if (valid) {
					this.$store.dispatch(this.actionName, this.form).then(() => {
						if (this.result.status == 'success') {
							this.$notify.success({title: '操作成功'});
							this.showAddDialog = false;
							this.initTable();
							this.form.name = '';
						} else {
							this.$notify.error({title: '操作失败', message: this.result.error});
						}
					});
				}
			});
		},
		/**修改部门**/
		handleEdit(row) {
			this.form.name = row.name;
			this.form.id = row.id;
			this.showAddDialog = true;
			this.edit = true;

		},
		/**设置部门成员**/
		handleSet(row) {
			this.currentDepartmentId = row.id;
			this.showSetStaffDialog = true;
			this.initStaff(row.id);
		},
		/**部门管理者**/
		handleSetManager(row) {
			this.currentDepartmentId = row.id;
			this.showSetManagerDialog = true;
			this.initStaff(row.id);
		},
        /**设置助理 **/
        handleSetAssistant(row) {
            this.showSetAssistantDialog = true;
            this.currentDepartmentId = row.id;
            this.initStaff(row.id);
            this.currentManager = row.user_name;
            this.AssistantLabels = [];
            row.assistants.forEach((item) => {
                this.AssistantLabels.push(item.name);
            });
        },
		saveStaff() {
			this.$store.dispatch('departmentSetStaff', {departmentId: this.currentDepartmentId, list: this.staffCheckbox})
				.then(() => {

					if (this.$store.state.user.departmentSetStaff.status == 'success') {

						this.$notify.success({title: '操作成功'});

					} else {

						this.$notify.error({title: '操作失败', message: this.$store.state.user.departmentSetStaff.error});
					}

					this.showSetStaffDialog = false;
				});
		},
		saveManger() {
			this.$store.dispatch('departmentSetManager', {userId: this.manager, departmentId: this.currentDepartmentId}).then(() => {

				if (this.$store.state.user.departmentSetManager.status == 'success') {

					this.$notify.success({title: '操作成功'});
				
				} else {

					this.notify.error({title: '操作失败', error: this.$store.state.user.departmentSetManager.error});
				}

				this.showSetManagerDialog = false;
			});

		},
        saveAssistant() {
            let users = [];
            this.AssistantLabels.forEach((item) => {
               this.departmentStaff.forEach((it) => {
                   if (item == it.name)
                       users.push(it.id);
               });
            });

            if (users.length)
            {
                this.$store.dispatch("departmentSetAssistant",{users:users,department_id: this.currentDepartmentId}).then(() => {
                    let response = this.$store.state.user.departmentSetAssistant;

                    if (response.status == "success")
                    {
                        this.$notify.success("操作成功");
                        this.initTable();
                    }
                    else {
                        this.$notify.success("操作失败");
                    }

                    this.showSetAssistantDialog = false;
                });
            }
        },
		initTable() {
			this.$store.dispatch('departmentList').then(() => {
				this.tableLoading = false;
			})
		},

		//获取成员信息
		initStaff(id) {
			this.$store.dispatch('departmentStaff', {department_id: id}).then(() => {
				this.staffCheckbox = this.$store.state.user.departmentStaff.checked;
				this.managerRadio();
			})
		},
		managerRadio() {
			
			let department = this.$store.state.user.department_list;
			
			for (var i in department) {

				if (department[i].id == this.currentDepartmentId) {
					
					this.manager = department[i].user_id;
				}
			}

		}
	},
	created(){
		this.initTable();
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.department_list;
		},
		actionName: function () {

			if (this.edit) {

				return 'departmentModify';	
			} 
			
			return 'departmentCreate';
			
		},
		result: function () {

			if (this.edit) {

				return this.$store.state.user.departmentModify;
			}

			return this.$store.state.user.departmentCreate;
		},
		staff: function() {
			return this.$store.state.user.departmentStaff.data;
		},
		departmentStaff: function () {
			let list = this.$store.state.user.departmentStaff.data;
			let staff = [];

			for (let i in list) {

				for (let ii in this.staffCheckbox) {

					if (list[i].id == this.staffCheckbox[ii]) {
						staff.push(list[i]);
					}
				}
			}

			return staff;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="">
.wapper
	width: 100%;
	height: 100%;
	position: relative;
	&::-webkit-scrollbar
		width: 0px;
	.content-box
		width: 100%;
		position: relative;
		padding: 10px 30px;
		.tool
			padding: 20px 0px;
			text-align: left !important;
	.select-control-row
		animation: fadeIn ease 0.3s;
		margin-bottom: 5px;
		.mu-checkbox-wrapper
			transition: all 0.3s;
</style>
