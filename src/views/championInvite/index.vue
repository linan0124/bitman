<template>
<div class="inviteCart">
  <div id="share">
      <div class="header-arrow">
        <a class="arrow" href="javascript:history.go(-1)"></a>
      </div>
      <img src="static/images/chamlogo.png" alt="" class="chamlogo">
      <div class="preTxt">我预测：2018世界杯冠军队将是——</div>
    <div class="shareContent">
      <div class="chamSmall">
        <div class="chooseTeam" v-if="chamList===0"><img src="" alt=""></div>
        <div class="teamName" v-if="chamList===0">尚未预测</div>
        <div class="chooseTeam" v-if="chamList!==0"><img :src="chamList.team_url" alt=""></div>
        <div class="teamName" v-if="chamList!==0">{{chamList.lotter_result}}</div>
      </div>
      <div class="shareBox">
        <div class="agree">你同意吗？</div>
        <div class="agreeTxt">注册BitMan，你将免费获得1000钻参与世界杯冠军预测</div>
        <div class="linkTxt" id="links"></div>
        <div class="copyLink" @click="copyLink" id="copyLinks" :data-clipboard-text="links">复制邀请链接</div>
        <div class="QRImg" id="QRImg">
          <!-- <img id="QRImg" class="codeImg"> -->
        </div>
        <div class="openTip">扫码后请在浏览器打开</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {getShareCode} from 'api/share'
import {WhetherBet} from 'api/champion'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      shareList: {},
      links: '',
      chamList: {}
    }
  },
  methods: {
    copyLink () {
      var clipboard = new Clipboard('#copyLinks')
      if (!judgeClient) {
        return ClientObject.toast('复制成功')
      }
      $('#copyLinks').html('已复制')
      console.log(clipboard)
    },
    getCode () {
      getShareCode().then(response => {
        var data = response.data
        if (data.code === '200') {
          this.shareList = data.data
          // 复制邀请链接
          // var links = 'https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code
          var links = '【比特曼】2018俄罗斯世界杯冠军预测活动正式上线！新注册用户免费领1000颗比特钻，每邀请一名好友再赠送100颗比特钻！加入比特曼，参与比分竞猜，5000万比特钻等您来拿！https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code
          this.links = links
          $('#links').html(links)
          // 二维码
          var qrcode = new QRCode(document.getElementById('QRImg'), {
            width: 120,
            height: 120
          })
          qrcode.makeCode('https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code)
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    WhetherCham () {
      WhetherBet({lotteryId: 9999}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.chamList = data.data
          // if (data.data === 0) {
          //   this.$router.push({name: '冠军预测'})
          // } else {
          //   this.$router.push({name: '已下注-猜冠军', query: {teamUrl: data.data.team_url, teamName: data.data.lotter_result}})
          // }
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.getCode()
    this.WhetherCham()
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
  .header-arrow{
    height:21px;
    padding-top: 12px;
    margin-left: 10px;
    color:#ffffff;
  }
  .arrow{
    width:12px;
    height:21px;
    display:block;
    background:url('/static/images/back.png') no-repeat;
    background-size:100%;
    float:left;
  }
  .routerLink{
    width:60px;
    float:right;
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

  #share{
    width: 100%;
    height: 720px;
    background:url('/static/images/chamSharebg.png') no-repeat center;
    background-size:100% 100%;
    .chamlogo{
      display: block;
      width: 196px;
      height: 124px;
      margin: 0 auto;
    }
    .preTxt{
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      margin-top: 20px;
    }
    .shareContent{
      width: 90%;
      height: 453px;
      margin: 0 auto;
      background: #fff;
      margin-top: 10px;
     border-radius: 4px 4px 0 0;
     .chamSmall{
       width: 100%;
       height: 110px;
       background: url(/static/images/chamSmall.png) no-repeat;
       background-size: cover;
     }
     .chooseTeam{
       padding-top: 23px;
       width: 100%;
       img{
         display: block;
         width: 38px;
         height: 38px;
         background: #fff;
         margin: 0 auto;
         border-radius: 38px;
       }
     }
     .teamName{
       font-size: 16px;
       color: #FFFFFF;
       text-align: center;
       margin-top: 10px;
     }
     .agree{
       font-size: 14px;
       color: #000000;
       text-align: center;
       font-weight: 700;
       margin-top: 20px;
     }
     .agreeTxt{
       font-size: 12px;
       color: #8F8F8F;
       text-align: center;
       margin-top: 8px;
     }
     .linkTxt{
    display: none;
     }
  .copyLink{
      background: #0081FF;
      border-radius: 4px;
      width: 82%;
      height: 38px;
      margin: 0 auto;
      text-align: center;
      line-height: 38px;
      color: #fff;
      margin-top: 20px;
       border-bottom:5px solid #0068CD;
     }
     .QRImg{
       width: 120px;
       height: 120px;
       margin: 0 auto;
       margin-top: 20px;
     }
     .openTip{
       text-align: center;
       font-size: 12px;
       color: #8F8F8F;
       margin-top: 10px;
     }
    }
  }

</style>
