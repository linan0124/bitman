import fetch from '@/utils/fetch'
// 我的基地
export function getAssetsList (query) {
  return fetch({
    url: '/user/digRecord',
    method: 'post',
    params: query
  })
}
