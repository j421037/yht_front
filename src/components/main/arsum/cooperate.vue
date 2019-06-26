<!--合作客户-->
<template>
	<div class="cooperate-wallper">
		<el-table
			border
			class="ar-table"
			:style="{'margin-top': '15px','font-size': fontSize}"
			v-loading="tableLoading"
			:data="tableData"
			:height="height"
			:expand-row-keys="expands"
			:row-key="getRowKeys"
			highlight-current-row
			@row-click="rowClick"
			@expand-change="expandChange"
			v-if="DomRefresh"
		>
			<el-table-column type="expand" v-show="false" width="-1">
				<template slot-scope="scope" v-if="scope.row.rowkey == expands[0]">
					<div class="row-expand">
						<div class="expand-button">
							<el-button-group>
								<el-button type="info" size="mini" icon="el-icon-sold-out" @click.native="OpenSaleOrderDialog" v-if="Role.hasRole">添加销售</el-button>
								<el-button type="info" size="mini" icon="el-icon-check" @click.native="OpenReceivebillOrderDialog" v-if="Role.hasRole">添加收款</el-button>
								<el-button type="info" size="mini" icon="el-icon-sort" @click.native="OpenRefundOrderDialog" v-if="Role.hasRole">添加退货</el-button>
                                <el-button type="info" size="mini" icon="el-icon-time" @click.native="OpenInitialDialog" v-if="Role.hasRole">设置期初</el-button>
								<el-button type="info" size="mini" icon="el-icon-star-on" @click.native="OpenRecePlanDialog" v-if="user.id == scope.row.user_id">收款计划</el-button>
								<el-button type="info" size="mini" icon="el-icon-service" @click.native="OpenChangeCusDialog" v-if="user.id == scope.row.user_id">设置状态</el-button>
							</el-button-group>
						</div>

						<el-tabs type="border-card" v-if="scope.row.rowkey == expands[0] " @tab-click="tabClick" style="transition: all 0.5s;height: 370px;position: relative;">
							<el-tab-pane v-for="(item, key) in Tabs" :key="key" :label="item.name"   style="height: 300px;position:relative;">
								<component v-if="tabVisible == true" v-bind:is="item.component" :moduleName="item.moduleName" ></component>
							</el-tab-pane>
						</el-tabs>

					</div>
				</template>
			</el-table-column>
			<el-table-column prop="id" fixed="left" label="展开" width="50">
				<template slot-scope="scope">
					<i class="el-icon-arrow-right el-icon-arrow-rotate-leave" :class="{'el-icon-arrow-rotate-active': scope.row.id == ActiveId}"></i>
				</template>
			</el-table-column>
			<el-table-column prop="rowkey" label="rowKey" v-if="false">
				<template slot-scope="scope" ></template>
			</el-table-column>
			<el-table-column prop="status_name" v-if="ColumnVisible.status_name.value" label="状态" fixed="left" width="80">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.nameshow == true && scope.row.status_name == '平稳'">平稳</el-tag>
					<el-tag type="warning" v-if="scope.row.nameshow == true && scope.row.status_name == '衰减'">衰减</el-tag>
					<el-tag type="info" v-if="scope.row.nameshow == true && scope.row.status_name == '流失'">流失</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="department" label="部门名称" fixed="left" width="80" v-if="ColumnVisible.department.value"></el-table-column>
			<el-table-column prop="customer_name" label="客户名称" fixed="left" min-width="250" >
				<template slot-scope="scope" v-if="scope.row.nameshow==true">
					<el-tooltip effect="dark" :content="scope.row.customer_name" placement="top">
						<a class="tip" style="color:#ff4081" :style="{'font-size': fontSize}">{{scope.row.customer_name}}</a>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="project_name" label="项目名称" fixed="left" min-width="250" >
				<template slot-scope="scope" >
					<el-tooltip effect="dark" :content="scope.row.project_name" placement="top">
						<span  class="tip " :style="{'font-size': fontSize}">{{scope.row.project_name}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="attached" label="挂靠" fixed="left" width="50" v-if="ColumnVisible.affiliate.value">
				<template slot-scope="scope" v-if="scope.row.attached > 0">
					是
				</template>
			</el-table-column>
			<el-table-column prop="user_name" label="业务员"  fixed="left"   width="120" v-if="ColumnVisible.user_name.value"></el-table-column>
            <el-table-column prop="balance_total" label="欠款" fixed="left" width="180"></el-table-column>
            <el-table-column prop="overdue" label="逾期"  width="80" v-if="ColumnVisible.overdue.value">
                <template slot-scope="scope">
                    <el-tooltip v-if="scope.row.overdue" effect="dark" :content="'上次回款日期:'+scope.row.lastback_date" placement="top">
                        <span  :style="overdueStyle">{{scope.row.overdue}}天</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="account_period" label="账期" width="80" v-if="ColumnVisible.payment_days.value">
                <template slot-scope="scope">
                    <span v-if="scope.row.account_period">{{scope.row.account_period}}天</span>
                </template>
            </el-table-column>
            <el-table-column prop="work_scope_name" label="施工范围"  v-if="ColumnVisible.protype.value"></el-table-column>
            <el-table-column prop="contract" label="合同"   width="100" v-if="ColumnVisible.agreement.value">
                <template slot-scope="scope">
                    <a
                        v-if="scope.row.contract"
                        :href="$appConst.BACKEND_DOMAIN_VIEW_URL + '?id=' + scope.row.contract +'&token='+$store.state.user.token"
                        target="_blank"
                    >查看</a>
                </template>
            </el-table-column>
            <el-table-column prop="tax" label="税率"   width="80" v-if="ColumnVisible.tax.value">
                <template slot-scope="scope">
                    <span v-if="scope.row.tax > 0">{{scope.row.tax}}</span>
                </template>
            </el-table-column>
			<el-table-column prop="coop_amount" label="合作金额"   v-if="ColumnVisible.cooperation_amountfor.value" >
                <el-table-column label="期初" width="180" prop="initial_total"></el-table-column>
                <el-table-column label="终端" width="180" prop="client_total"></el-table-column>
                <el-table-column label="同行" width="180" prop="colleague_total"></el-table-column>
				<el-table-column label="合计" width="180">
                    <template slot-scope="scope">
                        {{scope.row.coop_total}}
                    </template>
                </el-table-column>
			</el-table-column>
			<el-table-column prop="id" label="类型">
				<template slot-scope="scope">
					<div class="month-td" v-if="initAmount">期初</div>
					<div class="month-td" v-if="sale">销售</div>
					<div class="month-td" v-if="receive">回款</div>
                    <div class="month-td" v-if="refund">退货</div>
					<div class="month-td" v-if="balance">欠款</div>
				</template>
			</el-table-column>
			<el-table-column label="明细" >
				<el-table-column  v-for="(item, key) in month" :key="key" :label="item" width="120">
					<template slot-scope="scope">
						<span v-for="(it, mk) in scope.row.monthly" :key="mk" v-if="key+1 == mk">
							<div class="month-td"  v-if="initAmount">{{it.initial}}</div>
							<div class="month-td"  v-if="sale">{{it.sales}}</div>
							<div class="month-td"  v-if="receive">{{it.backs}}</div>
                            <div class="month-td"  v-if="refund">{{it.refunds}}</div>
							<div class="month-td"  v-if="balance">{{it.balances}}</div>
						</span>
					</template>
				</el-table-column>
			</el-table-column>
		</el-table>
		<div class="cooperate-pagination">
			<el-pagination
				small
				background
				:layout="pagination.layout"
				:page-sizes="pagination.pagesizes"
				:page-size="pageSize"
				:total="total"
				:current-page="currentPage"
				@current-change="pageChange"
				@size-change="sizeChange"
				v-if="total > 0"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script>
import AppConst from '@/util/appConst.js';
import SaleOrderList from './tabs/SaleOrderList.vue';
import ReceivebillList from './tabs/ReceivebillList.vue';
import DiscountList from './tabs/DiscountList.vue';
import RefundList from './tabs/RefundList.vue';
import RecePlanList from './tabs/RecePlanList.vue';
import Report from './tabs/Report';
import InitialList from "./tabs/InitialList";

export default{
	data() {
		return {
			height: "calc(100% - 35px - 100px)",
			pageSize: 10, //一页显示多少
			currentPage: 1,
			month:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			query: {
				conf: [],
				offset: 0,
				limit: 10,
                sortval: 0,
				initialization: true,
				type: 1
			},
			expands: [],
			Tabs: [
				{name: '销售明细', component: SaleOrderList,moduleName: "SaleOrderList",needInit: true},
				{name: '收款明细', component: ReceivebillList, moduleName: "ReceiveBillList",needInit: true},
				{name: '退货明细', component: RefundList, moduleName: "RefundList",needInit: true},
                {name: '期初余额', component: InitialList, moduleName: "InitialList",needInit: true},
				{name: '收款计划', component: RecePlanList,moduleName: "RecePlanList",needInit: true},
                {name: '数据报表', component: Report,moduleName: "Report", needInit: false}
			],
            overdueStyle: {color: 'red',cursor:'pointer'},
			CurrentRow: {},
			ActiveId: 0,
			DomRefresh: true,
            tabVisible: true
		}
	},
	methods: {
		init() {
			this.updateFilterQuery();
			this.$store.dispatch('ARSum', this.query).then(() => {
				this.initialization = false;
			});
			this.$store.dispatch('InitPagination');
		},
		reloadTable() {
			this.updateFilterQuery();
            this.$store.dispatch('ARSum', this.query);
		},
		indexMethod(index) {

			return ++index;
		},
		rowClick(row, column, event) {
			if (column.label == '展开') {
                //console.log(row)
				let temp = this.expands;
				this.expands = [];

				if ( temp[0] != row.rowkey ) {
					this.expands.push(row.rowkey);
					this.activeRow(row);
					this.ActiveId = row.id;
				}
				else {
                    this.ActiveId = 0;
				}

			}

		},
		getRowKeys(row) {

			return row.rowkey;
		},
		expandChange(data,expandedRows) {
			//控制只显示当前行
	    	if (expandedRows.length) {
	         	this.expands = [];
	        	if (data) {
	          		this.expands.push(data.rowkey);
	          		this.activeRow(data);
	        	}
			}
			else {
	        	this.expands = [];
			}
			this.CurrentRow = data;
		},
		activeRow(row) {
            this.CurrentRow = row;
			this.$store.dispatch('ARSumCurrentRow', row);
			this.$store.dispatch('Get'+this.Tabs[0].moduleName,{rid:row.id});
		},
		updateFilterQuery() {
			this.$store.dispatch('updateFilterQuery', this.query);
		},
		updateFilterQueryParam() {
			this.$store.dispatch('updateFilterQueryParam', {type: 1}).then(() => {
			});
		},
		OpenSaleOrderDialog() {
			this.$store.dispatch('AlterTableConfig', {SaleOrderVisible: true});
		},
		OpenReceivebillOrderDialog() {
			this.$store.dispatch('AlterTableConfig', { ReceivebillVisible: true});
		},
        OpenInitialDialog() {
            this.$store.dispatch('AlterTableConfig', { InitialVisible: true});
        },
		OpenRefundOrderDialog() {
			this.$store.dispatch('AlterTableConfig', { RefundVisible: true});
		},
		OpenRecePlanDialog() {
			this.$store.dispatch('AlterTableConfig', { RecePlanVisible: true});
		},
		OpenChangeCusDialog() {
			this.$store.dispatch('AlterTableConfig', { ChangeCustVisible: true});
		},
		pageChange(pageNow) {
			this.currentPage = pageNow;
			this.query.offset = (pageNow - 1) * this.query.limit;
			this.reloadTable();
		},
		sizeChange(pageSize) {
			this.query.limit = pageSize;
			this.pageChange(this.currentPage);
			//this.reloadTable();
		},
		/**预览合同附件 */
		OpenViewWindow(id) {
			window.open(AppConst.BACKEND_DOMAIN_VIEW_URL+"?id="+id+"&token="+this.$store.state.user.token, new Date().getTime(),'width=800,height=500');
		},
        //tab切换时的事件函数
        tabClick(tab) {
            this.Tabs.forEach((item) => {
                //init
                if (item.name == tab.label && item.needInit === true) {
                    if (!this.$store.state.user[item.moduleName].ready) {
                       this.$store.dispatch('Get'+item.moduleName, {rid:this.CurrentRow.id});
                    }
                }
            });
            // 重绘
            this.tabVisible = false;
            this.$nextTick(() => {
                this.tabVisible = true;
            });
        },
	},
	created() {
		this.init();
	},
	activated() {
		this.updateFilterQueryParam();
	},

	computed: {
		tableData: function() {
			return this.$store.state.user.ARSum;
		},
		tableLoading: function() {
			return this.$store.state.user.ARSumLoading;
		},
		sale: function() {
			return this.$store.state.user.ARTableConfig.sale;
		},
        refund: function() {
            return this.$store.state.user.ARTableConfig.refund;
        },
		receive: function() {
			return this.$store.state.user.ARTableConfig.receive;
		},
		balance: function() {
			return this.$store.state.user.ARTableConfig.balance;
		},
		initAmount: function() {
			return this.$store.state.user.ARTableConfig.init;
		},
		Role: function() {
			return this.$store.state.user.ARSumUserRole;
		},
		user: function() {
			return this.$store.state.user.userInfo;
		},
		pagination: function() {

			return this.$store.state.user.BasePagination;
		},
		total: function() {
			return this.$store.state.user.ARSumTotal;
		},
		ColumnVisible: function() {
			return this.$store.state.user.ARTableConfig.ColumnVisible;
		},
		fontSize: function() {
			this.DomRefresh = false;
			let FontSize = this.$store.state.user.ARTableConfig.FontSize;

			if (FontSize && typeof(FontSize) != 'undefined' ) {

				this.$nextTick(() => {
					this.DomRefresh = true;
				});
			}

			return FontSize + 'px';
		}
	},

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.cooperate-wallper
	width: 100%;
	height: 100%;
	position: relative;

	.ar-table
		width: 100%;
		height: 100%;
		position: relative;
		.month-td
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1px solid #ddd;
		td .month-td:nth-child(2)
			padding: 2px 0px;
		td .month-td:nth-last-child(1)
			border: 0px;
		td .stripe
			background: #ccc;
		.tip
			font-size: 12px;
			cursor:pointer;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		.row-expand
			padding: 15px;
			max-width: 850px;
			position:relative;
			.expand-button
				margin-bottom: 15px;
	.cooperate-pagination
		margin-top: 20px;
		text-align: center;
	.el-icon-arrow-rotate-leave
		transition: all 0.3s ;
		transform: rotate(0deg);
	.el-icon-arrow-rotate-active
		transition: all 0.3s ;
		transform: rotate(90deg);
</style>
