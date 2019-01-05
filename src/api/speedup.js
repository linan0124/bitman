import fetch from '@/utils/fetch'
// 获取加速项是否验证信息
export function getIsOpenAPI (query) {
  return fetch({
    url: '/user/getIsOpenAPI',
    method: 'post',
    params: query
  })
}
