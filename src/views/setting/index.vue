<template>
<div id="realName">
  <bm-back></bm-back>
  <div class="versions">
    <div class="fl">版本号</div>
    <div class="fr">1.1.4</div>
  </div>
  <div class="content">
    <bm-button class="btn" @click="quit" text="退出账号"></bm-button>
  </div>
</div>
</template>
<script>
import {logout} from 'api/login'
import {removeToken} from 'utils/auth'
export default {
  data () {
    return {

    }
  },
  methods: {
    quit () {
      logout().then(response => {
        var data = response.data
        if (data.code === '200') {
          removeToken()
          this.$router.push('./login')
        }
      }).catch()
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
  .content {
    margin:0 8%;
    padding-top:20px;
  }
  // .btn{
  //   width: 90%;
  //   height: 50px;
  //   margin: 0 auto;
  //   background: #FFFFFF;
  //   border-radius: 8px;
  //   font-size: 12px;
  //   color: #8F8F8F;
  // }
  .versions{
    width: 90%;
    height: 50px;
    background: #fff;
    line-height: 50px;
    font-size: 14px;
    color: #8F8F8F;
    padding: 0 5%;
  }
</style>
