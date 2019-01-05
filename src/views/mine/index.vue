<template>
  <div class="contents">
    <div class="header">
      <img src="/static/images/BMIcon.png">
      <p>您目前拥有比特钻</p>
      <div class="mine-title">{{allBit}}</div>
      <div class="btn" @click="withDraw">提现</div>
    </div>
    <div class="mineList clearfix">
      <router-link tag="div" class="listItem" :to="{ name:'实名认证',query: { status: 'show' }}">
        <img src="/static/images/identity.png">
        <p>实名认证</p>
      </router-link>
      <router-link tag="div" class="listItem" :to="`/${item.url}`" v-for="(item,index) in listItem" :key="index">
        <img :src="`/static/images/${item.img}.png`">
        <p>{{item.title}}</p>
      </router-link>
    </div>
    <!-- <div class="dataList">
      <speedup-list :list="hashrateData" @verify='verifyInfo'></speedup-list>
    </div> -->
    <bm-footer></bm-footer>
        <!-- ,
        {url: 'problemfeedback',
          img: 'problem',
          title: '问题反馈'
        } -->
  </div>
</template>

<script>
import {getAccountIndex} from 'api/mine'
import BmFooter from 'components/footer'
import {getIsOpenAPI} from 'api/speedup'
export default {
  data () {
    return {
      allBit: '0',
      listItem: [
        // {url: 'gamerule',
        //   img: 'guide',
        //   title: '攻略'
        // },
        {url: 'myassets',
          img: 'account',
          title: '收支明细'
        },
        {url: 'aboutOur',
          img: 'about',
          title: '关于我们'
        },
        {url: 'historyList',
          img: 'history',
          title: '历史活动'
        },
        {url: 'setting',
          img: 'set',
          title: '设置'
        }
      ],
      hashrateData: [
        {title: '手机号验证',
          icon: 'speedPhone',
          success: false,
          openData: true
        },
        {title: '银行卡绑定',
          icon: 'speedCard',
          success: false,
          openData: true
        },
        {title: '车辆数据',
          icon: 'speedCar',
          success: false,
          openData: true
        },
        {title: '航旅信息',
          icon: 'speedAirport',
          success: false,
          openData: true
        }
      ]
    }
  },
  components: { BmFooter },
  methods: {
    withDraw () {
      this.$router.push('withDraw')
    },
    getMyAll () {
      getAccountIndex().then(response => {
        var data = response.data
        if (data.code === '200') {
          this.allBit = data.data.account
        } else if (data.code === '500') {

        }
      }).catch(errortip => {})
    },
    getIsOpen () {
      getIsOpenAPI().then(response => {
        var data = response.data
        if (Number(data.code) === 200) {
          this.infos = data.data
          localStorage.setItem('realNameStatus', this.infos.is_realName)
          // console.log(this.infos.is_realName)
          // is_realName
          let list = ['is_mobileAuth', 'is_Bankcard', 'is_carRenwal', 'is_airTravel']
          list.forEach((item, index) => {
            this.hashrateData[index].success = Number(data.data[item]) !== 0
          })
        }
      })
    },
    verifyInfo (index) {
      // 点击其他选项未实名时
      if (Number(this.infos.is_realName) === 0) {
        this.$msgbox(
          {
            head: '请先进行实名认证', showClose: true, btnName: '实名认证'
          },
          () => {
            this.$router.push('/realName')
          },
          () => {}
        )
      } else {
        // 已实名时，点击其他项的操作
        if (Number(this.infos.is_mobileAuth) === 0 && index === 0) {
          this.$router.push('/verifyPhone')
        }
        if (Number(this.infos.is_Bankcard) === 0 && index === 1) {
          this.$router.push('/verifyBankcard')
        }
        if (Number(this.infos.is_carRenwal) === 0 && index === 2) {
          this.$router.push('/verifyCarInfo')
        }
        if (Number(this.infos.is_airTravel) === 0 && index === 3) {
          this.$router.push('/verifyAirportInfo')
        }
      }
    }
  },
  mounted () {
    this.getIsOpen()
    this.getMyAll()
  }
}
</script>

<style lang="scss" scoped>
.contents{
  padding-bottom: 60px;
}
.header{
  height:215px;
  background-image: -moz-linear-gradient(bottom, #355c94 0%, #430B84 100%);
  background-image: -o-linear-gradient(bottom, #355c94 0%, #430B84 100%);
  background-image: linear-gradient(bottom, #355c94 0%, #430B84 100%);
  background-image: -webkit-linear-gradient(bottom, #355c94 0%, #430B84 100%);
  text-align:center;
  padding-top:40px;
  position: relative;
  img {
    width:45px;
    height:68px;
  }
  p{
    color:#ffffff;
  }
  .mine-title{
    font-size: 32px;
    color: #0081FF;
    height:30px;
    font-weight:bold;
  }
}
.btn{
  width:95%;
  height:50px;
  background: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(142,142,142,0.50);
  border-radius: 4px;
  color: #0081FF;
  text-align:center;
  line-height:50px;
  position:absolute;
  left:2.5%;
  bottom:-25px;
}
.mineList{
  min-height:240px;
  padding-top:60px;
  background:#ffffff;
}
.listItem{
  width:30%;
  height:110px;
  margin-left:2.5%;
  margin-top:10px;
  background: #FFFFFF;
  border-radius: 8px;
  text-align:center;
  float:left;
  color: #8F8F8F;
  img{
    width:50px;
    height:50px;
  }
}
.dataList{
  height:300px;
}
</style>
