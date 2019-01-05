import fetch from '@/utils/fetch'
// 获取分享码
export function getShareCode (query) {
  return fetch({
    url: '/user/getInvCode',
    method: 'post',
    params: query
  })
}

// 邀请信息
export function invitedStatistics (query) {
  return fetch({
    url: '/invite/invitedStatistics',
    method: 'post',
    params: query
  })
}
