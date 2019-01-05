import fetch from '@/utils/fetch'
// 验证手机号
export function checkoutMoblie (query) {
  return fetch({
    url: '/user/checkoutMoblie',
    method: 'post',
    params: query
  })
}
// 注册
export function userRegister (query) {
  return fetch({
    url: '/user/Register',
    method: 'post',
    params: query
  })
}
// 登录
export function login (query) {
  return fetch({
    url: '/user/login',
    method: 'post',
    params: query
  })
}
// 退出
export function logout () {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

// 忘记密码
export function sendPhoneCode (query) {
  return fetch({
    url: '/user/sendPhoneCode',
    method: 'post',
    params: query
  })
}

// 重设密码
export function changePassWord (query) {
  return fetch({
    url: 'user/changePassWord',
    method: 'post',
    params: query
  })
}

// 小程序绑定微信判断
export function loginByOpenId (query) {
  return fetch({
    url: 'user/loginByOpenId',
    method: 'post',
    params: query
  })
}
