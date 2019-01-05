<template>
  <div class="contents">
        <bm-back></bm-back>
        <div class="betRecord">
          <div class="record1 fl">下注记录</div>
          <div class="record2 fr">已下注<span class="black">{{dataList.sumLotterMoney}}钻</span></div>
        </div>
        <scroller
        :on-infinite="infinite">
        <div style="height: 90px;"></div>
          <div class="listData clearfix" v-for="(item, index) in assetsList" :key="index">
            <div class="fl listTime">
              <span>{{item.create_time}}</span>
              <span>{{item.lotter_result}}</span>
            </div>

            <div class="fr listNum clearfix">
              <div class="fl betLine">
                <span class="spa1">下注</span>
                <span class="spa2">-{{item.lotter_money}}钻</span>
              </div>
            </div>
          </div>
        </scroller>

  </div>
</template>

<script>
import {getGuessList} from 'api/worldcup'
export default {
  data () {
    return {
      assetsList: [],
      pageNum: 1,
      numPerPage: 10,
      one: 2,
      dataList: {}
    }
  },
  methods: {
    guessList () {
      return new Promise((resolve, reject) => {
        getGuessList({pageNum: this.pageNum, numPerPage: this.numPerPage, lotteryId: this.$route.query.id}).then(response => {
          var data = response.data
          if (Number(data.code) === 200) {
            this.dataList = data.data
            if (data.data.investLog.length) {
              resolve()
              this.assetsList = [...this.assetsList, ...data.data.investLog]
            } else {
              reject(new Error('没有更多数据！'))
            }
          }
        }).catch(errortip => {})
      })
    },
    infinite (done) {
      this.pageNum++
      setTimeout(() => {
        this.guessList().then(k => {
          done()
        }).catch(k => {
          done(true)
        })
      }, 800)
    }
  },
  mounted () {
    this.guessList()
  }
}
</script>

<style lang="scss" scoped>
  .contents{

  }
  .black{
    color:#000000;
  }
  .betRecord{
    width: 100%;
    height: 46px;
    line-height: 46px;
    font-size: 12px;
    color: #8F8F8F;
  }
  .record1{
    padding-left: 5%;
  }
  .record2{
    padding-right: 5%;
  }
  .incomeList{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    border-top:1px solid #1B1F46;
  }
  .listData{
    height:45px;
    padding:10px 5% 5px 5%;
    border-bottom:1px solid#f4f6f9;
    background: #fff;
  }
  .listTime{
    width:50%;
    span{
      display:block;
      line-height:22px;
    }
    span:nth-child(1){
      font-size: 12px;
      color: #8F8F8F;
    }
    span:nth-child(2){
      font-size:14px;
      color:#000000;
    }
  }
  .listNum{
    width: 50%;
    font-size: 14px;
    color: #8F8F8F;
    line-height:42px;
  }
  .moreMsg{
    width: 9px;
    height: 15px;
    margin-top: 13px;
    margin-left: 7px;
    background: url(/static/images/moreMsg.png) no-repeat;
    background-size: cover;
    // margin-right: 10px;
  }
  .listNote{
    font-size: 12px;
    color: #556CB5;
    text-align:center;
    line-height:60px;
  }
  .betLine{
    width:100%;
    height: 60px;
    text-align: right;
    span{
      display:block;
      line-height:22px;
    }
    .spa1{
      font-size: 12px;
      color: #8F8F8F;
    }
    .spa2{

      font-size:14px;
      color:#000000;
    }
    .blue{
      color:#0081FF;
    }
  }
</style>
