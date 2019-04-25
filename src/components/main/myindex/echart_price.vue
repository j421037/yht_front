<template>
	<div class="echart-wapper">
		<div class="echart-box">
			<div class="echart-title"><p>镀锌钢管价格走势</p></div>
			<div id="echart"></div>
		</div>
		<div class="progress-box">
			<div class="progress-title"><p>进度</p></div>
			<div id="progress"></div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			priceTrend: [//价格走势
			{
				name: '广州华岐',
				type: 'line',
				data: [1710,1750,1800,1920,1680,1880,1810],
				areaStyle: {},
				smooth: true
			}]
		}
	},
	methods: {
		drawPriceChart(datas) {
			//初始化echart对象
			const PriceChart = this.$echarts.init(document.getElementById('echart'));
			
			// 绘制图表
	        PriceChart.setOption({
	            title: { 
	            	// text: '镀锌钢管下浮走势图',
	            	textStyle: {
	            		color: '#606266',
	            		fontStyle: 'italic',
	            		fontWeight: 'normal',
	            		fontSize: '16',
	            		align: 'right',
	            		verticalAlign: 'top'
	            	} 
	            },
	            tooltip: {},
	            xAxis: {
	                data: ['周一','周二','周三','周四','周五','周六','周日'],
	                type: 'category',
	                splitLine: {
	                	show: false
	                },
	                boundaryGap: false,
	            },
	            yAxis: {
	            	splitLine: {
	                	show: false
	                }
	            },
	            series: datas,
	            grid: { //图表的边距
	            	// left: '-10px'
	            }
	        });
		},
		drawProgressChart() {
			const ProgressChart = this.$echarts.init(document.getElementById('progress'));
			ProgressChart.setOption({
	            title: { 
	            	// text: '镀锌钢管下浮走势图',
	            	textStyle: {
	            		color: '#606266',
	            		fontStyle: 'italic',
	            		fontWeight: 'normal',
	            		fontSize: '16',
	            		align: 'right',
	            		verticalAlign: 'top'
	            	} 
	            },
	            tooltip: {},
	            xAxis: {
	               type: 'value',
			        boundaryGap: false,
			        splitLine: {
				        show: false
				    }
	            },
	            yAxis: {
	            	splitLine: {
	                	show: false
	                },
	                type: 'category',
        			data: ['目标业绩','已完成业绩','回款', '欠款'],
	            },
	            series: [
	            	{
			            name: '2011年',
			            type: 'bar',
			            data: [10000000, 2348900, 2903400, 10497000],
			            itemStyle: {
			            	//颜色设置
			            	color: function(item) {
			            		// console.log(item);
			            		return '#B5C334';
			            	}
			            }
			        }
	            ],
	            grid: { //图表的边距
	            	// left: '-10px'
	            }
	        });
		}
	},
	mounted() {
		this.drawPriceChart(this.priceTrend);
		this.drawProgressChart();	
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.echart-wapper
		position: relative;
		width: 100%;
		height: 28rem;
		margin-top: 1.5rem;
		display: flex;
		padding-left: 1%;
		padding-right: 1%;
		box-sizing: border-box;
		// background: #fff;
		.echart-box
			flex: 1;
			width: 50%;
			height: 100%;
			background: #fff;
			position: relative;
			border-radius: 3px;
			voverflow: hidden;
			box-shadow:  0 3px 5px rgba(0,0,0,0.1);
			.echart-title
				width: 100%; 
				height: 3.5rem;
				padding: 1rem;
				font-weight: 580;
				box-sizing: border-box;
				border-bottom: 1px solid #f4f4f4;
				p
					margin: 0;
					color: #606266;
					text-align: left;
					font-size: 1.5rem;
			#echart
				width: 100%;
				height: calc(100% - 1.5rem);
		.progress-box
			// flex: 1;
			height: 100%;
			margin-left: 1%;
			border-radius: 3px;
			box-shadow:  0 3px 5px rgba(0,0,0,0.1);
			background: #fff;
			width: 49%;
			.progress-title
				width: 100%; 
				height: 3.5rem;
				padding: 1rem;
				font-weight: 580;
				box-sizing: border-box;
				border-bottom: 1px solid #f4f4f4;
				p
					margin: 0;
					color: #606266;
					text-align: left;
					font-size: 1.5rem;
			#progress
				width: 100%;
				height: calc(100% - 1.5rem);
</style>