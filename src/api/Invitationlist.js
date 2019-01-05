import fetch from '@/utils/fetch'
// 获取邀请列表
export function getInviteList (query) {
  return fetch({
    url: '/invite/invitedRecord',
    method: 'post',
    params: query
  })
}
