import fetch from '@/utils/fetch'

// 验证是否实名
export function isRealName (query) {
  return fetch({
    url: '/user/isRealName',
    method: 'post',
    params: query
  })
}

// 实名认证
export function realName (query) {
  return fetch({
    url: '/user/realName',
    method: 'post',
    params: query
  })
}

// 获取矿池数据
export function getDigMine () {
  return fetch({
    url: '/mine/getDigMine',
    method: 'post'
  })
}

// 上传身份证照片
export function updateUploadFile (query) {
  return fetch({
    url: '/comFile/updateUploadFile',
    method: 'post',
    params: query
  })
}

// 照片审核状态
export function getKycStatus (query) {
  return fetch({
    url: '/comFile/getKycStatus',
    method: 'post',
    params: query
  })
}
