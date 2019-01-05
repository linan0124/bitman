<template>
  <div class="content">
    <!-- 欧冠 -->
    <div class="oguanBanner" v-if=showStatus>
      <div class="nav clearfix">
         <!-- <a href="javascript:history.go(-1)" class="backa fl">
           <i class="back"></i>
         </a> -->
         <!-- <router-link class="routerLink fr" tag="div" :to="{name: '竞猜记录'}">竞猜记录</router-link> -->
         <router-link class="routerLink fr" tag="div" :to="{name: '竞猜记录'}">奖金记录</router-link>
      </div>
    </div>
    <!-- 世界杯 -->
    <div class="play"  v-else>
      <div class="nav clearfix">
         <!-- <a href="javascript:history.go(-1)" class="backa fl">
           <i class="back"></i>
         </a> -->
         <router-link class="routerLink fr" tag="div" :to="{name: '竞猜记录'}">奖金记录</router-link>
      </div>
    </div>
     <div class="pkBox clearfix" v-if="dataList.length>1">
        <div class="pkBoxBlock"
          v-for="(item,index) in dataList"
          :key="index"
          @click="idList(item.id)">
          <div :class="{active:ind === item.id}">{{item.firstTeam}} - {{item.secondTeam}}({{footballGame[index]}})</div>
        </div>
      </div>
    <div class="bottomPour clearfix">
      <div class="deadlineTxt clearfix">
         <span class="deadlineGray">下注截止时间：</span>
         <span class="deadlineBlue">{{dayNum}}天</span>
         <span class="deadlineBlue">{{hourNum}}时</span>
         <span class="deadlineBlue">{{minuteNum}}分</span>
         <span class="deadlineBlue">{{secondNum}}秒</span>
      </div>
      <div class="teamPic clearfix">
        <div class="teamLogo fl"><img :src="idDataList.firstTeamUrl" alt="" class="huangma"></div>
        <div class="teamLogo fr"><img :src="idDataList.secondTeamUrl" alt="" class="liwupuLogo"></div>
      </div>
      <div class="fightline clearfix">
        <div class="fightLine1 fl">{{idDataList.firstTeam}}</div>
        <div class="fightLine2 fl">VS</div>
        <div class="fightLine3 fl">{{idDataList.secondTeam}}</div>
      </div>
      <!-- 下注部分 结果未出 -->
      <div class="guessScore clearfix" v-if="this.btn==true">
        <div class="scoreBox1 fl clearfix">
          <div class="subtract fl" @click="subtractBtn()"><div class="subtractImg"></div></div>
          <div class="scoreleft fl">{{add}}</div>
          <div class="add fl subtract" @click="addBtn()"><div class="addImg"></div></div>
        </div>
        <div class="and fl"></div>
        <div class="scoreBox1 fr clearfix">
          <div class="subtract fl" @click="subtractBtns()"><div class="subtractImg"></div></div>
          <div class="scoreleft fl">{{adds}}</div>
          <div class="add fl subtract" @click="addBtns()"><div class="addImg"></div></div>
        </div>
      </div>
      <!-- 下注部分  结果已出 -->
      <div class="guessScore clearfix" v-if="this.btn==false">
        <div class="scoreBox1 fl clearfix">
          <div class="subtract fl"><div class="subtractImg"></div></div>
          <div class="scoreleft fl" v-if="idDataList.result==''">0</div>
          <div class="scoreleft fl" v-if="idDataList.result!=''">{{resultOne}}</div>
          <div class="add fl subtract"><div class="addImg"></div></div>
        </div>
        <div class="and fl"></div>
        <div class="scoreBox1 fr clearfix">
          <div class="subtract fl"><div class="subtractImg"></div></div>
          <div class="scoreleft fl" v-if="idDataList.result==''">0</div>
           <div class="scoreleft fl" v-if="idDataList.result!==''">{{resultTwo}}</div>
          <div class="add fl subtract"><div class="addImg"></div></div>
        </div>
      </div>
      <!-- 下注部分 输入  -->
      <div class="stakeBox">
        <div class="stake clearfix">
          <div class="stakeTitle fl">下注金额</div>
          <input type="text" class="amounts fr" placeholder="请输入下注金额（整数）" v-model="lotterMoney" v-if="this.btn==true">
          <input type="text" class="amounts fr" placeholder="请输入下注金额（整数）" v-model="lotterMoney" v-if="this.btn==false" disabled>
        </div>
        <img src="static/images/diamond.png" alt="" class="diamond">
      </div>
      <div class="avail">可用金额：&nbsp;<span class="blue">{{idDataList.account}}钻</span></div>
      <!-- 下注按钮 v-if="this.btn==true"-->
      <div class="pourBtn" v-if="this.btn==true">
        <bm-button class="btn" @click="getStake()" text="下注"></bm-button>
      </div>
      <div class="pourBtn1" v-if="this.btn==false">
        <gray-button class="btn" text="已截止"></gray-button>
      </div>
      <div class="ruleline">
        <div class="rule fl" @click="guessShow()">竞猜规则</div>
        <router-link tag="div" class="prediction fl" :to="{name: '赛事预测',query: {firstTeamUrl: idDataList.firstTeamUrl,secondTeamUrl:idDataList.secondTeamUrl,firstTeam:idDataList.firstTeam,secondTeam:idDataList.secondTeam}}">赛果预测</router-link>
        <div class="competition fr" @click="matchShow()">赛程查询</div>
      </div>
    </div>
    <!-- 奖池部分 -->
  <div class="jackpotTitle clearfix">
    <router-link tag="div" class="fl blue"  :to="{name: '下注记录',query: {id: ind}}">下注记录</router-link>
    <router-link tag="div" class="fr blue" :to="{name: '所有奖池',query: {id: ind}}">所有奖池</router-link>
  </div>
  <div class="gameBox">
    <div class="gameBet" v-for="(list,index) in idDataList.investList"
       :key="index"  v-if="list.usetInvestMoney>0">
      <div class="betPeople">{{list.countuser}}人次下注</div>
      <div class="betBlock clearfix">
        <div class="fl betScore">{{list.lotter_result}}</div>
        <div class="fr betBar">
           <div class="progressBar">
             <div class="fill" :style="{width:list.percent*100+'%'}"><div class="sums">{{list.sumMoney}}钻</div></div>
           </div>
           <div class="betBottom clearfix">
             <div class="fl blue" v-if="list.usetInvestMoney>0"><span class="txtGray">已下注</span><span>{{list.usetInvestMoney}}钻</span></div>
             <div class="fl" v-if="list.usetInvestMoney==0"><span class="txtGray">已下注</span><span>{{list.usetInvestMoney}}钻</span></div>
             <div class="fr"><span class="txtGray">猜中后预计获得：</span><span>{{list.userBonusMoney}}钻</span></div>
           </div>
        </div>
      </div>
    </div>
  </div>
<!-- 竞猜规则 -->
<div class="guessPopup" v-show="isShow">
   <div class="guessContent">
     <h2>竞猜规则</h2>
     <div class="guessRuleTxt">1、下注您自己设定的比分，若猜中则与所有猜中者分享奖池资产（BitMan平台会从中抽取{{idDataList.rate}}%以作为平台运营费用），奖金金额按您投注的比例获得。若未猜中，则下注资产不退回。</div>
     <div class="guessRuleTxt">2、比赛开始停止下注，比赛结束自动执行分配。</div>
     <div class="guessRuleTxt">3、比赛以90分钟赛结果为准。</div>
     <div class="guessRuleTxt">4、每场比赛开始前平台方将下注一定数额的比特钻作为奖池初始额度。</div>
     <div class="guessBtn" @click="guessHide()">确定</div>
   </div>
</div>
<!-- 赛程查询 -->
  <div class="gamePopup" v-show="ifShow">
      <div class="gameContent">
      <h2>赛程时间表(北京时间)</h2>
      <div class="checkList">
        <div class="gamelistImg"></div>
        <!-- <div class="matchTime"
            v-for="(game,index) in dataList"
            :key="index">
          <div class="fl pl">{{game.overTime}}</div>
          <div class="fr pr">{{game.firstTeam}} - {{game.secondTeam}}</div>
        </div> -->
      </div>
      <div class="matchBtn" @click="matchHide()">确定</div>
    </div>
  </div>
<div v-if="footerStatus">
  <bm-footer></bm-footer>
</div>
</div>

</template>

<script>
import {getWorldcup, getIdList, potStake} from 'api/worldcup'
import BmFooter from 'components/footer'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      isShow: false,
      ifShow: false,
      dataList: {},
      ind: '',
      add: '0',
      adds: '0',
      firstItem: '',
      idDataList: {},
      lotteryId: '',
      lotterMoney: '',
      lotterResult: '',
      dayNum: '00',
      hourNum: '00',
      minuteNum: '00',
      secondNum: '00',
      btn: '',
      lastOverTime: '',
      timerID: null,
      resultOne: '',
      resultTwo: '',
      footballGame: [],
      showStatus: '',
      footerStatus: true,
      gameType: '',
      status: '',
      gameList: {}
    }
  },
  components: { BmFooter },
  methods: {
    guessShow () {
      this.isShow = true
    },
    guessHide () {
      this.isShow = false
    },
    matchShow () {
      this.ifShow = true
      // 使其遮罩下方内容不可滚动
      $('body').css('overflow', 'hidden')
    },
    matchHide () {
      this.ifShow = false
      $('body').css('overflow', 'auto')
    },
    subtractBtn () {
      if (this.add > 0) {
        this.add = parseInt(this.add) - 1
      }
    },
    addBtn () {
      if (this.add < 9) {
        this.add = parseInt(this.add) + 1
      }
    },
    subtractBtns () {
      if (this.adds > 0) {
        this.adds = parseInt(this.adds) - 1
      }
    },
    addBtns () {
      if (this.adds < 9) {
        this.adds = parseInt(this.adds) + 1
      }
    },
    // this.$route.query.pid即将比赛赛程展示
    worldcupList () {
      getWorldcup({pid: this.gameType, status: this.status}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.dataList = data.data
          for (var i = 0; i < data.data.length; i++) {
            this.footballGame.push(this.dataList[i].activity_name.split('_')[1])
          }
          this.idList(data.data[0].id)
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    idList (id) {
      this.ind = id
      clearTimeout(this.timerID)
      getIdList({id: id}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.idDataList = data.data
          // console.log(this.idDataList)
          this.lastOverTime = this.idDataList.lastOverTime
          this.resultOne = this.idDataList.result.substring(0, 1)
          this.resultTwo = this.idDataList.result.substring(2, 3)
          if (Number(this.idDataList.lastOverTime) >= 0) {
            // console.log(111)
            this.countDown()
          }
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    // 下注按钮
    getStake () {
      if (this.lotterMoney > 0 && this.lotterMoney <= this.idDataList.account) {
        potStake({lotteryId: this.ind, lotterMoney: this.lotterMoney, lotterResult: this.add + ':' + this.adds}).then(response => {
          var data = response.data
          if (data.code === '200') {
            this.idList(this.ind)
            this.$toast(
              {
                message: '下注成功',
                title: ''
              }
            )
          } else if (data.code === '500') {

          }
        }).catch(errortip => {})
      } else {
        this.$toast(
          {
            message: '下注金额不能大于可用金额或小于0',
            title: ''
          }
        )
      }
    },
    // 倒计时
    countDown () {
      // var leave = this.lastOverTime
      var day = Math.floor(this.lastOverTime / (1000 * 60 * 60 * 24))
      var hour = Math.floor(this.lastOverTime / (1000 * 3600)) - (day * 24)
      var minute = Math.floor(this.lastOverTime / (1000 * 60)) - (day * 24 * 60) - (hour * 60)
      var second = Math.floor(this.lastOverTime / (1000)) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)

      if (second < 0 || hour < 0 || minute < 0 || day < 0) {
        this.dayNum = '00'
        this.hourNum = '00'
        this.minuteNum = '00'
        this.secondNum = '00'
        clearTimeout(this.timerID)
        this.btn = false

        // console.log('时间到')
      } else if (second === 0 && hour === 0 && minute === 0 && day === 0) {
        this.dayNum = '00'
        this.hourNum = '00'
        this.minuteNum = '00'
        this.secondNum = '00'
        clearTimeout(this.timerID)
        this.btn = false
      } else if (second > 0 || hour > 0 || minute > 0 || day > 0) {
        clearTimeout(this.timerID)
        // console.log(22233)
        this.dayNum = day
        this.hourNum = hour
        this.minuteNum = minute
        this.secondNum = second
        this.btn = true
        this.timerID = setTimeout(() => {
          // console.log(this.lastOverTime)
          this.countDown()
          this.lastOverTime -= 1000
        }, 1000)
      }
    }
    // 截取result结果前端展示
  },
  mounted () {
    if (String(this.$route.query.pid) === '102') {
      this.showStatus = true
      this.gameType = 102
      this.status = 3
      if (!judgeClient) {
        this.footerStatus = false
      }
    } else if (String(this.$route.query.pid) === '101') {
      this.showStatus = false
      this.gameType = 101
      this.status = 0
      if (!judgeClient) {
        this.footerStatus = false
      }
    }
    this.worldcupList()
    // this.countDown()
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if (String(this.$route.query.pid) === '102') {
        this.showStatus = true
        this.gameType = 102
        this.status = 3
        if (!judgeClient) {
          this.footerStatus = false
        }
      } else if (String(this.$route.query.pid) === '101') {
        this.showStatus = false
        this.gameType = 101
        this.status = 0
        if (!judgeClient) {
          this.footerStatus = false
        }
      }
      this.worldcupList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    background: #F4F6F9;
    padding-bottom: 60px;
  }
  .oguanBanner{
    width: 100%;
    height: 180px;
    background: url(/static/images/ouguan.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
   .play{
    width: 100%;
    height: 180px;
    background: url(/static/images/worldcup.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .nav{
    width: 100%;
  }
  .backa{
    display: block;
    padding-top: 12px;
  }
  .back{
    display: block;
    width: 12px;
    height: 21px;
    background: url(/static/images/back.png) no-repeat;
    background-size: cover;
    margin-left: 10px;
  }
  .routerLink{
    font-size: 14px;
    color: #FFFFFF;
    line-height: 45px;
    padding-right: 10px;
  }
  .pkBox{
    width: 100%;
  }
  .pkBoxBlock{
    float: left;
    width: 49.4%;
    height: 40px;
    border-bottom: 1px solid #FFFFFF;
    // border-left: 1px solid #fff;
    margin-left: 0.3%;
    opacity: 0.8;
    background: #0081FF;
    font-size: 12px;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    line-height: 40px;
  }
  .active{
    background: #FFFFFF !important;
    font-size: 12px;
    color: #0081FF !important;
    text-align: center;
  }

  .bottomPour{
    width: 100%;
    height: 410px;
    background: #fff;
  }
  .deadlineTxt{
    width: 90%;
    font-size: 12px;
    text-align: center;
    padding-top: 20px;
    margin: 0 auto;
  }
  .deadlineGray{
    color: #7E7E7E;
  }
  .deadlineBlue{
    color: #0081FF;
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
  .guessScore{
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
    position: relative;
  }
.subtract{
  width: 20px;
  height: 20px;
  background-color: #E1E8F2;
  border-radius: 2px;
  margin-top: 10px;
}
.subtractImg{
  width: 10px;
  height: 1px;
  background: url(/static/images/subtract.png) no-repeat;
  background-size: cover;
  margin: 0 auto;
  margin-top: 10px;
}
.scoreleft{
  font-size: 36px;
  // width: 40px;
  height: 40px;
  color: #000000;
  margin: 0 24px;
}
.addImg{
  width: 10px;
  height: 10px;
  background: url(/static/images/add.png) no-repeat;
  margin: 0 auto;
  margin-top: 5px;
  background-size: cover;
}
.and{
  position: absolute;
  top:12px;
  left: 49%;
  display: block;
  width: 6px;
  height: 16px;
  background: url(/static/images/and.png) no-repeat;
  background-size: cover;
}
.stakeBox{
  width: 100%;
  position: relative;
}
.stake{
  width: 73%;
  height: 40px;
  background: #F4F6F9;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 35px;
}
.stakeTitle{
  font-size: 12px;
  color: #1F1F1F;
  line-height: 40px;
  padding-left: 10px;
}
.amounts{
  width: 70%;
  height: 32px;
  border: none;
  background: #F4F6F9;
  border-radius: 2px;
  text-align: right;
  padding-right: 10px;
  outline: none;
}
.diamond{
  width: 15px;
  height: 23px;
  position: absolute;
  top: 10px;
  right: 35px;
}
.avail{
  width: 73%;
  margin: 0 auto;
  font-size: 12px;
  color: #8F8F8F;
  text-align: right;
  margin-top: 10px;
}
.blue{
  color: #0081FF;
}
.pourBtn{
  width: 73%;
  height: 45px;
  background: #0081FF;
  border-radius: 4px;
  border-bottom:5px solid #0068CD;
  color:#fff;
  text-align: center;
  line-height: 45px;
  margin: 0 auto;
  margin-top: 24px;
}
.pourBtn1{
  width: 73%;
  height: 45px;
  background: #3D97EF;
  border-radius: 4px;
  border-bottom:5px solid #79ADDF;
  color:#fff;
  text-align: center;
  line-height: 45px;
  margin: 0 auto;
  margin-top: 24px;
}
.ruleline{
  width: 73%;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 12px;
  color: #0081FF;
}
.rule{
  width: 33%;
  text-align: left;
}
.prediction{
  width: 33%;
  text-align: center;
}
.competition{
  width: 33%;
  text-align: right;
}
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
  border-bottom:1px solid #F4F6F9;
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
.betBlock{
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
.betBottom{
  font-size: 10px;
  color: #000000;
  margin-top: 7px;
}
.bottomLine{
  width: 90%;
  height: 1px;
  background: #F4F6F9;
  margin: 0 auto;
}
// 竞猜规则
.guessPopup{
   width: 100%;
   height: 100%;
   background: rgba(0,0,0,0.5);
   position: fixed;
   left: 0;
   top: 0;
   z-index: 1000;
}
.guessContent{
  position: absolute;
  top: 150px;
  left: 13.5%;
  width: 73%;
  height: 310px;
  background: #FFFFFF;
  border-radius: 4px;
}
h2{
  font-size: 14px;
  color: #303030;
  text-align: center;
  padding-top: 5px;
}
.guessRuleTxt{
  display: block;
  width: 85%;
  margin: 0 auto;
  font-size: 12px;
  color: #8F8F8F;
  letter-spacing: 0;
  text-align: justify;
  line-height: 18px;
  margin-bottom: 3px;
}
.guessBtn{
  width: 80%;
  height: 45px;
  background: #0081FF;
  border-radius: 4px;
  border-bottom: 5px solid#0068CD;
  margin: 0 auto;
  text-align: center;
  line-height: 45px;
  color:#fff;
  font-size: 12px;
  margin-top: 20px;
}
// 赛程查询
.gamePopup{
   width: 100%;
   height: 100%;
   background: rgba(0,0,0,0.5);
   position: fixed;
   left: 0;
   top: 0;
   z-index: 1000;
   overflow: auto;
}
.gameContent{
  position: absolute;
  top: 120px;
  left: 13.5%;
  width: 73%;
  height: 450px;
  background: #FFFFFF;
  border-radius: 4px;
   z-index: 10000;
}
.checkList{
  width: 92%;
  height: 320px;
  margin: 0 auto;
  margin-top: 12px;
  overflow:scroll;
}
.gamelistImg{
  width: 100%;
  height: 1500px;
  background: url(/static/images/gamelist.jpg) no-repeat;
  background-size: 100% 100%;
  overflow:scroll;
}
.matchTime{
  width: 100%;
  height: 30px;
  background: #F4F6F9;
  border-radius: 4px;
  line-height: 30px;
  font-size: 12px;
  color: #8F8F8F;
  margin-bottom: 1px;
}
.pl{
  padding-left: 5px;
}
.pr{
  padding-right: 5px;
}
.matchBtn{
  width: 80%;
  height: 45px;
  background: #0081FF;
  border-radius: 4px;
  border-bottom: 5px solid#0068CD;
  margin: 0 auto;
  text-align: center;
  line-height: 45px;
  color:#fff;
  font-size: 12px;
  margin-top: 10px;
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

</style>
