<template>
  <div id="slider">
    <div id="slider_bg"></div>
    <span id="label" class="label">
      <div class="label__pos">
        <img src="/static/images/slide.png" alt="">
      </div>
    </span>
    <span id="labelTip">拖动滑块验证</span>
  </div>
</template>

<script>

export default {
  props: {
    successtip: {
      type: String,
      default: '验证成功'
    },
    successfn: Function

  },
  mounted () {
    const _this = this
    var slider = new SliderUnlock('#slider', {
      successLabelTip: _this.successtip
    }, function () {
      _this.successfn(slider)
    })
    slider.init()
  }
}
</script>

<style lang="scss" scoped>
#slider {
  height: 50px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  background: #86C2FF;
  // background-image: linear-gradient(-180deg, #FBFCFD 0%, #D5DAEC 100%);
}

#slider_bg {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #53A8FF;
  z-index: 1;
}

.label {
  width: 80px;
  position: absolute;
  left: 0;
  top: 0;
  height: 50px;
  background-color: #78AFE5;
  // background-image: linear-gradient(-180deg, #7EC1FF 4%, #3E75AF 97%);
  border-radius: 4px;
  z-index: 3;
  cursor: move;

  &__pos{
    width: 70px;
    height: 37px;
    padding: 4px;
    margin-left: 1px;
    background-color: #ABD5FF;
    // background-image: linear-gradient(-180deg, #EAF5FF 0%, #C5E2FF 100%);
    border-radius: 4px;

    &::before{
      // content: '';
      // display: block;
      // width: 100%;
      // height: 18px;
      // background: rgba(255, 255, 255, 0.5);
      // border-radius: 4px;
    }
  }
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: {
      top: -8px;
      left: -7px;
    }
    width: 14px;
  }
}

#labelTip {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 13px;
  color: #9DA7CC;
  line-height: 50px;
  text-align: center;
  color: #fff;
  z-index: 2;
}
</style>
