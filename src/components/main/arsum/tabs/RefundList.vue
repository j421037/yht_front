<template>
	<div class="refund-list-wapper" >
		<el-table :data="tableData" border class="no-table-shadow">
			<el-table-column type="index"  :index="indexMethod"></el-table-column>
			<el-table-column prop="amountfor" label="退款金额"></el-table-column>
			<el-table-column prop="date" label="业务日期" width=100></el-table-column>
            <el-table-column prop="type" label="类型" width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 0 ">终端</span>
                    <span v-if="scope.row.type == 1">同行</span>
                </template>
            </el-table-column>
			<el-table-column prop="remark" label="备注" width=150>
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
			<el-table-column prop="id" label="操作" >
				<template slot-scope="scope">
					<el-button type="success" size="mini" v-if="Role.hasRole == true" @click.native="update(scope.row)">修改</el-button>
					<el-button type="danger" size="mini" v-if="Role.hasRole == true" @click.native="remove(scope.row)">删除</el-button>
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

		}
	},
	methods: {
		indexMethod(index) {
			return ++index;
		},
		update(row) {

			this.$store.dispatch(this.setActionName, {CurrentRow: row, update: true}).then(() => {
				this.$store.dispatch('AlterTableConfig', {RefundVisible: true});
			});
		},
		remove(row) {
			this.$confirm('删除金额<'+row.amountfor+'>的记录, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {

	         	this.$store.dispatch('RefundDelete', {id:row.id}).then(() => {
	         		let response = this.$store.state.user.RefundAdd;

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
			return this.$store.state.user.RefundList.data;
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
	},
	components: {
		'v-pagination': Pagination
    },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.refund-list-wapper
	width: 100%;
	height: 100%;
	position: relative;
	.table-pagination
		text-align: center;
		position: absolute;
		bottom: 0px;
		width: 100%;
</style>
