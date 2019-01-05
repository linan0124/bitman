<template>
  <div class="contents">
    <bm-back></bm-back>
    <div class="show">
      <div class="proTitle">反馈问题</div>
      <div class="proBox">
        <textarea
          v-model="problemsInfo"
          class="proTxt"
          maxlength="240"
          placeholder="请输入不少于10个字的描述">
         </textarea>
      </div>
      <bm-button class="btn" @click="verify" text="提交"></bm-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      problemsInfo: ''
    }
  },
  methods: {
    verify () {}
  }

}
</script>

<style lang="scss" scoped>
.proTitle{
  // width: 90%;
  height: 50px;
  // margin: 0 auto;
  line-height: 50px;
}
.show{
  width: 90%;
  margin: 0 auto;
}
.proBox{
  width: 100%;
  background: #fff;
}
.proTxt{
  display: block;
  width: 90%;
  height: 120px;
  margin: 0 auto;
  background: #fff;
  border:none;
  padding: 8px 0;
  outline:none;
}
.btn {
  margin-top:100px;
}
</style>
