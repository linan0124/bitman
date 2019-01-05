<template>
  <div class="speedContain clearfix">
    <div class="speedList" :class="{changeBack:item.success }" v-for="(item,index) in list" :key="index" @click="verify(index)">
      <div v-if="item.openData">
        <div v-if="item.success" class="verifySuccess"></div>
        <img class="iconImg" :src="`/static/images/${item.icon}.png`">
        <div class="icon-title">{{item.title}}</div>
        <div class="powerBox">
          <div class="powerL">
            <span>+20</span>
            <img class="icon-candy" src="/static/images/candy.png">
          </div>
          <div class="powerR">
            <img class="icon-diamond fr" src="/static/images/diamond.png">
            <span class="fr">+20</span>

          </div>
        </div>
      </div>
      <div v-else>
        <div class="unopen-word">即将开放</div>
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'speedupList',
  data () {
    return {

    }
  },
  props: ['list'],
  methods: {
    verify (index) {
      this.$emit('verify', index)
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .speedContain{
    padding-bottom: 30px;
  }
  .speedList{
    width:30%;
    min-height:125px;
    margin-left:2.5%;
    margin-top:10px;
    background: #FFFFFF;
    border-radius: 8px;
    text-align:center;
    float:left;
    color: #8F8F8F;
    position: relative;
    cursor: pointer;
    .iconImg {
      height:50px;
      width:50px;
      padding-top:10px;
    }
  }
  .changeBack{
    // width:30%;
    background: #E4EFFF;
  }
  .icon-title{
    padding-bottom:15px;
  }
  .verifySuccess{
    height:15px;
    width:15px;
    position: absolute;
    background:url('/static/images/verifySuccess.png') no-repeat center;
    background-size:100%;
    top:5px;
    right:5px;
  }
  .active{
    width:34px !important;
    height:22px !important;
  }
  .powerBox{
    margin:0 5%;
    height:34px;
    .powerL{
      width:50%;
      float:left;
       span{
        float:left;
        margin-right:5px;
      }
    }
    .powerR{
      width:50%;
      float:right;
    }
    span {
      margin-right:5px;
    }
    .icon-candy{
      width:16px;
      height:16px;
      float:left;
    }
    .icon-diamond{
      width:10px;
      height:14px;
    }
  }
  .unopen-word{
    color: #E2E2E2;
    padding-bottom: 16px;
    padding-top: 32px;
  }
</style>
