<template>
	<div class="sale-list-wapper" >
		<el-table :data="tableData" border class="no-table-shadow" stripe  style="transition: all 0.5s" >
			<el-table-column type="index"  :index="indexMethod"></el-table-column>
			<el-table-column prop="amountfor_format" label="金额" width=150></el-table-column>
			<el-table-column prop="date" label="日期" width="100"></el-table-column>
			<el-table-column prop="type_name" label="类型" width="50"></el-table-column>
			<el-table-column prop="remark" label="备注" width="150">
				<template slot-scope="scope">
					<el-popover
					    placement="top-start"
					    title="备注"
					    width="200"
					    trigger="hover"
					    :content="scope.row.remark">
					    <span slot="reference" class="text-hidden">{{scope.row.remark}}</span>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="remark" label="操作" >
				<template slot-scope="scope">
					<el-button type="success" size="mini" v-if="Role.hasRole == true" @click.native="ShowUpdate(scope.row)">修改</el-button>
					<el-button type="danger"  size="mini" v-if="Role.hasRole == true" @click.native="removeRow(scope.row)">删除</el-button>
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
	props: {
		moduleName: {
			type: String
		}
	},
	data() {
		return {

		}
	},
	methods: {

	 	//修改应收信息
	 	ShowUpdate(row) {
	 		//设置当前行信息
	 		this.$store.dispatch(this.setActionName, {CurrentRow:row, update: true}).then(() => {
	 			this.$store.dispatch('AlterTableConfig', {SaleOrderVisible: true});
	 		});

	 	},
	 	//删除行
	 	removeRow(row) {

	 		this.$confirm('删除金额<'+row.amountfor+'>的记录, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {

	         	this.$store.dispatch('DeleteReceivable', {id:row.id}).then(() => {
	         		let response = this.$store.state.user.AddReceivable;

	         		if (response.status == 'success') {
	         			this.$notify.success('操作成功');
	         		}
	         		else {
	         			this.$notify.error('操作失败! ' + response.errmsg);
	         		}
	         		this.$store.dispatch('GetSaleOrderList', {pid: this.pid});
	         	});

	        }).catch(() => {

	        });
	 	},
	 	//表格索引
	 	indexMethod(val) {
	 		return ++val;
	 	}
	},

	computed: {
		tableData: function() {
			//console.log( this.$store.state.user.SaleOrder.list)
			return this.$store.state.user.SaleOrderList.data;
		},
		Role: function() {
			return this.$store.state.user.ARSumUserRole;
		},
		pid: function() {
			return this.$store.state.user.ARSumCurrentRow.pid;
		},
		getActionName: function() {
			return 'Get'+this.moduleName;
		},
		setActionName: function() {
			return 'Set'+this.moduleName;
		}
	},
	components: {
		'v-pagination': Pagination
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.sale-list-wapper
	width: 100%;
	height: 100%;
	position: relative;
	.table-pagination
		text-align: center;
		position: absolute;
		bottom: 0px;
		width: 100%;

</style>
