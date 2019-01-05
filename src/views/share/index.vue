<template>
<div id="share">
  <!-- <bm-back></bm-back> -->
  <div class="shareBg">
    <!-- <a class="arrow" href="javascript:history.go(-1)"></a> -->
    <div class="header-arrow">
      <a class="arrow" href="javascript:history.go(-1)"></a>
      <router-link class="routerLink" tag="div" to="/invitationList">邀请记录</router-link>
    </div>
    <img src="/static/images/BitManLogo.png" alt="" class="btmLogo">
    <div class="logoTxt">生活就是挖矿</div>
  </div>
  <div class="shareContent">
    <div class="inviteTxt">您的邀请码</div>
    <div class="incode copy"  @click="copyCode" id="copyNote" :data-clipboard-text="shareList.invite_code">
       <div class="inviteCode">{{shareList.invite_code}}</div>
       <div class="inviteTip" id="inviteTip">点击复制（使用APP注册时填写）</div>
    </div>
      <div class="linkTxt" id="links"></div>
      <div class="copyLink" @click="copyLink" id="copyLinks" :data-clipboard-text="links">复制邀请链接，发给好友</div>
      <!-- 二维码 -->
      <div class="QRImg"><img id="QRImg" class="codeImg"></div>
      <div class="QRcode">扫码后请在浏览器中打开</div>
      <div class="inviteTimes">剩余邀请次数：{{shareList.countInv}}次</div>
  </div>
   <div class="inviteMsg">每人可邀请{{shareList.inv_maxcount}}位好友加入比特曼平台，每邀请一位好友注册实名后,您将获得<span class="blue">{{shareList.inv_hashreate}}算力+{{shareList.inv_currency}}颗比特钻</span>的额外奖励</div>

  <!-- <div class="inviteTxt">您的邀请码</div>
  <div class="inCode clearfix">
    <div class="inviteCode fl">{{shareList.invite_code}}</div>
    <button class="copy fr" @click="copyCode" id="copyNote" :data-clipboard-text="shareList.invite_code">复制</button>
  </div> -->
  <!-- <div class="line"></div>
  <div class="inviteTxt1">邀请链接</div>
  <div class="coLink clearfix">
    <div class="linkTxt fl" id="links"></div>
    <button class="copyLink fr" @click="copyLink" id="copyLinks" :data-clipboard-text="links">复制</button>

  </div> -->
  <!--<div class="QRcode">扫码后请在浏览器中打开</div>
  <div class="QRImg"><img id="QRImg" class="codeImg"></div>
  <div class="inviteTimes">剩余邀请次数：{{shareList.countInv}}次</div>

  <div class="inviteTip">每人可邀请{{shareList.inv_maxcount}}位好友加入火星，每邀请一位好友注册实名后，您将获得<span class="blue">{{shareList.inv_hashreate}}个算力</span>的额外奖励</div> -->

</div>
</template>
<script>
import {getShareCode} from 'api/share'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      shareList: {},
      links: ''
    }
  },
  methods: {
    copyCode () {
      var clipboard2 = new Clipboard('#copyNote')
      if (!judgeClient) {
        return ClientObject.toast('复制成功')
      }
      $('#inviteTip').html('已复制')
      console.log(clipboard2)
    },
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
          var links = 'http://' + window.location.host + '/#/login?inviteFrom=' + data.data.invite_code
          this.links = links
          $('#links').html(links)
          // 二维码
          var link = 'http://pan.baidu.com/share/qrcode?w=150&h=150&url=' + 'http://' + window.location.host + '/#/login?inviteFrom=' + data.data.invite_code
          $('#QRImg').attr('src', link)
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.getCode()
    var link = 'http://pan.baidu.com/share/qrcode?w=150&h=150&url=' + window.location.host
    $('#QRImg').attr('src', link)
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
       height:37px;
       margin:0 5%;
       color:#ffffff;
    }
    .arrow{
      width:12px;
      height:37px;
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
  height: 700px;
  .shareBg{
    width: 100%;
    height: 230px;
    padding-top:20px;
    background-image: linear-gradient(bottom,#26B6BA 0%, #430B84 100%);
    background-image: -o-linear-gradient(bottom,#26B6BA 0%, #430B84 100%);
    background-image: -moz-linear-gradient(bottom,#26B6BA 0%, #430B84 100%);
    background-image: -webkit-linear-gradient(bottom,#26B6BA 0%, #430B84 100%);
  }
  .btmLogo{
    display: block;
    width: 157px;
    height: 36px;
    margin: 0 auto;
  }
  .logoTxt{
    width: 220px;
    text-align: center;
    margin: 0 auto;
    margin-top: 10px;
    font-size: 12px;
    color: #ffffff;
    line-height: 18px;
  }
.shareContent{
    width: 90%;
    height: 420px;
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 4px;
    margin-top: -80px;
}
  .inviteTxt{
    font-size: 14px;
    color: #787DA5;
    width: 100px;
    text-align: center;
    margin: 0 auto;
    padding-top: 20px;
  }
  .incode{
    width: 80%;
    height: 90px;
    margin: 0 auto;
    background: #FFFFFF;
    border: 1px solid #A4BAFF;
    border-radius: 4px;
    margin-top: 13px;
  }
  .inviteCode{
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 36px;
    color: #0081FF;
    padding-top: 14px;
  }
  .inviteTip{
    width: 100%;
    text-align: center;
  }
  .linkTxt{
    display: none;
  }
  .copyLink{
    display: block;
    width: 80%;
    height: 45px;
    margin: 0 auto;
    background: #0081FF;
    border-radius: 4px;
    margin-top: 20px;
    line-height: 45px;
    text-align: center;
    color: #fff;
     box-shadow:0px 5px 0px 0px #0068CD;
  }
  .QRcode{
    width: 200px;
    text-align: center;
    margin: 0 auto;
    font-size: 12px;
    color: #8F8F8F;
    margin-top: 10px;
  }
  .QRImg{
    width: 120px;
    height: 120px;
    margin: 0 auto;
    background:#8F8F8F;
    margin-top: 20px;
  }
  .codeImg{
    width: 120px;
    height: 120px;
  }
  .inviteTimes{
    width: 200px;
    text-align: center;
    margin: 0 auto;
    font-size: 12px;
    color: #8F8F8F;
    margin-top: 8px;
  }
   .inviteMsg{
    text-align: center;
    font-size: 12px;
    color: #8F8F8F;
    margin: 0 13%;
    margin-top: 10px;
    line-height: 22px;
  }
    .blue{
    color: #0081FF;
  }

  }

</style>
