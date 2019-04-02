<template>
	<div>
		<el-tabs type="border-card">
		  	<el-tab-pane label="销售明细"><v-sale-list /></el-tab-pane>
		  	<el-tab-pane label="收款明细"><v-receivebill-list /></el-tab-pane>
		  	<el-tab-pane label="优惠明细"><v-discount-list /></el-tab-pane>
		  	<el-tab-pane label="退货明细"><v-refund-list /></el-tab-pane>
		  	<el-tab-pane label="收款计划"><v-receplan-list /></el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import SaleList from './SaleOrderList.vue';
import ReceivebillList from './ReceivebillList.vue';
import DiscountList from './DiscountList.vue';
import RefundList from './RefundList.vue';
import RecePlanLsit from './RecePlanLsit.vue';


export default {
	
	data() {
		return {
			// manageVisible: false
		}
	},
	methods: {
	 
	},
	computed: {
		
	},
	components: {
		'v-sale-list': SaleList,
		'v-receivebill-list': ReceivebillList,
		'v-discount-list': DiscountList,
		'v-refund-list': RefundList,
		'v-receplan-list': RecePlanLsit,
        'v-report': Report
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
</style>
