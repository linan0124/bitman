<template>
  <div class="content">
    <div class="preCon">
      <div class="header">
         <div class="header-arrow" @click="goBack"></div>
      </div>
      <div class="teamPic clearfix">
        <div class="teamLogo fl"><img :src="this.$route.query.firstTeamUrl" alt="" class="huangma"></div>
        <div class="teamLogo fr"><img :src="this.$route.query.secondTeamUrl" alt="" class="liwupuLogo"></div>
        <!-- <div class="teamLogo fl"><img src="static/images/tips01.png" alt="" class="huangma"></div>
        <div class="teamLogo fr"><img src="static/images/tips02.png" alt="" class="liwupuLogo"></div> -->
      </div>
      <div class="fightline clearfix">
        <div class="fightLine1 fl">{{this.$route.query.firstTeam}}</div>
        <div class="fightLine2 fl">VS</div>
        <div class="fightLine3 fl">{{this.$route.query.secondTeam}}</div>
      </div>
      <div class="line"></div>
      <div class="conBox clearfix">
          <div id="myChart" class="fl"></div>
          <div class="winRate">{{maxNumber}}</div>
          <div class="winTxt">{{assetsList.SpfRecommendation}}</div>
          <div class="fl fullBox">
            <div class="fullPre">全场预测：</div>
            <div class="fullPreTxt">{{assetsList.SpfRecommendation}}</div>
            <div class="scorePre">比分预测：</div>
            <div class="scorePreTxt">{{assetsList.BfRecommendation}}</div>
            <!-- <div class="scorePreTxt">2:1</div> -->
          </div>
      </div>
      <div class="provide">以上数据由足彩加提供</div>
      <div class="obtainTime">数据获取时间：<span class="blue">{{currentdate}}</span></div>
   </div>
   <div class="SoccerBetting clearfix">
     <div class="fl clearfix">
        <img src="static/images/bettingImg.png" alt="" class="bettingImg fl">
        <div class="companyName fl">足彩加</div>
        <div class="comIntro fl">--基于全球大数据的专业足球赛事预测平台</div>
     </div>
     <div class="fr downloadTxt" @click="getLink">下载</div>
   </div>

 </div>
</template>

<script>
import {getGameResult, getHref} from 'api/worldcup'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      assetsList: [],
      option: {},
      maxNumber: '',
      currentdate: ''
    }
  },
  methods: {
    // 赛果查询
    gameResultList () {
      getGameResult({firstTeam: encodeURI(this.$route.query.firstTeam), secondTeam: encodeURI(this.$route.query.secondTeam)}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.assetsList = data.data
          this.option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'horizontal',
              x: 'center',
              y: 'bottom',
              data: ['胜', '平', '负']
            },
            series: [
              {
                name: '胜率预测展示',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  }
                },
                data: [
                  {value: this.assetsList.WinPercent.split('%')[0], name: '胜'},
                  {value: this.assetsList.DrawPercent.split('%')[0], name: '平'},
                  {value: this.assetsList.LosePercent.split('%')[0], name: '负'}
                ]
              }
            ],
            color: ['rgb(49,149,247)', 'rgb(224,230,239)', 'rgb(191,127,255)']
          }
          this.drawLine()
          let max = [this.assetsList.WinPercent.split('%')[0], this.assetsList.DrawPercent.split('%')[0], this.assetsList.LosePercent.split('%')[0]]
          this.maxNumber = Math.max.apply(null, max) + '%'
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    // 返回上一页
    goBack () {
      if (judgeClient) {
        this.$router.push({name: '玩转世界杯', query: {pid: 101}})
      } else {
        ClientObject.goBack()
      }
    },
    // 图表方法
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.option)
    },
    getTime () {
      var date = new Date()
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            ' ' + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds()
      this.currentdate = currentdate
    },
    getLink () {
      getHref().then(response => {
        var data = response.data
        if (data.code === '200') {
          window.location.href = 'http://www.zucaijia.com/zcjhz/down/apk?hzid=043'
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.gameResultList()
    this.getTime()
  }
}

</script>

<style lang="scss" scoped>
  .content{
    background: #F4F6F9;
    padding-bottom: 60px;
  }
  .header{
  width: 100%;
  height: 45px;
  background: #532E95;
 }
   .header-arrow{
    width:12px;
    height:21px;
    margin-top: 15px;
    margin-left: 15px;
    display:block;
    background:url('/static/images/back.png') no-repeat;
    background-size:100%;
    float:left;
  }
 .preCon{
    background: #ffffff;
    height: 500px;
  }
  // 添加球队图标
.teamLogo{
  width: 50%;
  margin-top: 24px;
}
.liwupuLogo{
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 47%;
}
.huangma{
  display: block;
  width: 30px;
  height: 30px;
   margin: 0 38%;
}
.teamPic{
  width: 100%;
}
 .fightline{
    width: 100%;
    font-size: 16px;
    color: #000000;
    text-align: center;
    font-weight: bold;
    margin-top: 10px;
  }
  .fightLine1{
    height: 20px;
    width: 45%;
    text-align: center;
  }
  .fightLine2{
    height: 20px;
    width: 10%;
    text-align: center;
    color: #0081FF;
  }
   .fightLine3{
    height: 20px;
    width: 45%;
    text-align: center;
  }
  .line{
    width: 95%;
    height: 1px;
    background: #E6E6E6;
    margin: 0 auto;
    margin-top: 35px;
  }
  .conBox{
    position: relative;
    height: 286px;
  }
  #canvas{
  height: 100%;
  width: 100%;
}
  #myChart{
  width:250px;
  height:250px;
}
.fullBox{
  padding-top: 50px;
  margin-left: 10px;
}
.fullPre{
  font-size: 12px;
  color: #8F8F8F;
  padding-top: 10px;
}
.fullPreTxt{
  font-size: 16px;
  color: #000000;
  margin-top: 10px;
}
.scorePre{
  font-size: 12px;
  color: #8F8F8F;
  margin-top: 30px;
}
.scorePreTxt{
  font-size: 16px;
  color: #000000;
  margin-top: 10px;
}
.provide{
  font-size: 10px;
  color: #8F8F8F;
  letter-spacing: 0;
  text-align: center;
}
.obtainTime{
  font-size: 10px;
  color: #8F8F8F;
  letter-spacing: 0;
  text-align: center;
  margin-top: 5px;
}
.blue{
  color: #3195F7;
}
.SoccerBetting{
  font-size: 10px;
  margin-top: 10px;
  height: 20px;
  line-height: 20px;
  padding: 0 10px 0 13px;
}
.bettingImg{
  width: 20px;
  height: 20px;
}
.companyName{
  color: #303030;
  margin-left: 7px;
  margin-right: 5px;
}
.comIntro{
  color: #8F8F8F;
}
.downloadTxt{
  color: #4CA7FF;
}
// 定位圆里胜率
.winRate{
  position: absolute;
  top:105px;
  left: 25%;
  font-size: 24px;
  color: #0081FF;
}
.winTxt{
  position: absolute;
  top:135px;
  left: 28%;
  font-size: 14px;
  color: #303030;
}
</style>
