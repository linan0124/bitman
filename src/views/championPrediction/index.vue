<template>
  <div class="content">
      <div class="champion">
          <div class="header-arrow" @click="goBack">
          </div>
          <router-link class="share" tag="div" :to="{name: '邀请好友'}">邀请好友，获取更多钻</router-link>
      </div>
      <!-- 下注前选择球队 -->
      <div class="chooseBox clearfix">
        <div class="team fl">
          <div class="backImg" v-if="!this.$route.query.teamUrl"></div>
          <img v-else :src="this.$route.query.teamUrl" alt="" class="teamLogo fl">
        </div>
        <div class="chooseTeamName fl">{{this.$route.query.teamName}}</div>
         <router-link class="choose fr clearfix"
                      tag="div"
                      :to="{name: '选择球队'}">
                      <span class="select fl">选择球队</span>
                      <img src="static/images/choiceMore.png" alt="" class="moreTeam fl">
         </router-link>
      </div>
      <div class="stakebg">
         <div class="stakeBox">
            <div class="stake clearfix">
              <div class="stakeTitle fl">下注金额</div>
              <input type="text" class="amounts fr" placeholder="请输入下注金额（整数）" v-model="lotterMoney" v-if="this.$route.query.teamUrl">
              <input type="text" class="amounts fr" placeholder="请输入下注金额（整数）" v-model="lotterMoney" v-if="!this.$route.query.teamUrl" disabled>
            </div>
            <img src="static/images/diamond.png" alt="" class="diamond">
         </div>
         <div class="avail">可用金额：&nbsp;<span class="blue">{{idDataList.account}}钻</span></div>
          <!-- 下注按钮 可下注-->
          <div class="pourBtn" v-if="this.$route.query.teamUrl">
            <bm-button class="btn" text="下注" @click="btnShow()"></bm-button>
          </div>
          <!-- 下注按钮 不可下注 -->
          <div class="pourBtn1" v-if="!this.$route.query.teamUrl">
            <gray-button class="btn" text="下注"></gray-button>
          </div>
          <div class="ruleline">
            <div class="rule fl" @click="guessShow()">竞猜规则</div>
          </div>
      </div>
      <!-- 下注之前 -->
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
    <!-- 下注确认弹框 -->
    <div class="isPopup" v-show="btn">
      <div class="isContent">
        <div class="isTitle">确定下注{{this.$route.query.teamName}}队？</div>
        <div class="isTxt">每人仅有一次下注机会</div>
        <div class="isBet">
          <bm-button class="btn" text="确定" @click="getStake()"></bm-button>
        </div>
        <div class="noBet">
          <gray-button class="btn" text="取消" @click="btnHide()"></gray-button>
        </div>
      </div>
    </div>

    <!-- <div v-if="footerStatus">
      <bm-footer></bm-footer>
    </div> -->
</div>
</template>

<script>
import {getIdList, potStake} from 'api/worldcup'
import BmFooter from 'components/footer'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      isShow: false,
      btn: false,
      idDataList: {},
      lotterMoney: ''
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
    btnShow () {
      this.btn = true
    },
    btnHide () {
      this.btn = false
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
    // 下注按钮
    getStake () {
      if (this.lotterMoney > 0 && this.lotterMoney <= this.idDataList.account) {
        potStake({lotteryId: 9999, lotterMoney: this.lotterMoney, lotterResult: encodeURI(this.$route.query.teamName)}).then(response => {
          var data = response.data
          if (data.code === '200') {
            this.idList()
            // this.$toast(
            //   {
            //     message: '下注成功',
            //     title: ''
            //   }
            // )
            this.$router.push({name: '已下注-猜冠军', query: {teamUrl: this.$route.query.teamUrl, teamName: this.$route.query.teamName}})
          } else if (data.code === '500') {
            this.$toast(
              {
                message: data.message,
                title: ''
              }
            )
          }
        }).catch(errortip => {})
      } else {
        this.$toast(
          {message: '下注金额不能大于可用金额或小于0'}
        )
      }
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
  }
}
</script>

<style lang="scss" scoped>
  .content{
    background: #F4F6F9;
    padding-bottom: 60px;
    position: relative;
  }
  .champion{
    width: 100%;
    height: 240px;
    background: url(/static/images/championbg.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;
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
    height: 80px;
    background-image: linear-gradient(0deg, #715EFF 0%, #9235FF 100%);
    box-shadow: 0 2px 10px 0 #2400FF;
    border-radius: 4px;
    position: absolute;
    top: 210px;
    left: 5%;
    .team{
      width: 38px;
      height: 38px;
      background: #F4F6F9;
      margin-top: 20px;
      margin-left: 20px;
      border-radius: 38px;
       .teamLogo{
      display: block;
      width: 100%;
      height: 100%;
      background: #F4F6F9;
       border-radius: 38px;
      }
      .backImg{
        width:15px;
        height:25px;
        margin-left:11px;
        margin-top:6px;
        background:url('/static/images/why.jpg') no-repeat center;
        background-size:100% 100%;
      }
    }
     .chooseTeamName{
      line-height: 80px;
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      margin-left: 10px;
    }
    .choose{
      height: 80px;
      font-size: 12px;
      color: #fff;
      letter-spacing: 0;
      text-align: right;
      padding-right: 20px;
      line-height: 80px;
    }
    .moreTeam{
      display: block;
      width: 8px;
      height: 14px;
      margin-top: 34px;
      margin-left: 7px;
    }
  }
// 下注--输入
.stakebg{
  width: 100%;
  height: 187px;
  background: #fff;
  margin-top: 35px;
  padding-top: 35px;
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
    // width: 65px;
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
      width: 50%;
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
}

// 下注确认弹框
.isPopup{
   width: 100%;
   height: 100%;
   background: rgba(0,0,0,0.5);
   position: fixed;
   left: 0;
   top: 0;
   z-index: 1000;
   .isContent{
    position: absolute;
    top: 150px;
    left: 13.5%;
    width: 73%;
    height: 222px;
    background: #FFFFFF;
    border-radius: 4px;
   }
   .isTitle{
    font-size: 14px;
    color: #303030;
    letter-spacing: 0;
    text-align: center;
    font-weight: 700;
    padding-top: 20px;
   }
   .isTxt{
    font-size: 12px;
    color: #8F8F8F;
    letter-spacing: 0;
    text-align: center;
    margin-top: 15px;
   }
   .isBet{
     width: 80%;
     height: 45px;
     background: #0081FF;
     border-radius: 4px;
     margin: 0 auto;
     margin-top: 20px;
     border-bottom: 5px solid#0068CD;
     text-align: center;
     line-height: 45px;
     color: #fff;
   }
   .noBet{
      width: 80%;
      height: 45px;
      margin: 0 auto;
     margin-top: 20px;
   }
}
</style>
