 <template>
  <div class="content">
    <transition name="msgbox-fade">

      <div class="Popup" v-if="value" @click="btnFn">
        <div class="popupcon">
          <div class="pupContent">
            <div class="icon">
              <img src="/static/images/successTip.png">
            </div>
            <div class="showNumber">
              <div class="power">
                <img src="/static/images/candy.png" class="powerIcon">
                <span>+{{powerNumber}}</span>
              </div>
              <div class="award">
                <img src="/static/images/BMIcon.png" class="awardIcon">
                <span>+{{awardNumber}}</span>
              </div>
            </div>
            <!-- <bm-button class="affirmBtn" @click="btnFn"></bm-button> -->
          </div>
        </div>
      </div>
    </transition>
  </div>
 </template>

<script>
export default {
  name: 'NoteBox',
  data () {
    return {
      value: true
    }
  },
  props: {
    powerNumber: String,
    awardNumber: String
  },
  methods: {
    btnFn () {
      this.value = false
      this.$router.go(-1)
    }
  }
}
</script>

 <style lang="scss" scoped>
  .icon{
    height:100px;
    text-align: center;
    margin-bottom:20px;
    img{
      width:130px;
      height:90px;
    }
  }
  h2{
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    font-weight:normal;
    line-height:10px;
  }
  p{
    font-size: 14px;
    color: #9DA7CC;
    text-align:center;
  }
 .Popup {
   width: 100%;
   height: 100%;
   background: rgba(36,40,81,0.5);
    position: fixed;
    left: 0;
     top: 0;
     z-index: 1000;
   }
   .popupcon {
     border-radius: 4px;
     position: absolute;
     left: 50%;
     top: 40%;
     width: 300px;
    background: rgba(255,255,255,0.9);
     margin-left: -150px;
     margin-top: -120px;
     overflow: hidden;
     padding-bottom: 15px;
   }
   .pupContent {
     margin:30px 20px 20px 20px
   }
   .showNumber {
     height:35px;
     margin:0 10px 30px 10px;
     span {
       display:inline-block;
       font-size: 25px;
       margin-right:5px;
       color:#1F1F1F;
     }
     .awardIcon {
       width:16px;
       height:25px;
       display:inline-block;
     }
     .powerIcon{
        height:22px;
        width:20px;
        display:inline-block;
      }
   }
   .power {
      width:50%;
      float:left;
    }
   .award {
      width:50%;
      float:right;
      text-align:right;
    }
 [class*=" el-icon-"], [class^=el-icon-] {
   float: right;
   cursor: pointer;
 }
 .close {
   margin-right: 6px;
   margin-top: 6px;
   font-size:14px;

 }
 .con_clos {

 }
 .btn {
   padding: 20px 10% 0;
 }
 .affirmBtn{

   &:nth-child(1){
     margin-bottom: 20px;
   }
   &:nth-child(2){
     background-image: linear-gradient(-180deg, #EAF5FF 0%, #C5E2FF 100%);
   }
 }

 .popup__tip{
  text-align: center;
  line-height: 50px;
  // height: 50px;
 }

.msgbox-fade-enter-active {
    animation: msgbox-fade-in .3s
}

.msgbox-fade-leave-active {
    animation: msgbox-fade-out .3s
}

@keyframes msgbox-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
}

@keyframes msgbox-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
}
 </style>
