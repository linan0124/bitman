<template>
   <!-- 路径 -->
    <div class="home__way">
      <router-link to="/index" tag="div">
        <i class="home"></i>
        <p>BitMan</p>
      </router-link>
      <!-- <router-link tag="div" :to="{name: '玩转世界杯',query: {pid: 101}}">
        <i class="star"></i>
        <p>星球</p>
        <div id="ball" class="worldCup"></div>
      </router-link> -->
      <router-link to="/mine" tag="div">
        <i class="mine"></i>
        <p>我的</p>
      </router-link>
    </div>
</template>

<style lang="scss" scoped>
.home{

  &__way{
    height: 40px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 6px 0;
    background: #F6F6F7;
    z-index: 99999;
    border-top: 1px solid #E6E6E6;

    div{
      float: left;
      // width: 33.333333333333333%;
      width:50%;
      height: 100%;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;
      position:relative;
      &:nth-child(1){
        border-right: 1px solid #E6E6E6;
      }
      &:nth-child(2){
        // border-right: 1px solid #E6E6E6;
      }
    }
    .router-link-exact-active{
      color: #0081FF;
      @each $name in home, mine{
        .#{$name} {
          background-image: url('/static/images/#{$name}-active.png');
          background-size:100% 100%;
        }
      }
      .worldCup{
        width:60%;
        height:100%;
        margin: 0 20%;
        display: block;
        background-image: url('/static/images/footerball-active.png');
        background-size:100% 100%;
      }
    }
    i{
      height: 22px;
      width: 22px;
      display: block;
    }
    // #ball{
    //   width:100%;
    //   height:100%;

    // }
    @each $name in home, mine{
      .#{$name} {
        height: 22px;
        width: 22px;
        margin: 0 auto 4px;
        display: block;
        background-image: url('/static/images/#{$name}.png');
        background-size:100% 100%;
      }
      .worldCup{
        width:100%;
        height:160%;
        display: block;
        background-image: url('/static/images/footerball.png');
        background-size:100% 100%;
        position:absolute;
        bottom:0;
      }
    }
    p{
      margin: 0;
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
