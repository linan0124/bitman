import fetch from '@/utils/fetch'
// 验证手机号
export function upload (query) {
  return fetch({
    url: 'http://upload.qiniu.com/',
    method: 'post',
    params: query
  })
}
