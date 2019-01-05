<template>
  <div id="app">
    <!-- <keep-alive exclude="BmLogin"> -->
    <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {

  }
}
</script>

<style lang="scss">
  @import 'normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
