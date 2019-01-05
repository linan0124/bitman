<template>
<div>
  <bm-back></bm-back>
  <div class="content">
    <div class="infoLine">
      <bm-input @change="changeStatus" v-model="carNumber" name="车牌号" width="80" placeholder="请输入认证用户名下的车牌号"></bm-input>
    </div>
    <div class="infoLine">
      <bm-input @change="changeStatus" v-model="engineNumber" name="发动机号" width="80" placeholder="请输入车辆发动机型号"></bm-input>
    </div>
    <div class="infoLine">
      <bm-input @change="changeStatus" v-model="identificationNumber" name="车架号" width="80" placeholder="请输入车辆车架号,例:ABC6A25F8D0936284"></bm-input>
    </div>
    <div class="infoLine">
      <div class="selectContain">
        <select @change="changeStatus" class="selectContent"  v-model="areaData">
          <option value='' disabled selected style='display:none;'>请选择归属地</option>
          <option :value ="item.cityCode" v-for="(item,index) in areaList" :key="index">{{item.name}}</option>
        </select>
        <span>地区</span>
        <img src="/static/images/trilateral.png">
      </div>
      <p class="tip"></p>
    </div>
    <div class="infoLine" v-if="highlight">
      <bm-button class="btn" @click="verify"></bm-button>
    </div>
    <div class="infoLine" v-if="gray">
      <gray-button class="btn"></gray-button>
    </div>
    <div v-if="noteTip">
      <note-box powerNumber="5" awardNumber="20"></note-box>
    </div>
  </div>
</div>
</template>
<script>
import {carRenewal, findCarArea} from 'api/verifyInfo'
export default {
  data () {
    return {
      carNumber: '',
      noteTip: false,
      areaList: [],
      areaData: '',
      engineNumber: '',
      identificationNumber: '',
      highlight: false,
      gray: true
    }
  },
  methods: {
    verify () {
      if (this.carNumber && this.areaData) {
        this.highlight = false
        this.gray = true
        carRenewal({
          citycode: this.areaData,
          carno: encodeURI(this.carNumber),
          carCode: this.identificationNumber,
          carDriveNO: this.engineNumber
        }).then(response => {
          var data = response.data
          if (String(data.code) === '200') {
            // 认证成功弹出窗口
            this.noteTip = true
          } else if (String(data.code) === '500') {
            $('.tip').show().html(data.message)
            this.highlight = true
            this.gray = false
          }
        }).catch()
      }
    },
    changeStatus () {
      if (this.carNumber && this.engineNumber && this.identificationNumber && this.areaData) {
        this.highlight = true
        this.gray = false
      } else {
        this.highlight = false
        this.gray = true
      }
    },
    choiceArea () {
      findCarArea().then(response => {
        var data = response.data
        if (String(data.code) === '200') {
          this.areaList = data.data
        }
      }).catch()
    }
  },
  mounted () {
    this.choiceArea()
  }
}
</script>
<style lang="scss" scoped>
  .content {
    margin:0 8%;
    padding-top:20px;
  }
  .infoLine{
    margin-bottom:20px;
    p{
      color: #9DA7CC;
    }
  }
  .selectContain{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;

  .selectContent{
    -webkit-appearance: none;
    border-radius: 4px;
    border: none;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 50px;
    line-height: 1;
    outline: none;
    padding: 0 15px 0 80px;
    // transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    background:#ffffff;
    // background-image: linear-gradient(-180deg, #FBFCFD 0%, #D5DAEC 100%);
    // box-shadow: inset 0px 1px 6px 0 rgba(0,0,0,0.50);
  }
  span{
    position: absolute;
    top: 15px;
    left: 10px;
    color: #606266;
  }
  img {
    width:18px;
    height:10px;
    position: absolute;
    right:15px;
    top:22px;
  }
}
.tip{
  text-align:left;
  color:#FF6262 !important;
  display:none;
}
</style>
