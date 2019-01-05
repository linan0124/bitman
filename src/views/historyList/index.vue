<template>
  <div class="contents">
      <div class="champion">
        <div class="header-arrow" @click="goBack"></div>
      </div>
       <scroller
        :on-infinite="infinite">
         <div style="height: 40px;"></div>
        <div class="listData clearfix" v-for="(item, index) in assetsList" :key="index">
          <div class="fl listTime">
            <span><div class="game fl">{{footballGame[index]}}</div>{{item.firstTeam}} - {{item.secondTeam}}</span>
            <span>{{item.overTime}}</span>
          </div>
          <router-link
            tag="div"
            :to="{name: '活动详情',query: {id: item.id}}"
            class="fr listNum clearfix">
            <div class="fl betLine blue">已结束</div>
             <div class="moreMsg fr"></div>
          </router-link>
        </div>
      </scroller>

  </div>
</template>

<script>
import {getWorldcup} from 'api/worldcup'
import judgeClient from 'utils/ifclient'
export default {
  data () {
    return {
      assetsList: [],
      pageNum: 1,
      numPerPage: 10,
      one: 2,
      footballGame: [],
      dataList: {}
    }
  },
  methods: {
    guessList () {
      return new Promise((resolve, reject) => {
        getWorldcup({pageNum: this.pageNum, numPerPage: this.numPerPage, status: 3}).then(response => {
          var data = response.data
          if (Number(data.code) === 200) {
            if (data.data.length) {
              resolve()
              this.assetsList = [...this.assetsList, ...data.data]
              this.dataList = data.data
              for (var i = 0; i < data.data.length; i++) {
                this.footballGame.push(this.dataList[i].activity_name.split('_')[0])
              }
            } else {
              reject(new Error('没有更多数据！'))
            }
          }
        }).catch(errortip => {})
      })
    },
    infinite (done) {
      this.pageNum++
      setTimeout(() => {
        this.guessList().then(k => {
          done()
        }).catch(k => {
          done(true)
        })
      }, 800)
    },
    goBack () {
      if (judgeClient) {
        this.$router.go(-1)
        // this.$router.push('/historyList')
      } else {
        ClientObject.goBack()
      }
    }
    // dataDetails (id) {
    //   this.$router.push({path: '/result', query: {'id': id}})
    // }
  },
  mounted () {
    this.guessList()
  }
}
</script>

<style lang="scss" scoped>
  .contents{
    width: 100%;
  }
  .champion{
    height: 24px;
    padding: 10px 5%;
    position: relative;
    z-index: 1000;
    background: #532E95;
  }
  .header-arrow{
    width:12px;
    height:21px;
    display:block;
    background:url('/static/images/back.png') no-repeat;
    background-size:100%;
    float:left;
  }
  .incomeList{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    border-top:1px solid #1B1F46;
  }
  .listData{
    width: 90%;
    height:45px;
    padding:10px 5% 5px 5%;
    border-bottom:1px solid#f4f6f9;
    background: #fff;
  }
  .listTime{
    width:70%;
    span{
      display:block;
      line-height:22px;
    }
    span:nth-child(1){
      font-size:14px;
      color:#000000;
    }
    span:nth-child(2){
      font-size: 14px;
      color: #8F8F8F;
    }
  }
  .listNum{
    width: 30%;
    font-size: 14px;
    color: #8F8F8F;
    line-height:42px;
  }
  .moreMsg{
    width: 9px;
    height: 15px;
    margin-top: 13px;
    margin-left: 7px;
    background: url(/static/images/moreMsg.png) no-repeat;
    background-size: cover;
    // margin-right: 10px;
  }
  .listNote{
    font-size: 12px;
    color: #556CB5;
    text-align:center;
    line-height:60px;
  }
  .betLine{
    width:80%;
    height: 60px;
    text-align: right;
    span{
      display:block;
      line-height:22px;
    }
    .spa1{
      font-size:14px;
      color:#000000;
    }
    .spa2{
      font-size: 14px;
      color: #8F8F8F;
    }
  }
  .blue{
      color:#0081FF;
    }
    .game{
      width: 60px;
      height: 18px;
      background: #F4F6F9;
      border-radius: 8px;
      margin-right: 10px;
      margin-top: 2px;
      font-size: 10px;
      line-height: 18px;
      text-align: center;
    }
</style>
