
<template>
	<div class="plan-list-wapper" >
		<el-table :data="tableData" border class="no-table-shadow">
			<el-table-column type="index"  :index="indexMethod"></el-table-column>
			<el-table-column prop="week" label="周" width=50></el-table-column>
			<el-table-column prop="date" label="计划日期" width=200></el-table-column>
			<el-table-column prop="content" label="计划内容" >
				<template slot-scope="scope">
					<el-popover
					    placement="top-start"
					    title="详细计划内容"
					    width="200"
					    trigger="hover"
					    :content="scope.row.content">
					    <span slot="reference" class="text-hidden">{{scope.row.content}}</span>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="操作" width="300">
				<template slot-scope="scope">
					<el-button type="success" size="mini" @click.native="update(scope.row)" style="margin-right:10px">编辑</el-button>
					<el-button type="danger" size="mini" @click.native="remove(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="table-pagination">
			<v-pagination :moduleName="moduleName" :actionName="getActionName" />
		</div>
	</div>
</template>
<script>
import Pagination from './pagination.vue';
export default {
	props:{
		moduleName: {
			type: String
		},

	},
	data() {
		return {
			// manageVisible: false
		}
	},
	methods: {
		indexMethod(index) {
			return ++index;
		},
		update(row) {
			this.$store.dispatch(this.setActionName, {CurrentRow: row, update: true}).then(() => {
				this.$store.dispatch('AlterTableConfig', {RecePlanVisible: true});
			});
		},
		remove(row) {
			this.$confirm('删除该收款计划？', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {

	         	this.$store.dispatch('deleteReceivablePlan', {id:row.id}).then(() => {
	         		let response = this.$store.state.user.AddReceivablePlan;

	         		if (response.status == 'success') {
	         			this.$notify.success('操作成功');
	         		}
	         		else {
	         			this.$notify.error('操作失败! ' + response.errmsg);
	         		}
	         		this.$store.dispatch(this.getActionName, {pid: this.pid});
	         	});

	        }).catch(() => {

	        });
		}
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.RecePlanList.data;
		},
		Role: function() {
			return this.$store.state.user.ARSumUserRole;
		},
		getActionName: function() {
			return 'Get'+this.moduleName;
		},
		setActionName: function() {
			return 'Set'+this.moduleName;
		},
		pid: function() {
			return this.$store.state.user.ARSumCurrentRow.pid;
		},
	},
	components: {
		'v-pagination': Pagination
    },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.plan-list-wapper
	width: 100%;
	height: 100%;
	position: relative;
	.table-pagination
			text-align: center;
			position: absolute;
			bottom: 0px;
			width: 100%;
</style>
