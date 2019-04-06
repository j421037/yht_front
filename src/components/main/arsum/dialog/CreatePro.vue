<template>
	<div class="create-project-wapper" v-if="visible">
		<el-dialog
		  title="项目"
		  :visible.sync="visible"
		  :before-close="Close"

		>
			<el-form :model="CreateForm" :rules="FormRules" ref="CreateForm" :inline="true">
				<el-form-item label="客户名称" :label-width="formLabelWidth" prop="cust_id">
					<div style="width: 100%;display: flex">
			      		<el-select
						    v-model="CreateForm.cust_id"
						    filterable
						    remote
						    reserve-keyword
						    placeholder="请输入客户名称关键词"
						    :remote-method="remoteMethod"
						    :loading="loadingCust"
						    style="flex:1"
						>
							<el-option-group
								:label="'搜索结果'"
							>
							    <el-option
							      	v-for="item in CustList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-option-group>
						</el-select>
						<span style="margin-left: 15px;flex-basis: 100px;">
							<el-button icon="el-icon-plus" type="success" size="mini" @click.native="NewCust">
								新增客户
							</el-button>
						</span>
					</div>
				</el-form-item>
                <br>
				<el-form-item :label-width="formLabelWidth" label="项目名称" prop="name">
					<el-input v-model.trim="CreateForm.name"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth1" label="施工范围" prop="tid">
					<el-select v-model="CreateForm.tid" class="CreateForm-select">
						<el-option v-for="(item, key) in FIELD.F_CMK_PROATTR" :label="item.label" :value="item.value" :key = "key"></el-option>
					</el-select> 
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="联系电话" prop="phone_num">
					<el-input v-model.trim="CreateForm.phone_num" placeholder="项目联系电话"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth1" label="标签" prop="tag">
					<el-select v-model="CreateForm.tag" class="CreateForm-select">
						<el-option v-for="(item, key) in FIELD.F_CMK_CUSTAG" :label="item.label" :value="item.value" :key = "key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="挂靠信息" >
					<el-input v-model.trim="CreateForm.affiliate" placeholder="如无挂靠信息则可以留空"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth1" label="预计金额">
					<el-input v-model.trim="CreateForm.estimate" placeholder="项目的预计合作金额"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="账期" prop="payment_days">
					<el-input v-model.trim="CreateForm.payment_days" placeholder="项目账期(天数)"></el-input>
				</el-form-item>
                <el-form-item :label-width="formLabelWidth1" label="账期初始日期" prop="payment_start_date">
                    <el-date-picker
                        v-model="CreateForm.payment_start_date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择账单日">
                    </el-date-picker>
                </el-form-item>
				<el-form-item :label-width="formLabelWidth" label="合同">
					<el-input v-model.trim="CreateForm.agreement" placeholder="合同信息"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth1" label="合同附件">
					<div class="attachment">
						<span v-show="false">
							<input type="file"  ref="FileInput" @change="AttachmentChange($event)" />
						</span>
						<div class="attachment-item">
							<div class="file-button">
								<el-button type="success" size="mini" @click.native="uploadAttachment">上传附件</el-button>
							</div>
							<div class="file-list">
								<div class="file-item" v-for="(item, key) in fileList" :key = "key">
									<span class="file-item-name">{{item.name}}</span>
									<span @click="removeFile(item.key)">
										<i class="el-icon-circle-check"></i>
										<i class="el-icon-close"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</el-form-item>
                <br>
                <el-form-item :label-width="formLabelWidth" label="税率">
                    <el-input v-model.trim="CreateForm.tax" placeholder="项目的税率"></el-input>
                </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		   		<el-button @click="Close">取 消</el-button>
			    <el-button type="primary" @click="submitForm">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	
	data() {
		return {
			loadingCust: false,
			formLabelWidth: '100px',
            formLabelWidth1: '120px',
			CreateForm: {
				name: "",
				cust_id: "",
				phone_num: "",
				tid: "",
				affiliate: "", //挂靠
				estimate: "",
				tax: "",
				tag: "",
				agreement: "",
				payment_days: "",
                payment_start_date: ""
			},
			FormRules: {
				cust_id: [
					{required: true, trigger: 'blur', message: "请选择客户"}
				],
				name: [
					{required: true, trigger: 'blur', message: "请填写项目名称"}
				],
				tid: [
					{required: true, trigger: 'blur', message: "请选择项目属性"}
				],
				tag: [
					{required: true, trigger: 'blur', message: "请选择标签属性"}
				],
				phone_num: [
					{required: true, trigger: 'blur', message: "请输入电话号码"},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
                payment_days:[
                    {required: true, trigger: 'blur', message: "请输入项目的账期"},
                    {validator: this.onlyNumber, trigger: 'blur'}
                ],
                payment_start_date:[
                    {required: true, trigger: 'blur', message: "请选择账期初始化的时间"},
                ],
			},
			CustList: [],
			fileList: [], //文件列表
		}
	},
	methods: {
		NewCust() {
			this.$store.dispatch('AlterTableConfig', {CreateCustVisible: true});
		},
		/**关闭**/
		Close() {
			for (let i in this.CreateForm) {
				if (i != 'tid' || i != 'tag') {
					this.CreateForm[i] = "";
				}
			}

			this.$store.dispatch('AlterTableConfig', {CreateProVisible: false});
		},
		remoteMethod(query) {

			if (query !== '') {
	          	this.loadingCust = true;
		        this.$store.dispatch('SearchCust', {keyword: query, type: "cooperate"}).then(() => {
		        	this.CustList = this.$store.state.user.SearchCust;

		        	this.loadingCust = false;
		        });
	        } else {
	        	this.CustList = [];
	        }
		},
		submitForm() {
			this.$refs['CreateForm'].validate((valid) => {

	    		if (valid) {

	    			let fd = new FormData();

					for (let i in this.CreateForm) {
						fd.append(i, this.CreateForm[i]);
					} 	

					if (this.fileList.length > 0) {
						fd.append('AgreementAtta', this.fileList[0].file);		
					}

	    			this.$store.dispatch('AddProject', fd).then(() => {
	    				let response = this.$store.state.user.AddProject;
	    				
						if (response.status == 'success') {
							this.$notify.success('操作成功');
							this.fileList = [];
							this.Close();
							this.resetForm('CreateForm');
							this.updateTable();
						} else {
							this.$notify.error('操作失败, '+response.errmsg);
						}
	    			});
	    		}	
	    	})
		},
		uploadAttachment() {
			this.$refs.FileInput.click();
		},
		/**添加文件**/
		AttachmentChange(event) {
			let file = event.target.files[0];
			
			this.fileList = [{key: this.FileUniqueKey(), name: file.name, file:file}];
			
		},
		/**删除文件**/
		removeFile(fileKey) {
			 
			for (let i in this.fileList) {
				if (this.fileList[i].key == fileKey) {
					this.fileList.splice(i, 1);
				}
			}
		},
		FileUniqueKey() {
			let string = "qazxswedcvfrtgbnhyujmkiolp1029384756", keyLen = 10, key = "";

			for (let i = 0; i < keyLen; ++i) {
				let index = Math.floor(Math.random() * string.length);

				key += string[index];
			}

			return key;
		},
		/**数字验证规则**/
		onlyNumber(rule, value, callback) {
			let patt = /^[0-9\-]+$/;

			if (!patt.test(value)) {
				callback(new Error('请输入正确的号码'));
			} else {
				callback();
			}
		},

		updateTable() {
			let filterQuery = this.$store.state.user.filterQuery;

			this.$store.dispatch('ARSum', filterQuery);
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
	computed: {
		visible: function() {
			return this.$store.state.user.ARTableConfig.CreateProVisible;
		},
		FIELD: function() {
			this.CreateForm.tid = this.$store.state.user.FIELDS.F_CMK_PROATTR[0].value;
			this.CreateForm.tag = this.$store.state.user.FIELDS.F_CMK_CUSTAG[0].value;

			return  this.$store.state.user.FIELDS;
		}
	},
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.attachment
	position: relative;
	width: 100%;
	.attachment-item
		display:flex;
		align-items: flex-start;
		position: relative;
		width: 100%;
		.file-button
			flex-basis: 80px;
		.file-list
			margin-left: 15px;
			color: #ff4081;
			cursor: pointer;
			position: relative;
			flex: 1;
			overflow: hidden;
			.file-item
				width: 100%;
				font-size: 12px;
				display: flex;
				justify-content: center;
				align-items: center;
				.file-item-name
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					flex: 1;
				i
					flex-basis: 15px;
					font-size: 15px;
				.el-icon-circle-check
					color: #67c23a;
					margin-left: 15px;
				.el-icon-close
					display: none;
					color: #606266;
				&:hover
					// text-decoration: underline;
					background: #ebebeb;
					.el-icon-circle-check
						display: none;
					.el-icon-close
						display: block;
					
</style>
