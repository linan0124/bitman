<template>
  <div class="contents">
    <bm-back></bm-back>
      <scroller
        :on-infinite="infinite">
         <div style="height: 40px;"></div>
        <div class="listData clearfix" v-for="(item, index) in assetsList" :key="index">
          <div class="fl listTime">
            <span>{{item.type}}</span>
            <span>{{item.date_time}}</span>
          </div>
          <div class="fr listNum clearfix">
            <img src="static/images/smallBit.png" alt="" class="smallBit fl">
            <div class="fl" v-if="item.number<0">{{item.number}}</div>
            <div class="fl" v-else>+{{item.number}}</div>
          </div>
        </div>

      </scroller>

  </div>
</template>

<script>
import {getAssetsList} from 'api/myassets'
export default {
  data () {
    return {
      assetsList: [],
      data: {
        pageNum: 1,
        numPerPage: 10
      }
    }
  },
  methods: {
    getAssets () {
      return new Promise((resolve, reject) => {
        getAssetsList(this.data).then(response => {
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
      this.data.pageNum++
      setTimeout(() => {
        this.getAssets().then(k => {
          done()
        }).catch(k => {
          done(true)
        })
      }, 800)
    }

  },
  mounted () {
    this.getAssets()
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
    // padding: 15px 0 0 0;
    // margin: 0 5% 0 5%;
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
    min-width:100px;
    font-size: 14px;
    color: #8F8F8F;
    line-height:42px;
  }
  .smallBit{
    display: block;
    width: 15px;
    height: 22px;
    margin-top: 10px;
    margin-right: 7px;
  }
  .listNote{
    font-size: 12px;
    color: #556CB5;
    text-align:center;
    line-height:60px;
  }
</style>
