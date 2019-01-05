<template>
<div>
  <bm-back></bm-back>
  <div class="content">
    <div class="infoLine">
    <bm-input v-model="cardName" name="持卡人" width="80" disabled></bm-input>
    </div>
    <div class="infoLine">
      <bm-input @change="changeStatus" v-model="cardNumber" name="卡号" width="80" placeholder="请输入认证用户本人的银行卡号"></bm-input>
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
import {getUserInfo, autoBankCard} from 'api/verifyInfo'
export default {
  data () {
    return {
      cardName: '',
      cardNumber: '',
      noteTip: false,
      highlight: false,
      gray: true
    }
  },
  methods: {
    verify () {
      if (this.cardName && this.cardNumber) {
        this.gray = true
        this.highlight = false
        autoBankCard({bankCard: this.cardNumber}).then(response => {
          var data = response.data
          if (String(data.code) === '200') {
            // 弹出认证成功信息窗口
            this.noteTip = true
          } else if (String(data.code) === '500') {
            $('.tip').show().html('您绑定的银行卡与认证用户不匹配')
            this.gray = false
            this.highlight = true
          }
        }).catch()
      }
    },
    changeStatus () {
      if (this.cardName && this.cardNumber) {
        this.highlight = true
        this.gray = false
      } else {
        this.highlight = false
        this.gray = true
      }
    },
    userInfo () {
      getUserInfo().then(response => {
        var data = response.data
        if (String(data.code) === '200') {
          this.cardName = data.data.name
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
