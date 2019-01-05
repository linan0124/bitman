<template>
  <div>
    <div class="header">
      <div class="candyShow">
        <div class="header-arrow">
          <a class="arrow" href="javascript:history.go(-1)"></a>
          <router-link class="routerLink" tag="div" to="/powerList">算力记录</router-link>
        </div>
        <img src="/static/images/candyB.png">
        <p>您目前拥有算力</p>
        <h2>{{dataList.bm_stress}}</h2>
      </div>
      <div class="speedList">
        <ul>
          <li @click="changeList(index)" :class="{active:item.blueStatus }"
          v-for="(item,index) in proList" :key='index'>
            {{item.title}}
            <span></span>
          </li>
        </ul>
      </div>
      <speedup-list v-show=proList[0].blueStatus :list="basicData" @verify='verifyInfo'></speedup-list>
      <speedup-list v-show=proList[1].blueStatus :list="consumptionData"></speedup-list>
      <speedup-list v-show=proList[2].blueStatus :list="financialCredit"></speedup-list>
      <speedup-list v-show=proList[3].blueStatus :list="entertainmentData"></speedup-list>
      <speedup-list v-show=proList[4].blueStatus :list="transportationData"></speedup-list>
    </div>
  </div>
</template>

<script>
import {stressRank} from 'api/home'
import {getIsOpenAPI} from 'api/speedup'
import { getToken } from 'utils/auth' // 验权
export default {
  data () {
    return {
      dataList: {},
      infos: {},
      proList: [
        {title: '基础数据',
          blueStatus: true
        },
        {title: '消费数据',
          blueStatus: false
        },
        {title: '金融征信',
          blueStatus: false
        },
        {title: '文化娱乐',
          blueStatus: false
        },
        {title: '交通出行',
          blueStatus: false
        }
      ],
      basicData: [
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
      ],
      consumptionData: [
        {title: '支付宝/淘宝',
          openData: false
        },
        {title: '京东',
          openData: false
        },
        {title: '携程',
          openData: false
        },
        {title: '12306',
          openData: false
        },
        {title: '滴滴出行',
          openData: false
        }
      ],
      financialCredit: [
        {title: '银行征信',
          openData: false
        },
        {title: '芝麻信用',
          openData: false
        },
        {title: '腾讯信用',
          openData: false
        }
      ],
      entertainmentData: [
        {title: '猫眼电影',
          openData: false
        },
        {title: '豆瓣',
          openData: false
        },
        {title: '网易音乐',
          openData: false
        },
        {title: '爱奇艺',
          openData: false
        },
        {title: '优酷',
          openData: false
        },
        {title: '陌陌',
          openData: false
        },
        {title: 'keep',
          openData: false
        },
        {title: '王者荣耀',
          openData: false
        }
      ],
      transportationData: [
        {title: '百度地图',
          openData: false
        },
        {title: '高德',
          openData: false
        },
        {title: '腾讯地图',
          openData: false
        },
        {title: '摩拜',
          openData: false
        },
        {title: 'ofo',
          openData: false
        },
        {title: 'bluegogo',
          openData: false
        }
      ]
    }
  },
  methods: {
    changeList (index) {
      for (let i = 0; i < this.proList.length; i++) {
        this.proList[i].blueStatus = false
      }
      this.proList[index].blueStatus = true
    },
    getData () {
      stressRank().then(k => {
        if (Number(k.data.code) === 200) {
          this.dataList = k.data.data.dataInfo
          this.list = k.data.data.stressRankList
        }
      })
    },
    getIsOpen () {
      getIsOpenAPI().then(response => {
        var data = response.data
        if (Number(data.code) === 200) {
          this.infos = data.data
          // is_realName
          let list = ['is_mobileAuth', 'is_Bankcard', 'is_carRenwal', 'is_airTravel']
          list.forEach((item, index) => {
            this.basicData[index].success = Number(data.data[item]) !== 0
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
    this.getData()
    this.getIsOpen()
  }
}
</script>

<style lang="scss" scoped>
  .contents{
    padding:0 5%;
  }
  .header{
    margin:0 auto;
    text-align:center;
  }
  .candyShow{
    height:250px;
    padding-top:20px;
    text-align:center;
    background-image: -moz-linear-gradient(bottom, #355c94 0%, #430B84 100%);
    background-image: -o-linear-gradient(bottom, #355c94 0%, #430B84 100%);
    background-image: linear-gradient(bottom, #355c94 0%, #430B84 100%);
    background-image: -webkit-linear-gradient(bottom, #355c94 0%, #430B84 100%);
    img {
      height:60px;
      width:60px;
    }
    p{
      font-size: 14px;
      color: #FFFFFF;
    }
    h2{
      font-size: 32px;
      color: #FFEE48;
      font-weight:bold;
      line-height:10px;
    }
    .header-arrow{
       height:37px;
       margin:0 5%;
       color:#ffffff;
    }
    .arrow{
      width:12px;
      height:37px;
      display:block;
      background:url('/static/images/back.png') no-repeat;
      background-size:100%;
      float:left;
    }
    .routerLink{
      width:60px;
      float:right;
    }
  }
  .speedList ul{
    height:50px;
    width:100%;
    overflow-y:hidden;
    overflow-x:auto;
    white-space:nowrap;
    background:#ffffff;
    // margin-bottom:10px;
  }
  .speedList li{
    width:100px;
    height:50px;
    line-height:50px;
    display:inline-block;
    text-align:center;
    cursor: pointer;
  }
  .speedList ul::-webkit-scrollbar {
    display: none;
  }
  .active{
    color: #0081FF;
    position: relative;
    span{
      display:inline-block;
      position: absolute;
      width:30px;
      height:4px;
      background: #0081FF;
      border-radius: 2px;
      bottom:0;
      left:35px;
    }
  }
  .showData{
    padding-bottom:30px;
  }
</style>
