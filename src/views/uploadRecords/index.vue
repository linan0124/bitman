<template>
  <div class="contents">
    <bm-back></bm-back>
      <scroller
        :on-infinite="infinite">
         <div style="height: 40px;"></div>
        <div class="listData clearfix" v-for="(item, index) in assetsList" :key="index">
          <div class="fl listTime">
            <span>{{item.typeView}}</span>
            <span>{{item.createTimeStr}}</span>
          </div>
          <div class="fr listNum clearfix" v-if="Number(item.status) === 0"><div class="fl">{{item.statusView}}</div>...</div>
          <div class="fr listNum clearfix" @click="dataDetails(item.id)" v-else><div class="fl">{{item.statusView}}</div><img src="static/images/moreMsg.png" alt="" class="moreMsg fl"></div>
        </div>

      </scroller>

  </div>
</template>

<script>
import {getFileListByPid} from 'api/changeData'
export default {
  data () {
    return {
      assetsList: [],
      pageNum: 1,
      numPerPage: 10
    }
  },
  methods: {
    uploadList () {
      return new Promise((resolve, reject) => {
        getFileListByPid({pageNum: this.pageNum, numPerPage: this.numPerPage}).then(response => {
          var data = response.data
          console.log(data.mapData.userFileList)
          if (Number(data.code) === 200) {
            if (data.mapData.userFileList.length) {
              resolve()
              this.assetsList = [...this.assetsList, ...data.mapData.userFileList]
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
        this.uploadList().then(k => {
          done()
        }).catch(k => {
          done(true)
        })
      }, 800)
    },
    dataDetails (id) {
      this.$router.push({path: '/trainTicket', query: {'typeId': id}})
    }
  },
  mounted () {
    this.uploadList()
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
    font-size: 14px;
    color: #8F8F8F;
    line-height:42px;
  }
  .moreMsg{
    display: block;
    width: 8px;
    height: 15px;
    margin-top: 13px;
    margin-left: 7px;
    // margin-right: 10px;
  }
  .listNote{
    font-size: 12px;
    color: #556CB5;
    text-align:center;
    line-height:60px;
  }
</style>
