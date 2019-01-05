import fetch from '@/utils/fetch'
// 我的基地
export function getAccountIndex (query) {
  return fetch({
    url: '/user/getAccountIndex',
    method: 'post',
    params: query
  })
}
