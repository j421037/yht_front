<template>
    <div class="category-create_dialog">
        <el-dialog
            :title="title"
            :visible.sync="CreateVisible"
            width="30%"
            :before-close="handleClose"
            @open="handleOpen"
        >
            <el-form ref="form" :model="Form" :rules="Rules" label-width="120px" >
                <el-form-item label="产品分类名称" prop="name" >
                    <el-input v-model="Form.name" placeholder="请输入分类名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit" :loading="submiting">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            CategoryId: {
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
                Form : {
                    id: "",
                    name: "",
                },
                Rules: {
                    name: [
                        {required: true, trigger: 'blur', message: "请输入分类名称"}
                    ],
                },
                submiting: false
            };
        },
        methods: {
            handleOpen() {
                if (this.update) {
                    let list = this.$store.state.user.ProductCategoryList;
                    let category = list.find(item => {return item.id == this.CategoryId;});
                    this.Form.name = category.name;
                    this.Form.id = category.id;
                }
            },
            handleClose() {
                this.$store.dispatch('SetBaseProductConfig',{field: 'Category.CreateCategoryDialog.visible',value: false});
            },
            LoadProductCategory() {
                this.$store.dispatch("LoadProductCategory");
            },
            submit() {
                this.$refs["form"].validate((valid) => {
                    if (valid)
                    {
                        let action = "ProductCategoryStore"

                        if (this.update) {
                            action = "ProductCategoryUpdate";
                        }

                        this.submiting = true;
                        this.$store.dispatch(action, this.Form).then(() => {
                            let response = this.$store.state.user.ProductCategoryStore;

                            if (response.status == 'success')
                            {
                                this.$notify.success("操作成功");
                                this.LoadProductCategory();
                                this.handleClose();
                                this.$refs["form"].resetFields();
                            }
                            else {
                                this.$notify.error("操作失败");
                            }
                            this.submiting = false;
                        });
                    }
                });
            }
        },
        computed: {
            CreateVisible: function() {
                return this.$store.state.user.BaseProduct.Category.CreateCategoryDialog.visible;
            },
            title: function() {
                if (this.update && this.CategoryId > 0) {
                    return "修改产品分类";
                }

                return "新增产品分类";
            }
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">

</style>
