<!--main 首页组件-->
<template>
    <div class="indexBox">
        <div class="top" v-if="progress.completed !== false">
            <div class="line progress one">
                <el-progress :show-text="false" :stroke-width="30" :percentage="100"></el-progress>
                <div
                    class="txt"
                    :style="{width:'100%'}"
                >年度目标业绩：{{progress.target}}元</div>
            </div>
            <div class="line progress two">
                <el-progress
                    :show-text="false"
                    :stroke-width="30"
                    :percentage="progress.target > 0 ? progress.completed/progress.target*100 : 0"
                ></el-progress>
                <div
                    class="txt"
                    :style="{width: (progress.target > 0 ? progress.completed/progress.target*100 : 'auto') + '%'}"
                >已完成业绩（{{progress.target > 0 ? NumberPercent(progress.completed/progress.target*100) : 0}}%）：{{progress.completed}}元 </div>
            </div>
            <div class="line progress three">
                <el-progress
                    :show-text="false"
                    :stroke-width="30"
                    :percentage="progress.debt_percent"
                ></el-progress>
                <div
                    class="txt"
                    :style="{width: progress.debt_percent > 0 ?  progress.debt_percent + '%' : 'auto'}"
                >欠款{{progress.debt_percent}}%：{{progress.debt}}元</div>
            </div>
        </div>
        <div class="dashboard" v-if="progress.completed !== false">
            <div class="title fx"><span>工作仪表盘</span></div>
            <div class="group fx">
                <div class="fx5 fx L">
                    <div class="fx1 item">
                        <div class="num" style="color:#1890ff;">{{progress.target_client}}</div>
                        <div class="txt">目标客户</div>
                    </div>
                    <div class="fx1 item">
                        <div class="num" style="color:#1bc7e7;">{{progress.report_client}}</div>
                        <div class="txt">报备客户</div>
                    </div>
                    <div class="fx1 item">
                        <div class="num" style="color:#74c374;">{{progress.coop_client}}</div>
                        <div class="txt">合作客户</div>
                    </div>
                    <div class="fx1 item">
                        <div class="num" style="color:#d9534f;">{{progress.lose_client}}</div>
                        <div class="txt">流失客户</div>
                    </div>
                </div>
                <div class="fx5 fx R">
                    <div class="fx1 item">
                        <div class="bt">报价份数</div>
                        <div class="ny">
                            <div class="line fx">
                                <div class="name">品牌报价</div>
                                <div class="val">{{progress.brand_price}}</div>
                            </div>
                            <div class="line fx">
                                <div class="name">既时报价</div>
                                <div class="val">{{progress.rt_price}}</div>
                            </div>
                            <div class="line fx">
                                <div class="name">其他报价</div>
                                <div class="val">{{progress.other_price}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="fx1 item">
                        <div class="bt">标签统计</div>
                        <div class="ny">
                            <div class="line fx">
                                <div class="name">配套机器</div>
                                <div class="val">{{progress.machine}}</div>
                            </div>
                            <div class="line fx">
                                <div class="name">累计送检</div>
                                <div class="val">{{progress.censor}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="fx1 item">
                        <div class="bt">论坛</div>
                        <div class="ny">
                            <div class="line fx">
                                <div class="name">我的帖子</div>
                                <div class="val">{{progress.mynote}}</div>
                            </div>
                            <div class="line fx">
                                <div class="name">我的获赞</div>
                                <div class="val">{{progress.likes}}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- 图表 -->
        <div class="chartWrap" v-loading="chartLoading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="个人业绩" name="first">
                    <div class="chart">
                        <div class="control fx">
                            <div class="dropDown fx1">
                                <el-select
                                    v-model="curPerson"
                                    placeholder="请选择"
                                    @change="onPersonChange"
                                >
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                            <div class="biaoshi" hidden>
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="销售">
                                        <div class="fx">
                                            销售
                                            <div class="xs bar"></div>
                                        </div>
                                    </el-checkbox>
                                    <el-checkbox label="回款">
                                        <div class="fx">
                                            回款
                                            <div class="hk bar"></div>
                                        </div>
                                    </el-checkbox>
                                    <el-checkbox label="累计欠款">
                                        <div class="fx">
                                            累计欠款
                                            <div class="ljqk bar"></div>
                                        </div>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="main">
                            <ve-histogram
                                :data="chartData"
                                :settings="chartSettings"
                                :extend="chartExtend"
                            ></ve-histogram>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="filter">
                <el-date-picker
                    @change="onYearChange"
                    v-model="curYear"
                    type="year"
                    placeholder="选择年"
                ></el-date-picker>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import $ from '../../qing/common.js'
import * as http from '@/util/http.js'
import { Toast } from 'vant';
export default {
    props: {
        mobile: {
            type: Boolean,
            default: false
        }
    },
    data() {
        this.chartSettings = {
            itemStyle: {
                barBorderRadius: [3, 3, 0, 0],
            },

        }
        this.chartExtend = {
            barMaxWidth: 15,
        }
        return {
            progress: {},
            curPerson: '',
            curYear: '',
            options: [],
            activeName: 'first',
            checkList: [],
            chartData: {},
            curYear: $.getCurYear() + '',
            chartLoading: true,
            syncing: false
        }
    },
    created() {
        let self = this
        //获取首页数据
        {
            let url = "index/data"
            http.get(url).then(res => {
                this.progress = JSON.parse(res.row)
                console.log(res.row)
            })
        }

        this.updateUser(() => {
            this.updateChart()
        })





    },
    methods: {
        onPersonChange(e) {
            this.updateChart()
        },
        onYearChange(e) {
            this.curYear = e.getFullYear() + ''
            this.updateChart()
        },
        proStyle(e) {
            let val = this.progress[e]
            console.log(e+' width:'+val);
            if (val < 30) {
                val = 30
            }
            return {
                'width': val + '%'
            }
        },
        updateUser(back = function () { }) {
            let url = "index/user"
            http.post(url).then(res => {
                // $.log('hi')
                // $.log(res)
                let tem = []
                Object.keys(res).forEach(n => {
                    $.log(n, res[n])
                    let item = {
                        value: n,
                        label: res[n]
                    }
                    tem.push(item)
                })
                $.log(tem)
                this.options = tem
                this.curPerson = this.options[0].value

                back()
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        updateChart() {
            this.chartLoading = true
            let self = this
            async function asyncAwaitFn(str) {
                return await new Promise((resolve, reject) => {
                    let url = "index/" + str
                    let data = {
                        created_year: self.curYear,
                        user_id: self.curPerson
                    }

                    http.post(url, data).then(res => {
                        resolve(res.data)
                        console.log(res.data);
                    })
                })
            }
            const parallel = async () => { //并行执行


                const sales = await asyncAwaitFn('sales');
                const received = await asyncAwaitFn('received')
                // 欠款额
                const debt = await asyncAwaitFn('debt')

                //直接打印
                console.log(sales)
                console.log(received)
                console.log(debt)
                let chartData = {
                    columns: ['日期', '销售', '回款', '累计欠款'],
                    rows: []
                }

                sales.forEach((n, i) => {
                    let m = i + 1

                    let ele = {
                        '日期': m + '月',
                        '销售': n,
                        '回款': received[i],
                        '累计欠款': debt[i]
                    }
                    chartData.rows.push(ele)

                })


                this.chartData = chartData

                this.chartLoading = false



            }

            parallel()
        },
        NumberPercent(num) {
            let n = String(parseFloat(num).toFixed(3));

            return Number(n.substring(0,n.length - 1));
        },
        /**同步仪表盘**/
        syncDashboardata() {
            http.post("index/sync").then(res => {
                console.log(res);
            });
        }
    },
    components: {

    }
}
</script>
<style lang="less">
@import "./index.less";
</style>
