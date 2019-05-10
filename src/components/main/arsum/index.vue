<template>
	<div class="ar-wapper" style="overflow: hidden">
		<v-action />
		<v-filter-dialog />
		<v-create-cust-dialog />
		<v-create-pro-dialog />
		<v-import-dialog />
		<keep-alive>
			<component v-bind:is="Table"></component>
		</keep-alive>
		<v-sale-order />
		<v-receivebill />
		<v-refund />
		<v-rece-plan />
		<v-set-cus />
		<v-potential-pro />
	</div>
</template>
<script>

import ActionTool from './action.vue';
import Cooperate from './cooperate.vue';
import Target from './target.vue';
import Filter from './dialog/filter.vue';
import CreateCust from './dialog/CreateCust.vue';
import CreatePro from './dialog/CreatePro.vue';
import Import from './dialog/import.vue';
import SaleOrder from './dialog/CreateSaleOrder.vue';
import Receivebill from './dialog/CreateReceivebill.vue';
import Refund from './dialog/CreateRefund.vue';
import RecePlan from './dialog/CreateRecePlan.vue';
import SetCustomer from './dialog/SetCustomerStatus.vue';
import PotentialPro from './dialog/CreatePotentialPro.vue';

export default{
	data() {
		return {}
	},
	methods: {
		getBindAttrFromPath: function() {
			this.$store.dispatch('getBindAttrFromPath', {path:this.$route.path});
		}
	},
	created() {
		this.getBindAttrFromPath();
		this.$store.dispatch('ARSumUserRole');
		this.$store.dispatch('InitShrinkStatus', true);
	},
	computed: {
		Table: function() {
			return this.$store.state.user.ARCurrentTable;
		}
	},
	components: {
		'v-action': ActionTool,
		'v-filter-dialog': Filter,
		'v-create-cust-dialog': CreateCust,
		'v-create-pro-dialog': CreatePro,
		'v-import-dialog': Import,
		'v-sale-order': SaleOrder,
		'v-receivebill': Receivebill,
		'v-refund': Refund,
		'v-rece-plan': RecePlan,
		'v-set-cus': SetCustomer,
		'v-potential-pro': PotentialPro,
		Cooperate,
		Target,
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.ar-wapper
	width: 100%;
	height: 100%;
	position:relative;
</style>
