<template>
<div>
  <bm-back></bm-back>
  <div class="content">
    <div class="infoLine">
      <bm-input @blur="changeStatus"
      background="#f4f6f9"
      v-model="ethAdress"
      :maxlength="42"
      placeholder="请输入ETH地址"></bm-input>
      <p class="tip"></p>
    </div>
    <div class="infoLine" v-if="highlight">
      <bm-button class="btn" @click="verify"></bm-button>
    </div>
    <div class="infoLine" v-if="gray">
      <gray-button class="btn"></gray-button>
    </div>
    <div class="note">注意：每个用户仅能绑定一次ETH地址</div>
  </div>
</div>
</template>
<script>
import {addTeleUser} from 'api/withDraw'
export default {
  data () {
    return {
      noteTip: false,
      highlight: false,
      gray: true,
      ethAdress: ''
    }
  },
  methods: {
    verify () {
      addTeleUser({address: this.ethAdress}).then(response => {
        var data = response.data
        console.log(data)
        if (String(data.code) === '200') {
          this.$toast(
            {
              message: '绑定成功',
              title: ''
            }
          )
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        } else if (String(data.code) === '499') {
          $('.tip').show().html('该ETH地址已被绑定用户')
        }
      }).catch(errortip => {})
    },
    changeStatus () {
      var reg = /^0x.{40}/
      if (reg.test(this.ethAdress) && this.ethAdress) {
        this.highlight = true
        this.gray = false
        $('.tip').hide()
      } else {
        this.highlight = false
        this.gray = true
        $('.tip').show().html('请填写正确的钱包地址')
      }
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
  .content {
    padding:20px 4%;
    background:#ffffff;
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
  .note{
    font-size: 12px;
    color: #8F8F8F;
  }
</style>
