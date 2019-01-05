<template>
  <div class="content">
    <!-- 手机号 -->
    <verify-item :verifyInfo=phone @click="verifyPhone"></verify-item>
    <!-- 归属地 -->
    <div class="verifyBlock">
      <div class="verifyItem">
        <img class="icon" src="/static/images/verify2.png">
        <div class="itemInfo">
          <div class="itemTitle clearfix">
            <div class="title">归属地</div>
            <img @click="showInfos('phone')" class="moreArrow" src="/static/images/moreMsg.png">
          </div>
          <div class="itemAdd">算力<span>+5</span>比特钻<span>+20</span></div>
        </div>
        <div class="speedBtn">
          <div class="btn">
            <div class="btnWord">加速</div>
            <div class="btnBg"></div>
          </div>
        </div>
      </div>
      <div class="verifyInfo phone">
        <div class="infoContent">
          <p>身份证归属地</p>
          <p>手机号归属地</p>
        </div>
      </div>
    </div>
    <!-- 学历 -->
     <verify-item :verifyInfo=education @click="verifyPhone"></verify-item>
     <!-- 司法 -->
     <verify-item :verifyInfo=judicial @click="verifyPhone"></verify-item>
     <!-- 银行卡 -->
     <verify-item :verifyInfo=bankCard @click="verifyPhone"></verify-item>
     <!-- 铁路出行 -->
    <div class="verifyBlock">
      <div class="verifyItem">
        <img class="icon" src="/static/images/verify6.png">
        <div class="itemInfo">
          <div class="itemTitle clearfix">
            <div class="title">铁路出行<span class="tip"></span></div>
            <img @click="showInfos('railway')" class="moreArrow" src="/static/images/moreMsg.png">
          </div>
          <div class="itemAdd">算力<span>+5</span>比特钻<span>+20</span></div>
        </div>
        <div class="speedBtn">
          <div class="btn">
            <div class="btnWord">加速</div>
            <div class="btnBg"></div>
          </div>
        </div>
      </div>
      <div class="verifyInfo railway">
        <div class="infoContent">
          <p>铁路出行信息</p>
          <p>铁路用户画像</p>
        </div>
      </div>
    </div>
    <!-- 航旅信息 -->
    <div class="verifyBlock">
      <div class="verifyItem">
        <img class="icon" src="/static/images/verify7.png">
        <div class="itemInfo">
          <div class="itemTitle clearfix">
            <div class="title">航旅信息<span class="tip"></span></div>
            <img @click="showInfos('airport')" class="moreArrow" src="/static/images/moreMsg.png">
          </div>
          <div class="itemAdd">算力<span>+5</span>比特钻<span>+20</span></div>
        </div>
        <div class="speedBtn">
          <div class="btn">
            <div class="btnWord">加速</div>
            <div class="btnBg"></div>
          </div>
        </div>
      </div>
      <div class="verifyInfo airport">
        <div class="infoContent">
          <p v-for="(item, index) in airportList" :key="index">{{item}}</p>
        </div>
      </div>
    </div>
     <!-- 车辆信息 -->
    <div class="verifyBlock">
      <div class="verifyItem">
        <img class="icon" src="/static/images/verify8.png">
        <div class="itemInfo">
          <div class="itemTitle clearfix">
            <div class="title">车辆信息<span class="tip">（需要车牌号、车架号、VIN）</span></div>
            <img @click="showInfos('car')" class="moreArrow" src="/static/images/moreMsg.png">
          </div>
          <div class="itemAdd">算力<span>+5</span>比特钻<span>+20</span></div>
        </div>
        <div class="speedBtn">
          <div class="btn">
            <div class="btnWord">加速</div>
            <div class="btnBg"></div>
          </div>
        </div>
      </div>
      <div class="verifyInfo car">
        <div class="infoContent">
          <p>车辆续报</p>
          <p>车型信息</p>
          <p>违章记录查询</p>
        </div>
      </div>
    </div>
    <p class="tip">更多数据，敬请期待…</p>
  </div>
</template>

<script>
import {getAssetsList} from 'api/myassets'
import BmFooter from 'components/footer'
export default {
  data () {
    return {
      phone: {
        title: '手机号验证',
        icon: 'verify1',
        ability: 5,
        diamond: 20
      },
      education: {
        title: '银行卡绑定',
        icon: 'verify3',
        ability: 5,
        diamond: 20,
        titleTip: '（需要银行卡号）'
      },
      judicial: {
        title: '学历信息',
        icon: 'verify4',
        ability: 5,
        diamond: 20
      },
      bankCard: {
        title: '司法信息',
        icon: 'verify5',
        ability: 5,
        diamond: 20
      },
      airportList: [
        '航空行为',
        '乘机信息',
        '是否乘机出国',
        '价值评级',
        '消费等级',
        '消费能力评估'
      ]
    }
  },
  methods: {
    verifyPhone () {},
    showInfos (node) {
      if ($('.' + node).css('display') === 'none') {
        $('.' + node).velocity('slideDown', {duration: 100})
      } else {
        $('.' + node).velocity('slideUp', {duration: 100})
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .content{
    padding-bottom:100px;
  }
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
    margin-left:3%;
    min-height:40px;
    padding-bottom:15px;
    .infoContent{
      margin-left:25px;
      border-top: 1px solid #f4f6f9;
      // padding-top:10px;
    }
  }
  .phone {
    display:none;
  }
  .railway{
    display:none;
  }
  .airport{
    display:none;
  }
  .car{
    display:none;
  }
  .tip{
    text-align:center;
    line-height:20px;
  }
</style>
