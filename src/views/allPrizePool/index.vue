<template>
  <div class="content">
    <bm-back></bm-back>
    <!-- 奖池部分 -->
    <div class="jackpotTitle clearfix">
      <div class="fl">{{idDataList.firstTeam}} - {{idDataList.secondTeam}}</div>
      <div class="fr"><span class="gray">奖池总金额：</span>{{idDataList.potAccount}}钻</div>
    </div>
    <div class="gameBox">
      <div class="gameBet" v-for="(list,index) in idDataList.investList"
        :key="index">
        <div class="betPeople">{{list.countuser}}人次下注</div>
        <div class="betBlock clearfix">
          <div class="fl betScore">{{list.lotter_result}}</div>
          <div class="fr betBar">
            <div class="progressBar">
              <div class="fill" :style="{width:list.percent*100+'%'}"><div class="sums">{{list.sumMoney}}钻</div></div>
            </div>
            <div class="betBottom clearfix">
              <div class="fl black" v-if="list.usetInvestMoney>0"><span class="txtGray">已下注</span><span>{{list.usetInvestMoney}}钻</span></div>
              <div class="fl" v-if="list.usetInvestMoney==0"><span class="txtGray">未下注</span></div>
              <div class="fr"><span class="txtGray">猜中后预计获得：</span><span>{{list.userBonusMoney}}钻</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getWorldcup, getIdList, potStake} from 'api/worldcup'
export default {
  data () {
    return {
      idDataList: {}
    }
  },
  methods: {
    idList () {
      getIdList({id: this.$route.query.id}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.idDataList = data.data
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
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
    padding-bottom: 35px;
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
.gray{
  color:#A0A0A0 ;
}
.blue{
  color: #0081FF;
}
</style>
