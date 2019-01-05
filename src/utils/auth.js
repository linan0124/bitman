// import {logout} from 'api/login'
import Vue from 'vue'
import judgeClient from 'utils/ifclient'

const TokenKey = 'token' // token 关键字

export function getToken () {
  if (judgeClient) {
    return localStorage.getItem(TokenKey)
  } else {
    return ClientObject.getToken()
  }
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  if (judgeClient) {
    return localStorage.removeItem(TokenKey)
  } else {
    return ClientObject.exitApp()
  }
}
