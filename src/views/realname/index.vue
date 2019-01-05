<template>
<div id="realName">
  <bm-back></bm-back>
  <div class="idTxt">
    为保障个人资产安全，防止他人盗刷，需进行身份证验证，此举仅用于验证，我们不会泄露您的隐私。
  </div>
    <div class="content" v-if="verifyStatus === '500'">
      <!-- 未实名 -->
      <bm-input v-model="name" @change="changeStatus" background="#f4f6f9" name="姓名" width="80" placeholder="请输入您的真实姓名" class="inName"></bm-input>
      <bm-input v-model="nameID" @change="changeStatus" background="#f4f6f9" name="身份证号" width="80" placeholder="请输入您的身份证号" class="inNumber" maxlengt='18'></bm-input>
      <p class="redWord"></p>
      <!-- <bm-checkbox v-model="model" class="check">我已阅读并同意《用户服务协议》</bm-checkbox> -->
      <div class="btn" v-if="highlight">
        <bm-button class="btn" @click="verifyIdentity" text="下一步"></bm-button>
      </div>
      <div class="btn" v-if="gray">
        <gray-button class="btn" text="下一步"></gray-button>
      </div>
      <div class="tipTxt space">说明：如若身份证号有字母，请将字母小写</div>
   </div>
   <!-- 已实名 -->
    <div class="uploadImg" v-else>
      <div class="alreadyReal">
        <div class="showIdInfo spaceMargin">
          <span class="setwidth">姓名</span>
          <span class="haveName"> {{name}}</span>
        </div>
        <div class="showIdInfo">
          <span class="setwidth">身份证号</span>
          <span class="haveName"> {{ nameID }}</span>
        </div>
      </div>
      <!-- 上传身份证 -->
      <div class="idPhoto" v-if="Number(realNameStatus)===3">
        <div class="wordIndro">身份证人像面照片</div>
        <div class="imgList list1">
          <div class="fontImg"></div>
          <input class="upload"
            @change="takePicture"
            type="file"
            id="font"
            accept="image/*">
        </div>
        <div class="wordIndro">身份证国徽面照片</div>
        <div class="imgList list2">
          <div class="backImg"></div>
          <input class="upload"
            @change="takePicture"
            type="file"
            id="back"
            accept="image/*">
        </div>
        <div class="wordIndro">手持身份证+书写BitMan和时间的纸张</div>
        <div class="imgList list3">
          <div class="bitmanImg"></div>
          <input class="upload"
            @change="takePicture"
            type="file"
            id="multipleImg"
            accept="image/*">
        </div>
        <div class="photoBtn" v-if="uploadStatus">
          <bm-button @click="uploadIdImg"></bm-button>
        </div>
        <div class="photoBtn" v-else>
          <gray-button class="btn"></gray-button>
        </div>
      </div>
      <!-- 审核状态更改 -->
      <div class="checkStatus">
        <div class="checking" v-if="Number(realNameStatus)===0">
          <img class="checkIcon" src="/static/images/checking.png">
          <p>资料审核中，请等待…</p>
        </div>
        <div class="checking" v-if="Number(realNameStatus)===1">
          <img class="checkIcon" src="/static/images/checkDone.png">
          <p>实名认证成功！</p>
        </div>
        <div class="checking" v-if="Number(realNameStatus)===2">
          <img class="checkIcon" src="/static/images/checkFair.png">
          <p v-if="remark">{{remark}}</p>
          <div class="againUpload" @click="updateImg">重新上传</div>
        </div>
      </div>
    </div>
    <div v-if="noteTip">
      <note-box powerNumber="15" awardNumber="50"></note-box>
    </div>
</div>
</template>
<script>
import {isRealName, realName, getKycStatus} from 'api/realname'
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  data () {
    return {
      name: '',
      nameID: '',
      model: true,
      verifyStatus: '500',
      noteTip: false,
      highlight: false,
      gray: true,
      filesList: [null, null, null],
      uploadStatus: false,
      realNameStatus: '',
      remark: ''
    }
  },
  methods: {
    verifyName () {
      isRealName().then(response => {
        var data = response.data
        this.verifyStatus = data.code
        if (String(data.code) === '200') {
          this.name = '***' + data.mapData.name.substring(1)
          this.nameID = data.mapData.idcard.substring(0, 6) + '******' + data.mapData.idcard.substring(14)
        }
      }).catch()
    },
    verifyIdentity () {
      if (this.name && this.nameID) {
        $('.redWord').hide()
        realName({name: encodeURI(this.name), idcard: this.nameID}).then(response => {
          var data = response.data
          var code = String(data.code)
          // 200验证通过
          if (code === '200') {
            if (this.$route.query.status) {
              this.verifyStatus = '455'
            } else if (this.$route.query.status === undefined) {
              this.noteTip = true
            }
            // this.$router.push('./upload')
          } else if (code === '500') {
            $('.redWord').show().html('您的身份认证有误，请重新输入')
          }
        }).catch()
      } else {
        $('.redWord').show().html('您的身份认证有误，请重新输入')
      }
    },
    changeStatus () {
      if (this.name && this.nameID) {
        this.highlight = true
        this.gray = false
      } else {
        this.highlight = false
        this.gray = true
      }
    },
    takePicture (e) {
      var file = e.target
      let _this = this
      if (file.files && file.files[0]) {
        var reader = new FileReader()
        reader.onload = function (evt) {
          if (e.target.id === 'font') {
            // e.target.files[0].contentType = 4
            // console.log(e.target.files)
            _this.filesList.splice(0, 1, e.target.files[0])
            // console.log(_this.filesList)
            //  position:absolute; z-index:100; top:0; left:0
            $('.fontImg').html('<img style="width:100%; height:100%;" src="' + evt.target.result + '" />')
          } else if (e.target.id === 'back') {
            // e.target.files[0].contentType = 5
            _this.filesList.splice(1, 1, e.target.files[0])
            // console.log(_this.filesList)
            $('.backImg').html('<img style="width:100%; height:100%;" src="' + evt.target.result + '" />')
          } else {
            // e.target.files[0].contentType = 6
            _this.filesList.splice(2, 1, e.target.files[0])
            // console.log(_this.filesList)
            $('.bitmanImg').html('<img style="width:100%; height:100%;" src="' + evt.target.result + '" />')
          }
          // console.log(_this.filesList)
          if (_this.filesList[0] !== null && _this.filesList[1] !== null && _this.filesList[2] !== null) {
            _this.uploadStatus = true
          }
        }
        reader.readAsDataURL(file.files[0])
      } else {
        // console.log(file.value)
        if (e.target.id === 'font') {
          _this.filesList.splice(0, 1, null)
          $('.fontImg').html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>')
        } else if (e.target.id === 'back') {
          _this.filesList.splice(1, 1, null)
          $('.backImg').html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>')
        } else {
          _this.filesList.splice(2, 1, null)
          $('.bitmanImg').html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>')
        }
      }
    },
    uploadIdImg () {
      // console.log(this.filesList)
      let param = new FormData() // 创建form对象
      // 通过append向form对象添加数据
      // for (let i = 0; i < this.filesList.length; i++) {
      //   param.append('file' + i, this.filesList[i])
      // }
      param.append('file4', this.filesList[0])
      param.append('file5', this.filesList[1])
      param.append('file6', this.filesList[2])
      // console.log(param.get('file1'))
      let config = {
        headers: {'Content-Type': 'multipart/form-data', 'X-Token': getToken()}
      } // 添加请求头  http://39.106.60.55:8888  https://bitman.shoufubang.com.cn
      axios.post('https://bitman.shoufubang.com.cn/foundation/comFile/updateUploadFile', param, config)
        .then(response => {
          // console.log(response.data)
          if (String(response.data.code) === '200') {
            this.kycStatus()
          }
        }).catch(errortip => {})
    },
    kycStatus () {
      getKycStatus().then(response => {
        var data = response.data
        // console.log(data.mapData)
        // kycStatus 0 待审核 1 已完成 2 失败 3 已实名未上传照片
        if (String(data.code) === '200') {
          this.realNameStatus = data.mapData.kycStatus
          this.remark = data.mapData.remark
        }
      }).catch()
    },
    updateImg () {
      this.realNameStatus = 3
    }

  },
  mounted () {
    this.kycStatus()
    this.verifyName()
  }
}
</script>
<style lang="scss" scoped>
.idTxt{
  font-size: 14px;
  color: #9DA7CC;
  line-height: 22px;
  padding:20px 5% 10px 5%;
  background:#ffffff;
}
.tipTxt{
  font-size: 14px;
  color: #9DA7CC;
  line-height: 22px;
  margin-top: 18px;
  padding-bottom:10px;
}
#realName{
  width: 100%;
  .content{
    // width: 82%;
    padding:0 5%;
    background:#ffffff;
  .idIcon{
    display: block;
    width: 70px;
    height: 40px;
    margin: 0 auto;
    margin-top: 16px;
  }
  .inName{
    margin-top: 15px;
    font-size: 12px;
  }
  .inNumber{
    margin-top: 20px;
    font-size: 12px;
    margin-bottom: 19px;
  }
  .btn{
    margin-top: 24px;
  }
}
}
.setwidth{
  height:40px;
  width:70px;
  display:inline-block;
}
.haveName{
  // border:1px solid #9DA7CC;
  height:40px;
  width:100%;
  font-weight:bold;
  line-height:40px;
  text-indent:32px;
}
.redWord{
  color:#FF6262;
  line-height: 0px;
  margin-bottom: 34px;
  display:none;
}
.alreadyReal {
  margin-bottom:10px;
  background:#ffffff;
  padding:0 5%;
  padding-bottom:20px;
}
.showIdInfo {
  height:40px;
  line-height:40px;
  color: #1F1F1F;
  padding:0 8px;
  // margin-top:10px;
  background:#f4f6f9;
}
.space{
  padding-bottom:30px !important;
}
.spaceMargin{
  margin-bottom:10px;
}
.uploadImg{
  padding-bottom:30px;
}
.idPhoto{
  color: #8F8F8F;
  text-align:center;
  background:#ffffff;
  .imgList{
    height:160px;
    position:relative;
    width:60%;
    margin:0 auto;
  }
  .list1{
    background:url('/static/images/list1.png');
    background-size:100% 100%;
  }
  .list2{
    background:url('/static/images/list2.png');
    background-size:100% 100%;
  }
  .list3{
    background:url('/static/images/list3.png');
    background-size:100% 100%;
  }
  .wordIndro{
    padding-top:20px;
    padding-bottom:10px;
  }
  .upload{
    width:40px;
    height:40px;
    overflow: hidden;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-20px;
    margin-top:-12px;
    opacity:0;
  }
  .fontImg, .backImg, .bitmanImg{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
  }
  .photoBtn{
    padding-top:30px;
    padding-bottom:40px;
    width:90%;
    margin:0 auto;
  }
}
.checkStatus{
  text-align:center;
  color: #8F8F8F;
  padding-top:20px;
}
.checkIcon{
  width:30px;
  height:30px;
}
.againUpload{
  width:150px;
  height:30px;
  margin:0 auto;
  line-height:30px;
  text-align:center;
  color:#0081FF;
  background: #FFFFFF;
  border: 1px solid #0081FF;
  border-radius: 4px;
}
</style>
