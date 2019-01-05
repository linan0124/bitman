<template>
<div class="content">
    <div class="champion">
      <div class="header-arrow" @click="goBack"></div>
    </div>
    <!-- <bm-back></bm-back> -->
    <div class="result topBlock">
      <div class="match">{{resultList.firstTeam}} - {{resultList.secondTeam}}</div>
      <div class="matchTime">{{resultList.overTime}}</div>
      <div class="score">{{resultList.result}}</div>
    </div>
    <div class="betList topBlock">
      <div class="betList_Name fl">下注</div>
      <div class="betList_number fr">总奖金：<span class="blue">{{resultList.potAccount}}钻</span></div>
    </div>
    <!-- 结果已出 -->
    <div class="betBox topBlock" >
      <div class="betLine" v-for="(item,index) in resultList.listInvestAward" :key="index">
        <div class="betFl fl">
          <div class="flTime">下注金额</div>
          <div class="flScore">-{{item.lotter_money}}钻</div>
        </div>
        <div class="betFr fr">
          <div class="frTxt">奖金</div>
          <div class="frDiamond blue">{{item.awarded_money}}钻</div>
        </div>
      </div>
    </div>
        <div class="betRecord topBlock">
          <div class="record1 fl">下注记录</div>
          <div class="record2 fr">已下注<span class="black">{{detailList.sumLotterMoney}}钻</span></div>
        </div>
        <scroller
        :on-infinite="infinite">
        <div style="height: 275px;" v-if="resultList.listInvestAward==''"></div>
        <div style="height: 320px;" v-if="resultList.listInvestAward!=''"></div>
          <div class="listData clearfix" v-for="(item, index) in assetsList" :key="index">
            <div class="fl listTime">
              <span>{{item.create_time}}</span>
              <span>{{item.lotter_result}}</span>
            </div>

            <div class="fr listNum clearfix">
              <div class="fl betLines">
                <span class="spa1">下注</span>
                <span class="spa2">-{{item.lotter_money}}钻</span>
              </div>
            </div>
          </div>
        </scroller>
    <div class="bottom"></div>
  </div>
</template>

<script>
import {getAwardDetail, getGuessList} from 'api/worldcup'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      resultList: {},
      detailList: {},
      assetsList: {},
      pageNum: 1,
      numPerPage: 10
    }
  },
  methods: {
    getList () {
      getAwardDetail({lotteryId: this.$route.query.id}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.resultList = data.data
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    // getHistoryDetail () {
    //   getGuessList({lotteryId: this.$route.query.id}).then(response => {
    //     var data = response.data
    //     if (data.code === '200') {
    //       this.detailList = data.data
    //     } else if (data.code === '500') {

    //     }
    //   }).catch(errortip => {})
    // },
    getHistoryDetail () {
      return new Promise((resolve, reject) => {
        getGuessList({pageNum: this.pageNum, numPerPage: this.numPerPage, lotteryId: this.$route.query.id}).then(response => {
          var data = response.data
          if (Number(data.code) === 200) {
            this.detailList = data.data
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
        this.getHistoryDetail().then(k => {
          done()
        }).catch(k => {
          done(true)
        })
      }, 800)
    },
    goBack () {
      this.$router.go(-1)
      // if (judgeClient) {
      //   this.$router.go(-1)
      //   // this.$router.push('/historyList')
      // } else {
      //   ClientObject.goBack()
      // }
    }

  },
  mounted () {
    this.getList()
    this.getHistoryDetail()
  }
}
</script>

<style lang="scss" scoped>
  .content{
    background: #F4F6F9;
    height: 650px;
  }
  .bottom{
    width: 100%;
    height: 52px;
  }
  .champion{
    height: 24px;
    padding: 10px 5%;
    position: relative;
    z-index: 1000;
    background: #532E95;
  }
  .header-arrow{
    width:12px;
    height:21px;
    display:block;
    background:url('/static/images/back.png') no-repeat;
    background-size:100%;
    float:left;
  }
  .topBlock{
    position: relative;
    z-index:10000;
  }
.result{
  width: 100%;
  height: 120px;
  background: #FFFFFF;
  .match{
    font-size: 14px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    padding-top: 15px;
  }
  .matchTime{
    font-size: 12px;
    color: #8F8F8F;
    letter-spacing: 0;
    text-align: center;
    padding-top: 5px;
  }
  .score{
    height: 40px;
    font-size: 36px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
    padding-top: 10px;
    font-weight: bold;
  }
}
.betList{
  width: 100%;
  height: 46px;
  background:#F4F6F9;
  font-size: 12px;
  color: #8F8F8F;
  line-height: 46px;
}
.betList_Name{
  padding-left: 5%;
}
.betList_number{
  padding-right: 5%;
}
.betBox{
  width: 100%;
  background: #fff;
}
.betLine{
  width: 90%;
  height: 60px;
  margin: 0 auto;
  border-bottom: 1px solid #F4F6F9;
  .betFl {
    width: 50%;
    height: 60px;
    text-align: left;
    // padding-left: 5%;
    .flTime{
      font-size: 12px;
      color: #8F8F8F;
      padding-top: 10px;
    }
    .flScore{
      font-size: 14px;
      color: #303030;
      padding-top: 8px;
    }
  }
  .betFr{
    width: 50%;
    height: 60px;
    .frTxt{
      font-size: 12px;
      color: #8F8F8F;
      text-align: right;
      padding-top: 10px;
    }
    .frDiamond{
      font-size: 14px;
      color: #303030;
      padding-top: 8px;
      text-align: right;
    }
    .blue{
      color:#0081FF;
    }
  }
}
// 奖池
.jackpotTitle{
  width:94%;
  height: 46px;
  background: #F4F6F9;
  line-height: 46px;
  font-size: 12px;
  color: #1F1F1F;
  margin: 0 auto;
}
.txtGray{
 color: #A0A0A0;
}
.gameBox{
  width: 100%;
  background: #fff;
}
.gameBet{
  width: 94%;
  height: 60px;
  margin: 0 auto;
}
.betPeople{
  font-size: 10px;
  color: #8F8F8F;
  padding-top: 8px;
}
.betScore{
  font-size: 24px;
  color: #1F1F1F;
  line-height: 34px;
  margin-right: 28px;
}
.betScore1{
  font-size: 24px;
  color: #8F8F8F;
  line-height: 34px;
  margin-right: 28px;
}
.betBlock{
  width: 100%;
}
.betBlock1{
  width: 100%;
}
.betBar{
  width: 80%;
}
.progressBar{
  width: 100%;
  background: #F4F6F9;
  height: 5px;
  border-radius: 5px;
  margin-top: 7px;
}
.fill{
  width: 0%;
  background: #4CA7FF;
  border-radius: 5px;
  height: 5px;
  position: relative;
}
.sums{
   position: absolute;
  top:-20px;
  left: 0;
  color: #0081FF;
  min-width:200px;
  text-align: left;
}
.fill1{
  width: 0%;
  background: #E6E6E6;
  border-radius: 5px;
  height: 5px;
  position: relative;
}
.sums1{
  position: absolute;
  top:-20px;
  right: -10px;
  min-width:50px;
  text-align: right;
}
.betBottom{
  font-size: 10px;
  color: #000000;
  margin-top: 7px;
}
.betBottom1{
  font-size: 10px;
  color: #E6E6E6;
  margin-top: 7px;
}
.bottomLine{
  width: 90%;
  height: 1px;
  background: #F4F6F9;
  margin: 0 auto;
}
.blue{
    color:#0081FF;
  }
  // 下注记录
   .black{
    color:#000000;
  }
  .betRecord{
    width: 100%;
    height: 46px;
    background:#F4F6F9;
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
  .betLines{
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
