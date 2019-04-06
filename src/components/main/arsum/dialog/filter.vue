<template>
	<div class="filter-manager-wapper" >
		<el-dialog
		  	title="列表过滤"
		  	:visible.sync="visible"
		  	:before-close="FilterClose"
		  	width="750px"
			class="filter-dialog"
			v-dialogDrag
			ref="dialogDrag"
		>
			<div class="filter-container">
				<div class="filter-program">
					<!--方案名称-->
					<div class="filter-action">
						<el-button-group>
							<el-button type="info" size="mini" @click="programmeVisible = true">新建</el-button>
							<el-button type="info" size="mini" :disabled="btnDisable" @click.native="updateProgramName">修改</el-button>
							<el-button type="info" size="mini" :disabled="btnDisable" @click.native="removeProgram">删除</el-button>
						</el-button-group>
					</div>
					<div class="program-list">
						<ul>
							<li class="program-item" 
								v-for="(item, key) in list" :key="key" 
								:class="{'program-active': CurrentProgramIndex == item.id}"
								@click="ChangeProgram(item.id)"
							>
								<span class="item-name">· {{item.name}}</span>
							</li>	
						</ul>
					</div>
				</div>
				<div class="filter-condition">
					<el-tabs>
						<el-tab-pane label="条件">
							<div class="condition-container">
								<div class="condition-action">
									<span class="action-item" @click="CreateRow">新增行</span>
									<span class="action-item" @click="RemoveRow">删除行</span>
									<span class="action-item" @click="InsertRow">插入行</span>
									<span class="action-item" @click="RemoveAll">全部删除</span>
								</div>
								<div class="condition-list">
									<div class="condition-list-header">
										<div class="header-item">#</div>
										<div class="header-item">字段</div>
										<div class="header-item">比较</div>
										<div class="header-item">值</div>
										<div class="header-item">逻辑</div>
										<div class="header-item">#</div>
									</div>
									<section >
										<div class="section-row" v-for="(item,index) in CurrentCondition" :key="index" @click.capture="ChooseRow(index)" v-if="DOMRefresh">
											<div class="section-row-item">
												<i :class="{'el-icon-caret-right': index == rowIndex && !rowEditStatus,'el-icon-edit':index == rowIndex && rowEditStatus}"></i>
											</div>
											<div class="section-row-item">
												<el-select v-model="condition[ConditionIndex].conf[index].field" @change="FilterFieldChangeHandle(index,condition[ConditionIndex].conf[index].field)" @visible-change="SelectVisibleChange(index)">
													<el-option v-for="(opt,key) in FilterField" :key="key" :label="opt.label"  :value="opt.value"></el-option>
												</el-select>
											</div>
											 <div class="section-row-item">
												<el-select v-model="condition[ConditionIndex].conf[index].operator" @visible-change="SelectVisibleChange(index)" @change="opearateChange(index)">
													<el-option v-for="(opt,key) in condition[ConditionIndex].conf[index].option" :key="key" :label="opt.label"  :value="opt.value"></el-option>
												</el-select>
											</div>
											<div class="section-row-item"  v-if="RefreshFieldStatus">
												<span v-if="condition[ConditionIndex].conf[index].type.name == 'input'">
													<el-input v-model="condition[ConditionIndex].conf[index].value" placeholder="请输入值" ></el-input>
												</span>

												<span v-if="condition[ConditionIndex].conf[index].type.name == 'enumerate'">
													<el-select v-model="condition[ConditionIndex].conf[index].value"  v-if="condition[ConditionIndex].conf[index].type.name == 'enumerate'" >
														<el-option  v-for="(opt, key) in condition[ConditionIndex].conf[index].type.list" :key="key" :label="opt.label" :value="opt.value"></el-option>
													</el-select>
												</span>
												
												<span  ref="elSelect" v-if="DOMRefresh">
													<span v-if="condition[ConditionIndex].conf[index].type.name == 'server' && condition[ConditionIndex].conf[index].operator == 0">
														<el-select 
															v-model="condition[ConditionIndex].conf[index].value" 
															
															filterable
															remote
															reserve-keyword
															placeholder="请输入关键词"
															:remote-method="remoteMethod"
															:loading="remoteLoading"
															class="remote-select"	
														>
															<el-option v-for="(opt, key) in condition[ConditionIndex].conf[index].remote" :key="key" :label="opt.label" :value="opt.value"></el-option>
														</el-select>
													</span>
													<span v-if="condition[ConditionIndex].conf[index].type.name == 'server' && condition[ConditionIndex].conf[index].operator > 0">
														<el-input v-model="condition[ConditionIndex].conf[index].value" placeholder="请输入值"></el-input>
													</span>
												</span>
											</div>
											<div class="section-row-item">
												<el-select v-model="condition[ConditionIndex].conf[index].logic" @visible-change="SelectVisibleChange(index)">
													<el-option v-for="(opt,key) in logic" :key="key" :label="opt.label"  :value="opt.value"></el-option>
												</el-select>
											</div>
										</div>
									</section>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="显示隐藏列">
							<div class="condition-container">
								<div class="column-list">
									<section>
										<div class="section-row-item" v-for="(item, key) in ColumnVisible" :key="key">
											<el-checkbox v-model="ColumnVisibleTemp[key].value" @change="UpdateColumnStatus">{{item.name}}</el-checkbox>
										</div>
									</section>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="其他">
							<div class="condition-container">
								<div class="column-list">
									<div class="font-size-item">
										<span class="font-size-item-label">字体大小:</span>
										<div class="font-size-item-slider">
											<el-slider
												v-model="FontSize"
												:max="16"
												:min="12"
												show-input
											>
											</el-slider>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
			<div class="footer" >
				<div class="filter-foot">
					<span class="filter-choose-default">
						<el-checkbox v-model="defaultProgram">下次以此方案自动进入</el-checkbox>	
					</span>
					<span class="foot-btn-group">
						<el-button type="success" size="mini" @click.native="saveProgram">保存当前方案</el-button>
						<el-button type="primary" size="mini" @click.native="QueryData">查询</el-button>
						<el-button type="default" size="mini" @click="this.FilterClose">取消</el-button>
					</span>
				</div>
		  	</div>
		</el-dialog>
		<el-dialog
		  	title="方案"
		  	:visible.sync="programmeVisible"
		  	:before-close="programmeClose"
		  	width="30%"
		>
			<el-form ref="Form" :model="Form" :rules="FormRules">
				<el-form-item :label-width="formWidth" prop="name" label="方案名称">
					<el-input v-model="Form.name" placeholder="请输入方案名"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		   		<el-button @click="programmeVisible = false">取 消</el-button>
			    <el-button type="primary" @click.native="submitForm">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	
	data() {
		return {
			programmeVisible: false,
			CurrentProgramIndex: 0,
			defaultProgram: false,
			defaultRowParams: {
				field: "",
				value: "",
				operator: "",
				logic: "",
				type: {
					name: "",
					list: [],
				},
				remote: [],
				option: []
			},
			conditionRows: [],
			rowIndex: 0,
			rowEditStatus: false,
			remoteLoading: false,	
			Form: {
				id: "",
				name: "",
				module: this.$route.path,
			},
			FormRules: {
				name: [
					{required: true, trigger: 'blur', message: "请输入方案名称"}
				]
			},
			formWidth: '120px',
			programmeUpdate: false,
			programConf: [],//详细配置信息
			btnDisable: false,
			CurrentCondition: [], //
			ConditionIndex: 0,
			DOMRefresh: true,
			RefreshFieldStatus: true,
			AlreadyInit: false, 
			ColumnVisibleTemp: {},
			CurrentOpIndex: 0,
			//condition:[],
		}
	},
	methods: {
		/**关闭**/
		FilterClose: function() {
			this.$store.dispatch('AlterTableConfig', {FilterVisible: false});
		},
		//更新显示隐藏列状态
		UpdateColumnStatus() {
			this.$store.dispatch('SetARSumColumnVisible', this.ColumnVisibleTemp);
		},
		//切换方案
		ChangeProgram(index) {
			this.CurrentProgramIndex = index;
			this.defaultProgram = false;

			this.list.forEach((item) => {
				if (item.id == index ) {
					this.programConf = item.conf;

					if (Boolean(item.default)) {
						//默认方案高亮并且打勾
						this.defaultProgram = true;
					}
				}
			});
			
			if (index == 0) {
				this.btnDisable = true;
			}
			else {
				this.btnDisable = false;
			}

			this.condition.forEach((item, i) => {
				if (item.id == index) {
					this.CurrentCondition = item.conf;
					this.ConditionIndex = i;
				} 
			});

			this.rowIndex = 0;
			this.DOMRefresh  = false;
			//刷新dom
			this.$nextTick(() => {
				this.DOMRefresh = true;
			});
		},
		CreateRow() {
			let row = JSON.parse(JSON.stringify(this.defaultRowParams));
			
			this.condition[this.ConditionIndex].conf.push(row);
			// this.CurrentCondition.push(row);
			this.rowIndex = this.condition[this.ConditionIndex].conf.length - 1;
			this.CurrentCondition = [];
			this.DOMRefresh  = false;
			//刷新dom
			this.$nextTick(() => {
				this.CurrentCondition = this.condition[this.ConditionIndex].conf;
				this.DOMRefresh = true;
			});
		},
		RemoveRow() {
			let newArr = [];
			
			this.condition[this.ConditionIndex].conf.forEach((item, index) => {
				if (index != this.rowIndex) {
					newArr.push(item);
				}
			});

			this.condition[this.ConditionIndex].conf = newArr;

			if (this.rowIndex > newArr.length - 1) {
				this.rowIndex =  newArr.length - 1;
			}

			if (newArr.length < 1) {
				this.rowIndex = 0;
			}

			this.CurrentCondition = this.condition[this.ConditionIndex].conf;
		},
		InsertRow() {
			let newArr = [];

			this.condition[this.ConditionIndex].conf.forEach((item, index) => {
				if (index == this.rowIndex) {
					newArr.push(JSON.parse(JSON.stringify(this.defaultRowParams)));
				}

				newArr.push(item);
			});

			this.condition[this.ConditionIndex].conf = newArr;
			this.CurrentCondition = this.condition[this.ConditionIndex].conf;
			// ++this.rowIndex;
		},
		RemoveAll() {
			this.condition[this.ConditionIndex].conf = [];
			this.condition[this.ConditionIndex].conf.push(JSON.parse(JSON.stringify(this.defaultRowParams)));
			this.CurrentCondition = this.condition[this.ConditionIndex].conf;
			this.rowIndex = 0;
		},
		ChooseRow(index) {
			this.rowIndex = index;
		},
		InitFilter() {
			this.AlreadyInit = false;
			this.$store.dispatch('GetARSumFilterTable');
			//获取本地显示隐藏列配置信息
			let ColConfig = JSON.parse(this.$tool.getter('arsum_column_visible')) || {};
			//Object.keys(obj) 获取对象的key集合  array类型
			if (Object.keys(ColConfig).length > 0 ) {
				
				this.$store.dispatch('SetARSumColumnVisible', ColConfig);
			}
		},
		//切换字段的事件函数
		/**
		*@param index 当前对应的条件索引
		*@param val 当前选择的字段值
		*/
		FilterFieldChangeHandle(index, val) {
			if (this.condition[this.ConditionIndex].conf[index].logic == "") {
				this.condition[this.ConditionIndex].conf[index].logic = 1;
			}
			this.condition[this.ConditionIndex].conf[index].value = "";
			this.condition[this.ConditionIndex].conf[index].type = {name: "", list: []};
			this.FilterField.forEach((item, i) => {
				if (item.value == this.condition[this.ConditionIndex].conf[index].field) {
					this.condition[this.ConditionIndex].conf[index].type.name = item.type;
					 
					if (typeof(item.list) != 'undefined') {
						this.condition[this.ConditionIndex].conf[index].type.list = item.list;

						if (item.list.length > 0) {
							this.condition[this.ConditionIndex].conf[index].value = item.list[0].value;
						}
					}
				}

				if (item.value == val) {
					this.condition[this.ConditionIndex].conf[index].operator = item.opearate[0].value;
					this.condition[this.ConditionIndex].conf[index].option = item.opearate;
				}
			});
			this.RefreshFieldStatus = false;
			this.$nextTick(() => {
				this.RefreshFieldStatus = true;
			});
		},
		/**远程搜索select 切换到input时  清空绑定内容 */
		opearateChange(index) {
			if (this.condition[this.ConditionIndex].conf[index].type.name == 'server') {
				this.condition[this.ConditionIndex].conf[index].value = "";
			}
		},
		SelectVisibleChange(index)  {
			this.rowIndex = index;
		},
		remoteMethod(query) {
			this.condition[this.ConditionIndex].conf[this.rowIndex].remote = [];
			if (query) {
				this.$store.dispatch('FindARSumFilterValue', {field: this.condition[this.ConditionIndex].conf[this.rowIndex].field, keyword: query}).then(() => {
					let response = this.$store.state.user.FindARSumFilterValue;
					if (response.length > 0) {
						this.condition[this.ConditionIndex].conf[this.rowIndex].remote = response;
					}
				});
			}
		},
		submitForm() {
			this.$refs['Form'].validate((valid) => {
				if (valid) {
					let action = "CreateProgram";
					
					if (this.programmeUpdate) {
						action = "UpdateProgram";
					}

					this.$store.dispatch(action, this.Form).then(() => {
						let response = this.$store.state.user.CreateProgram;

						if (response.status == 'success') {
							this.$notify.success('操作成功');
							this.$refs['Form'].resetFields();
							this.Form.name = '';
							this.programmeUpdate = false;
							//this.RefreshProgram();
							this.InitFilter();
						}
						else {
							this.$notify.error('操作失败!' + response.errmsg);
						}

						this.programmeVisible = false;
					});
				}
			})
		},

		programmeClose() {
			this.$refs['Form'].resetFields();
			this.Form.name = "";
			this.programmeUpdate = false;
			this.programmeVisible = false;
		},
		//刷新方案
		RefreshProgram() {
			this.AlreadyInit = false;
			this.$store.dispatch('FilterProgram');
		},
		//更新方案名
		updateProgramName() {
			this.programmeUpdate = true;
			this.Form.id = this.list[this.CurrentProgramIndex].id;
			this.Form.name = this.list[this.CurrentProgramIndex].name;
			this.programmeVisible = true;
		},
		//删除方案
		removeProgram() {
			this.$confirm('删除该方案, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.CurrentCondition = [];
				this.$store.dispatch('DeleteProgram', {id: this.CurrentProgramIndex}).then(() => {
					let response = this.$store.state.user.CreateProgram;
					
					if (response.status == 'success') {
						this.$store.dispatch('FilterProgram');
						this.$notify.success('删除成功!');
					}
					else {
						this.$notify.success('删除失败!');
					}
				});
			}).catch(() => {
			         
			});
		},
		//保存过滤方案
		saveProgram() {
			let data = this.condition[this.ConditionIndex];
			data.default = this.defaultProgram;
			
			if (typeof(data.conf) == 'object' && data.conf != null) {
				data.conf.forEach((item, index) => {
					data.conf[index].remote = [];
					data.conf[index].type.list= [];
				});
			}
			
			data.fontSize = this.FontSize;
			data.colVisible = this.ColumnVisibleTemp;
			
			if (this.ConditionIndex > 0) {
				//修改方案
				this.$store.dispatch('UpdateFilterConfig', data).then(() => {
					let response = this.$store.state.user.UpdateFilterConfig;
					
					if (response.status == 'success') {
						this.$notify.success('保存方案成功');
					}
					else {
						this.$notify.error('保存方案失败!' + response.errmsg);
					}
				});
			}
			else {
				//在默认方案的基础上保存当前条件
				this.$notify.error('请选择一个方案');
			}
		},
		QueryData() {
			let param = this.condition[this.ConditionIndex].conf;
			console.log(param);return;
			this.$store.dispatch('updateFilterQueryParam', {conf: param, initialization: false}).then(() => {
				this.$store.dispatch('ARSum', this.$store.state.user.filterQuery).then(() => {
					this.FilterClose();
				});
			});
		},
	
	},
	computed: {
		visible: function() {
			
			return this.$store.state.user.ARTableConfig.FilterVisible;
		},
		list: function() {
			let data = [
				{name: "缺省方案", id: 0}
			], 
			list = this.$store.state.user.FilterProgram,
			row = JSON.parse(JSON.stringify(this.defaultRowParams));
			this.condition = [{id: 0, conf: [row]}];
			this.CurrentCondition =  this.condition[0].conf;

			list.forEach((item) => {
				
				if (!item.conf) {
					item.conf = [JSON.parse(JSON.stringify(this.defaultRowParams))];
				}

				data.push(item);
				
				this.condition.push({id: item.id, name: item.name, conf: item.conf});
				
				//如果是初次读取并且获取默认方案
				if (Boolean(item.default) && this.AlreadyInit == false) {
					this.defaultProgram = true;
					this.CurrentProgramIndex = item.id;
					this.CurrentCondition =  this.condition[this.condition.length - 1].conf;
					this.ConditionIndex = this.condition.length - 1;
				}
			});
			
			if (list.length > 0) {
				this.AlreadyInit = true; //完成初次读取
			} 
			
			return data;
		},
		FilterField: function() {
			return this.$store.state.user.ARSumFilterTable.field;
		},
		opearator: function() {
			//console.log( this.$store.state.user.ARSumFilterTable.operator)
			let field = this.$store.state.user.ARSumFilterTable.field;
			let op = [];
			
			if (typeof(field) == 'object') {
				field.forEach((item) => {
					op.push(item.opearate);
				});
			}
			
			return  op;
		},
		logic: function() {
			return  this.$store.state.user.ARSumFilterTable.logic;
		},
		ColumnVisible: function() {
			//return this.$store.state.user.ARTableConfig.ColumnVisible
			let data = this.$store.state.user.ARTableConfig.ColumnVisible;
			this.ColumnVisibleTemp = JSON.parse(JSON.stringify(data));
			return data;
		},
		FontSize: {
			get() {
				// return 
				let FontSize =  this.$tool.getter('FontSize');
				
				if (typeof(FontSize) == 'undefined' || !FontSize) {
					FontSize = this.$store.state.user.ARTableConfig.FontSize;
				}

				return Number(FontSize);
			},
			set(val) {
				this.$store.dispatch('SetARSumGlobalFontSize', val).then(() => {
					this.$tool.setter('FontSize', val);
				});
			}
		}
	},
	created() {
		// this.CreateRow();
		this.InitFilter();
		
	},
	
	//vue 指令
	directives: {
		//dialog拖动指令
		dialogDrag: {
			bind: function(el, binding, vnode,oldVnode){
				
				const dialogHeader = el.querySelector('.el-dialog__header');
				const dialogDom = el.querySelector('.el-dialog');
				const winHeight = window.innerHeight;
				const winWidth = window.innerWidth;
				dialogHeader.style.cursor = 'move';
				dialogHeader.style['user-select'] = 'none';
				
				//当鼠标按下时  记录当前位置
				dialogHeader.onmousedown = (de) => {
					const style = window.getComputedStyle(dialogDom);
					const dialogDomWidth = parseInt(style.width.replace(/px/,""));
					const dialogDomHeight = parseInt(style.height.replace(/px/,""));
					let oldX = de.clientX, oldY = de.clientY;
					let styL = parseInt(dialogDom.style.left.replace(/\px/g,"")) || 0;
					let styT = parseInt(dialogDom.style.top.replace(/\px/,"")) || 0;
					let disX = dialogDom.offsetLeft - styL;//记录当前点击位置X轴的偏移量
					let disY = dialogDom.offsetTop - styT;
					
					
					// 当鼠标按下并且拖动时  调整位置  完成拖动效果
					document.onmousemove = (mv) => {
						 
						let newX = mv.clientX - oldX + styL;
						let newY = mv.clientY - oldY + styT;
						 
						//处理边界问题
						if ((dialogDomWidth+newX+disX) >= winWidth - 10) {
							newX = winWidth - dialogDomWidth - disX - 10; //最大的left
						}	

						if (newX < disX * -1) {
							newX = disX * -1; //最小的left
						}	
						
						if ((dialogDomHeight+newY+disY) >= winHeight - 55) {
							newY = winHeight - dialogDomHeight - disY - 55; //最大的top
						}	

						if (newY < disY * -1) {
							newY = disY * -1 + 5; //最小的top
						}	

						dialogDom.style.left = newX+'px';
						dialogDom.style.top = newY+'px';
						
					};

					document.onmouseup = function (e) {
						document.onmousemove = null;
						document.onmouseup = null;
					};
				}
				
			}
		}
	},
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.filter-container
	width: 100%;
	height: 100%;
	height: 350px;
	overflow-y: auto;
	overflow-x:hidden;
	position: relative;
	border: 1px solid #ebebeb;
	padding: 5px;
	display: flex;
	.filter-program
		// flex-basis : 25%;
		flex-grow: 0;
		width: 25%;
		
		position: relative;
		.filter-action
			width: 100%;
			overflow-x: auto;
		.program-list
			margin-top: 10px;
			font-size: 12px;
			height: calc(100% - 40px);
			border: 1px solid #ebebeb;
			overflow-y: auto;
			width: 100%;
			position:relative;
			.program-item
				list-style: disc !important;
				cursor:pointer;
				padding-left: 4px;
				width: 100%;
				height: 24px;
				display: block;
				position: relative;
				.item-name
					width: 100%;
					display: block;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
			.program-active
				background: rgb(248,248,248);
				color: #409EFF;
				font-weight: bold;
	.filter-condition
		flex: 1;
		margin-left: 10px;
		position: relative;
		.condition-container
			width: 100%;
			height: 100%;
			position: relative;
			overflow:hidden;
			.condition-action
				height:25px;
				width : 100%;
				display: flex;
				padding: 2px 0px;
				align-items: center;
				background: rgb(241,241,241);
				.action-item
					display: block;
					font-size:13px;
					cursor: pointer;
					margin-right: 10px;
					user-select: none;
					&:hover
						background: rgb(224,224,224);
					&:active
						background: rgb(201,201,201);
			.condition-list
				height: calc(100% - 25px);
				border: 1px solid #ebebeb;
				overflow: hidden;
				.condition-list-header
					height: 20px;
					width: 100%;
					display: flex;
					font-size: 12px;
					border-bottom: 1px solid #ebebee;
					background: linear-gradient(rgb(250,251,251), rgb(218,224,221));
					justify-content: center;
					align-items: center;
					overflow:hidden;
					.header-item
						flex: 1;
						user-select: none;
						text-align: center;
						&:first-child,&:last-child
							flex: 0;
							flex-basis: 20px;
				section 
					width: 100%;
					height: calc(100% - 22px);
					overflow-y: auto;
					margin-bottom: 10px;
					.section-row
						height: 25px;
						width: 100%;
						display: flex;
						font-size: 12px !important;
						border-bottom: 1px solid #ebebeb;
						.section-row-item
							flex: 1;
							border-right: 1px solid #ebebeb;
							&:first-child
								flex: 0;
								flex-basis: 20px;
							.remote-select
								height: 22px;	
			.column-list
				height: 100%;
				overflow-y: auto;
				.font-size-item
					display: flex;
					align-items: center;
					.font-size-item-label
						flex-basis: 80px;
					.font-size-item-slider
						flex: 1;
.footer
	width: 100%;
	margin-top: 5px;
	height: auto;
	.filter-foot
		width: 100%;
		display : flex;
		justify-content :space-between;
		align-items: center;
		.filter-choose-default
			font-size: 12px;
		.filter-btn-group
			button 
				margin-left: 15px;
</style>
