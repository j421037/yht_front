<template>
	<div class="filter-wapper">
		<section>
			<div class="button-group">
				<el-button type="primary" size="mini" @click.native="ShowDialog({FilterVisible:true})">过滤</el-button>
			</div>
			<div class="fast-query">
				<div>
                    <el-autocomplete placeholder="快速查询你需要的内容" :fetch-suggestions="querySearchAsync" @select="resultSelect" v-model="form[0].value" class="input-with-select">
                        <el-select v-model="form[0].field" slot="prepend" placeholder="请选择" @change="fieldChange">
                            <el-option label="客户名称" value="customer_name"></el-option>
                            <el-option label="项目名称" value="project_name"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click.native="querySearch"></el-button>
                    </el-autocomplete>
                </div>
                <div class="sort-box">
                    <el-radio-group v-model="sort_val" @change="sortChange">
                        <el-radio :label="0">默认</el-radio>
                        <el-radio :label="1">欠款最多</el-radio>
                        <el-radio :label="2">时间最长</el-radio>
                        <el-radio :label="3">合作最多</el-radio>
                    </el-radio-group>
                </div>
			</div>
		</section>
		<section class="action-tool">
            <div></div>
			<div class="checkbox-group" v-if="this.tabPosition == 'cooperate'">
				<el-checkbox v-model="config.sale" @change="checkBoxHandle">销售</el-checkbox>
				<el-checkbox v-model="config.receive" @change="checkBoxHandle">回款</el-checkbox>
				<el-checkbox v-model="config.balance" @change="checkBoxHandle">欠款</el-checkbox>
                <el-checkbox v-model="config.refund" @change="checkBoxHandle">退货</el-checkbox>
				<el-checkbox v-model="config.init" @change="checkBoxHandle">期初</el-checkbox>
			</div>
		</section>
	</div>
</template>
<script>
export default{
	data() {
		return {
			tabPosition: 'cooperate',
			config: {
				sale: true,
				receive: false,
				balance: false,
				init: false,
                refund: false
			},
			form: [
				{
					field: "customer_name",
					value: "",
					operator: 8,
					logic: 1
				}
			],
            sort_val: 0
		}
	},
	methods: {
		init: function() {
			this.setTable();
		},
		setTable: function() {
			this.$store.dispatch('SetARTable', this.tabPosition);
		},
		tabHandle(tab) {
			this.setTable();
		},
		checkBoxHandle() {
			this.$store.dispatch('AlterTableConfig', this.config);
		},
		ShowDialog(obj) {
			this.$store.dispatch('AlterTableConfig', obj);
		},
        fieldChange() {
            this.form[0].value = "";
        },
        querySearchAsync(keyword, cb) {
		    if (keyword.length > 0) {
		        let key = this.form[0].field;

                this.$store.dispatch("queryArrear", {word: keyword, key: key}).then((response) => {
                    if (response.status == "success") {
                        cb(response.data[key]);
                    }
                });
            }
            cb([]);
        },
        resultSelect(val) {
		    this.querySearch();
        },
        sortChange(val) {
		    this.querySearch();
        },
		querySearch() {
		    // console.log(this.form);return;
			this.$store.dispatch('updateFilterQueryParam', {conf: this.form, initialization: false,sortval: this.sort_val}).then(() => {
				this.$store.dispatch('ARSum', this.$store.state.user.filterQuery);
			});
		}
	},
	created() {
		this.init();
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
@import "action.styl";
</style>
