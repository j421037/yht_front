<template>
    <div class="maintenance-dialog">
        <el-dialog
            title="价格维护"
            :visible.sync="visible"
            @open="handleOpen"
            :before-close="handleClose"
            width="48%"
        >
            <el-form :model="Form" ref="form" label-width="80px" class="price-form">
                <div class="form-add-item">
                    <el-form-item
                        label="产品分类"
                        prop="category"
                        :rules="{required:true,trigger: 'blur',message:'请选择分类'}"
                    >
                        <el-select v-model="Form.category" @change="HandleCategoryChange">
                            <el-option v-for="(item,key) in categorys" :key="key" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="品牌"
                        prop="brand"
                        :rules="{required:true,trigger: 'blur',message:'请选择品牌'}"
                    >
                        <el-select v-model="Form.brand" @change="HandleBrandChange">
                            <el-option v-for="(item,key) in brands" :key="key" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form-add-item-freight">
                    <el-form-item
                        label="运费"
                        prop="freight"
                        :rules="{required:true, trigger:'blur', message: '请输入运费，默认0'}"
                    >
                        <el-input v-model="Form.freight" placeholder="运费，如包运费请输入0">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="form-add-item">
                    <el-form-item
                        label="日期"
                        prop="date"
                        :rules="{required:true,trigger: 'blur',message:'请选择日期'}"
                    >
                        <el-date-picker
                            v-model="Form.date"
                            align="right"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item
                        label="版本号"
                        label-width="80px"
                        prop="version_str"
                        :rules="[{validator: validateVersion,trigger:'blur'},{required: true, trigger:'blur',message: '请输入价格版本'}]"
                    >
                        <el-input v-model="Form.version_str" placeholder="价格版本"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="备注信息" prop="remark" :rules="{required: 'true',trigger:'blur',message:'请输入调价备注'}">
                    <el-input v-model="Form.remark" placeholder="请输入备注信息"></el-input>
                </el-form-item>
                <p style="height:1px;border-top:1px solid #ebebeb;"></p>
                    <el-upload
                        :action="UploadUrl"
                        multiple
                        name="uploadfile"
                        :on-success="UploadSuccess"
                        :before-upload="BeforeUpload"
                        :before-remove="BeforeRemove"
                    >
                        <el-button size="small" type="primary">添加厂家价格文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传图片、PDF、和office文件</div>
                    </el-upload>
                <p style="height:1px;border-top:1px solid #ebebeb;"></p>
                <div class="form-add-price-list">
                    <div class="form-add-price-item"
                        v-for="(items ,k) in Form.rows"
                        :key="k"
                    >

                    <span style="height:32px;display: flex;align-items: center">{{k + 1}}、</span>

                    <el-form-item
                        v-for="(mp , mk) in Mappings"
                        :key="mk"
                        :label="mp.value"
                    >
                        <el-input v-if="mp.type != 'select' " v-model="Form.rows[k][mp.key]" />
                        <el-select v-else v-model="Form.rows[k][mp.key]">
                            <el-option v-for="(option, ikey) in mp.options" :key="ikey" :label="option.label" :value="option.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <span class="delete-btn">
                        <el-button
                            type="info"
                            icon="el-icon-delete"
                            size="mini"
                            title="删除"
                            style="height: 32px;width:32px;display:flex;justify-content: center"
                            @click.native="RemoveItem(k)"
                        ></el-button>
                    </span>
                </div>
                </div>
                <p style="margin:0;text-align: center">
                    <el-button type="info" @click.native="AddItem" :disabled="AddItemStatus">增加规格</el-button>
                </p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">重 置</el-button>
                <el-button type="primary" @click.native="submit" :loading="submiting">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {

        data() {
            return {
                Form: {
                    category: "",
                    brand: "",
                    date: "",
                    version_str: "",
                    rows:[],
                    fileid: [],
                    remark: "",
                    freight: 0,
                },
                submiting: false,
                FieldMap: {},
                defaultField: {},
                fileList: [],
                defaultForm: {},
                Mappings: [],
                RowRules:[]
            }
        },
        created() {
            this.defaultForm = Object.assign({}, this.Form);

        },
        methods: {

            /**
             * dialog 关闭事件的回调
             * **/
            handleClose() {
                this.$store.dispatch("SetBaseProductConfig",{field: "Price.PriceMaintenance.visible",value: false});
            },
            resetForm() {
                this.Form = JSON.parse(JSON.stringify(this.defaultForm));
                this.fileList = [];
                this.$refs["form"].clearValidate();
            },
            /**
             * dialog 显示事件的回调
             * **/
            handleOpen() {

            },
            /**
             * 切换分类的时候重置品牌
             * **/
            HandleCategoryChange() {
                this.Form.brand = "";
            },
            /**
             * 切换品牌的时候构建规格字段
             * **/
            HandleBrandChange(id) {
                let mapping = [];
                this.defaultField = {};
                this.brands.forEach((item) => {
                    if (item.value == id)
                        mapping = item.mapping;
                })


                mapping.forEach((item) => {
                     this.defaultField[item.key] = "";
                });

                this.Form.rows = [];
                this.Form.rows.push(JSON.parse(JSON.stringify(this.defaultField)));
                this.Mappings = mapping;

                let rule = this.makeRule();
                mapping.forEach(item => {
                    let o = {};
                    o[item.key] = rule;
                    this.RowRules.push(o);
                });

            },
            makeRule() {
                return [{required: true, trigger:"blur", message:"请选择或输入内容"}];
            },
            /**
             * 价格表上传成功
             * **/
            UploadSuccess(response,file) {
                if (response.status == "success")
                {
                   this.Form.fileid.push({id:response.id,uid:file.uid});
                }
            },
            BeforeUpload(file)
            {
                this.fileList.push(file);
            },
            BeforeRemove(file,fileList)
            {
                this.Form.fileid.forEach((item,index) => {
                    if (item.uid == file.uid)
                        this.Form.fileid.splice(index,1);
                });

                return true;
            },
            /**
             * 表单提交
             * **/
            submit() {

                this.$refs["form"].validate((valid) => {
                    if (valid)
                    {
                        this.$store.dispatch("ProductPriceUpdate",this.Form).then(() => {
                            let response = this.$store.state.user.ProductPriceUpdate;

                            if (response.status == "success")
                            {
                                this.$notify.success("操作成功");
                                this.$store.dispatch("ProductSurfacePriceList",{id:this.Form.brand});
                                this.handleClose();
                            }
                            else {
                                this.$notify.error("操作失败");
                            }

                        });
                    }
                });
            },

            /**
             * 表单字段验证
             * @价格的字段都只能是数字,整数或者小数
             * **/
            validateField(rule, value, callback) {
                console.log(rule);
                if (/^[1-9]+(\.?\d+){0,1}$/.test(value))
                    callback();
                else
                    callback(new Error("请输入数字"));
            },
            /**只可以输入字母和数字**/
            validateVersion(rule, value, callback) {
                if (/^[A-Za-z0-9_\.]*$/.test(value))
                    callback();
                else
                    callback(new Error("只允许输入字母、数字、下划线（ _ ）"));
            },
            /**不能为空**/
            validateNotNull(rule, value, callback) {
                console.log(value)
                if (value != null && value != "") {
                    callback();
                }
                else {
                    callback(new Error("请选择或输入内容"));
                }
            },
            /**
             * 添加一行表单
             * **/
            AddItem() {
                this.Form.rows.push(JSON.parse(JSON.stringify(this.defaultField)));
            },

            /**
             * 删除一行表单
             *
             * @param id Form.rows[id]
             * **/
            RemoveItem(id) {
               this.Form.rows.splice(id,1);
            }
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.PriceMaintenance.visible;
            },
            UploadUrl: function() {
                return this.$appConst.FILE_UPLOAD_URL + "?token="+this.$tool.getter("token");
            },
            categorys: function() {
                let data = [], rows = this.$store.state.user.ProductCategoryList;
                rows.forEach((item) => {
                    data.push({label:item.name,value:item.id});
                });

                return data;

            },
            brands: function() {
                let data = [],
                    row = [],
                    rows = this.$store.state.user.ProductCategoryList;
                rows.forEach((item) => {
                   if (item.id == this.Form.category)
                       row = item.children;
                });

                console.log(row);

                row.forEach((item) => {
                   data.push({label:item.name,value:item.id,mapping: item.fields.mapping});
                });

                return data;
            },
            AddItemStatus: function() {
                if (this.Form.rows.length > 0)
                    return false;
                return true;
            },

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "Maintenance.styl"
</style>
