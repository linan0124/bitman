<template>
  <div class="contents">
    <div class="starHead">
      <div class="star">
        <div class="claimStar">认领星球</div>
      </div>
      <div class="showInfo">
        <div class="giveName">给你的星球命名</div>
        <div class="ability">您目前的星球算力：<span class="showPower">110</span><img class="powerIcon" src="/static/images/candy.png"></div>
      </div>
    </div>
    <div class="fastSpeed">
      <div class="speedDescribe">算力加速<span class="fontSize">（授权数据接口可以获得更多星球算力）</span></div>
      <div class="speedBtn">一键加速</div>
    </div>

    <!-- 未加速项 -->
    <speed-item></speed-item>
    <!-- 已加速项 -->

    <!-- 页脚 -->
    <bm-footer></bm-footer>
  </div>
</template>

<script>
import {getAssetsList} from 'api/myassets'
import BmFooter from 'components/footer'
import speedItem from './speedItem'
export default {
  data () {
    return {

    }
  },
  components: {BmFooter, speedItem},
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .contents{

  }
  .starHead{
    width:100%;
    height:350px;
    background:url('/static/images/starBg.png');
    background-size:100% 100%;
    position: relative;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
  }
  .star{
    width:180px;
    height:180px;
    background:url('/static/images/plane.png');
    background-size:100% 100%;
    display: flex;
    display: -webkit-flex;
    justify-content:center;
    align-items:center;
    // position: absolute;
    // left:50%;
    // margin-left:-90px;
    // top:50%;
    // margin-top:-90px;
  }
  .claimStar{
    width:80px;
    height:25px;
    background: #FFFFFF;
    border-radius: 45px;
    color: #0081FF;
    text-align:center;
    line-height:25px;
  }
  .showInfo{
    width:100%;
    height:50px;
    text-align:center;
    position: absolute;
    left:0;
    bottom:15px;
    color:#ffffff;
  }
  .ability{
    font-size:12px;
    .showPower{
      display:inline-block;
      color: #FFEE48;
      margin:0 5px;
    }
    .powerIcon {
      width:15px;
      height:15px;
      padding-top:5px;
      display:inline-block;
    }
  }
  .fastSpeed{
    height:50px;
    line-height:50px;
    padding-left:3%;
    padding-right:4%;
    .speedDescribe{
      min-width:50%;
      height:100%;
      float:left;
      color: #8F8F8F;
    }
    .fontSize{
      font-size:10px;
    }
    .speedBtn{
      width:60px;
      float:right;
      color: #0081FF;
    }
  }
</style>
