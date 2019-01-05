<template>
  <div class="content">
    <div class="header">
      <img src="/static/images/BitManLogo.png">
      <p class="intro">生活就是挖矿</p>
    </div>
    <!-- 验证手机号是否存在 -->
    <div class="loginInfo" v-if="verifyPhone">
      <div class="infoLine">
        <bm-input v-model="phoneNum" :maxlength="11" placeholder="请输入您的手机号" type="text" @blur="verifyFormat"></bm-input>
        <p class="infoNote phone"></p>
      </div>
      <div class="infoLine">
        <unlock :successfn="submit"></unlock>
        <p class="infoNote flagStatus"></p>
      </div>
      <div class="infoLine">
        <bm-button @click="verifyPhoneNumber"></bm-button>
      </div>
    </div>
    <!-- 手机号存在密码登录 -->
    <div class="loginInfo" v-if="login">
      <div class="infoLine">
        <bm-input v-model="password" placeholder="请输入您的密码" type="password"></bm-input>
        <div class="clearfix">
          <p class="infoNote passwordNote"></p>
          <p class="forgetPassword" @click="creatPassword">忘记密码</p>
        </div>
      </div>
      <div class="infoLine">
        <bm-button text="登录" @click="userlogin"></bm-button>
      </div>
    </div>
    <!-- 忘记密码 -->
    <div class="loginInfo" v-if="passwordStatus">
      <div class="infoLine">
        <!-- <p class="messVerify">请输入短信验证码</p>
        <bm-verification v-model="messages"></bm-verification> -->
        <bm-input v-model="messages" placeholder="请输入您的短信验证码" :maxlength="6" type="text"></bm-input>
        <p class="infoNote againPassword"></p>
      </div>
      <div class="infoLine">
        <bm-input v-model="forgetPassword" @blur="verifyWord(forgetPassword)" placeholder="请将密码设置为6-16位数字、字母的组合" type="password"></bm-input>
        <p class="infoNote wordCode setCode"></p>
      </div>
      <div class="infoLine">
        <bm-button @click="againCreatPassword"></bm-button>
      </div>
    </div>
    <!-- 手机号未注册 -->
    <div class="loginInfo" v-if="unregister">
      <div class="infoLine">
        <!-- <p class="messVerify">请输入短信验证码</p> -->
        <bm-input v-model="messages" placeholder="请输入您的短信验证码" :maxlength="6" type="text"></bm-input>
        <!-- <bm-verification v-model="messages"></bm-verification> -->
        <p class="infoNote messageCode">输入验证码有误，请重新输入</p>
      </div>
      <div class="infoLine">
        <bm-input v-model="setPassword" @blur="verifyWord(setPassword)" placeholder="请将密码设置为6-16位数字、字母的组合" type="password"></bm-input>
        <p class="infoNote wordCode"></p>
      </div>
      <div class="infoLine" v-if="codeStatus">
        <bm-input v-model="invitCode" :maxlength="8" placeholder="请输入邀请码（可不填）" type="text"></bm-input>
      </div>
      <!-- <div class="infoLine">
        <bm-checkbox v-model="choice">我已阅读并同意《用户服务协议》</bm-checkbox>
        <p class="infoNote protocolCode">请同意服务协议</p>
      </div> -->
      <div class="infoLine">
        <bm-button @click="register"></bm-button>
      </div>
    </div>
  </div>
</template>

<script>
import BmVerification from 'components/verification'
import unlock from 'components/unlock'
import {checkoutMoblie, userRegister, login, sendPhoneCode, changePassWord} from 'api/login'
import {setToken} from 'utils/auth'
import {getDigMine} from 'api/home'
export default {
  name: 'BmLogin',
  data () {
    return {
      phoneNum: '',
      password: '',
      setPassword: '',
      forgetPassword: '',
      messages: '',
      invitCode: '',
      choice: true,
      verifyPhone: true,
      login: false,
      passwordStatus: false,
      unregister: false,
      flag: false,
      codeStatus: false
    }
  },
  components: {BmVerification, unlock},
  methods: {
    // 验证手机号格式
    verifyFormat () {
      const regn = /^1\d{10}$/
      if (!regn.test(this.phoneNum) && this.phoneNum) {
        $('.phone').show().html('请输入正确的手机号')
      } else {
        $('.phone').hide()
      }
    },
    // 滑块验证手机号方法
    submit (elm) {
      if (this.phoneNum) {
        this.flag = true
        $('.flagStatus').hide()
      } else {
        $('.phone').show().html('请输入您的手机号')
        elm.reset()
        elm.init()
        return false
      }
    },
    // 验证手机号是否存在确定是登录还是注册
    verifyPhoneNumber () {
      if (this.phoneNum) {
        this.verifyFormat()
        if (this.flag) {
          checkoutMoblie({mobile: this.phoneNum}).then(response => {
            var data = response.data
            var code = String(data.code)
            // 466 手机号已注册   200  手机号未注册
            if (code === '466') {
              this.verifyPhone = false
              this.login = true
              this.passwordStatus = false
            } else if (code === '200') {
              this.verifyPhone = false
              this.login = false
              this.passwordStatus = false
              this.unregister = true
            }
          }).catch()
        } else {
          $('.flagStatus').show().html('请拖动滑块验证')
          return false
        }
      } else {
        $('.phone').show().html('请输入您的手机号')
        return false
      }
    },
    // 验证密码格式
    verifyWord (password) {
      var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if (password && !regExp.test(password)) {
        $('.wordCode').show().html('请输入6-16由数字、字母组合的密码')
      } else {
        $('.wordCode').hide()
      }
    },
    // 注册事件
    register () {
      if (this.choice) {
        $('.protocolCode').hide()
        if (this.phoneNum && this.messages && this.setPassword) {
          userRegister({mobile: this.phoneNum, smsToken: this.messages, inviteFrom: this.invitCode, password: this.setPassword}).then(response => {
            var data = response.data
            var code = String(data.code)
            // 500 短信验证码输入有误   200  成功跳转
            if (code === '500') {
              $('.messageCode').show()
            } else if (code === '200') {
              this.verifyPhone = false
              this.login = true
              this.passwordStatus = false
              this.unregister = false
            }
          }).catch()
        }
      } else if (this.choice === false) {
        $('.protocolCode').show()
      }
    },
    // 登陆跳转
    userlogin () {
      if (this.password) {
        login({mobile: this.phoneNum, password: this.password}).then(response => {
          var data = response.data
          var code = String(data.code)
          if (code === '200') {
            setToken(data.data.cookieToken)
            // localStorage.setItem('loginStatus', data.data.addStress)
            this.$router.push('/')
            // this.getStartTime()
          } else if (code === '500') {
            $('.passwordNote').show().html('输入密码有误，请重新输入')
          }
        }).catch(errortip => {})
      }
    },
    // 获取挖矿节点
    getStartTime () {
      getDigMine().then(response => {
        var data = response.data
        console.log(data.data.message)
        if (data.data.message) {
          if (Number(data.code) === 466 && Number(data.data.message.countUser) !== 10000) {
            this.$router.push('/')
          } else {
            this.$router.push('/index')
          }
        } else {
          this.$router.push('/index')
        }
      })
    },
    // 忘记密码操作
    creatPassword () {
      sendPhoneCode({mobile: this.phoneNum}).then(response => {
        var data = response.data
        console.log(data.data)
        if (Number(data.code) === 200) {
          this.verifyPhone = false
          this.login = false
          this.passwordStatus = true
        } else if (Number(data.code) === 500) {
          $('.passwordNote').show().html('您的操作太频繁，请60秒后重新发送')
        } else {
          $('.passwordNote').hide()
        }
      })
    },
    // 重设密码
    againCreatPassword () {
      if (this.messages) {
        $('.againPassword').hide()
        if (this.forgetPassword) {
          changePassWord({smsToken: this.messages, password: this.forgetPassword, mobile: this.phoneNum}).then(response => {
            var data = response.data
            console.log(data.data)
            if (Number(data.code) === 200) {
              this.verifyPhone = false
              this.login = true
              this.passwordStatus = false
            } else if (Number(data.code) === 500) {
              $('.againPassword').show().html('输入验证码有误，请重新输入')
            } else {
              $('.againPassword').hide()
            }
          })
        }
      } else {
        $('.againPassword').show().html('请输入您的验证码')
      }
    }
  },
  mounted () {
    if (this.$route.query.inviteFrom) {
      this.codeStatus = true
      this.invitCode = this.$route.query.inviteFrom
    } else {
      this.codeStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    height:700px;
    width:100%;
    background:url(/static/images/bg.png) no-repeat top;
    background-size:100%;
    box-sizing: border-box;
    p{
      color: #9DA7CC;
    }
  }
  .header{
    padding-top:125px;
    text-align:center;
    margin-bottom:70px;
    img{
      width:160px;
      height:36px;
    }
    .intro{
      color: #C3E1FF;
      // line-height: 10px;
      // margin: 0 auto;
      text-align: center;
    }
  }
  .loginInfo{
    padding:0 10%;
  }
  .infoLine{
    margin-bottom:20px;
  }
  .infoNote{
    color:red !important;
    display:none;
  }
  .forget{
    height:20px;
  }
  .forgetPassword{
    width:60px;
    float:right;
    font-size:13px;
  }
  .passwordNote{
    width:80%;
    float:left;
  }
  .messVerify{
    text-align:center;
    margin-bottom:20px;
  }
</style>
