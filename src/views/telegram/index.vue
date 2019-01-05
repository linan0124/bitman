<template>
<div class="block">
  <bm-back></bm-back>
  <div class="content">
    <div class="titleNote">
      加入电报群后，请将您的识别码粘贴进电报群，完成机器验证
    </div>
    <div class="copyBlock" @click="copyCode"
      id="copyNote"
      :data-clipboard-text="'/code ' + inviteCode">
      <div class="code">/code {{inviteCode}}</div>
      <div class="tip" id="inviteTip">点击复制</div>
    </div>
    <div class="joinBtn">
      <bm-button class="btn" @click="join" text="加入Telegram官方社群"></bm-button>
    </div>
    <div class="note">
      如您有Telegram电报，可搜索“<span>比特曼官方交流群</span>”或者“<span>bitmanchain</span>”关注并加入
    </div>
  </div>
</div>
</template>
<script>
import {getUserInfo, autoBankCard} from 'api/verifyInfo'
import {getShareCode} from 'api/share'
export default {
  data () {
    return {
      noteTip: false,
      highlight: false,
      gray: true,
      ethAdress: '',
      inviteCode: ''
    }
  },
  methods: {
    join () {
      window.location.href = 'https://t.me/bitmanchain'
    },
    copyCode () {
      var clipboard2 = new Clipboard('#copyNote')
      $('#inviteTip').html('已复制')
      // console.log(clipboard2)
    },
    getInviteCode () {
      getShareCode().then(response => {
        var data = response.data
        // console.log(data)
        if (data.code === '200') {
          this.inviteCode = data.data.invite_code
        }
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.getInviteCode()
  }
}
</script>
<style lang="scss" scoped>
  .content {
    padding:0 4% 30px 4%;
    background:#ffffff;
  }
  .titleNote{
    color:#000000;
    padding:20px 0;
    text-align:center;
  }
  .copyBlock{
    background: #F4F6F9;
    border: 1px solid #A4BAFF;
    border-radius: 4px;
    width:80%;
    height:90px;
    font-size: 26px;
    color: #0081FF;
    text-align:center;
    margin:0 auto;
    .code{
      padding-top:15px;
      padding-bottom:12px;
    }
    .tip{
      font-size: 12px;
      color: #8F8F8F;
    }
  }
  .joinBtn{
    width:80%;
    padding-top:20px;
    padding-bottom:20px;
    margin:0 auto;
  }
  .note{
    padding:0 10%;
    text-align:center;
    font-size: 12px;
    color: #8F8F8F;
    line-height:18px;
    span{
      color:#000000;
    }
  }
</style>
