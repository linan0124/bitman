<template>
<div>
  <bm-back></bm-back>
  <div class="content">
    <div class="infoLine">
      <bm-input v-model="IDcard" disabled name="身份证号" width="80"></bm-input>
    </div>
    <div class="infoLine">
      <bm-input v-model="phoneNumber" disabled name="手机号" width="80"></bm-input>
    </div>
    <p class="tip"></p>
    <div class="infoLine" v-if="highlight">
      <bm-button class="btn" @click="verify"></bm-button>
    </div>
    <div class="infoLine" v-if="gray">
      <gray-button class="btn"></gray-button>
    </div>
    <div v-if="noteTip">
      <note-box powerNumber="5" awardNumber="20" @btnFn="hide"></note-box>
    </div>
  </div>
</div>
</template>
<script>
import {getUserInfo, mobileAuth} from 'api/verifyInfo'
export default {
  data () {
    return {
      IDcard: '',
      phoneNumber: '',
      noteTip: false,
      highlight: true,
      gray: false
    }
  },
  methods: {
    userInfo () {
      getUserInfo().then(response => {
        var data = response.data
        if (String(data.code) === '200') {
          this.IDcard = data.data.idcard.substring(0, 6) + '******' + data.data.idcard.substring(14)
          this.phoneNumber = data.data.mobile.substring(0, 3) + '****' + data.data.mobile.substring(7)
        }
      }).catch()
    },
    hide (val) {
      val = false
    },
    verify () {
      this.highlight = false
      this.gray = true
      mobileAuth().then(response => {
        var data = response.data
        if (Number(data.code) === 200) {
          // 弹出认证成功窗口
          this.noteTip = true
        } else if (Number(data.code) === 466 || Number(data.code) === 500) {
          $('.tip').show().html('手机号与身份证信息不匹配')
          this.highlight = true
          this.gray = false
        }
      })
    }
  },
  mounted () {
    this.userInfo()
  }
}
</script>
<style lang="scss" scoped>
  .content {
    margin:0 8%;
    padding-top:20px;
  }
  .infoLine{
    margin-bottom:20px;
    p{
      color: #9DA7CC;
    }
  }
  .tip {
    text-align:left;
    color:#FF6262 !important;
    display:none;
  }
</style>
