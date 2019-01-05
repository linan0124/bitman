<template>
<!--  @click="verifyLogin" -->
<div class="bm-button">
  <div class="bm-bottom"></div>
  <div
    class="showBtn"
    :class="{ 'bm-button--primary': type == 'primary'}"
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
  name: 'GrayButton',
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
  background: #fff;
  border-radius: 4px;
  text-align: center;
  // -webkit-tap-highlight-color:transparent;
  // box-shadow: 0 2px 10px 0 rgba(142,142,142,0.50);
  cursor: pointer;

  .showBtn{
    position: absolute;
    border-radius: 4px;
    z-index:100;
  }
  // &:active{
  //   transform: scale(0.98,0.9)
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
      color: #E1E8F2;
    }
  }
}
.bm-button--primary{
  height: 50px;
  width: 100%;
  background: #E1E8F2;
  box-shadow: none;
}
  .bm-button__pos{
    // background: rgba(255, 255, 255, 0.15);
  }
  .bm-button__text{
    &--ico{ display: none; }
    &--text{
      color: #8F8F8F;
      // height: 50px;
      line-height: 65px;
    }
  }

.bm-button--gray{
  height: 50px;
  width: 100%;
  background: red;
  box-shadow: none;
}
.bm-bottom{
  height: 50px;
  width: 100%;
  background:#D5DDE8;
  border-radius: 4px;
  position: absolute;
  bottom:-10px;
  left:0;
  z-index:1;
}
</style>
