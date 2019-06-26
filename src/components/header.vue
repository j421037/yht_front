<template>
    <div class="header-wapper">
        <div class="navbar">
            <div class="hamburger-container">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691"
                     xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" class="hamburger "
                     @click="shrinkMenu" :class="{'is-active': shrink}">
                    <path data-v-2fe8a492=""
                          d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
                          p-id="1692"></path>
                    <path data-v-2fe8a492=""
                          d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
                          p-id="1693"></path>
                    <path data-v-2fe8a492=""
                          d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"></path>
                </svg>
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item>{{this.$store.state.user.Breadcrumb[0]}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{this.$store.state.user.Breadcrumb[1]}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="right-menu">
                <ul>
                    <li class="right-menu-item">
                        <el-tooltip class="item" effect="dark" content="设置" placement="bottom">
                            <i class="el-icon-setting" style="font-size: 24px;" @click="SetDialogVisible = true"></i>
                        </el-tooltip>
                    </li>
                    <li class="right-menu-item  ">
                        <el-tooltip class="item" effect="dark" content="修改密码" placement="bottom">
                            <i class="iconfont icon-mima" @click="updatePasswd"></i>
                        </el-tooltip>
                    </li>
                    <li class="right-menu-item  " @click="logout">
                        <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
                            <i class="iconfont icon-tuichu"></i>
                        </el-tooltip>
                    </li>
                    <li class="right-menu-item avatar-container ">
                        <el-popover
                            placement="top-start"
                            title="个人资料"
                            width="200"
                            trigger="hover"
                            :content="this.$store.state.user.userInfo.name + ' - ' +this.$store.state.user.userInfo.department">

                            <img slot="reference"
                                 :src="this.$store.state.user.userInfo.headimg ? this.$store.state.user.userInfo.headimg : 'https://e.yhtjc.com/v2/public/img/default.gif'">
                        </el-popover>
                    </li>
                </ul>

            </div>
        </div>
        <div class="tags-view-container">
			<span class="tags-view-item" v-for="(item, key) in history" :key="key"
                  :class="{active: item.path == $route.path}" @click="GoPath(item.path)">
				{{item.name}}
				<span class="el-icon-close" @click.stop="removeHistory(item.path)"></span>
			</span>
        </div>
        <el-dialog
            title="修改密码"
            :visible.sync="passwdVisible"

            width="30%"
        >
            <el-form :model="Form" :rules="Rules" style="width: 100%" ref="Form">
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="passwd">
                    <el-input type="password" v-model.trim="Form.passwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPasswd">
                    <el-input type="password" v-model.trim="Form.checkpasswd" placeholder="再次输入密码"></el-input>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
		   		<el-button @click="Close">取 消</el-button>
			    <el-button type="primary" @click.native="submitForm">提 交</el-button>
			</span>
        </el-dialog>

        <el-dialog
            title="设置"
            :visible.sync="SetDialogVisible"

            width="30%"
        >
            <el-form :model="SetForm" ref="SetForm" label-width="80px" :rules="SetFormRules">
                <el-form-item label="个人目标" prop="target">
                    <el-input v-model="SetForm.target">
                        <template slot="append">万</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="年度" prop="year">
                    <el-date-picker
                        v-model="SetForm.year"
                        type="year"
                        format="yyyy"
                        placeholder="选择年">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
		   		<el-button @click="SetDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click.native="submitSetForm">提 交</el-button>
			</span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                formLabelWidth: '120px',
                passwdVisible: false,
                Form: {
                    passwd: '',
                    checkpasswd: ''
                },
                Rules: {
                    passwd: [
                        {required: true, trigger: 'blur', message: '请输入密码'},
                        {validator: this.checkPasswdLen, trigger: 'blur'}
                    ],
                    checkPasswd: [
                        {required: true, trigger: 'blur', message: '请输入密码'},
                        {validator: this.checkPasswd, trigger: 'blur'},
                        {validator: this.checkPasswdLen, trigger: 'blur'}
                    ]
                },
                SetDialogVisible: false,
                SetForm: {
                    target: 0,
                    year: new Date()
                },
                SetFormRules: {
                    target: [
                        {required: true, trigger: "blur", message: "请输入目标"},
                        {validator: this.checkIsNum, trigger: "blur"}
                    ],
                    year: [
                        {required: true, trgger: "blur", message: "请选择年", type: "date"}
                    ]
                }
            }
        },
        methods: {
            init() {
                this.$store.dispatch('getUserInfo');
            },
            GoPath(path) {
                if (this.$route.path != path) {
                    this.$router.push(path);
                }
            },
            removeHistory(path) {
                this.$store.dispatch('RemoveHistory', path);
            },
            shrinkMenu() {
                this.$store.dispatch('ShrinkStatus');
            },
            logout() {
                this.$store.dispatch('logout');
            },
            updatePasswd() {
                this.passwdVisible = true;
            },
            checkPasswd(rule, value, callback) {
                if (value !== this.Form.passwd) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            },
            checkPasswdLen(rule, value, callback) {
                if (value.length < 6) {
                    callback(new Error('密码长度不能小于6位'));
                } else {
                    callback();
                }
            },
            checkIsNum(rule, value, callback) {
                if (/^[0-9]+\.{0,1}[0-9]+$/.test(value)) {
                    callback();
                }
                else {
                    callback(new Error("请输入数字"));
                }
            },
            Close() {
                this.passwdVisible = false;
            },
            submitForm() {
                this.$refs['Form'].validate((valid) => {
                    this.$store.dispatch('AuthUpdatePasswd', this.Form).then(() => {
                        let response = this.$store.state.user.AuthUpdatePasswd;

                        if (response.status == 'success') {
                            this.$notify.success('操作成功');
                            this.Form.passwd = '';
                            this.Form.checkpasswd = '';
                            this.$refs['Form'].resetFields();
                        } else {
                            this.$notify.error('操作失败' + response.errmsg);
                        }

                        this.passwdVisible = false;
                    });
                });
            },
            submitSetForm() {
                this.$refs["SetForm"].validate(valid => {
                    if (valid) {
                        this.$store.dispatch("updateTarget", this.SetForm).then(() => {
                            let response = this.$store.state.user.updateTarget;
                            this.SetDialogVisible = false;

                            if (response.status == "success") {
                                this.$message.success("操作成功");
                                //this.$refs["SetForm"].resetFields();

                            }

                            else {
                                this.$message.error("操作失败,"+response.errmsg);
                            }
                        });
                    }
                });
            },
            LoadTarget() {
                this.$store.dispatch("LoadTarget").then(response => {
                    this.SetForm.target = response.data.target;
                    this.SetForm.year = new Date(response.data.year);
                });
            },
        },
        created() {
            this.init();
            this.LoadTarget();
        },
        computed: {
            history: function () {
                return this.$store.state.user.historyMenu;
            },
            shrink: function () {
                return this.$store.state.user.ShrinkStatus;
            },

        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
    .header-wapper
        position: relative;
        width: 100%;
        height: 100%;
        background: #fff;

        .navbar
            height: 40px;
            display: flex;
            justify-content: space-between;
            line-height: 50px;

            .hamburger-container
                padding: 0 10px;
                height: 40px;
                display: flex;
                align-items: center;
                transition: all 0.5s;

                svg
                    cursor: pointer;
                    height: 20px;
                    transform-origin: 50% 50%;
                    width: 20px;
                    transition: all 0.38s cubic-bezier(1, .09, .21, 1.09);
                    transform: rotate(0deg);

                .breadcrumb
                    margin-left: 15px;

                .is-active
                    transform: rotate(90deg);

            .right-menu
                ul
                    display: flex;

                    .right-menu-item
                        margin: 0 8px;
                        display: flex;
                        cursor pointer;
                        align-items: center;

                        .iconfont
                            font-size: 24px;
                            cursor: pointer;

                    .avatar-container
                        margin-right: 30px;
                        /*margin-top: 5px;*/
                        span
                            height: 50px;
                            width: 40px;
                            display: flex;
                            align-items center;
                            img
                                width: 40px;
                                height: 40px;
                                border-radius: 10px;

        .tags-view-container
            height: 30px;
            width: 100%;
            position: relative;
            //box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
            //border-top: 1px solid #ebebeb;
            border-bottom: 1px solid #ebebeb;

            .tags-view-item
                background: #fff;
                border: 1px solid #d8dce5;
                font-size: 12px;
                color: #495060;
                height: 24px;
                display: inline-block;
                margin-left: 5px;
                margin-top: 4px;
                padding: 0 8px;
                position: relative;
                line-height: 24px;
                cursor: pointer;
                transition: all 0.5s;

                .el-icon-close
                    border-radius: 50%;
                    width: 16px;
                    height: 16px;
                    text-align: center;
                    transform-origin: 100% 50%;
                    transition: all .3s cubic-bezier(.645, .045, .355, 1);
                    vertical-align: 2px;
                    margin-left: 16px;

                    &::before
                        content: "\E60F";
                        display: inline-block;
                        transform: scale(0.6);
                        vertical-align: -3px;

                    &:hover
                        background: rgb(180, 188, 204);

                        &::before
                            color: #fff;

            .active
                background: #42b983;
                border: #42b983;
                color: #fff;
                font-weight: 600;

                &::before
                    background: #fff;
                    border-radius: 50%;
                    content: "";
                    display: inline-block;
                    height: 8px;
                    width: 8px;
                    margin-left: 2px;
                    margin-right: 2px;
                    position: relative;
</style>
