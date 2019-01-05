<template>
  <div class="contents">
    <bm-back></bm-back>
    <div class="record">
      <div class="recordNum">
        <div class="one">一级邀请奖励</div>
        <div class="two">{{invitionInfo.number}}<img class="icon" src="/static/images/diamond.png"></div>
      </div>
      <div class="recordNum">
        <div class="secondShare">
          <div class="one">二级邀请奖励</div>
          <div class="two">{{invitionInfo.secendInviteNumber}}<img class="icon" src="/static/images/diamond.png"></div>
        </div>
      </div>
    </div>
    <div class="oneInfo">
      <div class="shareRule">
        <div class="rule">邀请奖励规则：
          <div @click="showInfos('rules')" class="moreRule">
            展开
          </div>
        </div>
        <ul class="rules">
          <li><span></span>一级邀请好友单次奖励5算力，前10名有效；</li>
          <li><span></span>一级邀请好友单次奖励100钻，前60名有效；</li>
          <li><span></span>二级邀请好友单次奖励10钻，前3000名有效。</li>
        </ul>
      </div>
      <p class="topSpace">一级邀请好友（{{invitionInfo.people}}）</p>
    </div>
    <div>
      <div class="incomeList">
        <scroller
          :on-infinite="infinite"
          ref="my_scroller">
          <!-- v-if="powerList.length >= 20"  -->
          <div id="spaceHeight"></div>
          <div v-if="item.mobile" class="listData" v-for="(item, index) in powerList" :key="index">
            <div class="fl listTime">
              <span>{{item.mobile}}</span>
              <span>{{item.registTime}}</span>
            </div>
            <div class="fr">
              <div class="fl listPower mr" v-if="Number(item.stress) !== 0">+{{item.stress}}<img src="/static/images/candy.png" alt="" class="fireLogo"></div>
              <div class="fr listNum" v-if="Number(item.number) !== 0">+{{item.number}}<img src="/static/images/diamond.png" alt="" class="bitMe" style="float:left"></div>
            </div>
          </div>
          <!-- <div class="noData" v-if="Number(powerList.length) === 0">没有更多数据！</div> -->
        </scroller>
      </div>

    </div>
  </div>
</template>

<script>
import {getInviteList} from 'api/Invitationlist'
// import invitationList from './list'
import {invitedStatistics} from 'api/share'
export default {
  data () {
    return {
      powerList: [],
      data: {
        pageNum: 1,
        numPerPage: 10
      },
      invitionInfo: {},
      ruleStatus: false
    }
  },
  // components: {invitationList},
  methods: {
    getPower () {
      return new Promise((resolve, reject) => {
        getInviteList({pageNum: this.data.pageNum, numPerPage: this.data.numPerPage}).then(response => {
          var data = response.data
          if (Number(data.code) === 200) {
            if (data.data.length) {
              resolve()
              this.powerList = [...this.powerList, ...data.data]
            } else {
              reject(new Error('没有更多数据！'))
            }
          }
        }).catch(errortip => {})
      })
    },
    infinite (done) {
      this.data.pageNum++
      setTimeout(() => {
        this.getPower().then(k => {
          done()
        }).catch(k => {
          done(true)
        })
      }, 800)
    },
    getInvitionInfo () {
      invitedStatistics().then(response => {
        this.invitionInfo = response.data.data
      }).catch(errortip => {})
    },
    showRule () {
      this.ruleStatus = !this.ruleStatus
    },
    showInfos (node) {
      if ($('.' + node).css('display') === 'none') {
        $('.' + node).velocity('slideDown', {duration: 100})
        $('.moreRule').html('收起')
      } else {
        $('.moreRule').html('展开')
        $('.' + node).velocity('slideUp', {duration: 100})
      }
    }
  },
  mounted () {
    this.getPower()
    this.getInvitionInfo()
  }
}
</script>

<style lang="scss" scoped>
  .incomeList{

  }
  #spaceHeight{
    height:230px;
  }
  .rules{
    display:none;
  }
  .shareRule{
    color: #8F8F8F;
    font-size:14px;
    text-align:left;
    // padding-left:5%;
    background:#f4f6f9;
    padding-top:10px;
    li{
      line-height:24px;
      padding-left:5%;
    }
    span{
      display:inline-block;
      width:5px;
      height:5px;
      border-radius: 50%;
      background:#8f8f8f;
      margin-right:8px;
    }
    .rule{
      height:30px;
      padding-right:5%;
      line-height:30px;
    }
    .moreRule{
      float:right;
      height:30px;
      // padding-top:4px;
      color:#0081ff;
    }
  }
  .contents{
    margin-bottom:50px;
    box-sizing: border-box;
    // background:#ffffff;
    border-radius: 10px;
  }
  ._v-container{
    position: static;
  }
  ._v-container>._v-content>.loading-layer{
    background:#ffffff;
  }
    .listData{
    height:48px;
    padding:15px 0 0 5%;
    border-top:1px solid #f4f6f9;
    background:#ffffff;
  }
  .record{
    padding:8px 0;
    height:60px;
    background:#ffffff;
    position:relative;
    z-index:1000;
    .recordNum{
      width:50%;
      float:left;
      height:60px;
      color: #8F8F8F;
      text-align: center;
    }
    .recordNum:nth-child(2){
      text-align: center;
    }
    .secondShare{
      border-left:1px solid #E6E6E6;
      height:100%;
    }
    .one{
      padding-top:8px;
    }
    .two{
      font-size: 18px;
      color: #000000;
      padding-top:10px;
      font-weight:bold;
    }
    .icon{
      width:12px;
      height:18px;
      margin-left:6px;
    }
  }
  .oneInfo{
    padding-left:5%;
    color: #8F8F8F;
    font-size:14px;
    // padding-top:25px;
    padding-bottom:10px;
    background:#f4f6f9;
    position:relative;
    z-index:1000;
    .topSpace{
      padding-top:15px;
    }
  }
  .listTime{
    width:50%;
    span{
      display:block;
      line-height:20px;
    }
    span:nth-child(1){
      font-size: 14px;
      color: #140574;;
    }
    span:nth-child(2){
      font-size: 12px;
      color: #8F8F8F;
    }
  }
  .listNum{
    width:80px;
    font-size: 14px;
    color: #170876;;
    line-height:35px;
  }
  .listPower{
    width:70px;
    font-size: 14px;
    color: #170876;;
    line-height:35px;
  }
  .listNote{
    font-size: 12px;
    color: #556CB5;
    text-align:center;
    line-height:60px;
  }
  .fireLogo{
    display: block;
    width: 22px;
    height: 22px;
    // margin-left: 10px;
    float: left;
    margin-right:8px;
    margin-top: 5px;
  }
  .bitMe{
    display: block;
    width: 14px;
    height: 20px;
    margin-right: 8px;
    float: right;
    margin-top: 5px;
  }
  .noData{
    line-height:40px;
    text-align:center;
  }
</style>
