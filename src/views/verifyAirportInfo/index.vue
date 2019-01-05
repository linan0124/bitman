<template>
<div>
  <bm-back></bm-back>
  <div class="content">
    <div class="infoLine">
      <bm-input v-model="IDcard" disabled name="身份证号" width="80"></bm-input>
      <p class="tip"></p>
    </div>
    <div class="infoLine" v-if="highlight">
      <bm-button class="btn" @click="verify"></bm-button>
    </div>
    <div class="infoLine" v-if="gray">
      <gray-button class="btn"></gray-button>
    </div>
    <div v-if="noteTip">
      <note-box powerNumber="5" awardNumber="20"></note-box>
    </div>
  </div>
</div>
</template>
<script>
import {getUserInfo, airTravel} from 'api/verifyInfo'
export default {
  data () {
    return {
      IDcard: '',
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
        }
      }).catch()
    },
    verify () {
      this.highlight = false
      this.gray = true
      airTravel().then(response => {
        var data = response.data
        if (String(data.code) === '200') {
          // 认证成功弹出窗口
          this.noteTip = true
        } else if (String(data.code) === '500') {
          $('.tip').show().html('您的航旅信息认证失败')
          this.highlight = true
          this.gray = false
        }
      }).catch()
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
  .tip{
    text-align:left;
    color:#FF6262 !important;
    display:none;
  }
</style>
