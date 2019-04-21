<template>
    <div class="modify-offer-wallpaper" v-if="loaded">
        <el-dialog
            title="修改报价"
            :visible.sync="visible"
            @opened="handleOpen"
            :before-close="handleClose"
            width="30%"
        >
            <el-form :model="Form" label-width="120px" ref="form">
                <el-form-item label="品牌">
                    <div v-if="typeof(row.manager) == 'object'">{{row.manager.brand}}</div>
                </el-form-item>
                <el-form-item label="客户名称">
                    <div>{{row.customer}}</div>
                </el-form-item>
                <el-form-item label="计算公式" prop="operate">
                    <div style="display: flex;">
                        <el-input :value="'面价'" :disabled="true" placeholder="请输入数字" style="flex:1"></el-input>
                        <el-select v-model="Form.operate" style="margin: 0 5px;flex:1">
                            <el-option v-for="(item, key) in operates" :key="key" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-form-item prop="operate_val" style="margin: 0;flex:2" :rules="[{validator:validateField,trigger: 'blur'},{required:true,trigger:'blur',message: '请输入内容'}]">
                            <el-input v-model="Form.operate_val" placeholder="请输入数字">
                                <template slot="append" v-if="row.manager.method.value == 1">元</template>
                                <template slot="append" v-if="row.manager.method.value == 0">百分点</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click.native="submit" :loading="submiting">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ModifyOffer",
        props: {
            row: {
                type: Object
            }
        },
        data() {
            return {
                Form: {
                    operate_val: 0,
                    operate: 1,
                    id: 0,
                },
                submiting: false,
            }
        },
        methods: {
            /**
             * dialog open
             * **/
            handleOpen() {
                this.Form.operate_val = Number(this.row.opval);
                this.Form.operate = Number(this.row.operate.value);
                this.Form.id = this.row.id;
            },
            /**
             * dialog close
             * **/
            handleClose() {
                this.$store.dispatch("SetBaseProductConfig",{field: "Price.ModifyOffer.visible",value: false});
            },
            /**
             * submit
             * **/
            submit() {
                this.$refs["form"].validate((valid) => {
                    if (valid)
                    {
                        this.$store.dispatch("ModifyOffer",this.Form).then(() => {
                            let response = this.$store.state.user.ModifyOffer;

                            if (response.status == "success")
                            {
                                this.$notify.success("修改成功");
                                this.$emit("Reload");
                                this.handleClose();
                            }
                        });
                    }
                });
            },
            validateField(rule, value, callback) {
                if (/^[1-9]+(\.?\d+){0,1}$/.test(value))
                    callback();
                else
                    callback(new Error("请输入数字"));
            },
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.ModifyOffer.visible;
            },
            loaded: function() {
                if (Object.keys(this.row).length === 0)
                    return false;
                return true;
            },
            operates: function() {
                return [
                    {label: "x",value: 1},
                    {label: "÷",value: 2},
                    {label: "+",value: 3},
                    {label: "-",value: 4},
                ];
            },
            operateLabel: function() {
                let label = "";
                this.operates.forEach((item) => {
                    if (item.value == this.Form.operate)
                        label = item.label;
                });

                return label;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
