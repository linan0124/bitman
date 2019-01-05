<template>
<div class="bm-button">
  <div class="bm-bottom"></div>
  <div
    class="showBtn"
    :class="{'bm-button--primary': type == 'primary'}"
    @click="handleInnerClick">
    <div class="bm-button__pos"></div>
    <div class="bm-button__text">
      <div class="bm-button__text--ico">
        <img :src="`/static/images/${ico}.png`" alt="ico" v-if="ico">
      </div>
      <div class="bm-button__text--text">{{text}}</div>
    </div>
  </div>

</div>
</template>

<script>
export default{
  name: 'BmButton',
  data () {
    return {

    }
  },
  props: {
    text: {
      type: String,
      default: '确定'
    },
    ico: String,
    type: {
      type: String,
      default: 'primary'
    },
    verifyLogin: Function
  },
  methods: {
    handleInnerClick (event) {
      this.$emit('click', event)
      $('.bm-button').velocity({ scale: '0.92' },
        { duration: 10, easing: 'easeInOutCubic' }).velocity({ scale: '1' },
        { duration: 50, easing: 'easeInOutCubic' })
    }
  }
}
</script>

<style lang="scss" scoped>
.bm-button{
  position: relative;
  height: 46px;
  width: 100%;
  box-sizing: border-box;
  // background-image: linear-gradient(-180deg, #EAF5FF 0%, #C5E2FF 100%);
  background: #fff;
  border-radius: 4px;
  text-align: center;
  -webkit-tap-highlight-color:transparent;
  box-shadow: 0 2px 10px 0 rgba(142,142,142,0.50);
  cursor: pointer;

  .showBtn{
    position: absolute;
    border-radius: 4px;
    z-index:100;
  }
  &:active{
    // animation: wave .3s
    // transform: scale(0.98,0.9);
    // -ms-transform: scale(0.98,0.9); /* IE 9 */
    // -moz-transform: scale(0.98,0.9);
    // -o-transform: scale(0.98,0.9);
    // -webkit-transform: scale(0.98,0.9); /* Safari and Chrome */
  }
  // @-webkit-keyframes wave{
  //   from{-webkit-transform:scale(1,1);}
  //   to{-webkit-transform:scale(0.98,0.9);}
  // }
  &__pos{
    // height: 18px;
    // background: rgba(255, 255, 255, 0.4);
    // border-radius: 4px;
  }
  &__text{
    margin-top: -8px;
    &--ico{
      display: inline-block;
      margin-right: 10px;

      img{
        width: 20px;
        height: 20px;
      }
    }
    &--text{
      display: inline-block;
      height: 50px;
      line-height: 50px;
      font-size: 12px;
      color: #0081FF;
    }
  }
}

.bm-button--primary{
  height: 50px;
  width: 100%;
  background: #0081FF;
  box-shadow: none;
  // background-image: linear-gradient(-180deg, #53A8FF 0%, #2490FF 100%);
}
  .bm-button__pos{
    // background: rgba(255, 255, 255, 0.15);
  }
  .bm-button__text{
    &--ico{ display: none; }
    &--text{
      color: #fff;
      // height: 50px;
      line-height: 65px;
    }
  }

.bm-bottom{
  height: 50px;
  width: 100%;
  background: #0068CD;
  border-radius: 4px;
  position: absolute;
  bottom:-10px;
  left:0;
  z-index:1;
}
</style>
