<template>
  <div id="gameRule">
    <bm-back class="back"></bm-back>

    <div class="whatBm" v-for="(item, index) in data" :key="index">
      <div class="bmTitle">{{item.title}}</div>
      <div class="show">
        <div class="time">{{item.time}}</div>
        <!-- <div class="moreShow" @click="showContent(index)">展开</div> -->
      </div>
      <div class="panrent">
        <div class="bmTxt" v-for="(citem, ind) in item.list" :key="ind">{{citem}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {title: '比特钻超过48小时不领取就会消失哦',
          time: '2018-2-23 12:20',
          list: ['比特钻是根据算力定期生成，超过48小时不领取就会消失哦，请大家及时收取～']
        },
        {title: '二级邀请奖励开启，每位用户再获10钻奖励，之前邀请的用户将获得比特钻补发。',
          time: '2018-5-17 12:00',
          list: ['二级邀请规则2018年5月17日正式开始启动，如下：',
            '1.一级邀请好友单次奖励50算力，前10名有效；',
            '2.一级邀请好友单次奖励100钻，前60名有效；',
            '3.二级邀请好友单次奖励10钻，前3000名有效。',
            '新规则对老用户同样有效，5月17日之前的邀请将会获得补发，请知悉。']
        },
        {title: '比特钻提现于2018年6月15号上线啦，可以提币到钱包哦',
          time: '2018-6-15 16:00',
          list: ['提现规则',
            '1.比特钻可按1:1兑换成ERC－20的Token “DACO”，即比特曼数据币Data Coin；',
            '2.DACO将由平台方统一空投至您所绑定的ETH钱包地址；',
            '3.每个用户仅能绑定一次ETH地址，如有误操作或需要变更，请联系微信小助手，微信账号：BitMan-one；',
            '4.可随时发起提现申请，单次最低提取额10000比特钻，每笔提取手续费为500比特钻；',
            '5.平台会汇总所有的提取，每月最后一个工作日前进行一次DACO空投。']
        },
        {title: 'V1.1.3版本优化内容如下：',
          time: ' 2018-06-26',
          list: ['首页-排行榜 排序由注册时间生序排序，按算力及比特钻进行排序；',
            '首页-欧冠猜猜猜活动下架；',
            '我的-历史活动中下注记录增加分页功能；']
        }
      ]
    }
  },
  methods: {
    showContent (index) {
      let em = $('.panrent:eq(' + index + ')')
      let ico = $('.more:eq(' + index + ')')
      // let show = $('.moreShow:eq(' + index + ')')
      if (em.css('display') === 'none') {
        em.velocity('slideDown', {duration: 200})
        // show.html('收起')
        ico.velocity({rotateZ: '90deg'}, {duration: 200})
      } else {
        ico.velocity({rotateZ: '0deg'}, {duration: 200})
        // show.html('展开')
        em.velocity('slideUp', {duration: 200})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#gameRule{
  width: 100%;
  padding-bottom: 70px;
}
.show{
  height:30px;
  line-height:30px;
  .time{
    color:#8F8F8F;
    float:left;
    font-size:12px;
  }
  .moreShow{
    float:right;
    color: #0081FF;
  }
}
.whatBm{
  width: 90%;
  background: #fff;
  margin-bottom: 5px;
  margin:0 auto;
  padding:0 3%;
  margin-top:10px;
  border-radius: 5px;

  .bmTitle{
    width: 100%;
    font-size: 14px;
    color: #000;
    padding-top:10px;
    min-height: 30px;
    line-height: 25px;

    .more{
      float: left;
      height: 15px;
      width: 6px;
      background-image: url('/static/images/more.png');
      background-size: cover;
      margin: 18px 0 0 -18px;
    }
  }
  .panrent{
    padding-bottom: 20px;
    // padding-top: 10px;
    // border-top: 1px solid #E6E6E6;
    // display: none;
  }
  .bmTxt{
    font-size: 12px;
    color: #8F8F8F;
    line-height: 22px;
    padding-right: 20px;
    // margin-bottom: 1em;
  }
  .bmTxt2{
    padding-top: 18px;
    color: #787DA5;
  }
  .mt20{
    margin-top: 20px;
  }
  .BitManLogo{
    display: block;
    margin: 0 auto;
    margin-top: 30px;
    width: 160px;
    height: 37px;
  }
  .gameBitm{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    width: 36px;
    height: 73px;
  }
  .gameFire{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    width: 63px;
    height: 81px;
  }
  .gameSpeed{
    display: block;
    margin: 0 auto;
    margin-top: 25px;
    width: 65px;
    height: 65px;
  }

}
.pb{
    padding-bottom: 38px;
  }
  .back{
    // margin-bottom: 36px;
  }
.gameId{
  display: block;
    margin: 0 auto;
    margin-top: 25px;
    width: 80px;
    height: 54px;
}
</style>
