import fetch from '@/utils/fetch'
// 回显三要素信息
export function getUserInfo (query) {
  return fetch({
    url: '/user/getUserInfo',
    method: 'post',
    params: query
  })
}

// 电信运营商验证
export function mobileAuth (query) {
  return fetch({
    url: '/user/mobileAuth',
    method: 'post',
    params: query
  })
}

// 车辆归属地查询
export function findCarArea (query) {
  return fetch({
    url: '/gwapi/findArea',
    method: 'post',
    params: query
  })
}

// 车辆续保认证
export function carRenewal (query) {
  return fetch({
    url: '/gwapi/carRenewal',
    method: 'post',
    params: query
  })
}

// 银行卡信息验证
export function autoBankCard (query) {
  return fetch({
    url: '/gwapi/autoBankCard',
    method: 'post',
    params: query
  })
}

// 航旅信息验证
export function airTravel (query) {
  return fetch({
    url: '/gwapi/airTravel',
    method: 'post',
    params: query
  })
}
