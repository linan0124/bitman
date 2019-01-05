<template>
  <div >
    <div class="head">
      <img src="/static/images/BitManLogo.png" class="logo">
      <div class="logoIntro">
        <span class="colorWord">比特曼创世星球开启还有</span>
        <span>（达到10000人入驻将提前开启）</span>
      </div>
      <div class="countDown clearfix">
        <div class="countNum">
          <span class="num">{{dayNum}}</span>
          <span class="positionWord">天</span>
        </div>
        <div class="countNum">
          <span class="num">{{hourNum}}</span>
          <span class="positionWord">时</span>
        </div>
        <div class="countNum">
          <span class="num">{{minuteNum}}</span>
          <span class="positionWord">分</span>
        </div>
        <div class="countNum">
          <span class="num">{{secondNum}}</span>
          <span class="positionWord">秒</span>
        </div>
      </div>
      <div class="bmIntro">
        <span class="totalNum">一起瓜分10,000,000颗比特钻！</span>
        <span style="font-weight:bold">目前已有 {{currentInfo.countUser}}人 加入</span>
        <span>邀请好友获得更多算力,您目前算力为：{{currentInfo.bm_stress}}</span>
      </div>
      <div class="inviteBtn" @click="share">邀请好友一起助力</div>
    </div>
    <div class="contain">
      <div class="firstBlock">
        <div class="title">比特曼是什么？</div>
        <div class="titleIntro">
          比特曼是一个数据分享平台，通过加密存储技术帮助人/企/物安全管理和支配自己的数字信息，让自己成为数据的主人，真正实现用户的信用数据由用户自己来安全管理。平台不存储用户数据。
        </div>
        <div class="titleIntro">
          未来比特曼将推出更多的应用和服务，用户可参与比特曼平台建设及体验新的应用和服务。
        </div>
      </div>
      <div class="block" >
        <div class="title">比特钻是什么？</div>
         <div class="titleIntro">
           比特钻是对活跃用户完成比特曼平台任务的奖励，也可根据用户需要兑换新应用的体验和服务等，无需用户购买或充值。
         </div>
      </div>
      <div class="quitBtn" @click="showSure">退出登录</div>
    </div>
    <transition name="msgbox-fade" v-if=loginStatus>
     <div class="Popup" id="Popup">
       <div class="popupcon">
         <div class="tipWord">提示</div>
         <div class="sureWord">确定要退出登录吗？</div>
         <div class="btnBox">
          <div class="fl btn btnL" @click="canel">取消</div>
          <div class="fl btn" @click="quit">确定</div>
         </div>
           <!-- <div class="con_clos">
             <div class="createContract_contents">
               <h3>登录</h3>
               <div class="loginShow"><img src="/static/images/candy.png"><span>+1</span></div>
             </div>
         </div> -->

       </div>
     </div>
   </transition>
  </div>
</template>
<script>
import {getDigMine} from 'api/home'
import {logout} from 'api/login'
import {removeToken} from 'utils/auth'
export default {
  data () {
    return {
      dayNum: '00',
      hourNum: '00',
      minuteNum: '00',
      secondNum: '00',
      startTime: 0,
      startMark: false,
      currentInfo: '',
      loginStatus: false
    }
  },
  methods: {
    share () {
      this.$router.push('/shareZero')
    },
    getStartTime () {
      getDigMine().then(response => {
        this.startMark = true
        var data = response.data
        console.log(data.data.message)
        if (data.data.message) {
          if (Number(data.code) === 466 && Number(data.data.message.countUser) !== 10000) {
            this.startMark = true
            this.currentInfo = data.data.message
            this.startTime = Number(data.data.message.GenesisMillisecond)
            this.countDown()
          } else {
            // this.$router.push('/index')
          }
        } else {
          // this.$router.push('/index')
        }
      })
    },
    countDown () {
      var timerID = null
      //   '2018/04/18 16:54:00'

      // var deadline = new Date(this.currentInfo.Genesis)
      // var now = new Date()
      // var diff = -480 - now.getTimezoneOffset() // 是北京时间和当地时间的时间差
      // var leave = (deadline.getTime() - now.getTime())

      var day = Math.floor(this.startTime / (1000 * 60 * 60 * 24))
      var hour = Math.floor(this.startTime / (1000 * 3600)) - (day * 24)
      var minute = Math.floor(this.startTime / (1000 * 60)) - (day * 24 * 60) - (hour * 60)
      var second = Math.floor(this.startTime / (1000)) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)

      if (second === 0 && hour === 0 && minute === 0 && day === 0) {
        this.dayNum = '00'
        this.hourNum = '00'
        this.minuteNum = '00'
        this.secondNum = '00'
        clearTimeout(timerID)
        this.$router.push('/index')
        console.log('时间到')
      } else if (second > 0 || hour > 0 || minute > 0 || day > 0) {
        // // 人数达到10000跳转首页开始挖矿
        // if (Number(this.currentInfo.currentUser) >= 10000) {
        //   clearTimeout(timerID)
        //   this.$router.push('/index')
        //   return
        // }
        this.dayNum = day
        this.hourNum = hour
        this.minuteNum = minute
        this.secondNum = second
        timerID = setTimeout(() => {
          this.countDown()
          this.startTime -= 1000
        }, 1000)
      }
    },
    quit () {
      logout().then(response => {
        var data = response.data
        if (data.code === '200') {
          removeToken()
          this.$router.push('./login')
          $('body').css('overflow', 'auto')
        }
      }).catch()
    },
    canel () {
      this.loginStatus = false
      $('body').css('overflow', 'auto')
    },
    showSure () {
      this.loginStatus = true
      $('body').css('overflow', 'hidden')
    }
  },
  created () {

  },
  mounted () {
    this.getStartTime()
  }
}
</script>

<style lang="scss" scoped>
  .head{
    height:470px;
    background:url('/static/images/countDownB.png') no-repeat center;
    background-size:100% 100%;
    padding:0 5%;
    text-align:center;
    color: #A799FF;
    .logo{
      width:130px;
      height:36px;
      padding:30px 0 14px 0;
    }
    .logoIntro{
      margin-bottom:8px;
    }
    .colorWord{
      color:#ffffff;
    }
    span{
      display:block;
      line-height:20px;
    }
    .countDown{
      height:130px;
      padding:0 5% 0 8%;
    }
    .countNum{
      width:22%;
      height:90px;
      float:left;
      background:rgba(255, 255, 255,.1);
      border-radius: 8px;
      margin-right:3%;
      font-size: 37px;
      color: #FFFFFF;
      position: relative;
    }
    .num{
      line-height:90px;
    }
    .positionWord{
      font-size:14px;
      position: absolute;
      left:38%;
      bottom:-22px;
    }
    .totalNum{
      font-size: 16px;
      color: #FFFFFF;
    }
    .inviteBtn{
      height:50px;
      line-height:50px;
      background: #FFFFFF;
      box-shadow: 0 2px 10px 0 rgba(142,142,142,0.50);
      border-radius: 8px;
      color: #0081FF;
      margin-top:20px;
    }
  }
  .contain{
    padding:133px 5% 60px 5%;
    background:#384d99;
    color:#8F8F8F;
    position: relative;
    .firstBlock{
      width:90%;
      background-image: linear-gradient(0deg, #384D99 0%, #9235FF 100%);
      border-radius: 8px;
      height:180px;
      position: absolute;
      top:-25px;
      left:5%;
    }
    .title{
      text-align:center;
      color: #FFFFFF;
      font-size:14px;
      margin-bottom:10px;
      padding-top:30px;
    }
    .titleIntro{
      line-height:18px;
      font-size:12px;
      padding:0 8px;
    }
  }
  .quitBtn{
    width:100%;
    height:50px;
    background:url('/static/images/btnBg.png') no-repeat center;
    background-size:100% 100%;
    line-height:50px;
    color:#ffffff;
    text-align:center;
    margin-top:30px;
  }
  .Popup {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
  }
  .popupcon {
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 240px;
    height:94px;
    margin-left: -120px;
    margin-top: -120px;
    overflow: hidden;
    padding-bottom: 20px;
    background: #FFFFFF;
  }
  .tipWord{
    font-size: 14px;
    color: #333333;
    text-align:center;
    padding-top:15px;
    padding-bottom:10px;
  }
  .sureWord{
    font-size: 14px;
    color: #666666;
    text-align:center;
  }
  .btnBox{
    border-top: 1px solid #EAEAEA;
    height:40px;
    font-size: 14px;
    color: #0E7DFF;
    margin-top:15px;
  }
  .btn{
    text-align:center;
    line-height:40px;
    width:119px;
  }
  .btnL{
    border-right:1px solid #EAEAEA;
  }
  [class*=" el-icon-"], [class^=el-icon-] {
    float: right;
    cursor: pointer;
  }
  .msgbox-fade-enter-active {
    animation: msgbox-fade-in .3s
  }
  .msgbox-fade-leave-active {
    animation: msgbox-fade-out .3s
  }
  @keyframes msgbox-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
  }
  @keyframes msgbox-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
  }
</style>
