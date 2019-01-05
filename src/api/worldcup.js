import fetch from '@/utils/fetch'
// 获取玩转世界杯数据
export function getWorldcup (query) {
  return fetch({
    url: '/lottery/investList',
    method: 'post',
    params: query
  })
}
// 球队详细数据接口
export function getIdList (query) {
  return fetch({
    url: '/lottery/investInfobyId',
    method: 'post',
    params: query
  })
}
// 下注传值接口
export function potStake (query) {
  return fetch({
    url: '/lottery/investStake',
    method: 'post',
    params: query
  })
}
// 竞猜记录
export function getGuessList (query) {
  return fetch({
    url: '/lottery/selectAllInvestbyId',
    method: 'post',
    params: query
  })
}
// 竞猜结果
export function getResultList (query) {
  return fetch({
    url: '/lottery/investGambResultbyId',
    method: 'post',
    params: query
  })
}
// 奖金记录
export function getAwardList (query) {
  return fetch({
    url: '/lottery/selectInvestAward',
    method: 'post',
    params: query
  })
}
// 奖金详情
export function getAwardDetail (query) {
  return fetch({
    url: '/lottery/selectInvestAwardbyId',
    method: 'post',
    params: query
  })
}
// 赛果查询
export function getGameResult (query) {
  return fetch({
    url: '/forecast',
    method: 'post',
    params: query
  })
}
// 赛果查询
export function getHref (query) {
  return fetch({
    url: '/foreDownLoadCount',
    method: 'post',
    params: query
  })
}
