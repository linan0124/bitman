<template>
  <div id="share">
    <!-- <bm-back></bm-back> -->
    <div class="shareBg">
      <!-- <a class="arrow" href="javascript:history.go(-1)"></a> -->
      <div class="header-arrow">
        <a class="arrow" href="javascript:history.go(-1)"></a>
      </div>
      <img src="/static/images/share_title_font.png" alt="" class="btmLogo">
    </div>
    <div class="shareContent">
      <div class="inviteTxt">我的邀请码</div>
      <div class="incode copy"  @click="copyCode" id="copyNote" :data-clipboard-text="shareList.invite_code">
        <div class="inviteCode">{{shareList.invite_code}}</div>
        <div class="inviteTimes">剩余奖励次数：<span class="blue">{{shareList.countInv}}次</span></div>
        <!--<div class="inviteTip" id="inviteTip">点击复制（使用APP注册时填写）</div>-->
      </div>
      <!--复制邀请链接-->
      <div class="shareWay clearfix">
        <div class="linkTxt" id="links"></div>
        <div class="btnBox">
          <div class="copyLink shareWay_1" @click="copyLink" id="copyLinks" :data-clipboard-text="links">复制邀请链接</div>
        </div>
        <div class="btnBox">
          <!-- invitateCard EuropeanShare-->
          <router-link to="/invitateCard" tag="div" class="invite shareWay_2">生成邀请卡</router-link>
        </div>
      </div>
    </div>
    <!--文案说明-->
    <div class="tips">
      <div class="tit">邀请详情</div>
      <p class="first">前10位好友注册后，邀请人可获得每位5算力+100个比特钻奖励；</p>
      <p class="second">第11-60位好友注册后，邀请人可获得每位100个比特钻奖励；</p>
      <p class="third">所邀请好友每次邀请的好友注册后，邀请人可获得每位10个比特钻奖励。</p>
      <!-- <p class="third">3.每邀请一位好友完成注册，可再获得{{shareList.inv_hashreate}}算力+{{shareList.inv_currency}}颗比特钻的额外奖励,最大奖励10次。</p> -->
    </div>
    <!-- 邀请记录 -->
    <div class="inviteRecord">
      <div class="inviteBtn">
        <router-link to="/invitationList" tag="div" class="shareWay_2">查看我的邀请奖励</router-link>
      </div>
      <!-- <div class="record">
        <div class="recordNum">我邀请的好友({{invitionInfo.people}})</div>
        <div class="recordNum">累计邀请奖励：{{invitionInfo.number}}</div>
      </div>
      <invitationList></invitationList> -->
    </div>
  </div>
</template>
<script>
import {getShareCode, invitedStatistics} from 'api/share'
import judgeClient from 'utils/ifclient'
// import invitationList from '../Invitationlist/list'
export default {
  data () {
    return {
      shareList: {},
      links: '',
      invitionInfo: {}
    }
  },
  components: {
    // invitationList
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
          // var links = 'https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code
          // var links = '【比特曼】比特曼创世奖励开始啦，快和我一起瓜分1000万颗比特钻吧，并且注册免费领1000颗比特钻，每邀请一名好友再赠送100颗比特钻 http://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code + '邀请码:' + data.data.invite_code
          // var links = '【比特曼】新注册用户免费领1000颗比特钻哟！每邀请一名好友再赠送100颗比特钻 http://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code + ' 邀请码：' + data.data.invite_code
          var links = '【比特曼】足球竞猜主题版本已经上线，世界杯期间每场比赛均可瓜分百万比特钻底池奖励！新注册用户免费领1000颗比特钻，每邀请一名好友再赠送100颗比特钻！加入比特曼，参与比分竞猜，5000万比特钻等您来拿！ https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code + ' 邀请码：' + data.data.invite_code
          this.links = links
          $('#links').html(links)
          // 二维码
          var link = 'http://pan.baidu.com/share/qrcode?w=150&h=150&url=' + 'https://' + window.location.host + '/login?inviteFrom=' + data.data.invite_code
          $('#QRImg').attr('src', link)
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    getInvitionInfo () {
      invitedStatistics().then(response => {
        console.log(response.data.data)
        this.invitionInfo = response.data.data
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.getCode()
    this.getInvitionInfo()
    var link = 'http://pan.baidu.com/share/qrcode?w=150&h=150&url=' + window.location.host
    $('#QRImg').attr('src', link)
    $('body').css('background', '#fff')
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
  .clearfix{
    clear: both;
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
    height: 900px;
  .shareBg{
    width: 100%;
    height:236px;
    padding-top:20px;
    background: url("/static/images/share_title_bg.png") 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }
  .btmLogo{
    display: block;
    width: 157px;
    margin: 30px auto 0;
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
    width: 100%;
    height: 350px;
    margin: 0 auto;
    background: url("/static/images/share_num_bg.png") 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    margin-top: -80px;
  }
  .inviteTxt{
    font-size: 14px;
    color: #131313;;
    width: 100px;
    text-align: center;
    margin: 0 auto;
    padding-top: 70px;
    position: relative;
  }
  .inviteTxt:before{
    content: '';
    width:20px;
    height:20px;
    background: url("/static/images/num_ico.png") 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    position: absolute;
    top:55px;
    left:-17px;
  }
  .incode{
    width: 80%;
    margin: 0 auto;
    // background: url("/static/images/star.png") 0 0 no-repeat;
    // background-size:100%;
  }
  .inviteCode{
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 36px;
    color: #3318D1;
    padding-top: 14px;
    font-family: DINAlternate;
    font-weight: bold;
  }
  .inviteTip{
    width: 100%;
    text-align: center;
  }
  .linkTxt{
    display: none;
  }
  .invite{
    box-sizing: border-box;
  }
  .shareWay{
    width:90%;
    margin: 0 auto;
  }
  .shareWay .btnBox{
    width:50%;
    float: left;
    height:45px;
    line-height:45px;
    margin-top: 25px;
  }
  .shareWay_1,.shareWay_2{
    width:80%;
    margin: 0 auto;
    text-align: center;
    color:#fff;
    background-image: linear-gradient(90deg, #3E43FF 0%, #72ACFF 100%);
    border-radius: 100px;
  }
  .inviteBtn{
    height: 45px;
    line-height:45px;
    font-size:16px;
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
    color: #666;
    margin-top: 8px;

    span{
      color: #346FFF;
    }
  }
  .inviteMsg{

    font-size: 12px;
    color: #8F8F8F;
    margin: 0 13%;
    margin-top: 10px;
    line-height: 22px;
  }
  .blue{
    color: #0081FF;
  }
  .tips{
    background: url("/static/images/share_tips_bg.png") 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100% 100%;
    margin-top:-100px;
    height:372px;
    padding:100px 15% 0;
    box-sizing:border-box;

    .tit{
      font-size: 16px;
      color: #5DFEC5 ;
      background: -webkit-linear-gradient(left, #5DFEC5 , #49D6FF);     /* 背景色渐变 */
      -webkit-background-clip: text;         /* 规定背景的划分区域 */
      -webkit-text-fill-color: transparent;  /* 防止字体颜色覆盖 */
      text-align: center;
      font-weight: bold;
      margin-bottom: 25px;
    }
    p{
      margin-top:8px;
      margin-bottom:8px;
      line-height:1.4;
      font-size: 12px;
      color: #fff;
      height:50px;
      position: relative;
    }
  .third{
    padding-top: 10px;
  }
    .first:before{
      content: '';
      width:10px;
      height:10px;
      position: absolute;
      background: url("/static/images/tips03.png") 0 0 no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
      left: -20px;
      top:3px;
    }
  .second:before{
    content: '';
    width:10px;
    height:10px;
    position: absolute;
    background: url("/static/images/tips02.png") 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .third:before{
    content: '';
    width:10px;
    height:10px;
    position: absolute;
    background: url("/static/images/tips01.png") 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    left: -20px;
    top:13px;
  }
    .second{
      border-top: 1px dashed  #6953F2;
      border-bottom:1px dashed  #6953F2 ;
      padding-top:15px;
      // line-height:50px;
    }
  }

  }
.record{
  margin:0 5%;
  height:50px;
  .recordNum{
    width:50%;
    float:left;
    line-height:50px;
    color: #346FFF;
  }
  .recordNum:nth-child(2){
    text-align: right;
  }
}
.inviteRecord{
  background: #fff;
  margin:0 auto;
  min-height:80px;
  margin-top: 20px;
}
</style>
