<template>
  <div class="honor">
    <div class="honor__main">
       <div class="worldBanner">
         <div class="worldLink" @click="worldCup"></div>
      </div>
      <!-- <div class="ouGuan">
        <div class="worldLink" @click="ouGuan"></div>
      </div> -->
      <!-- <div class="guessChampion" @click="WhetherCham()">
        <router-link tag="div" :to="{name: '冠军预测'}" class="worldLink"></router-link>
      </div> -->
      <div class="space"></div>
      <div class="rank__header">
        <img src="/static/images/rankWord.png" class="rankIntro">
        <!-- <i></i>
        <h2>算力排行</h2> -->
        <p>用户：{{countUser}}人</p>
      </div>
      <div class="honor__list">
        <ul class="honor__list__row">
          <li>
            <div class="honor__list__title">比特钻总产值</div>
            <div class="honor__list__data">{{toThousands(data.totleNum) || 0}}</div>
          </li>
          <li>
            <div class="honor__list__title">比特钻昨天总产值</div>
            <div class="honor__list__data">{{toThousands(data.dayMine) || 0 }}</div>
          </li>
        </ul>
        <ul class="honor__list__row">
          <li>
            <div class="honor__list__title">我的算力</div>
            <div class="honor__list__data">{{data.bm_stress || 0}}</div>
          </li>
          <li>
            <div class="honor__list__title">我的算力排名</div>
            <div class="honor__list__data">{{data.rownum || 0}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {WhetherBet} from 'api/champion'
export default {
  props: {
    data: Object,
    countUser: ''
  },
  methods: {
    toThousands (num) {
      var result = [ ]
      var counter = 0
      var showNum = 0
      showNum = (num || 0).toString().split('.')
      num = (showNum[0] || 0).toString().split('')
      for (var i = num.length - 1; i >= 0; i--) {
        counter++
        result.unshift(num[i])
        if (!(counter % 3) && i !== 0) { result.unshift(',') }
      }
      if (showNum[1]) {
        return result.join('') + '.' + showNum[1]
      } else {
        return result.join('')
      }
    },
    WhetherCham () {
      WhetherBet({lotteryId: 9999}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.chamList = data.data
          if (data.data === 0) {
            this.$router.push({name: '冠军预测'})
          } else {
            this.$router.push({name: '已下注-猜冠军', query: {teamUrl: data.data.team_url, teamName: data.data.lotter_result}})
          }
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    worldCup () {
      this.$router.push({name: '玩转世界杯', query: {pid: 101}})
    },
    ouGuan () {
      this.$router.push({name: '玩转世界杯', query: {pid: 102}})
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.space{
  height:10px;
  background: #f4f6f9;
}
.worldBanner{
  width:90%;
  margin:0 5%;
  height:120px;
  background: url('/static/images/worldCupEnter.png') no-repeat center;
  background-size:100% 100%;
  margin-top:20px;
  margin-bottom:10px;
}
.ouGuan{
  width:90%;
  margin:0 5%;
  height:120px;
  background: url('/static/images/ouGuanEnter.png') no-repeat center;
  background-size:100% 100%;
  margin-top:20px;
  margin-bottom:10px;
}
.guessChampion{
  width:90%;
  margin:0 5%;
  height:120px;
  background: url('/static/images/guessChampion.png') no-repeat center;
  background-size:100% 100%;
  margin-top:20px;
  margin-bottom:10px;
}
.worldLink{
  width:100%;
  height:100%;
}
.rank__header{
    text-align: center;
    padding: 15px 0;
    background-image: url('/static/images/rank.png');
    background-size: 100% 100%;
    color: #fff;
    i{
      display: block;
      width: 22px;
      height: 20px;
      margin: 0 auto;
      background-image: url('/static/images/list.png');
      background-size: 100% 100%;
    }
    h2{
      margin: 10px 0;
      font-size: 30px;
    }
    p{
      margin: 0;
      // color:#BADEFF;
      color:#ffffff;
    }
    .rankIntro{
      width:120px;
      height:50px;
      margin-bottom:8px;
    }
  }
.honor{
  margin-bottom: 5px;
  background: #fff;

  &__main{
    // border: 1px solid #353966;
    padding-top: 40px;
  }
  &__header{
    width: 100%;
    padding: 20px 0;
    background-image: url('/static/images/bit.png');
    background-size: 100% 100%;

    h1,div{
      margin: 0 auto;
      text-align: center;
      color: #2490FF;
    }

  }

  &__list{
     padding: 0 5%;
    &__row{
      overflow: hidden;
      padding-bottom: 20px;
      width: 100%;
      li{
        float: left;
        width: 50%;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
    &__title{
      color: #8F8F8F;
      font-size: 12px;
      padding: 20px 0;
    }
    &__data{
      font-weight: bold;
      color: #000000;
      font-size: 18px;
    }
  }
}
</style>
