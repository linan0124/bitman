import fetch from '@/utils/fetch'
// 我的基地
export function getPowerList (query) {
  return fetch({
    url: '/stress/getStressLog',
    method: 'post',
    params: query
  })
}
