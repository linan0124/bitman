<template>
  <div class="contents">
    <div class="verifyBlock">
      <div class="verifyItem">
        <img class="icon" :src="`/static/images/${verifyInfo.icon}.png`">
        <div class="itemInfo">
          <div class="itemTitle clearfix">
            <div class="title">{{verifyInfo.title}}<span class="tip">{{verifyInfo.titleTip}}</span></div>
            <img v-if="verifyInfo.more" @click="moreInfos" class="moreArrow" src="/static/images/moreMsg.png">
          </div>
          <div class="itemAdd">算力<span>+{{verifyInfo.ability}}</span>比特钻<span>+{{verifyInfo.diamond}}</span></div>
        </div>
        <div class="speedBtn">
          <div class="btn" @click="speedBtn">
            <div class="btnWord">加速</div>
            <div class="btnBg"></div>
          </div>
        </div>
      </div>
        <div class="verifyInfo">
          <div class="infoContent">
            <p v-for="( item, index ) in verifyInfo.tipList" :key="index">{{item}}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'verifyItem',
  data () {
    return {
      phone: {
        title: '手机号验证',
        tipList: ['铁路出行信息', '铁路用户画像'],
        ability: 5,
        diamond: 20,
        more: true
      // titleTip: '（手机号）',
      }
    }
  },
  props: {
    verifyInfo: {
      title: String,
      icon: String,
      titleTip: String,
      ability: Number,
      diamond: Number,
      tipList: [],
      more: {
        type: Boolean,
        default: false
      }
    }
  },
  methods: {
    moreInfos () {
      if ($('.verifyInfo').css('display') === 'none') {
        $('.verifyInfo').velocity('slideDown', {duration: 100})
      } else {
        $('.verifyInfo').velocity('slideUp', {duration: 100})
      }
    },
    speedBtn (event) {
      this.$emit('click', event)
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .verifyBlock{
    padding-left:3%;
    min-height:60px;
    background:#ffffff;
    margin-bottom:5px;
  }
  .verifyItem{
    height:60px;
    padding-right:3%;
    background:#ffffff;
    color: #8F8F8F;
    display: flex;
    display: -webkit-flex;
    // flex-direction: row;
    // justify-content:center;
    align-items:center;
    .icon{
      width:25px;
      height:25px;
      margin-right:3%
    }
  }
  .itemInfo{
    min-width:30%;
    .itemTitle{
      color:#000000;
    }
    .itemAdd{
      font-size:12px;
      padding-top:4px;
      span{
        color:#0081FF;
        margin-right:8px;
      }
    }
    .tip{
      color: #8F8F8F;
      font-size:12px;
    }
    .moreArrow{
      float:left;
      width:9px;
      height:16px;
      margin-left:8px;
      transform:rotate(90deg);
      -ms-transform:rotate(90deg);/* IE 9 */
      -moz-transform:rotate(90deg);/* Firefox */
      -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
      -o-transform:rotate(90deg);/* Opera */
    }
    .title{
      float:left;
    }
  }
  .speedBtn{
    flex-grow:1;
  }
  .btn{
    width:70px;
    float:right;
    height:30px;
    position: relative;
    &:active{
      transform: scale(0.98,0.9)
    }
    .btnWord{
      width:70px;
      color:#ffffff;
      background: #0081FF;
      line-height:30px;
      text-align:center;
      border-radius: 4px;
      position: absolute;
      left:0;
      top:0;
      z-index:100;
    }
    .btnBg{
      width:100%;
      height:100%;
      background:#0068CD;
      border-radius: 4px;
      position: absolute;
      z-index:1;
      left:0;
      bottom:-5px;
    }
  }
  .verifyInfo{
    display:none;
    margin-left:3%;
    min-height:40px;
    padding-bottom:15px;
    .infoContent{
      margin-left:25px;
      border-top: 1px solid #f4f6f9;
      // padding-top:10px;
    }
  }
</style>
