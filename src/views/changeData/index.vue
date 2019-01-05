<template>
  <div>
    <div class="header">
      <a class="arrow" href="javascript:history.go(-1)"></a>
      <router-link class="rounterLink" tag="div" to="/uploadRecords">上传记录</router-link>
    </div>
    <div class="contain">
      <div class="tip">请选择上传类型</div>
      <div class="choiceWay">
        <img src="/static/images/data21.png">
        <div class="intro">
          <div class="title">纸质账单</div>
          <div class="introTip">线下消费小票、线上支付支付截图等</div>
        </div>
        <div class="takePhoto">
          <input class="upload" @change="takePicture" type="file" id="billFile" accept="image/*">
        </div>
      </div>
      <div class="choiceWay">
        <img src="/static/images/data22.png">
        <div class="intro">
          <div class="title speTitle">火车票</div>
        </div>
        <div class="takePhoto">
          <input class="upload" @change="takePicture" type="file" id="ticketFile" accept="image/*">
        </div>
      </div>
      <div class="choiceWay">
        <img src="/static/images/data23.png">
        <div class="intro">
          <div class="title speTitle">发票</div>
        </div>
        <div class="takePhoto">
          <input class="upload" @change="takePicture" type="file" id="invoiceFile" accept="image/*">
        </div>
      </div>
      <div class="opration">
        <div class="oprationTitle">请注意：</div>
        <div class="introList clearfix" >
          <div class="listR"></div>
          <div class="listL"> 每个账号每天总计上传数据3笔，今天已上传{{uploadNumber}}笔。</div>
        </div>
        <div class="introList clearfix" v-for="(item,index) in requireList" :key='index'>
          <div class="listR"></div>
          <div class="listL">
            {{item.intro}}
          </div>
        </div>
      </div>
    </div>
    <hint :messages="mesTip" v-if="tipStatus">
      <img v-if="loadingStatus" class="loading" src="/static/images/loading.gif">
    </hint>
  </div>
</template>
<script>
import {uploadFile, getUplodeNumb} from 'api/changeData'
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  data () {
    return {
      requireList: [
        // {intro: '每个账号每天总计上传数据3笔，今天已上传2笔。'},
        {intro: '请确认图片或照片清晰可识别，并且文件大小不超过2M。'},
        {intro: '上传后需要等待后台审核，一般审核时间为1-2工作日。'},
        {intro: '通过后台审核后，系统会发放对应比特钻奖励。'}
      ],
      mesTip: '数据上传中，请等待...',
      tipStatus: false,
      loadingStatus: true,
      uploadNumber: ''
    }
  },
  methods: {
    uploadNum () {
      getUplodeNumb().then(response => {
        let data = response.data
        if (Number(data.code) === 200) {
          this.uploadNumber = data.mapData.uplodeNumb
        }
      }).catch(errortip => {})
    },
    takePicture (e) {
      var file = e.target.files[0]
      var fileType = ''
      if (e.target.id === 'billFile') {
        fileType = 1
      } else if (e.target.id === 'ticketFile') {
        fileType = 2
      } else {
        fileType = 3
      }
      if (file) {
        this.tipStatus = true // 提示信息展示
        let param = new FormData() // 创建form对象
        param.append('file', file)// 通过append向form对象添加数据
        param.append('type', fileType)
        // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data', 'X-Token': getToken()}
        } // 添加请求头  http://39.106.60.55:8888  https://bitman.shoufubang.com.cn
        axios.post('https://bitman.shoufubang.com.cn/foundation/comFile/uploadFile', param, config)
          .then(response => {
            // console.log(response.data)
            if (String(response.data.code) === '200') {
              this.uploadNumber = response.data.mapData.uplodeNumb
              this.loadingStatus = false
              this.mesTip = '数据上传成功，请等待审核…'
              setTimeout(() => {
                this.tipStatus = false
              }, 1500)
            } else if (String(response.data.code) === '487') {
              this.loadingStatus = false
              this.mesTip = '今日上传次数已达上限'
              setTimeout(() => {
                this.tipStatus = false
              }, 1500)
            } else if (String(response.data.code) === '404') {
              this.loadingStatus = false
              this.mesTip = '上传失败，请重新上传'
              setTimeout(() => {
                this.tipStatus = false
              }, 1500)
            }
          }).catch(errortip => {})

      //   // let param = new FormData() // 创建form对象
      //   // param.append('file', file)// 通过append向form对象添加数据
      //   // param.append('type', fileType)
      //   // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      //   // uploadFile(param).then(response => {
      //   //   if (String(response.data.code) === '200') {
      //   // console.log(123)
      //   // this.loadingStatus = false
      //   // this.mesTip = '数据上传成功，请等待审核…'
      //   // setTimeout(() => {
      //   //   this.tipStatus = false
      //   // }, 2000)
      //   // }).catch(errortip => {})
      }
    }
  },
  mounted () {
    this.uploadNum()
  }
}
</script>

<style lang="scss" scoped>
  .header{
    height:40px;
    background: #532E95;
    padding:15px 5% 0 5%;
     .arrow{
      width:12px;
      height:37px;
      display:block;
      background:url('/static/images/back.png') no-repeat;
      background-size:100%;
      float:left;
    }
    .rounterLink{
      float:right;
      color:#ffffff;
    }
  }
  .contain{
    padding:0 5% 60px 5%;
    // height:700px;
    background:#ffffff;
    color:#8F8F8F;
  }
  .tip{
    padding-top:20px;
    padding-bottom:10px;
    font-size:16px;
  }
  .choiceWay{
    height:80px;
    width:100%;
    margin-bottom:10px;
    position: relative;
    img {
      width:100%;
      height:100%;
      position: absolute;
      left:0;
      top:0;
      z-index:1
    }
    .intro{
      max-width:70%;
      color:#ffffff;
      position: absolute;
      top:10px;
      left:21%;
      z-index:10;
      padding-top:10px;
    }
    .title{
      font-size:18px;
      margin-bottom:8px;
    }
    .speTitle{
      padding-top:6px;
    }
    .introTip{
      font-size:12px;
    }
    .takePhoto{
      width:30px;
      height:30px;
      background:url('/static/images/camera.png');
      background-size:100% 100%;
      overflow: hidden;
      position: absolute;
      right:4%;
      top:26px;
      z-index:10
    }
  }
  .opration{
    background: #F4F6F9;
    border: 1px solid #E6E6E6;
    padding:20px 10px 0 10px;
    margin-top:20px;
    .oprationTitle{
      font-size: 16px;
      color: #8F8F8F;
      font-weight:bold;
      margin-bottom:10px;
    }
    .introList{
      min-height:30px;
      line-height:30px;
      margin-bottom:10px;
    }
    .listR{
      width:10px;
      height:10px;
      border-radius: 50%;
      background: #D8D8D8;
      margin-top:10px;
      float:left;
    }
    .listL{
      margin-left: 10px;
      line-height:20px;
      width: 88%;
      float:left;
    }
  }
  .loading{
    width:85px;
    height:30px;
  }
  .upload{
    width:100%;
    height:100%;
    opacity: 0;
  }
</style>
