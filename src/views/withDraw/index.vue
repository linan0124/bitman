<template>
<div>
  <bm-back></bm-back>
  <div class="content">
    <div class="infoLine">
      <div class="circle fl">1</div>
      <div class="fl word">完成实名认证</div>
      <!-- <router-link v-if="realNameStatus === 0" tag="div" to="/realname" class="specColor fr">未实名</router-link>
      <div v-else> -->
      <!-- <router-link v-if="Number(status.kycStatus) === 3" tag="div" to="/realname" class="specColor fr">实名认证</router-link> -->
      <!-- <div v-if="Number(status.kycStatus) === 0" class="going fr">审核中</div> -->
      <div @click="goRealName" class="going fr" :class="{specColor:Addcolor}">{{checkWord}}</div>
      <!-- <div v-if="Number(status.kycStatus) === 1" class="going fr">已完成</div> -->
      <!-- <router-link v-if="Number(status.kycStatus) === 2" tag="div" to="/realname" class="specColor fr">审核失败</router-link> -->
      <!-- </div> -->
    </div>
    <div class="infoLine">
      <div class="circle fl">2
        <div class="topLine line"></div>
        <div class="botLine line"></div>
      </div>
      <div class="fl word">绑定ETH地址</div>
      <router-link v-if="Number(status.address) === 0" tag="div" to="/ethAdress" class="specColor fr">绑定</router-link>
      <div v-else class="going fr">已完成</div>
    </div>
    <div class="infoLine">
      <div class="circle fl">3</div>
      <div class="fl word">加入Telegram官方社群</div>
      <router-link v-if="Number(status.status) === 0" tag="div" to="/telegram" class="specColor fr">加入</router-link>
      <div v-else class="going fr">已完成</div>
    </div>
    <div class="sureBtn" v-if="highlight">
      <bm-button class="btn" @click="verify" text="提现"></bm-button>
    </div>
    <div class="sureBtn" v-if="gray">
      <gray-button class="btn" text="提现"></gray-button>
    </div>
    <div class="withWrawRule">
      <h2>提现规则</h2>
      <div class="lineInfo">
        1、比特钻可按1:1兑换成ERC－20的Token “DACO”，即比特曼数据币Data Coin；
      </div>
      <div class="lineInfo">
        2、DACO将由平台方统一空投至您所绑定的ETH钱包地址；
      </div>
      <div class="lineInfo">
        3、每个用户仅能绑定一次ETH地址，如有误操作或需要变更，请联系微信小助手，微信账号：BitMan-one；
      </div>
      <div class="lineInfo">
        4、可随时发起提现申请，单次最低提取额10000比特钻，每笔提取手续费为500比特钻；
      </div>
      <div class="lineInfo">
        5、平台会汇总所有的提取，每月最后一个工作日前进行一次DACO空投。
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {preCashStateList} from 'api/withDraw'
import {getIsOpenAPI} from 'api/speedup'
export default {
  data () {
    return {
      highlight: false,
      gray: true,
      status: {},
      isRealName: '',
      realNameStatus: '',
      checkWord: '',
      Addcolor: false
    }
  },
  methods: {
    verify () {
      this.$router.push({path: '/getBitman', query: {address: this.status.address}})
    },
    verifyStatus () {
      preCashStateList().then(response => {
        var data = response.data
        if (data.code === '200') {
          this.status = data.data
          switch (Number(this.status.kycStatus)) {
            case 0:
              this.checkWord = '审核中'
              this.Addcolor = false
              break
            case 1:
              this.checkWord = '已完成'
              this.Addcolor = false
              break
            case 2:
              this.checkWord = '审核失败'
              this.Addcolor = true
              break
            case 3:
              this.checkWord = '实名认证'
              this.Addcolor = true
              break
          }
          this.getBitman()
        }
      }).catch(errortip => {})
    },
    getBitman () {
      if (Number(this.status.kycStatus) === 1 && Number(this.status.address) !== 0 && Number(this.status.status) === 1) {
        this.highlight = true
        this.gray = false
      }
    },
    getIsOpen () {
      getIsOpenAPI().then(response => {
        var data = response.data
        if (Number(data.code) === 200) {
          this.isRealName = data.data.is_realName
        }
      })
    },
    goRealName () {
      switch (Number(this.status.kycStatus)) {
        case 0:
          break
        case 1:
          break
        case 2:
          this.$router.push({path: '/realname'})
          break
        case 3:
          this.$router.push({path: '/realname'})
          break
      }
    }
  },
  created () {
    this.verifyStatus()
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
  .infoLine{
    padding:0 4%;
    height:60px;
    line-height:60px;
    margin-bottom:10px;
    background:#ffffff;

    .circle{
      width:22px;
      height:22px;
      text-align:center;
      line-height:22px;
      color:#ffffff;
      border-radius:50%;
      position:relative;
      background: #8D4DFF;
      margin-top: 20px;
      margin-right: 8px;
    }
    .specColor{
      color: #0081FF;
    }
    .word{
      color:#000000;
    }
    .line{
      position:absolute;
      width:3px;
      height:50px;
      background: #8D4DFF;
      left:50%;
      margin-left:-2px;
    }
    .topLine{
      top:-50px;
    }
    .botLine{}
  }
  .sureBtn{
    margin:20px 0;
    padding:0 5%;
  }
  .going{
    color: #8F8F8F;
  }
  .withWrawRule{
    padding:10px 4% 40px 4%;
    h2{
      font-size: 14px;
      color: #8F8F8F;
    }
    .lineInfo{
      margin-bottom:10px;
      line-height:20px;
    }
  }
</style>
