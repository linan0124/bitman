 <template>
   <transition name="msgbox-fade">

     <div class="Popup">
       <div class="popupcon">
           <div class="con_clos">
             <div class="createContract_contents">
               <div class="insetTip">
                <slot></slot>
              </div>
               <div class="tip">{{ messages }}</div>
             </div>
         </div>
       </div>
     </div>

   </transition>
 </template>

<script>
export default {
  name: 'hint',
  data () {
    return {
      // value: false
    }
  },
  methods: {

  },
  props: {
    messages: String
    // status: {
    //   type: Boolean,
    //   default: false
    // }
  },
  mounted () {

  }
}
</script>

 <style lang="scss" scoped>
 .tip{
    //  color:#fff;
    color:#8F8F8F;
     line-height:24px;
     text-align:center;
     margin-top:20px;
     margin-bottom: 20px;
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
     border-radius: 8px;
    padding-top:20px;
    min-height:90px;
     position: absolute;
     left: 50%;
     top: 50%;
     width: 200px;
     margin-left: -100px;
     margin-top: -120px;
     overflow: hidden;
     opacity: 0.9;
    background: #FFFFFF;

   }
 [class*=" el-icon-"], [class^=el-icon-] {
   float: right;
   cursor: pointer;
 }
 .insetTip{
   text-align:center;
   width:100%;
 }
 .close {
   margin-right: 6px;
   margin-top: 6px;
   font-size:14px;

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
