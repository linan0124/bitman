<template>
  <div class="test" id="home">
    <div @click="go">这是文章</div>
    <bm-input type="number" width="50px" name="我事实上" placeholder="dsfsf"></bm-input>
    <canvas id="canvas" class="canvas"></canvas>
    <p @click="test">test</p>
    <p @click="test2">test2</p>
    <div id="myChart"></div>
  </div>
</template>

<script>
import Stars from 'views/components/Star'
import Moon from 'views/components/Moon'
import Meteor from 'views/components/Meteor'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: ['胜', '平', '负']
        },
        series: [
          {
            name: '胜率预测展示',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            data: [
              {value: 60, name: '胜'},
              {value: 10, name: '平'},
              {value: 30, name: '负'}
            ]
          }
        ],
        color: ['rgb(49,149,247)', 'rgb(224,230,239)', 'rgb(191,127,255)']
      }
    }
  },
  mounted () {
    this.drawLine()
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
  },
  methods: {
    go () {
      console.log(this.$router.push('/login'))
    },
    test () {
      this.$toast({
        message: '加速完成加速完成'
      })
    },
    test2 () {
      this.$tipNote({
        message: '加速完成加速完成',
        candy: 20,
        diamond: 20
      })
    },
    // 图表方法
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
#canvas{
  height: 100%;
  width: 100%;
}
#myChart{
  width:300px;
  height:300px;
}
</style>
