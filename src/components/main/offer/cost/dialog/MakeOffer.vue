<template>
    <div class="makeoffer-wallpaper">
        <el-dialog
            title="开始报价"
            :visible.sync="visible"
            @open="handleOpen"
            :before-close="handleClose"
            width="30%"
        ></el-dialog>
    </div>
</template>

<script>
    export default {
        name: "MakeOffer",
        methods: {
            /**
             * 关闭事件
             * **/
            handleClose() {
                this.$store.dispatch("SetBaseProductConfig",{field: "Price.MakeOffer.visible",value: false});
            },
            /**打开事件**/
            handleOpen() {}
        },
        computed: {
            visible: function() {
                return this.$store.state.user.BaseProduct.Price.MakeOffer.visible;
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
