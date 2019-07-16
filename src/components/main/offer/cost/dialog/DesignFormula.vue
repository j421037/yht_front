<template>
    <el-dialog
        title="设计公式"
        :visible.sync="AppendFormulaDialog"
        :before-close="DialogClose"
        @open="DialogOpen"
        width="40%"
    >
        <div class="AppendFormulaDialog_body">

            <div class="formula-container">
                <div class="add-param">
                    <el-button size="mini" type="info" @click.native="FormulaAddField('field')">增加操作符或字段</el-button>
                    <el-button size="mini" type="info" :disabled="CanAppendNumeric" @click.native="FormulaAddField('numeric')">增加数值</el-button>
                </div>
                <p v-if="refreshStatus">{{AppendFormulaFormTostring}}</p>
                <p class="errmsg" style="font-size:12px;color:red">{{errmsg}}</p>
                <el-form :inline="true" class="FormulaForm">
                    <el-form-item v-for="(item, key) in AppendFormulaForm" :key="key">
                        <el-select v-if="item.type == 'field'" v-model="item.value" @change="FormulaFormParamChanged">
                            <el-option v-for="(it,k) in FormmulaParams" :key="k" :label="it.label" :value="it.value" />
                        </el-select>
                        <el-input v-else v-model="item.value" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="FormulaClearAll">清 空</el-button>
                <el-button @click="RemoveLast">撤销上一步</el-button>
                <el-button type="primary" @click.native="SaveFormula" >保 存</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default {
        name: 'DesignFormula',
        props: {
            tableId: {
                type: Number
            },
            formulaId: {
                type: Number,
                default: 0
            },
            update: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                AppendFormulaForm: [],
                refreshStatus: true,
                errmsg: null,
                loading: false
            }
        },
        computed: {
            AppendFormulaDialog: function() {
                return this.$store.state.user.DialogVisible.designFormula;
            },
            AppendFormulaFormTostring: function() {
                let tmp = "";

                for (let i in this.AppendFormulaForm) {
                    tmp += " " + this.AppendFormulaForm[i].value;
                }

                return tmp;
            },
            CanAppendNumeric: function() {
                if (this.AppendFormulaForm.length > 0) {
                    let row = this.AppendFormulaForm[this.AppendFormulaForm.length - 1];
                    if (row.type == "numeric")
                        return true
                    return false;
                }

                return false;
            },
            FormmulaParams: function() {
                return this.$store.state.user.SignTableParam;
            },

        },
        methods: {
            DialogOpen() {
                if (this.tableId > 0) {
                    this.$store.dispatch("LoadSignTableParam", {tableId:this.tableId});
                }

                if (this.formulaId > 0 && this.update) {
                    this.loading = true;
                    this.$store.dispatch("LoadFormula", {id:this.formulaId}).then(response => {
                        if (response.status == "success") {
                            this.AppendFormulaForm = response.data;
                            console.log(this.AppendFormulaForm)
                        }

                        this.loading =false;
                    })
                }
            },
            DialogClose() {
                this.$store.dispatch("DialogVisible",{designFormula: false});
            },
            FormulaFormParamChanged() {
                this.errmsg = null;
            },
            FormulaClearAll() {
                this.AppendFormulaForm = [];
                this.errmsg = null;
            },
            RemoveLast() {

                this.AppendFormulaForm.pop();
            },
            FormulaAddField(type) {
                this.AppendFormulaForm.push({type: type, value: ""});
            },
            SaveFormula() {

                let items = [];
                let lastItem = [];
                let bracketStack = 0;
                let params = [];
                let FormmulaParams = this.FormmulaParams;

                this.AppendFormulaForm.forEach(item => {
                    params.push(Object.assign({}, item));
                })

                params.map(item => {
                    let row = FormmulaParams.find(it => {return it.value == item.value;});

                    if (row)
                        item.type = row.type;
                    return item;
                });

                let result = params.every(item => {
                    //括号栈
                    if (item.value == "(") //压入
                        ++bracketStack
                    if (item.value == ")") //弹出
                        --bracketStack;

                    if (Object.getOwnPropertyNames(lastItem).length > 0) {

                        if (lastItem.type == "operator" && item.type == "operator") {
                            this.errmsg = "不能连续使用两个运算符";
                            lastItem = item;
                            return false;
                        }

                        if (lastItem.type == "field" && item.type == "field") {
                            this.errmsg = "不能连续使用两个字段"
                            lastItem = item;
                            return false;
                        }

                        if (lastItem.type == "operator" && item.valud == ")")
                        {
                            this.errmsg = '运算符后面不能接括号 ")"';
                            lastItem = item;
                            return false;
                        }

                        if (lastItem.value == "(" && item.type == "operator") {
                            this.errmsg = "运算符前面不能使用括号";
                            lastItem = item;
                            return false;
                        }

                        if ((lastItem.value == "(" && item.value == ")") ) {
                            this.errmsg = "不能连续使用两个括号";
                            lastItem = item;
                            return false;
                        }

                        if ((lastItem.value == ")" && item.type == "field") ) {
                            this.errmsg = "右括号后不可以连接字段";
                            lastItem = item;
                            return false;
                        }
                    }
                    else {
                        if (item.type == "operator") {
                            this.errmsg = "请检查符号的合法性";
                            lastItem = item;
                            return false;
                        }
                    }

                    if (item.type == "numeric") {
                        //前面不能是字段
                        if (item.value == "") {
                            this.errmsg = "输入框内容不能为空"
                            return false;
                        }

                        if (Object.getOwnPropertyNames(lastItem).length > 0 && (lastItem.type == "field" || lastItem.value == ")")) {
                            this.errmsg = "输入内容之前不能是字段和右括号";
                            return false
                        }


                    }

                    lastItem = item;
                    return true;
                });

                if (bracketStack != 0 && result == true) {
                    this.errmsg = "请检查括号的合法性"
                    result = false;
                }
                console.log(params);
                //公式没有问题
                if (result) {
                    let action  = "AppendFormula";

                    if (this.update)
                        action = "UpdateFormula";

                    this.$store.dispatch(action, {params :params, tableId:this.tableId}).then(response => {

                        console.log(response)
                        // if (response.status == "success") {
                        //     let item = {label: response.formula, value: response.id};
                        //     this.FormulaAppendSuccessRows.push(item);
                        //     this.AppendFormulaDialog = false;
                        //     this.Form.formula_id = response.id;
                        // }
                        // else {
                        //     this.errmsg = response.errmsg;
                        // }
                    })
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "MakeOffer.styl"
</style>
