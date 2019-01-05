<template>
  <div class="contents">
    <bm-back></bm-back>
       <scroller
        :on-infinite="infinite">
         <div style="height: 40px;"></div>
        <div class="listData clearfix" v-for="(item, index) in assetsList" :key="index">
          <div class="fl listTime">
            <!-- <span>{{item.firstTeam}} - {{item.secondTeam}}</span> -->
            <span>{{item.name}}</span>
            <span>{{item.overTime}}</span>
          </div>

          <router-link
            tag="div"
            :to="{name: '奖金详情',query: {id: item.id}}"
            class="fr listNum clearfix">
            <div class="fl betLine blue">+{{item.sumAwardedMoney}}钻</div>
             <div class="moreMsg fr"></div>
          </router-link>
        </div>
      </scroller>

  </div>
</template>

<script>
import {getAwardList} from 'api/worldcup'
export default {
  data () {
    return {
      assetsList: [],
      pageNum: 1,
      numPerPage: 10,
      one: 2
    }
  },
  methods: {
    guessList () {
      return new Promise((resolve, reject) => {
        getAwardList({pageNum: this.pageNum, numPerPage: this.numPerPage}).then(response => {
          var data = response.data
          if (Number(data.code) === 200) {
            if (data.data.length) {
              resolve()
              this.assetsList = [...this.assetsList, ...data.data]
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
    height:45px;
    padding:10px 5% 5px 5%;
    border-bottom:1px solid#f4f6f9;
    background: #fff;
  }
  .listTime{
    width:50%;
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
    width: 50%;
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
    width:90%;
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
</style>
