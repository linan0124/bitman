 <template>
   <transition name="msgbox-fade">
     <div class="Popup" v-if="value">
     <!-- @mouseenter="clearTimer"
      @mouseleave="startTimer" -->
       <div class="popupcon">
           <div class="con_clos">
             <div class="createContract_contents">
                <div class="title">{{ message }}</div>
                <div class="block clearfix">
                  <div class="fl hashrate clearfix">
                    <div class="addhashrate fr">+{{candy}}</div>
                    <img src="static/images/candy.png" alt="" class="candy fr">
                  </div>
                  <div class="fr coin clearfix">
                    <img src="static/images/diamond.png" alt="" class="diamond fl">
                    <div class="addCoin fl">+{{diamond}}</div>
                  </div>
                </div>
             </div>
         </div>
       </div>
     </div>
   </transition>
 </template>

<script>
export default {
  name: 'tipBox',
  data () {
    return {
      value: false,
      closed: false,
      onClose: null,
      duration: 2000
    }
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        this.value = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  methods: {
    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    // 销毁弹框元素方法
    destroyElement () {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    clearTimer () {
      clearTimeout(this.timer)
    },

    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    }
  },
  created () {
  },
  mounted () {
    this.startTimer()
  },
  destroyed () {}
}
</script>

 <style lang="scss" scoped>
  .block{
    margin-top: 10px;
    margin-bottom:10px;
    .hashrate{
      width: 41%;
      .candy{
        width: 24px;
        height: 24px;
        margin-right: 7px;
      }
      .addhashrate{
        font-size: 14px;
        color: #1F1F1F;
        line-height: 24px;
      }
    }
    .coin{
      width: 41%;
      .diamond{
        width: 16px;
        height: 23px;
        margin-right: 7px;
      }
      .addCoin{
        font-size: 14px;
        color: #1F1F1F;
        line-height: 24px
      }
    }
  }
 .title{
  color:#8F8F8F;
    line-height:24px;
    text-align:center;
    margin-top:10px;
    margin-bottom: 30px;
    font-weight: normal;
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
     top: 50%;
     width: 210px;
     margin-left: -105px;
     margin-top: -120px;
     overflow: hidden;
     padding-bottom: 10px;
     opacity: 0.9;
      background: #FFFFFF;
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
