<template>
<div>
  <bm-back></bm-back>
  <div class="content">
    <div class="infoLine">
      <div class="title">提现地址</div>
      <div class="ethAdress">{{$route.query.address}}</div>
    </div>
    <div class="infoLine">
      <div class="title">提现数量</div>
      <div class="numBlock">
        <input type="text"
        @blur="judgeNumber"
        @change="canWithDraw"
        placeholder="最小提现金额10000"
        v-model="bitmanNumber"
        class="bitmanNum">
        <div class="indro">钻</div>
      </div>
      <div class="numIntro clearfix">
        <div class="introL">比特钻 : DACO = 1 : 1</div>
        <div class="introR">可用金额：<span>{{accountNumber}}钻</span></div>
      </div>
      <div class="clearfix">
        <div class="introL">手续费：</div>
        <div class="introR"><i>500钻</i></div>
      </div>
      <div class="clearfix lineSpace">
        <div class="introL">实际到账：</div>
        <div class="introR"><i>{{reachCoin}}钻</i></div>
      </div>
      <div class="numBlock verifyMes">
        <input type="text"
        placeholder="请输入短信验证码"
        v-model="withDrawMessage"
        @change="canWithDraw"
        class="messages">
        <div class="getMes" @click="getMessage" v-if="getStatus">获取</div>
        <div class="getMes" v-else style="color:#8F8F8F">{{countDown}}s</div>
      </div>
    </div>
    <p class="tip"></p>
    <div class="infoLine note" v-if="highlight">
      <bm-button class="btn" @click="getCash"></bm-button>
    </div>
    <div class="infoLine note" v-else>
      <gray-button class="btn"></gray-button>
    </div>
  </div>
</div>
</template>
<script>
import {getAccountIndex} from 'api/mine'
import {sendCashMsm, cash} from 'api/withDraw'
export default {
  data () {
    return {
      noteTip: false,
      highlight: false,
      gray: true,
      accountNumber: '',
      bitmanNumber: '',
      withDrawMessage: '',
      getStatus: true,
      countDown: 60,
      reachCoin: 0
    }
  },
  methods: {
    canWithDraw () {
      if (this.bitmanNumber && this.withDrawMessage) {
        this.highlight = true
      } else {
        this.highlight = false
      }
    },
    getAccount () {
      getAccountIndex().then(response => {
        var data = response.data
        if (data.code === '200') {
          this.accountNumber = data.data.account
        }
      }).catch(errortip => {})
    },
    judgeNumber () {
      if (Number(this.bitmanNumber) > Number(this.accountNumber) && Number(this.bitmanNumber)) {
        this.$toast(
          {
            message: '提现金额不能大于账户余额',
            title: ''
          }
        )
        // this.getStatus = false
        this.reachCoin = 0
      } else {
        if (this.bitmanNumber < 10000 && Number(this.bitmanNumber)) {
          this.$toast(
            {
              message: '提现金额不能小于10000',
              title: ''
            }
          )
          // this.getStatus = false
          this.reachCoin = 0
        } else if (Number(this.bitmanNumber)) {
          // this.getStatus = true
          this.reachCoin = this.bitmanNumber - 500
        } else {
          this.reachCoin = 0
        }
      }
    },
    getMessage () {
      this.getStatus = false
      sendCashMsm().then(response => {
        var data = response.data
        if (String(data.code) === '200') {
          this.timer = setInterval(() => {
            if (Number(this.countDown) === 0) {
              clearInterval(this.timer)
              this.getStatus = true
              this.countDown = 60
            } else {
              this.countDown--
            }
          }, 1000)
        }
      }).catch(errortip => {})
    },
    getCash () {
      cash({cashMoney: this.bitmanNumber, CashSms: this.withDrawMessage}).then(response => {
        var data = response.data
        if (data.code === '200') {
          this.$toast(
            {
              message: '请等待DACO空投',
              title: '提现成功！'
            }
          )
          setTimeout(() => {
            this.$router.push('/mine')
          }, 2000)
        } else {
          $('.tip').show().html(data.message)
        }
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.getAccount()
  }
}
</script>
<style lang="scss" scoped>
  .content {
    padding:20px 4%;
    background:#ffffff;
    color: #8F8F8F;
  }
  .infoLine{
    padding-top:20px;
    .title{
      color:#000000;
    }
    .ethAdress{
      padding-top:10px;
      padding-bottom:10px;
    }
    .numBlock{
      height:40px;
      line-height:40px;
      background: #F4F6F9;
      border-radius: 4px;
      margin:10px 0;
      position:relative;
    }
    .indro{
      position:absolute;
      right:0;
      top:0;
      text-align:center;
      color:#000000;
      width:10%;
    }
    .numIntro{
      padding-bottom:30px;
      border-bottom:1px solid #E6E6E6;
      margin-bottom:10px;
    }
    .introR{
      width:53%;
      float:right;
      text-align:right;
      span{
        color:#0081FF;
      }
      i{
        color:#000000;
        font-style:normal;
      }
    }
    .introL{
      width:47%;
      float:left;
      text-align:left;
    }
    .bitmanNum{
      width: 90%;
      height: 40px;
      border: none;
      background: #F4F6F9;
      border-radius: 2px;
      text-align: right;
      padding-right: 10%;
      outline: none;
    }
    .verifyMes{
      margin-top:30px;
    }
    .messages{
      width: 80%;
      height: 40px;
      border: none;
      background: #F4F6F9;
      border-radius: 2px;
      padding-right: 20%;
      outline: none;
      text-indent: 8px;
    }
    .getMes{
      color: #0081FF;
      position:absolute;
      right:0;
      top:0;
      text-align:center;
      width:50px;
    }
  }
  .tip{
    text-align:left;
    color:#FF6262 !important;
    display:none;
  }
  .note{
    margin-top:10px;
    margin-bottom:30px;
  }
  .lineSpace{
    margin-top:10px;
  }
</style>
