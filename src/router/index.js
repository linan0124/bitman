import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_development')

Vue.use(Router)

export default new Router({
  mode: 'history',
  //     {
  //   path: '/',
  //   name: '倒计时',
  //   component: _import('countDown')
  // },
  routes: [
    {
      path: '/',
      name: '首页1',
      component: _import('home')
    },
    {
      path: '/index',
      name: '首页',
      component: _import('home')
    },
    {
      path: '/star',
      name: '星球',
      component: _import('star')
    },
    {
      path: '/speedStrategy',
      name: '加速攻略',
      component: _import('speedup')
    },
    // {
    //   path: '/gamerule',
    //   name: '玩法攻略',
    //   component: _import('gamerule')
    // },
    {
      path: '/introduce',
      name: '平台介绍',
      component: _import('introduce')
    },
    {
      path: '/login',
      name: '登录',
      component: _import('login')
    },
    {
      path: '/upload',
      name: '上传证件',
      component: _import('upload')
    },
    {
      path: '/realName',
      name: '实名认证',
      component: _import('realname')
    },
    {
      path: '/share',
      name: '分享',
      component: _import('share')
    },
    {
      path: '/message',
      name: '通知',
      component: _import('message')
    },
    {
      path: '/mine',
      name: '我的基地',
      component: _import('mine')
    },
    {
      path: '/myassets',
      name: '收支明细',
      component: _import('myassets')
    },
    {
      path: '/invitationList',
      name: '邀请记录',
      component: _import('Invitationlist')
    },
    {
      path: '/powerList',
      name: '算力记录',
      component: _import('powerlist')
    },
    {
      path: '/setting',
      name: '设置',
      component: _import('setting')
    },
    {
      path: '/verifyPhone',
      name: '手机号验证',
      component: _import('verifyPhone')
    },
    {
      path: '/verifyBankcard',
      name: '银行卡',
      component: _import('verifyBankcard')
    },
    {
      path: '/verifyAirportInfo',
      name: '航旅信息',
      component: _import('verifyAirportInfo')
    },
    {
      path: '/verifyCarInfo',
      name: '车辆数据',
      component: _import('verifyCarInfo')
    },
    {
      path: '/changeData',
      name: '数据换积分',
      component: _import('changeData')
    },
    {
      path: '/uploadRecords',
      name: '上传记录',
      component: _import('uploadRecords')
    },
    {
      path: '/invoice',
      name: '发票',
      component: _import('invoice')
    },
    {
      path: '/trainTicket',
      name: '火车票',
      component: _import('trainTicket')
    },
    {
      path: '/test',
      name: '测试',
      component: _import('test')
    },
    {
      path: '/aboutOur',
      name: '关于我们',
      component: _import('aboutOur')
    },
    {
      path: '/useragreement',
      name: '用户协议',
      component: _import('useragreement')
    },
    {
      path: '/problemfeedback',
      name: '问题反馈',
      component: _import('problemfeedback')
    },
    {
      path: '/worldCup',
      name: '玩转世界杯',
      component: _import('worldCup')
    },
    {
      path: '/guessList',
      name: '竞猜记录',
      component: _import('guessList')
    },
    {
      path: '/sum',
      name: '金额',
      component: _import('sum')
    },
    {
      path: '/result',
      name: '竞猜结果',
      component: _import('result')
    },
    {
      path: '/invitateCard',
      name: '创世分享卡',
      component: _import('invitateCard')
    },
    {
      path: '/shareZero',
      name: '创世分享',
      component: _import('shareZero')
    },
    {
      path: '/EuropeanShare',
      name: '欧冠分享卡',
      component: _import('EuropeanShare')
    },
    {
      path: '/newsList',
      name: '消息中心',
      component: _import('newsList')
    },
    {
      path: '/withDraw',
      name: '提现',
      component: _import('withDraw')
    },
    {
      path: '/ethAdress',
      name: '绑定ETH地址',
      component: _import('ethAdress')
    },
    {
      path: '/telegram',
      name: '加入电报群',
      component: _import('telegram')
    },
    {
      path: '/getBitman',
      name: '提取比特钻',
      component: _import('getBitman')
    },
    {
      path: '/betOnRecord',
      name: '下注记录',
      component: _import('betOnRecord')
    },
    {
      path: '/allPrizePool',
      name: '所有奖池',
      component: _import('allPrizePool')
    },
    {
      path: '/awardResult',
      name: '奖金详情',
      component: _import('awardResult')
    },
    {
      path: '/historyList',
      name: '历史活动',
      component: _import('historyList')
    },
    {
      path: '/historyDetail',
      name: '活动详情',
      component: _import('historyDetail')
    },
    {
      path: '/championPrediction',
      name: '冠军预测',
      component: _import('championPrediction')
    },
    {
      path: '/chooseTeam',
      name: '选择球队',
      component: _import('chooseTeam')
    },
    {
      path: '/haveBet',
      name: '已下注-猜冠军',
      component: _import('haveBet')
    },
    {
      path: '/predictionResult',
      name: '预测结果',
      component: _import('predictionResult')
    },
    {
      path: '/championInvite',
      name: '邀请好友',
      component: _import('championInvite')
    },
    {
      path: '/gamePrediction',
      name: '赛事预测',
      component: _import('gamePrediction')
    }
  ]
})
