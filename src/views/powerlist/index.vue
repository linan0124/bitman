<template>
  <div class="contents">
    <bm-back></bm-back>
    <!-- <div class="incomeList"> -->
    <scroller
      :on-infinite="infinite"
      ref="my_scroller">
       <div style="height: 40px;"></div>
      <div class="listData" v-for="(item, index) in powerList" :key="index">
        <div class="fl listTime">
          <span>{{item.remarks}}</span>
          <span>{{item.stress_datetime}}</span>
        </div>
        <div class="fr listNum"><img src="static/images/candy.png" alt="" class="fireLogo">+{{item.bm_stress}}</div>

      </div>
    </scroller>

    <!-- </div> -->
  </div>
</template>

<script>
import {getPowerList} from 'api/powerlist'
export default {
  data () {
    return {
      powerList: [],
      data: {
        pageNum: 1,
        numPerPage: 10
      }
    }
  },
  methods: {
    getPower () {
      return new Promise((resolve, reject) => {
        getPowerList(this.data).then(response => {
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
    }

  },
  mounted () {
    this.getPower()
  }
}
</script>

<style lang="scss" scoped>
  .contents{
    padding-bottom:50px;
    height: 100%;
    box-sizing: border-box;
    background:#ffffff;
  }
  .listData{
    height:48px;
    padding:15px 5% 0 5%;
    border-top:1px solid #f4f6f9;
    background:#ffffff;
  }
  .listTime{
    width:50%;
    span{
      display:block;
      line-height:20px;
    }
    span:nth-child(1){
      font-size: 14px;
      color: #000000;
    }
    span:nth-child(2){
      font-size: 14px;
      color: #8F8F8F;
    }
  }
  .listNum{
    width:90px;
    font-size: 20px;
    color: #008EFF;
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
    margin-left: 10px;
    float: left;
    margin-right:8px;
    margin-top: 7px;
  }
</style>
