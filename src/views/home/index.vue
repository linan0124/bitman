<template>
<div>

  <div class="home">
    <!-- 挖矿 -->
    <mining :data="data"></mining>

    <!-- 光荣榜 -->
    <honor :data="data" :countUser="status"></honor>

    <!-- 排行榜 -->
    <rank :list="list"></rank>

    <!-- 页脚 -->
    <bm-footer></bm-footer>
    <!-- 登录提示 -->
    <transition name="msgbox-fade" v-if=loginStatus>
     <div class="Popup" id="Popup">
       <div class="popupcon">
           <div class="con_clos">
             <div class="createContract_contents">
               <h3>登录</h3>
               <div class="loginShow"><img src="/static/images/candy.png"><span>+1</span></div>
             </div>
         </div>
       </div>
     </div>
   </transition>
  </div>
</div>
</template>

<script>
import Mining from './mining'
import Honor from './honor'
import Rank from './rank'
import BmFooter from 'components/footer'
import {stressRank} from 'api/home'
import {getIsOpenAPI} from 'api/speedup'
import {getAccountIndex} from 'api/mine'
export default{
  data () {
    return {
      data: {},
      list: [],
      loginStatus: false,
      status: ''
    }
  },
  components: {Mining, Honor, Rank, BmFooter},
  methods: {
    getData () {
      stressRank().then(k => {
        if (Number(k.data.code) === 200) {
          this.data = k.data.data.dataInfo
          this.list = k.data.data.stressRankList
        }
      })
    },
    getMyAll () {
      getAccountIndex().then(response => {
        var data = response.data
        if (String(data.code) === '200') {
          this.status = data.data.countUser
          if (Number(data.data.addStress) === 1) {
            this.loginStatus = true
            // 使其遮罩下方内容不可滚动
            $('body').css('overflow', 'hidden')
          } else {
            this.loginStatus = false
            $('body').css('overflow', 'auto')
          }

          if (this.loginStatus) {
            setTimeout(() => {
              this.loginStatus = false
              $('body').css('overflow', 'auto')
              localStorage.setItem('loginStatus', 0)
            }, 2000)
          }
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    }
  },
  created () {
    this.getData()
    // this.getMyAll()
  },
  mounted () {
    this.getMyAll()
  }
}
</script>

<style lang="scss" scoped>
.home{
  padding-bottom: 60px;
}
.loginShow{
  text-align:center;
  img {
    width:30px;
    height:28px;
    margin-right:8px;
  }
  span{
    font-size: 18px;
    color: #1F1F1F;

  }
}
 h3{
    color: #0081FF;
    line-height:24px;
    text-align:center;
    // margin-top:30px;
    margin-bottom: 20px;
    font-weight: normal;
  }
  .Popup {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.50);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
  }
  .popupcon {
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    margin-left: -100px;
    margin-top: -120px;
    overflow: hidden;
    padding-bottom: 20px;
    opacity: 0.9;
    background: #FFFFFF;
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
