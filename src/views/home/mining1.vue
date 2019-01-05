<template>
  <div class="mining">
    <!-- 功能条 -->
     <div class="mining__util">
      <div class="mining__util--candy">{{data.bm_stress || 0}}</div>
      <div class="mining__util--diamond">
        <countTo
          :startVal='startVal'
          :endVal='data.account || 0'
          :duration='1000'
          :decimals="4"></countTo>
      </div>
    </div>

    <!-- 矿池 -->
    <div class="mining__list" id="miningList">
      <!-- <div class="mining__list__item created" v-if="!PosListNum">生成中</div> -->
      <div @click="removeItem(index, $event)"
        class="mining__list__item"
        v-for="(item, index) in itemPosList"
        :key="index"
        :data-id="item.id"
        :style="item.style"
      >{{item.text}}
      </div>
    </div>

    <!-- 消息 -->
    <div class="mining__info">比特钻超过48小时不领取就会消失哦</div>

    <!-- 操作按钮 -->
    <div class="mining__handle">
      <router-link to="/speedStrategy" tag="div">
        <i class="turbo-icon"></i>
        <p>挖矿加速</p>
      </router-link>
      <!-- changeData -->
      <router-link to="/changeData" tag="div">
        <i class="upload-icon"></i>
        <p>数据上传</p>
      </router-link>
      <router-link to="/shareZero" tag="div">
        <i class="invite-icon"></i>
        <p>分享</p>
        <!-- <router-link to="/countDown" tag="div">
          <i class="upload-icon"></i>
          <p>倒计时</p>
        </router-link> -->
      </router-link>
    </div>

    <!-- 星球定位 -->
    <div id="people" class="people"></div>
    <div class="mining__eath">
      <img src="/static/images/eaths/00.png" alt="" id="eath1">
      <img src="/static/images/eaths/01.png" alt="" id="eath2">
      <img src="/static/images/eaths/02.png" alt="" id="eath3">
      <img src="/static/images/eaths/03.png" alt="" id="eath4">
    </div>
  </div>
</template>

<script>
import move from './move'
import {getDigMine, collectCandy} from 'api/home'
import countTo from 'vue-count-to'
import Stars from 'views/components/Star'
import Moon from 'views/components/Moon'
import Meteor from 'views/components/Meteor'
export default {
  data () {
    return {
      itemPosList: [],
      PosListNum: 0,
      mymi: 0,
      miList: {},
      startVal: 0
    }
  },
  components: {
    countTo
  },
  props: {
    data: Object
  },
  methods: {
    crearedItem () {
    },
    removeItem (index, event) {
      const _this = this
      $(event.target).velocity('stop').velocity({ scale: 2, opacity: 0 },
        { easing: 'ease-in-out',
          complete: function () {
            $(event.target).remove()
            _this.PosListNum--
            let data = Number(event.target.innerHTML)
            let id = $(event.target).attr('data-id')
            _this.miningData(data, id)
          }
        })
    },
    getRendom (unm) {
      var tranrandom = Math.floor(Math.random() * unm)
      return unm - 2 * tranrandom
    },
    moveFn () {
      $('#miningList div').each((i, k) => {
        var random = Math.floor(Math.random() * 1000) + 1000
        var tranrandom = Math.floor(Math.random() * 5)
        var long = 10
        var listY = [this.getRendom(long), this.getRendom(long)]
        var listX = [this.getRendom(long), this.getRendom(long)]
        $(k).velocity({translateY: listY, translateX: listX}, {loop: true, duration: random, delay: true})
          .velocity('reverse')
      })
    },
    // 挖矿
    miningData (data, id) {
      this.startVal = this.data.account
      this.data.account = Math.round((this.data.account + data) * 10000) / 10000
      this.miList[id] = data
      clearTimeout(this.time)
      this.time = setTimeout(() => {
        collectCandy({candyMap: this.miList}).then(k => {
          // this.itemPosList = move(k.data.data)
        })
      }, 2000)
    },
    // 创建背景
    createdBg () {
      let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        width = window.innerWidth,
        height = window.innerHeight,
        // 实例化月亮和星星。流星是随机时间生成，所以只初始化数组
        moon = new Moon(ctx, width, height),
        stars = new Stars(ctx, width, height, 50),
        meteors = [],
        count = 0

      canvas.width = width
      canvas.height = height

      const meteorGenerator = () => {
        // x位置偏移，以免经过月亮
        let x = Math.random() * width + 0.5 * width
        meteors.push(new Meteor(ctx, x, height))

        // 每隔随机时间，生成新流星
        setTimeout(() => {
          meteorGenerator()
        }, Math.random() * 2000 + 1000)
      }

      const frame = () => {
        count++
        count % 10 === 0 && stars.blink()
        moon.draw()
        stars.draw()

        meteors.forEach((meteor, index, arr) => {
        // 如果流星离开视野之内，销毁流星实例，回收内存
          if (meteor.flow()) {
            meteor.draw()
          } else {
            arr.splice(index, 1)
          }
        })
        requestAnimationFrame(frame)
      }
      meteorGenerator()
      frame()
    }

  },
  created () {
    if (this.itemPosList.length === 0) {
      getDigMine().then(k => {
        if (Number(k.data.code) === 200) {
          this.itemPosList = move(k.data.data)
          this.PosListNum = this.itemPosList.length
          setTimeout(() => {
            this.moveFn()
          }, 300)
        } else {
          // alert(k.data.message)
        }
      })
    }
  },
  mounted () {
    var em = $('#people')
    var url = '/static/images/walk/'
    var index = 1
    for (var i = 0; i < 5; i++) {
      $('#eath' + i).velocity({ rotateZ: '-360deg' },
        { duration: 50000 * Math.pow((5 - i), 2), loop: true, easing: 'linear' })
    }
    setInterval(function () {
      index = index > 10 ? 1 : index
      em[0].className = 'people people-' + index++
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
.mining{
  position: relative;
  height: 500px;
  width: 90%;
  // background:-webkit-radial-gradient(bottom center ,rgba(38,182,186,1),rgba(67,11,132,1));
  background:-webkit-radial-gradient(bottom,circle farthest-side,rgba(38,182,186,1),rgba(67,11,132,1));
  background-size: 100% 110%;
  padding: 20px 5% 0;

  //* 工具条
  &__util{
    position: relative;
    overflow: hidden;
    font-weight: bold;
    position: relative;

    &--candy{
      width: 120px;
      height: 28px;
      line-height: 28px;
      border: 1px solid #E9D300;
      border-radius: 15px;
      color: #FFEE48;

      &::before{
        content: '';
        float: left;
        height: 20px;
        width: 20px;
        margin: 2px 7px;
        background-image: url('/static/images/candy.png');
        background-size: 100% 100%;
      }
    }
    &--diamond{
      position: absolute;
      top: 0;
      left: 70px;
      min-width: 120px;
      height: 28px;
      line-height: 28px;
      border: 1px solid #0081FF;
      border-radius: 15px;
      color: #0081FF;
      background: #411788;

      &::before{
        content: '';
        float: left;
        height: 20px;
        width: 13px;
        margin: 4px 7px;
        background-image: url('/static/images/diamond.png');
        background-size: cover;
      }
    }

  }

  //* 矿池
  &__list{
    height: 230px;
    position: relative;

    &__item{
      position: absolute;
      height: 50px;
      width: 50px;
      background-image: url('/static/images/qipao.png');
      background-size: cover;
      text-align: center;
      line-height: 50px;
      color: #fff;
      // font-weight: bold;
      z-index: 10;

      &.created{
        bottom: 25%;
        left: 50%;
        margin-left: -25px;
      }
    }
  }

  .people{
    position: absolute;
    bottom: 104px;
    left: 50%;
    z-index: 1;
    width: 180px;
    height: 150px;
    margin-left: -90px;

    @for $i from 1 through 10 {
      &-#{$i} {
        background-image: url('/static/images/walk/#{$i}.png');
        background-size: cover;
      }
    }
  }
  //* 星球效果
  &__eath{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;

    img{
      width: 1600px;
      position: absolute;
      left: 50%;
      margin-left: -800px;
      bottom: -216%;
    }
  }

  //* 通知栏
  &__info{
    position: relative;
    z-index: 1;
    width: 100%;
    margin: 160px auto 0;
    height: 35px;
    background: #A2D0FF;
    color:#0081FF;
    line-height: 35px;

    &::before{
      content: '';
      float: left;
      height: 15px;
      width: 15px;
      margin: 10px;
      background-image: url('/static/images/notice.png');
      background-size: cover;
    }
  }

  //* 操作按钮
  &__handle{
    width: 90%;
    height: 75px;
    position: absolute;
    bottom: -37.5px;
    z-index: 1;
    background: #fff;
    border-radius: 8px;
    box-shadow: 1px 2px 4px #ccc;

    div{
      float: left;
      width: 33.3333%;
      box-sizing: border-box;
      text-align: center;
      height: 30px;
      border-right: 1px solid #E6E6E6;
      margin: 22px 0;
    }
    @each $animal, $width, $height in (turbo, 16, 25),
                                      (upload, 20, 20),
                                      (invite, 23, 20) {
      .#{$animal}-icon {
        background-image: url('/static/images/#{$animal}.png');
        width: #{$width}px;
        height: #{$height}px;
        background-size: cover;
        @if $height < 25 { margin-bottom: #{25 - $height}px; }
      }
    }
    i{
      display: inline-block;
      margin-top: -5px;
    }
    p{
      margin: 0;
    }
  }
}
</style>
