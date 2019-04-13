<template>
    <div class="maintenance-dialog">
        <el-dialog
            title="价格维护"
            :visible.sync="visible"
            @open="handleOpen"
            :before-close="handleClose"
            width="35%"
        >
            <p style="text-align: center"><span style="margin-right: 15px;">产品分类：{{category}}</span><span>品牌：<template v-if="table">{{table.name}}</template></span></p>
            <el-form :model="Form" ref="form" label-width="60px" class="price-form">
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
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item
                        label="版本号"
                        label-width="80px"
                        prop="version"
                        :rules="{required: true,trigger:'blur',message: '请输入版本号'}"
                    >
                        <el-input v-model="Form.version" placeholder="价格版本"></el-input>
                    </el-form-item>
                </div>
                <p style="height:1px;border-top:1px solid #ebebeb;"></p>
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        :file-list="fileList"
                    >
                        <el-button size="small" type="primary">添加厂家价格文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                <p style="height:1px;border-top:1px solid #ebebeb;"></p>
                <div class="form-add-item"
                    v-for="(items ,k) in Form.rows"
                     :key="k"
                >
                    <span style="height:32px;display: flex;align-items: center">{{k + 1}}、</span>
                    <el-form-item
                        v-for="(item,kk) in items"
                        :key="kk"
                        :label="FieldMap[kk]"
                        required
                        :prop="'rows['+k+'].'+ kk.toString()"
                        :rules="{validator: validateField,trigger:'blur'}"
                    >
                        <el-input v-model.trim="Form.rows[k][kk]"></el-input>
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
                <p style="margin:0;text-align: center">
                    <el-button type="info" @click.native="AddItem">增加规格</el-button>
                </p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click.native="submit" :loading="submiting">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        props: {
            category: {
                type: String
            },
            table: {
                type: Object,
            }
        },
        data() {
            return {
                Form: {
                    date: new Date,
                    version: "",
                    rows:[],
                },
                submiting: false,
                FieldMap: {},
                defaultField: {},
                fileList: []
            }
        },

        methods: {
            /**
             * dialog 关闭事件的回调
             * **/
            handleClose() {
                this.$store.dispatch("SetBaseProductConfig",{field: "Price.PriceMaintenance.visible",value: false});
                this.Form.rows = [];
            },

            /**
             * dialog 显示事件的回调
             * **/
            handleOpen() {
                this.table.field.forEach((item) => {
                    this.defaultField[item.field] = "";
                    this.FieldMap[item.field] = item.description;
                });
                this.Form.rows = [];
                this.defaultField.price = "";
                this.FieldMap.price = "价格";
                this.Form.rows.push(JSON.parse(JSON.stringify(this.defaultField)));
            },

            /**
             * 表单提交
             * **/
            submit() {
                console.log(this.Form)
                this.$refs["form"].validate((valid) => {

                });
            },

            /**
             * 表单字段验证
             * @所有价格相关的字段都只能是数字,整数或者小数
             * **/
            validateField(rule, value, callback) {
                if (/^[1-9]+(\.?\d+){0,1}$/.test(value))
                    callback();
                else
                    callback(new Error("请输入数字"));
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
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.price-form
    .form-add-item
        display: flex;
        justify-content: space-between;
        .delete-btn
            margin-left: 5px;
</style>
