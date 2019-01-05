<template>
<div id="upload">
  <bm-back class="back"></bm-back>
  <div class="frontTxt">请上传身份证人像面照片</div>
  <div class="idCard">
    <div class="position">
      <div class="fontImg"></div>
      <input type="file"
      @change="preview"
      class="addImg"
      id="font" multiple/>
    </div>
  </div>
  <div class="frontTxt mt">请上传身份证国徽面照片</div>
  <div class="idCard1">
    <div class="position">
      <div class="backImg"></div>
      <input type="file"
      @change="preview"
      class="addImg"
      id="backa" multiple/>
    </div>
  </div>
  <bm-checkbox v-model="model" class="check">我已阅读并同意《用户服务协议》</bm-checkbox>
  <bm-button class="uploadBtn" @click="submitImg"></bm-button>

</div>
</template>
<script>
import {upload} from 'api/upload'
export default {
  data () {
    return {
      data: [
      ],
      model: true,
      paramlist: [],
      files: ['', '', '']
    }
  },
  methods: {
    // 提交图片文件
    submitImg (e) {
      let file = e.target
      console.log(paramlist)
      let param = new FormData() // 创建form对象
      param.append('file', file, file.name)// 通过append向form对象添加数据
      // param.append('chunk', '0')// 添加form表单中其他数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      } // 添加请求头
      upload(param)
        .then(response => {
          console.log(response.data)
        })
    },
    preview (e) {
      var file = e.target
      let _this = this
      // this.paramlist = new FormData()
      // this.paramlist.append('file', this.files)// 通过append向form对象添加数据
      // this.paramlist.append('type', fileType)
      // console.log(this.paramlist.get('file'))
      if (file.files && file.files[0]) {
        var reader = new FileReader()
        reader.onload = function (evt) {
          if (e.target.id === 'font') {
            _this.files.push(e.target.files[0])
            console.log(_this.files)
            $('.fontImg').html('<img style="width:100%; height:100%;" src="' + evt.target.result + '" />')
          } else {
            $('.backImg').html('<img style="width:100%; height:100%;" src="' + evt.target.result + '" />')
          }
        }
        reader.readAsDataURL(file.files[0])
      } else {
        console.log(file.value)
        if (e.target.id === 'font') {
          $('.fontImg').html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>')
        } else {
          $('.backImg').html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>')
        }
      }
    }

  },
  // 页面加载后执行
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
#upload{
  width: 100%;
  .frontTxt{
    width: 240px;
    margin: 0 auto;
    text-align: center;
    font-size: 12px;
    color: #9DA7CC;
    margin-top: 16px;
  }
  .idCard{
    width: 82%;
    height: 180px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .idCard1{
    width: 82%;
    height: 180px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 19px;
  }
  .position{
    position: relative;
    width:100%;
    height:180px;
  }
  .fontImg{
    width: 100%;
    height: 180px;
    background: url('/static/images/IDreverses.png');
    background-size:100% 100%
  }
  .addImg{
    width:100%;
    height:180px;
    position: absolute;
    top:0;
    left:0;
    opacity: 0
  }
  .backImg{
    width: 100%;
    height: 180px;
    background: url('/static/images/IDFront.png');
    background-size:100% 100%
  }
  .check{
    padding-left: 9%;
  }
  .uploadBtn{
    width: 82%;
    margin: 0 auto;
    margin-top: 24px;
  }
}
</style>
