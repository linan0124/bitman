<template>
  <div class="content">
    <bm-back></bm-back>
    <div class="sumContent">
      <div class="sumMoney">
        <div class="fl">总金额</div>
        <div class="fr txtGray">12.3456</div>
      </div>
      <div class="sumMoney">
        <div class="fl">可用金额</div>
        <div class="fr txtSize">10.3456</div>
      </div>
      <div class="sumMoney">
        <div class="fl">锁定金额</div>
        <div class="fr txtRed">2</div>
      </div>
    </div>

  </div>
</template>

<script>
// import {getAllBit} from 'api/mine'
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .content{
    background: #F4F6F9;
    height: 650px;
  }
  .sumContent{
    width: 100%;
    background: #FFFFFF;
    .sumMoney{
    width: 90%;
    height: 60px;
    margin: 0 auto;
    line-height: 60px;
    border-bottom: 1px solid #F4F6F9;
    font-size: 14px;
    color: #000000;
  }
  .txtGray{
    font-size: 16px;
    color: #8F8F8F;
  }
  .txtSize{
    font-size: 16px;
  }
  .txtRed{
    font-size: 16px;
    color: #FF5C5C;
  }
  }

</style>
