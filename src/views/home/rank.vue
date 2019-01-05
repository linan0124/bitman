<template>
  <div class="rank">
    <!-- header -->
    <!-- <div class="rank__header">
      <img src="/static/images/rankWord.png" class="rankIntro">
      <i></i>
      <h2>算力排行</h2>
      <p>最新入驻居民：{{countUser}}人</p>
    </div> -->
    <!-- list -->
    <ul class="rank__list">
      <li class="rank__line">
        <div class="rank__sortData">
          <span @click="sortMethods('name')" :class="{active:sort === 'name'}">按算力排名</span>
          <span @click="sortMethods('diamond')" :class="{active:sort === 'diamond'}">按比特钻排名</span>
        </div>
      </li>
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="{isfront: index<3}"
      >
        <div class="rank__list__name">
          <i>{{ index + 1 }}</i>
          {{ item.mobile }}
        </div>
        <div class="rank__list__fire">
          <img src="/static/images/candy.png">
          {{ item.bm_stress }}
        </div>
        <div class="rank__list__mi">{{ item.totleNumber }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {stressRank, accountRank} from 'api/home'
export default {
  data () {
    return {
      list: [],
      sort: 'name',
      distinguish: 1
    }
  },
  methods: {
    getSortData (value) {
      accountRank({distinguish: value}).then(k => {
        if (Number(k.data.code) === 200) {
          this.list = k.data.data.RankList
        }
      })
    },
    sortMethods (value) {
      this.sort = value
      if (value === 'name') {
        this.getSortData(1)
      } else if (value === 'diamond') {
        this.getSortData(2)
      }
    }

  },
  mounted () {
    this.getSortData(1)
  }
}
</script>
<style lang="scss" scoped>
.rank{
  &__line{
    // width:100%;
  }
  &__sortData{
    height:25px;
    border: 2px solid #0081FF;
    border-radius: 4px;
    width:98%;
    margin: 0 auto;
    margin-top:10px;
    line-height:25px;
    span{
      display:inline-block;
      width:50%;
      float:left;
      text-align:center;
      color:#0081FF;
    }
    .active{
      background: #0081FF;
      color:#ffffff;
    }
  }
  &__header{
    text-align: center;
    padding: 15px 0;
    background-image: url('/static/images/rank.png');
    background-size: 100% 100%;
    color: #fff;
    i{
      display: block;
      width: 22px;
      height: 20px;
      margin: 0 auto;
      background-image: url('/static/images/list.png');
      background-size: 100% 100%;
    }
    h2{
      margin: 10px 0;
      font-size: 30px;
    }
    p{
      margin: 0;
      // color:#BADEFF;
      color:#ffffff;
    }
    .rankIntro{
      width:120px;
      height:50px;
      margin-bottom:8px;
    }
  }

  &__list{
    li{
      margin-bottom: 1px;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      display: flex;
      padding: 0 2%;
      justify-content: space-between;
      background: #fff;
      color: #8F8F8F;
    }

    &__name{
      min-width: 125px;
      flex:1;

      i{
        display: inline-block;
        height: 24px;
        width: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
        margin-right: 10px;
        background: #F4F6F9;
      }
    }

    &__fire{
      font-weight: bold;
      width: 70px;
      flex:1;
      text-align:center;
// &::before
      img{
        // content: '';
        display: inline-block;
        height: 20px;
        width: 20px;
        vertical-align: middle;
        margin-right: 8px;
        // background-image: url('/static/images/candy.png');
        // background-size: 100% 100%;
      }
    }

    &__mi{
      font-size: 12px;
      flex:1;

      &::before{
        content: '';
        display: inline-block;
        height: 20px;
        width: 13px;
        vertical-align: middle;
        margin-right: 8px;
        background-image: url('/static/images/diamond.png');
        background-size: cover;
      }
    }

  }
  .isfront i{
    // background-image: radial-gradient(58% 100%, #363D8A 7%, #313774 100%);
  }
}
</style>
