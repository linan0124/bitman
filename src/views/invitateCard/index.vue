<template>
<div class="inviteCart">
  <!-- <div @click="btnSave">生成图片</div> -->
  <!-- <div @click="Download">保存图片</div> -->
  <div id="share">
    <div class="shareBg">
      <div class="header-arrow">
        <a class="arrow" href="javascript:history.go(-1)"></a>
      </div>
      <div class="cardTitle">
        <!-- <img src="/static/images/cardLogo.png" class="cardLogo"> -->
        <div class="tit">
          <!-- <img src="/static/images/shareTitle.png"> -->
        </div>
        <!-- <div class="logoTxt">快来和我一起瓜分1000万颗比特钻</div> -->
        <!-- <div class="logoTxt">新注册用户再赠送1000颗比特钻</div> -->
      </div>
    </div>
    <div class="shareContent">
      <div class="inviteTxt">您的邀请码</div>
      <div class="incode copy"  @click="copyCode" id="copyNote" :data-clipboard-text="shareList.invite_code">
        <div class="inviteCode">{{shareList.invite_code}}</div>
        <div class="inviteTip" id="inviteTip">每邀请一位好友赠送100颗比特钻</div>
      </div>
      <!-- 二维码 -->
      <div class="QRImg">
        <div id="QRImg" class="codeImg"></div>
        <!-- <div class="corner topLeft"></div>
        <div class="corner topRight"></div>
        <div class="corner botLeft"></div>
        <div class="corner botRight"></div> -->
      </div>
      <div class="QRcode">
        <span class="space">扫码注册比特曼</span>
        <span>领糖果</span>
      </div>
      <div class="openTip">扫码后请在浏览器打开</div>
    </div>
    <div class="inviteMsg">
      手机截图发给好友或分享朋友圈
    </div>
  </div>
  <!-- <div id="images"
    style="width:190px;height:302px;float:left;text-align:center;line-height:302px">
    图片预览区
  </div> -->
</div>
</template>
<script>
import {getShareCode} from 'api/share'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      shareList: {},
      links: '',
      code: ''
    }
  },
  methods: {
    btnSave () {
      html2canvas($('#share'), {
        onrendered: function (canvas) {
          canvas.setAttribute('id', 'thecanvas')
          document.getElementById('images').innerHTML = ''
          document.getElementById('images').appendChild(canvas)
        }
      })
    },
    Download () {
      var oCanvas = document.getElementById('thecanvas')
      var imgData1 = Canvas2Image.saveAsPNG(oCanvas, true).getAttribute('src')
      this.saveFile(imgData1, 'richer.png')
      // Canvas2Image.saveAsPNG(oCanvas);
    },
    // 保存文件函数
    saveFile (data, filename) {
      var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
      saveLink.href = data
      saveLink.download = filename

      var event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      saveLink.dispatchEvent(event)
    },
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
          // var links = 'https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code
          var links = 'https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code
          this.links = links
          $('#links').html(links)
          // 二维码
          // var link = 'http://pan.baidu.com/share/qrcode?w=150&h=150&url=' + 'https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code
          // $('#QRImg').qrcode({
          //   // render: "table", //table方式
          //   width: 150,
          //   height: 150,
          //   text: 'https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code
          // })
          // $('#QRImg').attr('src', link)
          var qrcode = new QRCode(document.getElementById('QRImg'), {
            width: 120,
            height: 120
          })
          qrcode.makeCode('https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code)
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.getCode()
  }
}
</script>
<style lang="scss" scoped>
  .openTip{
    color:#696969;
    line-height:20px;
    font-size:14px;
    text-align:center;
  }
  .cardTitle{
    text-align:center;
    .cardLogo{
      width:120px;
      height:50px;
      margin-bottom:30px;
    }
  }
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
    height: 720px;
    // background:url('/static/images/cardBg.png') no-repeat center;
    background:url('/static/images/footerballBg.png') no-repeat center;
    background-size:100% 100%;
  .shareBg{
    width: 100%;
    height: 220px;
    padding-top:20px;
  }
  .btmLogo{
    display: block;
    width: 157px;
    height: 36px;
    margin: 0 auto;
  }
  .tit{
    width:86%;
    margin:0 auto;
    margin-bottom:20px;
    img{
      width:100%;
      height:50px;
    }
  }
  .logoTxt{
    width: 220px;
    text-align: center;
    margin: 0 auto;
    margin-top: 10px;
    color: #ffffff;
    line-height: 18px;
  }
  .shareContent{
    width: 90%;
    height: 420px;
    margin: 0 auto;
    background:url('/static/images/cardBgb.png') no-repeat center;
    background-size:100% 100%;
  }
  .inviteTxt{
    font-size: 16px;
    color: #787DA5;
    width: 100px;
    text-align: center;
    margin: 0 auto;
    padding-top: 30px;
  }
  .incode{
    width: 80%;
    height: 105px;
    margin: 0 auto;
    background: #FFFFFF;
    /*border: 1px solid #A4BAFF;
    border-radius: 4px;*/
    margin-top: 13px;
    // border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
    background:url('/static/images/line.png') no-repeat bottom;
    background-size:100%;
  }
  .inviteCode{
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 36px;
    // color: #0081FF;
    color: #1F9B23;
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
    width: 160px;
    height:30px;
    // background:url('/static/images/cardGroup.png') no-repeat center;
    background:url('/static/images/cardGroup2.png') no-repeat center;
    background-size:100% 100%;
    margin: 0 auto;
    font-size: 12px;
    color: #8F8F8F;
    margin-top: 15px;
    margin-bottom:8px;
    line-height:30px;
    span{
      color:#ffffff;
    }
    .space{
      margin-left:7px;
      margin-right:5px;
    }
  }
  .QRImg{
    width: 120px;
    height: 120px;
    margin: 0 auto;
    background:#8F8F8F;
    margin-top: 20px;
    position: relative;
  }
  .corner{
    width:10px;
    height:10px;
    position:absolute;
  }
  .topLeft{
    border-left:1px solid #787da5;
    border-top:1px solid #787da5;
    top:5px;
    left:5px;
  }
  .topRight{
    border-right:1px solid #787da5;
    border-top:1px solid #787da5;
    top:5px;
    right:5px;
  }
  .botLeft{
    border-left:1px solid #787da5;
    border-bottom:1px solid #787da5;
    bottom:5px;
    left:5px;
  }
  .botRight{
    border-right:1px solid #787da5;
    border-bottom:1px solid #787da5;
    right:5px;
    bottom:5px;
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
    // font-size: 12px;
    color: #ffffff;
    margin: 0 13%;
    margin-top: 10px;
    line-height: 22px;
  }
  .blue{
    color: #0081FF;
  }

  }

</style>
