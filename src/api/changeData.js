import fetch from '@/utils/fetch'
// 上传文件   纸质账单  发票   火车票
export function uploadFile (query) {
  return fetch({
    url: '/comFile/uploadFile',
    method: 'post',
    params: query
    // anync: true,
    // contentType: false,
    // processData: false,
    // headers: { 'Content-Type': 'multipart/form-data' }
  })
}
// 上传次数查询
export function getUplodeNumb () {
  return fetch({
    url: '/comFile/getUplodeNumb',
    method: 'post'
  })
}
// 上传记录展示
export function getFileListByPid (query) {
  return fetch({
    url: '/comFile/getFileListByPid',
    method: 'post',
    params: query
  })
}
// 上传记录详情展示
export function getDetailById (query) {
  return fetch({
    url: '/comFile/getDetailById',
    method: 'post',
    params: query
  })
}
