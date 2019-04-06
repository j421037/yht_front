<template>
    <div class="category-create_dialog">
        <el-dialog
            title="新增产品分类"
            :visible.sync="CreateVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form ref="form" :model="Form" :rules="Rules" label-width="120px" >
                <el-form-item label="产品分类名称" prop="name" >
                    <el-input v-model="Form.name" placeholder="请输入分类名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Form : {
                    name: "",
                },
                Rules: {
                    name: [
                        {required: true, trigger: 'blur', message: "请输入分类名称"}
                    ],
                }
            };
        },
        methods: {
            handleClose() {
                this.$store.dispatch('SetBaseProductConfig',{field: 'Category.CreateCategoryDialog.visible',value: false});
            }
        },
        computed: {
            CreateVisible: function() {
                return this.$store.state.user.BaseProduct.Category.CreateCategoryDialog.visible;
            },

        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">

</style>
