<!--main 首页组件-->
<template>
  <div class="content">
    <div class="content-box" :class="{'content-box-mobile': mobile}">
      <el-row>
        <div class="ach-info">
          <div class="ach-info-list">
            <div class="ach-info-box">
              <span class="ach-info-box-content">
								<p class="box-title">业绩</p>
								<p class="box-content">{{ achievement }} 元</p>
							</span>
            </div>
          </div>
          <div class="ach-info-list">
            <div class="ach-info-box">
              <span class="ach-info-box-content">
								<p class="box-title">报价</p>
								<p class="box-content">{{ reports }} 份</p>
							</span>
            </div>
          </div>
          <div class="ach-info-list">
            <div class="ach-info-box">
              <span class="ach-info-box-content">
								<p class="box-title">回款</p>
								<p class="box-content">{{ payment }} 元</p>
							</span>
            </div>
          </div>
          <div class="ach-info-list">
            <div class="ach-info-box">
              <span class="ach-info-box-content">
								<p class="box-title">欠款</p>
								<p class="box-content">{{ arrears }} 元</p>
							</span>
            </div>
          </div>
        </div>
      </el-row>
      <el-row>
        <!-- <v-price></v-price> -->
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import echartPrice from './echart_price.vue';

  export default {
    props: {
      mobile: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        achievement: '123,456,78',//业绩
        payment: '786,543,2', //回款
        arrears: '666,666', //欠款
        reports: '888' //报价数量
      }
    },
    created() {

    },
    methods: {},
    components: {
      'v-price': echartPrice
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-breadcrumb__inner
    font-weight: 400;
    color: #606266;

  .content
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .content-box
      padding: 1rem;
      // font-family: 'Rubik';

      .ach-info
        display: flex;
        margin-top: 1.5rem;

        .ach-info-list
          flex: 1;
          width: 23%;
          height: 100px;
          padding-left: 1%;
          padding-right: 1%;

          &:nth-child(1)
            .ach-info-box
              background: #009efb;

          &:nth-child(2)
            .ach-info-box
              background: #7460ee;

          &:nth-child(3)
            .ach-info-box
              background: #55ce63;

          &:nth-child(4)
            .ach-info-box
              background: #ffbc34;

          .ach-info-box
            // background: #fff;
            border-radius: 3px;
            overflow: hidden;
            width: 100%;
            height: 100%;
            display: flex;
            color: #fff;
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);

            .ach-info-box-content
              flex: 1;
              padding: 1rem;
              display: block;

              .box-title
                text-align: center;

              // margin-top: 1.5rem;

              .box-content
                text-align: center;


              p
                margin: 5px 0px;

    .content-box-mobile
      flex: 1;
      overflow: auto;
      margin-top: 20px;
      -webkit-overflow-scrolling: touch;

      .ach-info
        display: block;

        .ach-info-list
          width: 100%;
          margin-top: 15px;

</style>
