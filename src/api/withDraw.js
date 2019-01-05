import fetch from '@/utils/fetch'
// 获取验证状态
export function preCashStateList (query) {
  return fetch({
    url: '/trade/preCashStateList',
    method: 'post',
    params: query
  })
}

// 绑定钱包地址
export function addTeleUser (query) {
  return fetch({
    url: '/telegram/addTeleUser',
    method: 'post',
    params: query
  })
}

// 获取短信验证码
export function sendCashMsm (query) {
  return fetch({
    url: '/trade/sendCashMsm',
    method: 'post',
    params: query
  })
}

// 提现
export function cash (query) {
  return fetch({
    url: '/trade/cash',
    method: 'post',
    params: query
  })
}
