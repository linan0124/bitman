<template>
  <div class="contents">
    <bm-back></bm-back>
    <div class="banner">
      <img src="static/images/uploadList.png" alt="" class="audit">
      <div class="line"></div>
      <div class="block clearfix">
        <div class="fl hashrate clearfix">
          <div class="addhashrate fr">+20</div>
          <img src="static/images/candy.png" alt="" class="candy fr">
        </div>
        <div class="fr coin clearfix">
           <img src="static/images/diamond.png" alt="" class="diamond fl">
          <div class="addCoin fl">+20</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="money clearfix">
        <div class="fl moneyTitle">金额</div>
        <div class="fr moneyValue">270</div>
      </div>
      <div class="money clearfix">
        <div class="fl moneyTitle">时间</div>
        <div class="fr moneyValue">2018年4月8日 12:00</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

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
.coin{
  width: 41%;
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
}
.box{
  width: 100%;
  // height: 85px;
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
