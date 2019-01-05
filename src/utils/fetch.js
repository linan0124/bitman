import router from 'router/index'
import axios from 'axios'
import { getToken, removeToken } from './auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API + '/foundation', // api的base_url multipart/form-data
  timeout: 5000, // 请求超时时间
  headers: {'Content-Type': 'application/x-www-form-urlencoded/multipart/form-data;charset=UTF-8'}
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sentd
  if (getToken()) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  return response
}, error => {
  if (('' + error).indexOf('499') > 0) {
    removeToken()
    router.push('login')
  }

  console.log('err' + error)// for debug
  return Promise.reject(error)
}
)

export default service
