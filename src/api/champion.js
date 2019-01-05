import fetch from '@/utils/fetch'
// 获取球队信息
export function getTeam (query) {
  return fetch({
    url: '/lottery/selectTeamInfo',
    method: 'post',
    params: query
  })
}
// 判断是否下注
export function WhetherBet (query) {
  return fetch({
    url: '/lottery/isBetsChampion',
    method: 'post',
    params: query
  })
}
// 判断预测结果
export function getForecast (query) {
  return fetch({
    url: '/lottery/forecast',
    method: 'post',
    params: query
  })
}
