<template>
    <div class="initial-list-wapper" >
        <el-table :data="tableData" border class="no-table-shadow" stripe  style="transition: all 0.5s" >
            <el-table-column type="index"  :index="indexMethod"></el-table-column>
            <el-table-column prop="amountfor_format" label="金额" width=150></el-table-column>
            <el-table-column prop="date" label="日期" width="100"></el-table-column>
            <el-table-column prop="type_name" label="类型" width="50"></el-table-column>
            <el-table-column prop="remark" label="备注" width="150">
                <template slot-scope="scope">
                    <el-popover
                        placement="top-start"
                        title="备注"
                        width="200"
                        trigger="hover"
                        :content="scope.row.remark">
                        <span slot="reference" class="text-hidden">{{scope.row.remark}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="操作" >
                <template slot-scope="scope">
                    <el-button type="success" size="mini" v-if="Role.hasRole == true" @click.native="ShowUpdate(scope.row)">修改</el-button>
                    <el-button type="danger"  size="mini" v-if="Role.hasRole == true" @click.native="removeRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-pagination">
            <v-pagination :moduleName="moduleName" :actionName="getActionName" />
        </div>
    </div>
</template>

<script>
    import Pagination from './pagination.vue';
    export default {
        props: {
            moduleName: {
                type: String
            }
        },
        data() {
            return {}
        },
        methods: {
            indexMethod(val) {
                return ++val;
            },
        },
        computed: {
            tableData() {
                return [];
            },
            getActionName: function() {
                return 'Get'+this.moduleName;
            },
            setActionName: function() {
                return 'Set'+this.moduleName;
            }
        },
        components: {
            'v-pagination': Pagination
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
