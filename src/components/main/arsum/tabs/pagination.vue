<template>
	<el-pagination
	  	small
	  	background
	  	:layout="pagination.layout"
	  	:page-sizes="[5]"
	  	:total="total"
		@current-change="handleCurrentChange"
		v-if="total > 0"
	  >
	</el-pagination>
</template>
<script>
export default {
	props: {
		moduleName: {
			//该变量标识每个tab表格对应vuex index.js中的变量
			type: String,
		},
		actionName: {
			//该变量标识每个tab表格对应vuex action.js中的方法名
			type: String
		}
	},
	data() {
		return {
			limit: 5,
			offset: 0
		}
	},
	methods: {
		// /**初始化分页配置**/
		// // InitPagination() {
		// 	this.$store.dispatch('InitPagination').then(() => {
		// 		//拉取数据
		// 		// this.LoadTableData();
		// 	});
		// // },
		//读取分页数据
		LoadTableData() {
		    console.log(this.actionName);
			this.$store.dispatch(this.actionName, {pid: this.pid,limit: this.limit, offset: this.offset});
		},
		//当前分页切换
		handleCurrentChange(val) {
			this.offset = (val - 1) * this.limit;

			this.LoadTableData();
		}
	},
	created() {
		//this.LoadTableData();
	},

	computed: {
		pagination: function() {
			return this.$store.state.user.BasePagination;
		},
		pid: function() {
			return this.$store.state.user.ARSumCurrentRow.pid;
		},
		total: function() {
			return this.$store.state.user[this.moduleName].pagination.total;
		}
	}
}
</script>
