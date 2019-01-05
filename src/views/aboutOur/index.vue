<template>
  <div class="content">
    <div class="banner clearfix">
      <a href="javascript:history.go(-1)">
        <i class="back"></i>
      </a>
      <img src="static/images/BitManLogo.png" alt="" class="logo">
      <div class="logoTxt">关注我们，持续更新，今天更新到此为止</div>
    </div>
    <div class="about">
      <!-- 微信 -->
      <div class="weTxt">关注我们的微信公众号</div>
      <div class="wechatAccount"></div>
      <!-- <div class="saveImg">保存图片</div> -->
      <div class="line"></div>
      <!-- 小助手 -->
      <div class="weTxt">添加小助手微信，邀您加入微信官方群</div>
      <div class="wechatAssistant"></div>
      <div class="assistantName">BitMan-one</div>
      <!-- <div class="saveAssistant">保存图片</div> -->
      <div class="line"></div>
      <div class="ourWebsite">我们的官网</div>
      <div class="url">www.bitmanchain.com</div>
    </div>
  </div>
</template>

<script>
import {getAllBit} from 'api/mine'
import {getIsOpenAPI} from 'api/speedup'
export default {
  data () {
    return {

    }
  },
  methods: {
    downloadIamge (selector, name) {
    // 通过选择器获取img元素
      var img = document.querySelector(selector)
      // 将图片的src属性作为URL地址
      var url = img.src
      var a = document.createElement('a')
      var event = new MouseEvent('click')

      a.download = name || '下载图片名称'
      this.as = a.download
      a.href = url

      a.dispatchEvent(event)
    }

    // 调用方式

    //  downloadIamge('#QRImg', 'name')
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .content{
    background: #F4F6F9;
    height: 650px;
  }
  .banner{
    width: 100%;
    height: 150px;
    background: #532E95;
    padding-top: 12px;
  }
  .back{
    display: block;
    width: 12px;
    height: 21px;
    background: url(/static/images/back.png) no-repeat;
    background-size: cover;
    margin-left: 10px;
  }
  .logo{
    display: block;
    width: 157px;
    height: 36px;
    margin: 0 auto;
    margin-top: -3px;
  }
  .logoTxt{
    font-size: 12px;
    color: #A799FF;
    text-align: center;
    margin-top: 14px;
  }
  .about{
    width: 90%;
    height: 738px;
    background: #fff;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: -20px;
    margin-bottom: 55px;
  }
  .weTxt{
    font-size: 14px;
    color: #8F8F8F;
    letter-spacing: 0;
    text-align: center;
    padding-top: 50px;
  }
  .wechatAccount{
    width: 120px;
    height: 120px;
    background: url(/static/images/wechatAccount.png) no-repeat;
    background-size: cover;
    margin: 0 auto;
    margin-top: 5px;
  }
  .saveImg{
    width: 100px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
    color: #0081FF;
    margin: 0 auto;
    background: #F4F6F9;
    border-radius: 2px;
    margin-top: 5px;
  }
.line{
  width: 90%;
  height: 1px;
  background: #E6E6E6;
  margin: 0 auto;
  margin-top: 50px;
}
.wechatAssistant{
   width: 120px;
    height: 120px;
    background: url(/static/images/wechatAssistant.png) no-repeat;
    background-size: cover;
    margin: 0 auto;
    margin-top: 15px;
}
.assistantName{
  font-size: 12px;
  color: #8F8F8F;
  letter-spacing: 0;
  text-align: center;
  margin-top: 5px;
}
.saveAssistant{
   width: 100px;
   height: 25px;
   text-align: center;
   line-height: 25px;
   font-size: 12px;
   color: #0081FF;
   margin: 0 auto;
   background: #F4F6F9;
   border-radius: 2px;
   margin-top: 8px;
}
.ourWebsite{
  font-size: 14px;
  color: #8F8F8F;
  letter-spacing: 0;
  text-align: center;
  margin-top: 50px;
}
.url{
  font-size: 12px;
  color: #0081FF;
  letter-spacing: 0;
  text-align: center;
  margin-top: 15px;
}
</style>
