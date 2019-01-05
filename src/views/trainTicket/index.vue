<template>
  <div class="contents">
    <bm-back></bm-back>
    <div class="banner">
      <img src="static/images/uploadList.png" alt="" class="audit">
      <div class="line"></div>
      <div class="block clearfix">
        <img src="static/images/diamond.png" alt="" class="diamond">
        +{{infoObj.number}}
      </div>
    </div>
    <div v-if="Number(iswhite) === 1">
      <!-- 纸质账单 -->
      <div class="box" v-if="Number(type) === 1">
        <div class="money clearfix">
          <div class="fl moneyTitle">金额</div>
          <div class="fr moneyValue">{{infoObj.price}}</div>
        </div>
        <div class="money clearfix">
          <div class="fl moneyTitle">时间</div>
          <div class="fr moneyValue">{{infoObj.date}}</div>
        </div>
      </div>
      <!-- 火车票 -->
      <div class="box" v-if="Number(type) === 2">
        <div class="money clearfix">
          <div class="fl moneyTitle">车次</div>
          <div class="fr moneyValue">{{infoObj.tnumber}}</div>
        </div>
        <div class="money clearfix">
          <div class="fl moneyTitle">始发站</div>
          <div class="fr moneyValue">{{infoObj.origin}}</div>
        </div>
        <div class="money clearfix">
          <div class="fl moneyTitle">到达站</div>
          <div class="fr moneyValue">{{infoObj.destination}}</div>
        </div>
        <div class="money clearfix">
          <div class="fl moneyTitle">时间</div>
          <div class="fr moneyValue">{{infoObj.tdate}}</div>
        </div>
        <div class="money clearfix">
          <div class="fl moneyTitle">票价</div>
          <div class="fr moneyValue">{{infoObj.tprice}}</div>
        </div>
        <div class="money clearfix">
          <div class="fl moneyTitle">席座</div>
          <div class="fr moneyValue">{{infoObj.level}}</div>
        </div>
        <div class="money clearfix">
          <div class="fl moneyTitle">座位号</div>
          <div class="fr moneyValue">{{infoObj.place}}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getDetailById} from 'api/changeData'

export default {
  data () {
    return {
      iswhite: '',
      type: '',
      infoObj: {}
    }
  },
  methods: {
    detailsInfo () {
      getDetailById({id: this.$route.query.typeId}).then(response => {
        var data = response.data.mapData
        console.log(data.userFile)
        this.iswhite = data.iswhite
        // if (Number(data.code) === 200) {
        this.type = data.userFile.type
        this.infoObj = data.userFile
      // }
      }).catch(errortip => {})
    }
  },
  mounted () {
    // console.log(this.$route.query.typeId)
    this.detailsInfo()
  }
}
</script>

<style lang="scss" scoped>
.fl {
      float: left;
    }

    .fr {
      float: right;
    }
    .clearfix::before,
    .clearfix::after {
      content: "";
      height: 0;
      line-height: 0;
      display: block;
      visibility: hidden;
      clear: both;
    }
.banner{
  width: 100%;
  height: 200px;
  background: #fff;
  .audit{
    display: block;
    width: 150px;
    height: 110px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .line{
    width: 235px;
    height: 1px;
    background: #E6E6E6;
    margin: 0 auto;
    margin-top: 15px;
  }
  .block{
    margin-top: 10px;
    text-align:center;
    height:30px;
    line-height:30px;
    .hashrate{
      width: 41%;
      .candy{
      width: 28px;
      height: 23px;
      margin-right: 7px;
    }
    .addhashrate{
      font-size: 14px;
      color: #1F1F1F;
      line-height: 24px;
    }
    }
    .diamond{
      width: 16px;
      height: 23px;
      margin-right: 7px;
    }
  .addCoin{
    font-size: 14px;
    color: #1F1F1F;
    line-height: 24px
  }
  }
}
.box{
  width: 100%;
  background: #fff;
  margin-top: 5px;
  padding: 10px 0;
  .money{
    width: 94%;
    height: 40px;
    margin: 0 auto;
    background: #F4F6F9;
    border-radius: 4px;
    line-height: 40px;
    margin-bottom: 5px;
    .moneyTitle{
      font-size: 14px;
      color: #000;
      padding-left: 10px;
    }
    .moneyValue{
      font-size: 14px;
      color: #8F8F8F;
      text-align: right;
      padding-right: 10px;
    }
  }
}

</style>
