<template>
  <div class="content">
      <div class="champion">
          <a href="javascript:history.go(-1)" class="backa fl">
            <i class="back"></i>
          </a>
          <router-link class="share" tag="div" :to="{name: '邀请好友'}">邀请好友，获取更多钻</router-link>
      </div>
      <div class="chooseBox1">
        <div class="preTitle" v-if="this.result==true">很抱歉，您预测失败。冠军队是</div>
        <div class="preTitle" v-if="this.result==false">恭喜，您预测成功。冠军队是</div>
        <div class="preTeam"><img src="static/images/Brazil.png" alt="" class="preTeamImg"></div>
        <div class="preName">巴西</div>
      </div>
      <div class="stakebg1">
          <div class="awardLine clearfix">
            <div class="awardMoney fl">奖金</div>
            <div class="awardAccount fr">1031.7272钻</div>
          </div>
          <div class="bgLine"></div>
          <div class="awardLine clearfix mt10">
            <div class="awardMoney fl">预测的冠军队</div>
            <div class="dark fr">巴西队</div>
          </div>
          <div class="awardLine clearfix mt10">
            <div class="awardMoney fl">下注金额</div>
            <div class="dark fr">100钻</div>
          </div>
          <div class="ruleline">
            <div class="rule" @click="guessShow()">竞猜规则</div>
          </div>
      </div>
    <div class="awardTitle">
      <div class="titleLine clearfix">
         <div class="fl">冠军队</div>
         <div class="fr">总金额：<span class="dark">23400钻</span></div>
      </div>
    </div>
    <div class="awardPot">
      <div class="potBox1 clearfix">
          <div class="fl teamSrc"><img src="static/images/Brazil.png" alt="" class="teamImg"></div>
          <div class="fl">
            <div class="betNumber">36注</div>
            <div class="teamName">克罗地亚亚</div>
          </div>
          <div class="fl potBlock">
            <div class="selectMoney">440钻</div>
            <div class="selectLine"><div class="fill"></div></div>
            <!-- <div class="haveBet clearfix">
              <div class="fl">已下注<span class="dark">100钻</span></div>
              <div class="fr">预计奖金：<span class="dark">1031.7272钻</span></div>
            </div> -->
          </div>
      </div>
    </div>

    <!-- 竞猜规则 -->
    <div class="guessPopup" v-show="isShow">
      <div class="guessContent">
        <h2>竞猜规则</h2>
        <div class="guessRuleTxt">1. 为你喜欢的球队下注，下注金额不限，每人仅限投注一场。</div>
        <div class="guessRuleTxt">2. 2018年6月30 22点前停止下注，世界杯比赛结束后按分红比例分配奖池金额(分红比例=投注金额／中奖下注金额*100%)。</div>
        <div class="guessRuleTxt">3. 比特曼社区奖励1000,000,000比特钻作为奖池初始金额。</div>
        <div class="guessBtn" @click="guessHide()">确定</div>
      </div>
    </div>

    <!-- <div v-if="footerStatus">
      <bm-footer></bm-footer>
    </div> -->
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
      result: false
    }
  },
  components: { BmFooter },
  methods: {
    guessShow () {
      this.isShow = true
    },
    guessHide () {
      this.isShow = false
    }
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
     width: 57px;
     height: 32px;
     background: #F4F6F9;
     margin: 0 auto;
     margin-top: 10px;
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
    margin-top: 19px;
    margin-right: 10px;
    .teamImg{
      display: block;
      width: 39px;
      height: 22px;
      background: #F4F6F9;
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
    margin-left: 7px;
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
.mt10{
  padding-top: 15px;
}

</style>
