<template>
<div id="message">
   <bm-back></bm-back>
   <div class="messageTxt" v-for="(item, index) in data" :key="index">
      <div class="txt" v-if="!active[index]">{{slice(item.text)}}</div>
      <div class="txt" v-else>{{item.text}}</div>
     <!-- <div class="txt">亲爱的比特平台成员，邀请好友的活动目前仍然有效，每人最多可邀请5名好友，邀请好友提高算力，加速挖矿，赶快邀请好友一起玩吧！</div> -->
     <img src="static/images/msgup.png" alt="" class="msgUp" :id="`msgup${index}`" @click="taggleHeight(index)">
   </div>

</div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          text: '亲爱的BitMan平台成员，邀请好友的活动目前仍然有效，每人最多可邀请10名好友，邀请好友提高算力，加速挖矿，赶快邀请好友一起玩吧！'
        },
        {
          text: '平台建设中，很多功能待开发！'
        }

      ],
      active: []

    }
  },
  methods: {
    slice (val) {
      return val.slice(0, 58) + '........'
    },
    taggleHeight (index) {
      if (this.active[index]) {
        $('#msgup' + index)[0].src = '/static/images/msgup.png'
      } else {
        $('#msgup' + index)[0].src = '/static/images/msgDown.png'
      }
      this.active.splice(index, 1, !this.active[index])
    }
  },
  mounted () {
    this.data.forEach(k => {
      this.active.push(false)
    })
  }
}
</script>
<style lang="scss" scoped>
#message{
  width: 100%;
  .messageTxt{
    width: 87%;
    padding: 3% 3% 30px;
    line-height: 22px;
    margin: 0 auto;
    background: #292E60;
    border: 1px solid #404790;
    border-radius: 3px;
    font-size: 12px;
    color: #787DA5;
    margin-bottom: 10px;
    min-height: 50px;
    position: relative;
  }
  .msgUp{
    position: absolute;
    width: 18px;
    height: 9px;
    bottom: 15px;
    left:48%;
  }
  .txt{
    // height: 40px;
    // overflow: hidden;
  }

}

</style>
