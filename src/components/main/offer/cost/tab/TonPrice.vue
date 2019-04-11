<template>
    <div class="tonprice-wallpaper">

    </div>
</template>

<script>
    export default {
        name: "TonPrice",
        props: {
            table: {
                type: Object
            }
        },
        created() {
            console.log(this.table.name + " ton")
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
