<template>
  <div class="content">
      <div class="champion">
          <div class="header-arrow" @click="goBack">
          </div>
          <router-link class="share" tag="div" :to="{name: '邀请好友'}">邀请好友，获取更多钻</router-link>
      </div>
       <!-- 已下注 -->
      <div class="haveBetDiv"  v-if="outcomeList.status==0 ||outcomeList.status==1">
          <div class="chooseBox">
            <div class="preTitle">您预测的冠军队是</div>
            <div class="preTeam"><img :src="this.$route.query.teamUrl" alt="" class="preTeamImg"></div>
            <div class="preName">{{this.$route.query.teamName}}</div>
          </div>
          <div class="stakebg">
            <div class="wait">请等待世界杯结束开奖</div>
              <div class="ruleline">
                <div class="rule fl" @click="guessShow()">竞猜规则</div>
              </div>
          </div>
          <!--已下注 奖池 -->
        <div class="awardTitle">
          <div class="titleLine clearfix">
            <div class="fl">奖池</div>
            <div class="fr">总金额：<span class="dark">{{idDataList.potAccount}}钻</span></div>
          </div>
        </div>
        <div class="awardPot">
          <div class="potBox clearfix"
          v-for="(item,index) in idDataList.investList"
          :key="index">
              <div class="fl teamSrc"><img :src="item.team_url" alt="" class="teamImg"></div>
              <div class="fl teamTipBox">
                <div class="betNumber">{{item.countuser}}注</div>
                <div class="teamName">{{item.lotter_result}}</div>
              </div>
              <div class="fl potBlock">
                <div class="selectMoney">{{item.sumMoney}}钻</div>
                <div class="selectLine"><div class="fill" :style="{width:item.percent*100+'%'}"></div></div>
                <div class="haveBet clearfix" v-if="item.usetInvestMoney!=''">
                  <div class="fl">已下注<span class="dark">{{item.usetInvestMoney}}钻</span></div>
                  <div class="fr">预计奖金：<span class="dark">{{item.userBonusMoney}}钻</span></div>
                </div>
              </div>
          </div>
        </div>
     </div>
     <!-- 结果已出 -->
     <div class="results" v-if="outcomeList.status==2 ||outcomeList.status==3">
            <div class="chooseBox1">
                  <div class="preTitle" v-if="outcomeList.is_awarded==0">很抱歉，您预测失败。冠军队是</div>
                  <div class="preTitle" v-if="outcomeList.is_awarded==1">恭喜，您预测成功。冠军队是</div>
                  <div class="preTeam"><img :src="outcomeList.lastTeamUrl" alt="" class="preTeamImg"></div>
                  <div class="preName">{{outcomeList.result}}</div>
            </div>
            <div class="stakebg1">
                <div class="awardLine clearfix">
                  <div class="awardMoney fl">奖金</div>
                  <div class="awardAccount fr" v-if="outcomeList.is_awarded==1">{{outcomeList.awarded_money}}钻</div>
                  <div class="awardAccount1 fr" v-if="outcomeList.is_awarded==0">{{outcomeList.awarded_money}}钻</div>
                </div>
                <div class="bgLine"></div>
                <div class="awardLine clearfix mt10">
                  <div class="awardMoney fl">预测的冠军队</div>
                  <div class="dark fr">{{outcomeList.lotter_result}}</div>
                </div>
                <div class="awardLine clearfix mt10">
                  <div class="awardMoney fl">下注金额</div>
                  <div class="dark fr">{{outcomeList.lotter_money}}钻</div>
                </div>
                <div class="ruleline">
                  <div class="rule" @click="guessShow()">竞猜规则</div>
                </div>
            </div>
          <div class="awardTitle">
            <div class="titleLine clearfix">
              <div class="fl">冠军队</div>
              <div class="fr">总金额：<span class="dark">{{outcomeList.sumLotterMoney}}钻</span></div>
            </div>
          </div>
          <div class="awardPot">
            <div class="potBox1 clearfix">
                <div class="fl teamSrc"><img :src="outcomeList.lastTeamUrl" alt="" class="teamImg"></div>
                <div class="fl">
                  <div class="betNumber">{{outcomeList.countInvest}}注</div>
                  <div class="teamName">{{outcomeList.result}}</div>
                </div>
                <div class="fl potBlock">
                  <div class="selectMoney">{{outcomeList.sumAllLotteryMoney}}钻</div>
                  <div class="selectLine"><div class="fills" :style="{width:len*100+'%'}"></div></div>
                  <!-- <div class="haveBet clearfix">
                    <div class="fl">已下注<span class="dark">100钻</span></div>
                    <div class="fr">预计奖金：<span class="dark">1031.7272钻</span></div>
                  </div> -->
                </div>
            </div>
          </div>
     </div>

     <!-- 结果已出结束 -->

        <!-- 竞猜规则 -->
        <div class="guessPopup" v-show="isShow">
          <div class="guessContent">
            <h2>竞猜规则</h2>
            <div class="guessRuleTxt">1.每人仅限投注1次1支球队;</div>
            <div class="guessRuleTxt">2.下注金额不限;</div>
            <div class="guessRuleTxt">3.2018年6月30日22:00点停止下注;</div>
            <div class="guessRuleTxt">4.世界杯比赛结束后如竞猜正确，将根据用户下注金额的占比平分总奖池;</div>
            <div class="guessRuleTxt">5.平台将在决赛开始前为总奖池加入巨额比特钻福利。</div>
            <div class="guessBtn" @click="guessHide()">确定</div>
          </div>
    </div>

    <!-- <div v-if="footerStatus">
      <bm-footer></bm-footer>
    </div> -->
</div>
</template>

<script>
import {getIdList} from 'api/worldcup'
import {getForecast} from 'api/champion'
import BmFooter from 'components/footer'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      isShow: false,
      btn: false,
      idDataList: {},
      is: false,
      result: false,
      outcomeList: {},
      len: ''
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
    idList () {
      getIdList({id: 9999}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.idDataList = data.data
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    resultList () {
      getForecast({lotteryId: 9999}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.outcomeList = data.data
          this.len = data.data.sumAllLotteryMoney / data.data.sumLotterMoney
          console.log(this.len)
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    goBack () {
      if (judgeClient) {
        this.$router.push('/index')
      } else {
        ClientObject.goBack()
      }
    }
  },
  mounted () {
    this.idList()
    this.resultList()
  }
}
</script>

<style lang="scss" scoped>
  .content{
    background: #F4F6F9;
    padding-bottom: 60px;
    position: relative;
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
  .champion{
    width: 100%;
    height: 240px;
    background: url(/static/images/championbg.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;
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
  .share{
    position: absolute;
    top: 160px;
    left:26%;
    width: 48%;
    height: 30px;
    opacity: 0.8;
    border: 2px solid #0081FF;
    border-radius: 50px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: #0081FF;
  }
  }
  .chooseBox{
    width: 90%;
    height: 105px;
    background-image: linear-gradient(0deg, #715EFF 0%, #9235FF 100%);
    box-shadow: 0 2px 10px 0 #2400FF;
    border-radius: 4px;
    position: absolute;
    top: 210px;
    left: 5%;
    padding-top: 15px;
   .preTitle{
     font-size: 12px;
     color: #C298FF;
     text-align: center;
   }
   .preTeam{
     width: 38px;
     height: 38px;
     background: #F4F6F9;
     margin: 0 auto;
     margin-top: 10px;
     border-radius: 38px;
     .preTeamImg{
       width: 100%;
       height: 100%;
     }
   }
   .preName{
     font-size: 16px;
     color: #fff;
     font-weight: 700;
     text-align: center;
     margin-top: 10px;
   }
  }
// 下注--输入
.stakebg{
  width: 100%;
  height: 68px;
  background: #fff;
  margin-top: 35px;
  padding-top: 70px;
  .wait{
    font-size: 12px;
    color: #A0A0A0;
    letter-spacing: 0;
    text-align: center;
  }
.ruleline{
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  font-size: 12px;
  color: #0081FF;
}
}
// 奖池
.awardTitle{
 width: 100%;
 height: 56px;
 font-size: 12px;
 color: #A0A0A0;
 .titleLine{
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
}
}

.dark{
  color: #000;
}
.awardPot{
  width: 100%;
  background: #fff;
}
.potBox{
  width: 90%;
  height: 60px;
  margin: 0 auto;
  border-bottom:1px solid #F4F6F9;
 .teamSrc{
    width: 8%;
    margin-top: 14px;
    margin-right: 3%;
    .teamImg{
      display: block;
      width: 30px;
      height: 30px;
      background: #F4F6F9;
      border-radius: 38px;
    }
  }
  .teamTipBox{
    width: 19%;
  }
  .betNumber{
    font-size: 10px;
    color: #8F8F8F;
    margin-top: 5px;
  }
  .teamName{
    width: 65px;
    font-size: 12px;
    color: #000000;
    margin-top: 6px;
    font-weight: 700;
  }
  .potBlock{
     width: 66%;
    margin-left: 2%;
  }
  .selectMoney{
    font-size: 10px;
    color: #0081FF;
    margin-top: 8px;
  }
  .selectLine{
    width: 100%;
    height: 5px;
    background: #F4F6F9;
    border-radius: 10px;
    margin-top: 7px;
    .fill{
      height: 5px;
      border-radius: 10px;
      background: #4CA7FF;
    }
  }
  .haveBet{
    font-size: 10px;
    margin-top: 5px;
  }
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
  height: 283px;
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
// 结果已出
.chooseBox1{
    width: 90%;
    height: 105px;
    background-image: linear-gradient(0deg, #715EFF 0%, #9235FF 100%);
    box-shadow: 0 2px 10px 0 #2400FF;
    border-radius: 4px;
    position: absolute;
    top: 210px;
    left: 5%;
    padding-top: 15px;
   .preTitle{
     font-size: 12px;
     color: #C298FF;
     text-align: center;
   }
   .preTeam{
     width: 38px;
     height: 38px;
     background: #F4F6F9;
     margin: 0 auto;
     margin-top: 10px;
     border-radius: 38px;
     .preTeamImg{
       width: 100%;
       height: 100%;
     }
   }
   .preName{
     font-size: 16px;
     color: #fff;
     font-weight: 700;
     text-align: center;
     margin-top: 10px;
   }
  }
// 下注--输入
.stakebg1{
  width: 100%;
  height: 140px;
  background: #fff;
  margin-top: 35px;
  padding-top: 70px;
.awardLine{
  width: 85%;
  height: 14px;
  margin: 0 auto;
}
.awardMoney{
  font-size:12px;
  color: #A0A0A0;
}
.awardAccount{
  font-size: 18px;
  color: #0081FF;
}
.awardAccount1{
  font-size: 18px;
  color: #000;
}
.bgLine{
  width: 90%;
  height: 1px;
  background: #E6E6E6;
  margin: 0 auto;
  margin-top: 15px;
}
.ruleline{
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  font-size: 12px;
  color: #0081FF;
}
}
// 奖池
.awardTitle{
 width: 100%;
 height: 56px;
 font-size: 12px;
 color: #A0A0A0;
}
.titleLine{
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
}
.dark{
  color: #000;
}
.awardPot{
  width: 100%;
  background: #fff;
}
.potBox1{
  width: 90%;
  height: 60px;
  margin: 0 auto;
  border-bottom:1px solid #F4F6F9;
   .teamSrc{
    width: 8%;
    margin-top: 14px;
    margin-right: 3%;
    .teamImg{
      display: block;
      width: 30px;
      height: 30px;
      background: #F4F6F9;
      border-radius: 38px;
    }
  }
  .betNumber{
    font-size: 10px;
    color: #8F8F8F;
    margin-top: 5px;
  }
  .teamName{
    width: 65px;
    font-size: 12px;
    color: #000000;
    margin-top: 6px;
    font-weight: 700;
  }
  .potBlock{
    width: 66%;
    margin-left: 2%;
  }
  .selectMoney{
    font-size: 10px;
    color: #0081FF;
    margin-top: 8px;
  }
  .selectLine{
    width: 100%;
    height: 5px;
    background: #F4F6F9;
    border-radius: 10px;
    margin-top: 7px;
    .fills{
      height: 5px;
      border-radius: 10px;
      background: #4CA7FF;
    }
  }
  .haveBet{
    font-size: 10px;
    margin-top: 5px;
  }
}
.mt10{
  padding-top: 15px;
}
</style>
