<template>
	<div class="filter-wapper">
		<section>
			<div class="button-group">
				<el-button type="primary" size="mini" @click.native="ShowDialog({FilterVisible:true})">过滤</el-button>
				<!--<el-dropdown>-->
					<!--<el-button type="success" size="mini">-->
						<!--新建<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
					<!--</el-button>-->
					<!--<el-dropdown-menu slot="dropdown" >-->
						<!--<el-dropdown-item @click.native="ShowDialog({CreateCustVisible:true})">新建客户</el-dropdown-item>-->
						<!--<el-dropdown-item @click.native="ShowDialog({CreateProVisible:true})">新建项目</el-dropdown-item>-->
						<!--<el-dropdown-item @click.native="ShowDialog({ImportVisible:true})">批量导入客户</el-dropdown-item>-->
						<!--<el-dropdown-item @click.native="ShowDialog({CreatePotentialProVisible:true})">新建潜在项目</el-dropdown-item>-->
					<!--</el-dropdown-menu>-->
				<!--</el-dropdown>-->
				<!--<el-button type="warning" size="mini" @click.native="Initialization">初始化</el-button>-->
			</div>
			<div class="fast-query">
				<el-input placeholder="快速查询你需要的内容"  v-model="form[0].value" class="input-with-select">
					<el-select v-model="form[0].field" slot="prepend" placeholder="请选择">
						<el-option label="客户名称" value="cust_id"></el-option>
						<el-option label="旗下项目" value="pid"></el-option>
					</el-select>
					<el-button slot="append" icon="el-icon-search" @click.native="querySearch"></el-button>
				</el-input>
			</div>
		</section>
		<section class="action-tool">
			<el-radio-group v-model="tabPosition"  @change="tabHandle" style="margin-left: -80px;">
				<!--<el-radio-button label="cooperate" >合作客户</el-radio-button>-->
				<!--<el-radio-button label="target"   >目标客户</el-radio-button>-->
			</el-radio-group>
			<div class="checkbox-group" v-if="this.tabPosition == 'cooperate'">
				<el-checkbox v-model="config.sale" @change="checkBoxHandle">销售额</el-checkbox>
				<el-checkbox v-model="config.receive" @change="checkBoxHandle">回款</el-checkbox>
				<el-checkbox v-model="config.balance" @change="checkBoxHandle">欠款</el-checkbox>
				<el-checkbox v-model="config.init" @change="checkBoxHandle">期初</el-checkbox>
			</div>
		</section>
	</div>
</template>
<script>
export default{
	data() {
		return {
			tabPosition: 'cooperate',
			config: {
				sale: true,
				receive: false,
				balance: false,
				init: false
			},
			form: [
				{
					field: "cust_id",
					value: "",
					operator: 8,
					logic: 1
				}
			]
		}
	},
	methods: {
		init: function() {
			this.setTable();
		},
		setTable: function() {
			this.$store.dispatch('SetARTable', this.tabPosition);
		},
		tabHandle(tab) {
			this.setTable();
		},
		checkBoxHandle() {
			this.$store.dispatch('AlterTableConfig', this.config);
		},
		ShowDialog(obj) {
			this.$store.dispatch('AlterTableConfig', obj);
		},
		//调试初始化
		Initialization() {
			this.$confirm('该操作会清空所以数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch('ARSumInitialization').then(() => {
					let ARSumInitialization = this.$store.state.user.ARSumInitialization;

					if (ARSumInitialization.status == 'success') {
						this.$notify.success('操作成功');
					}
					else {
						this.$notify.error('操作失败');
					}

					this.$store.dispatch('ARSum', this.$store.state.user.filterQuery);
				});
			}).catch(() => {

			});
		},
		querySearch() {
			this.$store.dispatch('updateFilterQueryParam', {conf: this.form, initialization: false}).then(() => {
				this.$store.dispatch('ARSum', this.$store.state.user.filterQuery);
			});
		}
	},
	created() {
		this.init();
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.filter-wapper
	width: 100%;
	position: relative;
	display: flex;
	section
		flex: 1;
		display:flex;
		position: relative;
		.button-group
			// flex-basis: 230px;
			// max-width: 230px;
			margin-right: 15px;
		.fast-query
			width:350px;
	.action-tool
		display: flex;
		justify-content: space-between;
		.checkbox-group
			display: flex;
			align-items: center;

</style>
