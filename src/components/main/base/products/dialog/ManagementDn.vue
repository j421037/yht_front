<template>
    <div class="dialog-management-dn">
        <el-dialog
            title="规格管理"
            :visible.sync="Visible"
            width="35%"
            :before-close="handleClose"
            @open="handleOpen"
        >
            <el-alert type="error" v-if="errmsg" :title="errmsg" style="margin-bottom: 8px;"></el-alert>

            <el-alert :closable="false" type="info">
                <p style="font-weight:bold">
                    <span>分类：</span>
                    <em>{{category}}</em>
                </p>
                <p style="font-weight:bold">
                    <span>品牌：</span>
                    <em>{{brand}}</em>
                </p>
            </el-alert>
            <el-form
                :model="form"
                label-width="80px"
                :rules="formRules"
                ref="form"
                style="margin-top: 10px"
            >
                <el-form-item prop="spec" label="规格(DN)">
                    <el-input v-model="form.spec">
                        <template slot="append">
                            <el-button @click.native="AddItem">添加</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <transition name="el-zoom-in-top">
                <div style="text-align: center;transition: all 0.3s" v-show="showResponse">
                    <span style="display: block;width:50%;margin: 0 auto;">
                        <el-alert :type="responseType" show-icon>{{responseMsg}}</el-alert>
                    </span>
                </div>
            </transition>

            <p style="transition: all 0.3s">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </p>
            <transition name="el-zoom-in-top" v-if="checkBoxShow" >
                <el-checkbox-group v-model="dns" @change="handleCheckedDnsChange" >
                    <el-checkbox
                        v-for="(it,key) in items"
                        :label="it.label"
                        :value="it.value"
                        :key="key"
                    ></el-checkbox>
                </el-checkbox-group>
            </transition>
            <p>
                <el-button type="primary" :disabled="deleteDisable" @click.native="deleteDn">删除</el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'ManagementDn',
        props: {
            tableId: {
                type: Number,
                default: 0
            },
            category: {
                type: String,
                default: null
            },
            brand: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                dns: [],
                form: {
                    table_id: null,
                    spec: null,
                },
                formRules: {
                    spec: [
                        {required: true, trigger: "blur", message: "请输入规格名称"}
                    ]
                },
                isIndeterminate: true,
                checkAll: false,
                errmsg: null,
                responseMsg: null,
                responseType: null,
                showResponse: false,
            }
        },
        computed: {
            Visible: function () {
                return this.$store.state.user.DialogVisible.managementDn;
            },
            items: function() {
                return this.$store.state.user.ProductSpecs;
            },
            deleteDisable() {
                if (this.dns.length > 0)
                    return false;
                return true;
            },
            checkBoxShow: function() {
                if (this.items.length > 0)
                    return true
                return false;
            }
        },
        methods: {
            handleClose() {
                this.$store.dispatch("DialogVisible",{managementDn: false});
            },

            handleOpen() {
                if (this.tableId) {
                    this.form.table_id = this.tableId;
                    this.errmsg = null;
                    this.LoadDns();
                }
                else
                    this.errmsg = "参数不完整，请重新打开";
                this.dns = [];
            },
            LoadDns() {
                this.dns = [];
                this.checkAll = false;
                this.isIndeterminate = true;
                this.$store.dispatch("ProductSpecAll", {table_id: this.tableId});
            },

            handleCheckAllChange(val) {
                let collects = [];
                this.items.forEach(item => {collects.push(item.label);});

                this.dns = val ? collects : [];
                this.isIndeterminate = false;

            },
            handleCheckedDnsChange(val) {
                let count = val.length;

                this.checkAll = count === this.items.length;

                this.isIndeterminate = count > 0 && count < this.items.length;

            },
            AddItem() {
                this.$refs["form"].validate(valid => {

                   if (valid && this.form.table_id) {

                       this.$store.dispatch("ProductSpecAdd", this.form).then(response => {
                            if (response.status == "success") {
                                this.showMsg(response.status, "操作成功");
                                this.$refs["form"].resetFields();
                                this.LoadDns();
                            }
                            else {
                                this.showMsg("error", response.errmsg);
                            }
                       });
                   }
                });
            },
            showMsg(type, message) {
                this.showResponse  = true;
                this.responseType = type;
                this.responseMsg = message;
                setTimeout(() => {
                    this.showResponse = false;
                }, 2500);
            },
            deleteDn() {
                if (this.dns.length < 1)
                    return false;
                let targets = [];

                this.dns.forEach(item => {
                    let row = this.items.find(it => {return it.label == item});

                    if (row && typeof (row) != "undefined")
                        targets.push(row.value);
                });

                if (targets.length > 0) {
                    let ids = targets.join(",");

                    this.$store.dispatch("ProductSpecDelete", {id: ids}).then(response => {
                        if (response.status == "success") {
                            this.showMsg(response.status, "操作成功");
                            this.LoadDns();
                        }
                        else {
                            this.showMsg("error", response.errmsg);
                        }
                    })
                }

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
