<template>
<div id="introduce">
  <div class="intro">
    <bm-back></bm-back>
    <img src="/static/images/LOGO.png" alt="" class="logo">
    <div class="logoTxt">基于区块链的数据平台</div>
    <div class="introTxt">
      <div class="introTxt1">BitMan通过区块链甲米存储技术帮助您管理数字资产，让您的数据真正为自己所有。</div>
      <div class="introTxt1">我们每个人都在无时无刻地产生有用的数据，诸如信用数据、注意力、互联网总计都是个人的重要数据资产，包括社交、娱乐、购物、出行等等方面，而这些资产在过去并不曾被个体重视。而今星球基地为您构建星球居民身份，帮助您发现自身价值，使得个人信息价值得以公平公正地提现。</div>
      <div class="introTxt1">让价值贡献者参与价值分享。</div>
    </div>
    <div class="totalValue">

    </div>

  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      data: [

      ]
    }
  }
}
</script>
<style lang="scss" scoped>
#introduce{
 width: 100%;
}
.intro{
 width: 100%;
 height: 660px;
 background: url(/static/images/bg.png) no-repeat;
 background-size: cover;
.logo{
  display: block;
  margin: 0 auto;
  width: 160px;
  height: 37px;
  margin-top: 80px;//星球显示不出来,加大了margin40
}
.logoTxt{
  width: 120px;
  margin: 0 auto;
  margin-top: 18px;//星球显示不出来,加大了margin40
  font-size: 12px;
  color: #C3E1FF;
}
.introTxt{
  width: 90%;
  height: 170px;
  padding: 10px 0 20px 0;
  margin: 0 auto;
  background: #393E6F;
  border: 1px solid #404790;
  margin-top: 28px;
  font-size: 12px;
  color: #787DA5;
  line-height: 18px;
}
.introTxt1{
  padding: 0 10px;
  margin-bottom: 1em;
}
.totalValue{
width: 90%;
height: 220px;
background: #393E6F;
border: 1px solid #404790;
margin: 0 auto;
margin-top: 20px;
}
}

</style>
