<template>
  <div class="bm-back">
    <!-- 返回条 -->
    <a href="javascript:history.go(-1)" class="fl">
      <i></i>
      <!-- <span>{{currentTitle}}</span> -->
    </a>
    <!-- 路由链接 -->
    <div class="bm-back__link fr"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'BmBack',
  data () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentTitle () {
      return this.title === '' ? this.$route.name : this.title
    }
  }
}
</script>

<style lang="scss" scoped>
.bm-back{
  height: 24px;
  padding: 10px 5%;
  position: relative;
  z-index: 1000;
  background: #532E95;
  // background: #242851;

  a{
    overflow: hidden;
  }
  i{
    float: left;
    height: 20px;
    width: 12px;
    margin-right: 10px;
    background: url('/static/images/back.png');
    background-size: cover;
  }
  span{
    float: left;
    font-size: 16px;
    color:#ffffff;
  }

  &__link,&__link *{
    color: #ffffff;
    font-size: 16px;
  }

}
</style>
