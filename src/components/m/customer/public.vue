<template>
	<div class="wapper">
		<div class="title">
			<span class="icon" @click="returnLast">
				<i class="iconfont icon-fanhui"></i>
			</span>
			<p class="text">最新资源</p>
		</div>
		<van-tabs v-model="tabActive" :sticky="true" @click="tabChange" class="tab-wapper">
		  	<van-tab v-for="(item, key) in tabList" :title="item.name" :key="key">
		   		<div class="tab-container">
		   			<mu-load-more  :loading="loading" @load="load" :loaded-all="loadAll">
			   			<div class="item" v-for="item in list">
			   				<div class="item-title">
			   					<div class="name">
			   						<span class="customer-name">{{item.name}}</span>
			   						<span class="item-badge">
			   							<mu-badge content="新资源" v-if="item.recount == 0" color="success"></mu-badge>
			   							<mu-badge :content="'领取'+item.recount+'次'" v-else ></mu-badge>
			   						</span>
			   					</div>
			   					<div class="province">{{item.province}} {{item.city}} {{item.area}}</div>
			   					<div class="author">来源: {{item.creator}}</div>
			   				</div>
			   				<div class="item-content">
			   					<p>
			   						需求: {{item.demand}}
			   					</p>
			   					<span>({{item.time}})</span>
			   				</div>
			   				<div class="item-foot">
			   					<div class="item-label">
			   						<span>
			   							<i class="iconfont icon-biaoqian"></i>
				   					</span>
				   					<span class="item-brand">{{item.brand}}</span>
			   					</div>
			   					<div class="item-action" :class="{rubber: btnRubber && item.id == currentId}" @click="receiveCustomer(item)">
			   						<van-button type="default" size="small"><span class="btn-text"><i class="iconfont icon-jia"></i>领取</span></van-button>
			   					</div>
			   				</div>
			   			</div>
			   		</mu-load-more>
		   			<p v-show="loadAll" :style="{'margin-bottom':'20px','text-align': 'center'}">已加载完毕, 共 {{list.length}} 条记录</p>
		   		</div>
		  	</van-tab>
		</van-tabs>
	</div>
</template>
<script type="text/javascript">
import { Toast } from 'vant';
// import { Dialog } from 'vant';
// import { Button } from 'vant';
// import { Tab, Tabs } from 'vant';
export default {
	data() {
		return {
			tabActive: 0,
			tabList: [{name:'公共',type: 0}, {name:'部门', type:1}],

		    loading: false,
		    text: 'List',
		    limit: 3,// 每页显示的数量
		    pageNow: 1,
		    currentId: 0,
		    list: [],
		    loadAll: false,
		    btnDisable: false,
		    btnRubber: false,
		    customerType: 0, // 0公开类型客户 1 部门类型客户
		}
	},
	methods: {
		//返回上一页
		returnLast() {
			this.$router.go(-1);
		},

	    load () {
	      this.loading = true;
	      // setTimeout(() => {
	      //   this.loading = false;
	      //   this.num += 10;
	      // }, 2000)
	      ++this.pageNow;
	      this.initList();
	    },

	    /**获取数据**/
	    initList() {

	    	if (this.loading == false) {
		    	Toast.loading(
		    		{
		    			// mask: true,
					  	message: '加载中'
					}
				);
		    }

	    	this.$store.dispatch('getCustomer',{limit: this.limit, offset: this.offset, type: this.customerType}).then(() => {
	    		// (this.$store.state.user.customerList);
	    		this.loading = false;

	    		let data = this.$store.state.user.customerList.data;

	    		this.loadAll = this.$store.state.user.customerList.loadAll;

	    		for (let i in data) {

	    			this.list.push(data[i]);
	    		}

	    		Toast.clear();
	    	});
	    },
	    /**领取一个客户**/
	    receiveCustomer(item) {

	    	this.currentId = item.id;
	    	this.btnDisable = true;
	    	this.btnRubber = true;

    		this.$dialog.confirm(
    			{
    				message: '认领客户 <'+item.name+'>'
    			}
    		).then(() => {

			  	this.receive(item.id);

			}).catch(() => {

				this.btnDisable = false;
				this.btnRubber = false;
			});

	    },
	    receive(id) {
	    	this.$store.dispatch('receiveCustomer', {id: id}).then(() => {

          		if (this.$store.state.user.receiveStatus.status == 'success') {

          				Toast.success('操作成功');

          		} else {

          			Toast.fail('操作失败');
          		}

          		this.list = [];

          		this.initList();

          		this.btnDisable = false;
          	});
	    },
	    /**标签页切换**/
	    tabChange(index, title) {

	    	for (let i in this.tabList) {

	    		if (this.tabList[i].name == title) {
	    			this.customerType = this.tabList[i].type;
	    		}
	    	}

	    	this.list = [];
	    	this.loadAll = false;
	    	this.pageNow = 1;
	    	this.initList();
	    }
	},
	created() {

		this.initList();

		// if (this.$route.query.component != 'public') {

		// 	window.history.pushState(null, null, document.URL);
		// }
	},
	/**keep-alive模式下 activated 会在每次激活中触发**/
	activated() {
		window.history.pushState(null, null, document.URL);
	},
	computed: {
		offset: function () {

			return (this.pageNow - 1)*this.limit;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	background: rgb(237,238,240)
	.title
		height: 51px;
		background: #fff;
		border-top: 1px solid rgba(26,26,26,.06);
		// border-bottom: 1px solid rgba(26,26,26,.06);
		// box-shadow:0 1px 3px 0 rgba(23,81,153,.05);
		background-clip: content;
		display: flex;
		color: rgb(133,144,166);
		font-size: 16px;
		.icon
			height: 100%;
			flex-grow: 0;//即使有多余的空间 也不放大
			flex-basis: 50px; // 固定宽度
			display: flex;
			justify-content: center;
			align-items: center;
			i
				font-size: 25px;
		.text
			flex: 1;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: 50px;
	.tab-wapper
		width: 100%;
		height: calc(100% - 51px);
		position: absolute;
		top: 51px;
		.tab-container
			width: 100%;
			height: 100%;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			.item
				padding: 10px;
				margin-top: 10px;
				margin-bottom: 10px;
				background: #fff;
				width: 100%;
				border-top: 1px solid #e5e5e5;
				border-bottom: 1px solid #e5e5e5;
				.item-title
					padding-bottom: 15px
					border-bottom: 1px solid #e5e5e5;
					.name
						display:flex;
						justify-content: space-between;
						.customer-name
							font-size: 16px;
							font-weight: bold;
						.item-badge
							font-size: 10px;
					.province
						font-size: 14px;
						// color: rgb(133,144,166);
						color: rgb(96,96,96);
					.author
						font-size: 12px;
				.item-content
					padding: 10px 0px;
					p
						margin: 0;
						color: rgb(96,96,96);
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
				.item-foot
					height: auto;
					color: rgb(196,197,208);
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 5px;
					.item-label
						.item-brand
							font-size: 12px;
							padding-left: 10px;
					.item-action
						button
							border-color: #2196f3;
						.btn-text
							padding: 0px 5px;
							font-size: 14px;
							color: #2196f3;
							i
								font-size: 14px;
								padding-right: 5px;
					.item-action.rubber
						animation: rubberBand 0.7s ease;
			.no-data
				padding: 10px;
				text-align: center;
</style>
