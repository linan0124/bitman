<template>
  <div class="content">
    <bm-back></bm-back>
    <div class="result" v-if="resultList.length!==1">
      <div class="match">{{resultList.firstTeam}} - {{resultList.secondTeam}}</div>
      <div class="matchTime">{{resultList.overTime}}</div>
      <div class="score" v-if="resultList.result==''">
        <span>_</span>
        <span>:</span>
        <span>_</span>
      </div>
      <div class="score" v-if="resultList.result!==''">{{resultList.result}}</div>
    </div>
    <div class="betList">投注记录</div>
    <!-- 结果未出 -->
    <div class="betBox" v-if="resultList.result==''">
      <div class="betLine" v-for="(item, index) in resultList.investLog" :key="index">
        <div class="betFl fl">
          <div class="flTime">{{item.create_time}}</div>
          <div class="flScore">{{item.lotter_result}}</div>
        </div>
        <div class="betFr fr">
          <div class="frTxt">下注</div>
          <div class="frDiamond">-{{item.lotter_money}}钻</div>
        </div>
      </div>
    </div>
    <!-- 结果已出 -->
    <div class="betBox" v-if="resultList.result!==''">
      <div class="betLine" v-for="(item, index) in resultList.investLog" :key="index">
        <div class="betFl fl">
          <div class="flTime">{{item.create_time}}</div>
          <div class="flScore">{{item.lotter_result}}</div>
        </div>
        <div class="betFr fr" v-if="item.is_awarded==1">
          <div class="frTxt">奖金</div>
          <div class="frDiamond blue">+{{item.awarded_money}}钻</div>
        </div>
        <div class="betFr fr" v-if="item.is_awarded==0">
          <div class="frTxt">下注</div>
          <div class="frDiamond">-{{item.lotter_money}}钻</div>
        </div>
      </div>
    </div>
    <!-- 奖池 -->
    <div class="jackpotTitle clearfix">
      <div class="fl">{{resultList.firstTeam}} - {{resultList.secondTeam}}</div>
      <div class="fr"><span class="txtGray">奖池总金额：&nbsp;</span>{{resultList.potAccount}}钻</div>
    </div>
    <!-- 结果未出 -->
    <div class="gameBox" v-if="resultList.result==''">
        <div class="gameBet" v-for="(items, index) in resultList.investList" :key="index">
          <div class="betPeople">{{items.countuser}}人次下注</div>
          <div class="betBlock clearfix">
            <div class="fl betScore">{{items.lotter_result}}</div>
            <div class="fr betBar">
              <div class="progressBar">
                <div class="fill" :style="{width:items.percent*100+'%'}"><div class="sums">{{items.sumMoney}}钻</div></div>
              </div>
              <div class="betBottom clearfix">
                <div class="fl"><span class="txtGray">已下注</span><span>{{items.usetInvestMoney}}钻</span></div>
                <div class="fr"><span class="txtGray">奖金：</span><span class="blue">{{items.userBonusMoney}}钻</span></div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- 结果已出 -->
  <div class="gameBox" v-if="resultList.result!==''">
    <div class="gameBet" v-for="(items, index) in resultList.investList" :key="index">
      <div class="betPeople">{{items.countuser}}人次下注</div>
      <div class="betBlock clearfix" v-if="items.is_awarded==1">
        <div class="fl betScore">{{items.lotter_result}}</div>
        <div class="fr betBar">
           <div class="progressBar">
             <div class="fill" :style="{width:items.percent*100+'%'}"><div class="sums">{{items.sumMoney}}钻</div></div>
           </div>
           <div class="betBottom clearfix">
             <div class="fl"><span class="txtGray">已下注</span><span>{{items.usetInvestMoney}}钻</span></div>
             <div class="fr"><span class="txtGray">奖金：</span><span class="blue">{{items.userBonusMoney}}钻</span></div>
           </div>
        </div>
      </div>
      <!-- 置灰 -->
      <div class="betBlock1 clearfix" v-if="items.is_awarded==0">
        <div class="fl betScore1">{{items.lotter_result}}</div>
        <div class="fr betBar">
           <div class="progressBar">
             <div class="fill1" :style="{width:items.percent*100+'%'}"><div class="sums1">{{items.sumMoney}}钻</div></div>
           </div>
           <div class="betBottom1 clearfix">
             <div class="fl"><span class="txtGray">已下注</span><span>{{items.usetInvestMoney}}钻</span></div>
             <div class="fr"><span class="txtGray">奖金：</span><span>{{items.userBonusMoney}}钻</span></div>
           </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom"></div>
  </div>
</template>

<script>
import {getResultList} from 'api/worldcup'
export default {
  data () {
    return {
      resultList: {}
    }
  },
  methods: {
    getList () {
      getResultList({id: this.$route.query.id}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.resultList = data.data
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    }

  },
  mounted () {
    this.getList()
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
  font-size: 12px;
  color: #8F8F8F;
  line-height: 46px;
  padding-left: 5%;
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
  border-bottom:1px solid #F4F6F9;
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
</style>
