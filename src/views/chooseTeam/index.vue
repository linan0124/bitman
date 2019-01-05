<template>
<div class="content clearfix">
  <bm-back></bm-back>
  <div class="team fl clearfix" v-for="(item,index) in footballList" :key="index"  @click="getTeamId(item.id,item.team_url,item.team_name)" :class="{active:ind === item.id}">
    <img :src="item.team_url" alt="" class="teamLogo fl">
    <div class="country fl">{{item.team_name}}</div>
  </div>
  <div class="footer">
    <div class="chooseBtn" @click="setTeam()">
       <bm-button class="btn" text="确定"></bm-button>
    </div>
  </div>

</div>
</template>

<script>
import {getTeam} from 'api/champion'
export default {
  data () {
    return {
      footballList: {},
      ind: '',
      teamUrl: '',
      teamName: ''
    }
  },
  methods: {
    teamList () {
      getTeam().then(response => {
        var data = response.data
        if (data.code === '200') {
          this.footballList = data.data
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    getTeamId (id, teamUrl, teamName) {
      this.ind = id
      this.teamUrl = teamUrl
      this.teamName = teamName
    },
    setTeam () {
      this.$router.push({name: '冠军预测', query: {teamUrl: this.teamUrl, teamName: this.teamName}})
    }
  },
  mounted () {
    this.teamList()
  }
}
</script>

<style lang="scss" scoped>
  .content{
    background: #F4F6F9;
    width: 100%;
    position: relative;
    padding-bottom: 110px;
  }
  .team{
    width: 46%;
    height: 60px;
    background: #fff;
    margin-top: 10px;
    margin-left: 10px;
  }
   .team1{
    width: 46%;
    height: 60px;
    background: #3D97EF;
    margin-top: 10px;
    margin-left: 10px;
  }
  .teamLogo{
    display: block;
    width: 38px;
    height: 36px;
    margin-top: 12px;
    margin-left: 10px;
  }
  .country{
    font-size: 16px;
    color: #000000;
    line-height: 60px;
    font-weight: 700;
    margin-left: 10px;
  }
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: #fff;
}
.chooseBtn{
  width: 90%;
  height: 45px;
  background: #0081FF;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 20px;
}
 .active{
    background: #3D97EF !important;
  }
</style>
